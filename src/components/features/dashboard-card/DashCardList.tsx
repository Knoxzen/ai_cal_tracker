'use client';

import React, { useEffect, useState } from 'react';
import DashCards from './DashCards';

const DashCardList: React.FC = () => {

  const [mealSummary, setMealSummary] = useState<{ totalCaloriesConsumed: number; dailyGoal: number; remainingCalories: number; }>({
    totalCaloriesConsumed: 0,
    dailyGoal: 0,
    remainingCalories: 0,
  });

  useEffect(() => {
    const fetchMealSummary = async () => {
      const response = await fetch('/api/mealSummary');
      const data = await response.json();
      setMealSummary(data);
    };
    fetchMealSummary();
  }, []);

  return (
    <>
      <div className="flex">
        <DashCards title={'Consumed'} value={mealSummary.totalCaloriesConsumed} unit={'kcal'} />
        <DashCards title={'Remaining'} value={mealSummary.remainingCalories} unit={'kcal'} />
        <DashCards title={'Daily Goal'} value={mealSummary.dailyGoal} unit={'kcal'} />
      </div>
    </>
  );
};

export default DashCardList;
