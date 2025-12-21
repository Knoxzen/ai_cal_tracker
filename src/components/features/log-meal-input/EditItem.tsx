'use client'

import { ChevronDown } from 'lucide-react'
import React from 'react'

interface EditItemProps {
    item: {
        id: string;
        name?: string;
        kcal?: number;
    };
    isOpen: boolean;
    onToggle: (id: string) => void;
}

const EditItem: React.FC<EditItemProps> = ({ item, isOpen, onToggle }) => {
    return (
      <div className="rounded-md border bg-card transition-all">
        {/* Collapsed Header */}
        <button
          onClick={() => onToggle(item.id)}
          className="flex w-full items-center justify-between px-3 py-2 text-left"
        >
          <span className="font-medium">{item.name}</span>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{item.kcal} kcal</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>
  
        {/* Expanded Content */}
        {isOpen && (
          <div className="border-t px-3 py-3 space-y-2">
            <input className="w-full rounded border p-1" placeholder="Item name" />
            <input className="w-full rounded border p-1" placeholder="Calories" />
            <input className="w-full rounded border p-1" placeholder="Protein" />
            <input className="w-full rounded border p-1" placeholder="Carbs" />
            <input className="w-full rounded border p-1" placeholder="Fats" />
          </div>
        )}
      </div>
    );
  };
  
  export default EditItem;
