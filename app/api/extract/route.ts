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
            2. cookingTime: How much time the user wants to spend cooking
            3. servingSize: The serving size for the meal (e.g., "1 person", "family of 4")
            4. dietPreference: The diet preference (vegan, vegetarian, pescatarian, etc.)
            5. dietaryRestrictions: Any allergies or restrictions mentioned
            
            If any information is missing, use null or reasonable defaults based on context.
            
            
            Return a Json object with these exact keys names and populate the values based off chat history.
            Do not include any escape characters such as new line or include template strings in the output. However allow the JSON to be parseable.
            {"includeIngredients": [],"maxReadyTime": null,"minServings": null,"diet": null,"intolerances": null}

            DO NOT include markdown formatting like \`\`\`json or \`\`\`. Return ONLY the JSON object.`;

        const result = await model.generateContent({
            contents: conversationHistory,
            generationConfig:{
                temperature: 0.1,
                maxOutputTokens: 256,
            },
            systemInstruction: systemInstruction,
        });

        const response = result.response;
        const responseText = response.text();
 
        return NextResponse.json({ response: responseText}, { status: 200 });
    }catch (error) {
            console.error("Error", error);
            return new Response(JSON.stringify({ error: "Failed to Extract Data" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
}

