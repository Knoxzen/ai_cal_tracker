import prisma from "@/lib/db";

export async function GET(): Promise<Response> {
  // TODO: replace with auth-derived id
  const userId = "current_user_id";

  const mealSummary = await prisma.meal.aggregate({
    where: {
      userId,
      consumedAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 1)),
        lte: new Date(),
      },
    },
    _sum: {
      calories: true,
    },
  });

  const userMetadata = await prisma.userMetadata.findUnique({
    where: {
      userId,
    },
  });

  return Response.json({
    totalCaloriesConsumed: mealSummary._sum.calories ?? 0,
    dailyGoal: userMetadata?.dailyCalorieGoal ?? null,
    remainingCalories: userMetadata
      ? userMetadata.dailyCalorieGoal - (mealSummary._sum.calories ?? 0)
      : null,
  });
}
