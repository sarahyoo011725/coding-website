'use client'

import { useAuth } from "@/app/auth/AuthContext"
import { gemini_flash } from "@/app/gemini";
import { getWeaknesses } from "@/app/utils"
import { useEffect, useState } from "react";

const Weakness = () => {
    const { user } = useAuth();
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if (!user) return;
        const summarizeWeakpoints = async () => {
            setLoading(true);
            const weakpoints = await getWeaknesses(user.uid);
            const summary = await summarize_weakness(JSON.stringify(weakpoints));
            setSummary(summary);
            setLoading(false);
        }
        summarizeWeakpoints();
    }, [user])
    
    const summarize_weakness = async(weakness_json_stringified: string) :Promise<string> => {
        const prompt = `
            Shortly summarize my weaknesses provided below in bullet points.
            After that, provide any tips to improve their weaknesses in kind language.
            ${weakness_json_stringified}
            `;
        const result = (await gemini_flash.generateContent(prompt)).response.text();
        return result;
    }
    
  return (
    <div className="collapse bg-base-200 w-1/2">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">See your weakness & Tips to improve</div>
        <div className="collapse-content whitespace-pre-line">
            {loading ? (
                <span className="loading loading-spinner loading-lg"></span>
            ) : (
                <>
                  {summary}
                </>
            )}
        </div>
    </div>
  )
}

export default Weakness