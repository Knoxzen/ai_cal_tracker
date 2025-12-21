'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import MealNutritionCard from './MealNutritionCard';
import EditNutritionCard from './EditNutritionCard';
import { FaCircleCheck } from "react-icons/fa6";
import type { Meal } from '@/types/Meal';



const EditMealInput: React.FC<Meal> = (meal) => {
    console.log("inside the edit meal",meal);
    
    return (
        <>
            <div className="m-4 p-4 w-[80vw] rounded-md border bg-background">

                <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">
                    <FaCircleCheck />
                    <span>Review Meal Details</span>
                </div>

                {/* Cards Row */}
                <div className="flex gap-4 mb-6">
                    {/* Left: Editable items (70%) */}
                    <div className="basis-[70%]">
                        <EditNutritionCard />
                    </div>

                    {/* Right: Nutrition summary (30%) */}
                    <div className="basis-[30%] h-[250px]">
                        <MealNutritionCard
                            kcal={meal.calories}
                            protein={meal.protein}
                            carbs={meal.carbs}
                            fats={meal.fats}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2">
                    <Button variant="secondary" className="w-[120px]">
                        Cancel
                    </Button>
                    <Button className="w-[160px]">
                        Confirm
                    </Button>
                </div>

            </div>
        </>

    );
};

export default EditMealInput;