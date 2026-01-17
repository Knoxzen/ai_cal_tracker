'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { FC } from 'react';
import { useState } from 'react';
import { FaHourglassStart, FaPaperPlane } from "react-icons/fa6";
import EditMealInput from './EditMealInput';
import axios from 'axios';
import { Meal } from '@/types/Meal';

type LogMealProps = {
    action : () => void;
};

const LogMealInput = ({action}:LogMealProps) => {

  const [state, setState] = useState<'idle' | 'submitting' | 'confirming'>('idle')
  const [input, setInput] = useState("");
  const [meal, setMeal] = useState<Meal>();

  const handleSubmit = async () => {
    setState('submitting');
    try {
      const mealData = await getMealInfo(input);
      setMeal(mealData);
      setState('confirming');
    } catch (error) {
      console.error("Error submitting meal input:", error);
      setState('idle');
    }
  }

  async function getMealInfo(input: string) {
    const res = await axios.post("/api/logMeal", { message: input, action: "fetch" });
    const data = res.data;

    return data;
  }

  const handleState = () : void => {
    action();
    setState("idle");
  };

  return (
    <>
      <div className="m-4 p-2 w-[80vw] outline-1 rounded-xs" >
        <Textarea className="resize-none" onChange={(e) => setInput(e.target.value)} />
        <div className="flex mt-2 justify-end" >
          <Button className="w-30 justify-center" onClick={handleSubmit} >

            {state === 'submitting' ? (
              <>
                <FaHourglassStart />
                Analyzing
              </>
            ) : (
              <>
                <FaPaperPlane />
                Log
              </>
            )}

          </Button>
        </div>
      </div>
      {state === 'confirming' && meal ? <EditMealInput meal={meal} action={handleState} /> : null}
    </>
  );
};

export default LogMealInput;