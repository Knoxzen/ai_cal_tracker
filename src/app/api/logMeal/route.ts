import prisma from "@/lib/db";
import { GoogleGenAI } from "@google/genai";
import { Meal } from "@/types/Meal";
import { NUTRITION_PROMPT } from "@/constants/nutritionPrompt";

const ai = new GoogleGenAI({});
type MealPreview = Omit<Meal, 'id'>;

async function sendMessage(message: string): Promise<MealPreview> {
  const userInput = message;
  const basePrompt = NUTRITION_PROMPT;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: basePrompt + userInput,
  });

  const text = response.text ?? "";
  const data = JSON.parse(text);

  const { chat_text, ...meal } = data;

  return {
    userId: "current_user_id",
    name: meal.name,
    description: meal.description ?? "",
    calories: meal.calories,
    protein: meal.protein,
    carbs: meal.carbs,
    fats: meal.fats,
    fiber: meal.fiber ?? 0,
    sugar: meal.sugar ?? 0,
    sodium: meal.sodium ?? 0,
    micros: (meal.micros ?? {}) as Record<string, number>,
  };
}


async function saveMeal(meal: Meal): Promise<void> {
  await prisma.meal.create({
    data: meal
  });
}


export async function POST(request: Request) {
  const body = await request.json();
  const {message,action} = body;

  switch (action) {
    case "fetch":
      return Response.json(await sendMessage(message));
    case "save":
      return Response.json(await saveMeal(message));
    default:
      break;
  }

}
