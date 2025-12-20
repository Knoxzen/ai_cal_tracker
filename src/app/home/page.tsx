'use client';

import axios from "axios";
import { useState } from "react";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function HomePage() {
    const [message, setMessage] = useState("");
    const [input, setInput] = useState("");

    async function sendMessage(input: string) {
        const res = await axios.post("/api/chat", { message: input });
        const data = res.data;
        console.log('data', data);
        setMessage(data.message);
    }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Page Title</h1>
            <p className="mt-2 text-gray-700">Page content goes here.</p>
            <input type="text" placeholder="Enter your calorie goal" onChange={(e) => setInput(e.target.value)} />
            <button onClick={() => sendMessage(input)}>Submit</button>
            <Markdown remarkPlugins={[remarkGfm]}>{message}</Markdown>


        </div>
    );
}