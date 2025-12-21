'use client';

import React from 'react';
import { Progress } from '@/components/ui/progress';

interface MealNutritionCardProps {
  kcal: number;
  protein: number;
  carbs: number;
  fats: number;
  maxProtein?: number;
  maxCarbs?: number;
  maxFats?: number;
}

const MealNutritionCard: React.FC<MealNutritionCardProps> = ({
  kcal,
  protein,
  carbs,
  fats,
  maxProtein = 100,
  maxCarbs = 300,
  maxFats = 70,
}) => {
  return (
    <div className="p-4 rounded-lg border bg-card text-card-foreground">
      
      {/* Header */}
      <div className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        Total Nutrition
      </div>

      {/* Highlighted Calories */}
      <div className="mt-2 text-4xl font-bold">
        {kcal}
        <span className="ml-1 text-base font-medium text-muted-foreground">
          kcal
        </span>
      </div>

      {/* Protein */}
      <div className="mt-4 space-y-1">
        <div className="flex justify-between text-sm">
          <span>Protein</span>
          <span className="text-muted-foreground">{protein} g</span>
        </div>
        <Progress value={(protein / maxProtein) * 100} />
      </div>

      {/* Carbs */}
      <div className="mt-3 space-y-1">
        <div className="flex justify-between text-sm">
          <span>Carbs</span>
          <span className="text-muted-foreground">{carbs} g</span>
        </div>
        <Progress value={(carbs / maxCarbs) * 100} />
      </div>

      {/* Fats */}
      <div className="mt-3 space-y-1">
        <div className="flex justify-between text-sm">
          <span>Fats</span>
          <span className="text-muted-foreground">{fats} g</span>
        </div>
        <Progress value={(fats / maxFats) * 100} />
      </div>

    </div>
  );
};

export default MealNutritionCard;
