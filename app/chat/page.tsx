import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function chat() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Give me a recipe using bananas",
    config: {
        systemInstruction: "You should respond like a medieval knight",
      },
  });
  return(
    <p>${response.text}</p>
  )
}


