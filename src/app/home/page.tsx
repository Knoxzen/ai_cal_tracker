'use client';

import DashCardList from "@/components/features/dashboard-card/DashCardList";
import LogMealInput from "@/components/features/log-meal-input/LogMealInput";
import { useState } from "react";

export default function HomePage() {

    const [refreshKey, setRefreshKey] = useState(0);
    const logEvent = () => {
        setRefreshKey(prev => prev + 1);
    }

    return (
        <>
            <LogMealInput action={logEvent} />
            <DashCardList refreshKey={refreshKey} />
        </>
    );
}