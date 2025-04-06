import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
export async function POST(request:Request) {
    try{
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GOOGLE_API_KEY is not defined in the environment variables.");
        }
        const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = ai.getGenerativeModel({model: "gemini-2.0-flash"});
        const data =  await request.json();
        const userPrompt = data.body || "Hello";


        const conversationHistory = data.history || [];
        

        if (!conversationHistory.length) {
            return NextResponse.json({ error: "No conversation history provided" }, { status: 400 });
        }

        // Add new user message to history
        conversationHistory.push({ 
            role: "user", 
            parts: [{ text: userPrompt }] 
        });

        const systemInstruction:string =  
            `You are a data extraction AI. Your task is to analyze the provided conversation 
            and extract the following 5 pieces of information:
            
            1. ingredients: An array of specific grocery items mentioned (lowercase, spelled correctly, comma-separated, and spaced if the item is bigger than 1 word)
            2. dietaryRestrictions: Any allergies or restrictions mentioned
            3. cookingTime: How much time the user wants to spend cooking
            4. dietPreference: The diet preference (vegan, vegetarian, pescatarian, etc.)
            5. servingSize: The serving size for the meal (e.g., "1 person", "family of 4")
            
            Return ONLY a valid JSON object with these 5 keys and no other text. 
            If any information is missing, use null or reasonable defaults based on context.
            
            Example output:
            {"ingredients":["chicken","rice","bell peppers"],"dietaryRestrictions":"gluten-free","cookingTime":"30 minutes","dietPreference":"omnivore","servingSize":"2 people"}`;

        const result = await model.generateContent({
            contents: conversationHistory,
            generationConfig:{
                temperature: 0.1,
                maxOutputTokens: 100,
            },
            systemInstruction: systemInstruction,
        });

        const response = result.response;
        const responseText = response.text();
 
        const jsonResponse = JSON.parse(responseText);
        return NextResponse.json({ response: jsonResponse}, { status: 200 });
    }catch (error) {
            console.error("Error", error);
            return new Response(JSON.stringify({ error: "Failed to Extract Data" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
}

