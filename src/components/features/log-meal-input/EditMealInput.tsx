'use client';

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import MealNutritionCard from './MealNutritionCard';
import EditNutritionCard from './EditNutritionCard';
import { FaCircleCheck } from "react-icons/fa6";
import type { Meal } from '@/types/Meal';
import axios from 'axios';

type EditMealInputProps = {
    meal: Meal;
    action: () => void;
  };
  

const EditMealInput = ({meal,action} : EditMealInputProps) => {

    const [editedMeal, setEditedMeal] = useState<Meal>(meal);

    const handleEditMeal = (meal: Meal) => {
        setEditedMeal(meal);
    };

    const handleSave = async () => {
        action();
        await axios.post("/api/logMeal", { message: editedMeal, action: "save" });
    }

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
                        <EditNutritionCard meal={editedMeal} onEditMeal={handleEditMeal} />
                    </div>

                    {/* Right: Nutrition summary (30%) */}
                    <div className="basis-[30%] h-[250px]">
                        <MealNutritionCard
                            kcal={editedMeal.calories}
                            protein={editedMeal.protein}
                            carbs={editedMeal.carbs}
                            fats={editedMeal.fats}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2">
                    <Button variant="secondary" className="w-[120px]" onClick={action}>
                        Cancel
                    </Button>
                    <Button className="w-[160px]" onClick={handleSave} >
                        Confirm
                    </Button>
                </div>

            </div>
        </>

    );
};

export default EditMealInput;