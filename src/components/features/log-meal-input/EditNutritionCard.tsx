'use client'

import { Meal } from '@/types/Meal'
import MealEditor from './MealEditor'


interface EditNutritionCardProps {
    meal: Meal;
    onEditMeal: (meal: Meal) => void;
}

const EditNutritionCard: React.FC<EditNutritionCardProps> = ({ meal, onEditMeal }) => {

    return (
        <div className="h-[250px] p-4 rounded-lg border bg-card text-card-foreground flex flex-col">
            <div className="text-xs mb-2 font-semibold tracking-widest text-muted-foreground uppercase">
                Total Nutrition of {meal.name}
            </div>
            <div className="text-xs mb-2 tracking-widest text-muted-foreground">
                {meal.description}
            </div>
            <MealEditor meal={meal} onEditMeal={onEditMeal} />

        </div>
    )
}

export default EditNutritionCard
