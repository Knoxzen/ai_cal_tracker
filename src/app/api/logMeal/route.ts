import prisma from "@/lib/db";
import { GoogleGenAI } from "@google/genai";
import { Meal } from "@/types/Meal";
import { NUTRITION_PROMPT } from "@/constants/nutritionPrompt";

const ai = new GoogleGenAI({});

async function sendMessage(message: string): Promise<Meal> {
  const userInput: string = message;
  const basePrompt = NUTRITION_PROMPT;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: basePrompt + userInput,
  });
  console.log("response",response);
  console.log("response.text",response.text);
  const text = response.text ?? "";
  const data = JSON.parse(text);
  console.log("data",data);

  const { chat_text, ...meal } = data;

  const createdMeal = await prisma.meal.create({
    data: {
      userId: "current_user_id",
      name: meal.name,
      description: meal.description,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fats: meal.fats,
      fiber: meal.fiber ?? 0,
      sugar: meal.sugar ?? 0,
      sodium: meal.sodium ?? 0,
      micros: meal.micros ?? {},
    },
  });

  return {
    ...createdMeal,
    description: createdMeal.description ?? "",
    fiber: createdMeal.fiber ?? 0,
    sugar: createdMeal.sugar ?? 0,
    sodium: createdMeal.sodium ?? 0,
    micros: (createdMeal.micros ?? {}) as Record<string, number>,
  };
}

export async function POST(request: Request) {
  const body = await request.json();
  return Response.json(await sendMessage(body.message));
}
