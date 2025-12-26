'use client';

import { Input } from '@/components/ui/input';
import { Meal } from '@/types/Meal';
import React, { useState } from 'react';

interface MealEditorProps {
    meal: Meal;
    onEditMeal: (meal: Meal) => void;
}

const MealEditor: React.FC<MealEditorProps> = ({ meal, onEditMeal }) => {

    const [updatedMeal, setUpdatedMeal] = useState<Meal>(meal);
    return (
        <div>
            <div>
                <h1>Total Calories</h1>
                <div className="flex items-center gap-2">
                    <Input
                        type="number"
                        value={updatedMeal.calories ?? ''}
                        onChange={(e) => {
                            setUpdatedMeal({ ...updatedMeal, calories: parseInt(e.target.value) || 0 })
                            onEditMeal({ ...updatedMeal, calories: parseInt(e.target.value) || 0 });
                        }
                        }
                    />
                </div>
                <h1>Total Protein</h1>
                <div className="flex items-center gap-2">
                    <Input
                        type="number"
                        value={updatedMeal.protein ?? ''}
                        onChange={(e) => {
                            setUpdatedMeal({ ...updatedMeal, protein: parseInt(e.target.value) || 0 })
                            onEditMeal({ ...updatedMeal, protein: parseInt(e.target.value) || 0 });
                        }
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default MealEditor;