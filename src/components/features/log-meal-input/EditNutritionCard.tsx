'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import EditItem from './EditItem'
import { MealItem } from '@/model/MealItem'
import { useState } from 'react'

const mockItems: MealItem[] = [
    {
        id: '1',
        name: 'Chicken Breast',
        calories: 220,
        protein: 35,
        carbs: 0,
        fats: 5,
    },
    {
        id: '2',
        name: 'Rice',
        calories: 180,
        protein: 4,
        carbs: 40,
        fats: 1,
    },
]

const EditNutritionCard = () => {
    const [openItemId, setOpenItemId] = useState<string | null>(null);

    const handleToggle = (id: string) => {
        setOpenItemId(prev => (prev === id ? null : id));
    };
    return (
        <div className="h-full p-4 rounded-lg border bg-card text-card-foreground">
            <div className="text-xs mb-2 font-semibold tracking-widest text-muted-foreground uppercase">
                Total Nutrition
            </div>
            <ScrollArea className="">

                <div className="space-y-2">
                    {mockItems.map(item => (
                        <EditItem
                            key={item.id}
                            item={item}
                            isOpen={openItemId === item.id}
                            onToggle={handleToggle}
                        />
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

export default EditNutritionCard
