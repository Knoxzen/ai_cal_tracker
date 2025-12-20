import prisma from "@/lib/db";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function sendMessage(message: string) {
  const userInput: string = message;
  const basePrompt = `
You are a Nutritionist AI API. Your goal is to extract nutritional data from the text provided below and return a STRICT JSON object.

RULES:
1. Estimate values based on standard serving sizes if quantity is not specified.
2. Output ONLY valid JSON. Do not include markdown formatting like "\`\`\`json" or conversational text outside the JSON object.
3. Your response must match the schema defined below perfectly.

JSON SCHEMA STRUCTURE:
{
  "name": "String (Short, generic title of the meal, e.g., 'Chicken Salad')",
  "description": "String (A brief summary of what was identified, e.g., 'Grilled chicken breast with mixed greens')",
  "calories": Integer (Total kcal),
  "protein": Float (Grams),
  "carbs": Float (Grams),
  "fats": Float (Grams),
  "fiber": Float (Grams, optional - set to 0 if unknown),
  "sugar": Float (Grams, optional - set to 0 if unknown),
  "sodium": Float (Milligrams, optional - set to 0 if unknown),
  "micros": {
    "key_name": Float (value in mg/mcg for vitamins/minerals, e.g., "vitamin_c": 12)
  },
  "chat_text": "String (A friendly, helpful response to the user in Markdown format. Summarize the macros and give a quick health tip based on the food. Use emojis)"
}

USER INPUT TEXT TO PROCESS: 
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: basePrompt + userInput,
  });
  const text = response.text ?? "";
  const data = JSON.parse(text);

  const { chat_text, ...dbData } = data;

  await prisma.meal.create({
    data: {
      userId: "current_user_id",
      name: dbData.name,
      description: dbData.description,
      calories: dbData.calories,
      protein: dbData.protein,
      carbs: dbData.carbs,
      fats: dbData.fats,
      fiber: dbData.fiber,
      sugar: dbData.sugar,
      sodium: dbData.sodium,
      micros: dbData.micros,
    },
  });

  return chat_text;
}

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  return Response.json({ message: await sendMessage(body.message) });
}
