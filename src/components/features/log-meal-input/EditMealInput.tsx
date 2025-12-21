'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import MealNutritionCard from './MealNutritionCard';
import EditNutritionCard from './EditNutritionCard';

const EditMealInput: React.FC = () => {
    return (
        <>
            <div className="m-4 p-4 w-[80vw] rounded-md border bg-background">

                {/* Header */}
                <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">
                    Testing the components
                </div>

                {/* Cards Row */}
                <div className="flex gap-4 mb-6">
                    {/* Left: Editable items (70%) */}
                    <div className="basis-[70%]">
                        <EditNutritionCard />
                    </div>

                    {/* Right: Nutrition summary (30%) */}
                    <div className="basis-[30%]">
                        <MealNutritionCard
                            kcal={580}
                            protein={42}
                            carbs={65}
                            fats={18}
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