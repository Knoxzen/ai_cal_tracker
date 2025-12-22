'use client';

import DashCardList from "@/components/features/dashboard-card/DashCardList";
import LogMealInput from "@/components/features/log-meal-input/LogMealInput";

export default function HomePage() {
    return (
        <>
            <LogMealInput />
            <DashCardList />
        </>
    );
}