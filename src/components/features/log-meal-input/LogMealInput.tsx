'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { stat } from 'fs';
import type { FC } from 'react';
import { useState } from 'react';
import { FaHourglassStart, FaPaperPlane } from "react-icons/fa6";
import EditMealInput from './EditMealInput';

const LogMealInput: FC = () => {
  // const [value, setValue] = useState('')
  const [state, setState] = useState<'idle' | 'submit' | 'confirm'>('idle')

  const handleSubmit = async () => {
    // if (!value.trim()) return

    setState('submit')

    // simulate async action (API / AI call)
    await new Promise((res) => setTimeout(res, 1500))

    // setValue('')
    setState('confirm')
  }

  return (
    <>
      <div className="m-4 p-2 w-[80vw] outline-1 rounded-xs" >
        <Textarea className="resize-none" />
        <div className="flex mt-2 justify-end" >
          <Button className="w-30 justify-center" onClick={handleSubmit} >

            {state === 'submit' ? (
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
      {state === 'confirm' ? (<><EditMealInput/></>) : (<></>)}
    </>
  );
};

export default LogMealInput;