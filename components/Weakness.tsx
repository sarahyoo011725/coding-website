'use client'

import { useAuth } from "@/app/auth/AuthContext"
import { getWeaknesses } from "@/app/utils"
import { useEffect, useState } from "react";

declare global {
    interface Window {
        ai: any;
    }
}

const checkAi = async () => {
    if ((await self.ai.summarizer.capabilities()).available == "readily") {
      console.log("summarizer api ready");
      return true; 
    }
    return false;
}

const Weakness = () => {
    const { user } = useAuth();
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [summarizer, setSummarizer] = useState({
        summarize: async (prompt: string) => {
            console.log(prompt); //to preven build fail...
            return '';
        },
        destroy: () => {}
    });
    const [isAi, setIsAi] = useState(false);
    
    const summarize_weakness = async(weakness_json_stringified: string) :Promise<string> => {
        const prompt = `
            Shortly summarize my weaknesses provided below in bullet points.
            After that, provide any tips to improve their weaknesses in kind language.
            ${weakness_json_stringified}
            `;
            const result = await summarizer.summarize(prompt);
            summarizer.destroy();
            return result;
    }
    
    useEffect(() => {
        const init_ai = async() => {
            const can_summarize = await checkAi();
            if (can_summarize) {
                const summarizer = await self.ai.summarizer.create();
                setSummarizer(summarizer);
            }
            setIsAi(can_summarize);
        }
        init_ai();
    }, [])

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

  return (
    <div className="collapse bg-base-200 w-1/2">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">See your weakness & Tips to improve</div>
        <div className="collapse-content whitespace-pre-line">
            {isAi === false && (
                <h1 className="font-medium text-lg text-red-500">Your browser does not support Built-in AI.</h1>
            )}
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