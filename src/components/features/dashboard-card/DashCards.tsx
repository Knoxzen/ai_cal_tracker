'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { FaCircleCheck } from 'react-icons/fa6';

interface DashCardsProps {
    title: string;
    value: number;
    unit: string;
}

const DashCards: React.FC<DashCardsProps> = ({ title, value, unit }) => {
    return (
        <Card className="m-2 w-full max-w-[320px] min-w-[220px] rounded-xl border bg-background">
            <CardHeader className="pb-2 flex flex-row items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                    <FaCircleCheck size={20} />
                </div>
                <CardTitle className="text-[0.95rem] font-semibold uppercase tracking-wider text-muted-foreground">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-primary">{value}</span>
                    <span className="text-base font-medium text-muted-foreground pb-1">
                        {unit}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
};

export default DashCards;