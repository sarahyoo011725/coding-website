'use client'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Problem, ProblemStatus } from '@/app/types';
import { useState } from 'react'
import { useAuth } from '@/app/auth/AuthContext';

const DefaultAnalysis = ({ problem, pid } : { problem : Problem, pid: string}) => {
    const { user } = useAuth();
    const [status, setStatus] = useState<string>(problem.status);

    async function updateStatus(status: ProblemStatus) {
        if (!user) return;
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_APP_ORIGIN}/api/status?uid=${user.uid}&pid=${pid}`,
            {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ status }), 
            });

        if (!response.ok) {
            throw new Error(`Failed to update status: ${response.statusText}`);
        }

        setStatus(status);
    }

  return (
<div className="p-6 bg-slate-100 rounded-lg shadow-md space-y-6">
    {/* Problem Title and Description */}
    <section>
        <h2 className="font-bold text-2xl mb-3">{problem.title}</h2>
        <h3 className="font-semibold text-xl mb-2">Description</h3>
        <p className="mb-4">{problem.description}</p>
    </section>

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Solution Code Block */}
        <section>
            <h3 className="font-semibold text-xl mb-2">Your Solution</h3>
            <div className="mockup-code mt-2 rounded-lg overflow-hidden shadow-inner">
                <SyntaxHighlighter
                    language="cpp"
                    style={coldarkDark}
                    showLineNumbers
                    wrapLongLines
                >
                    {problem.user_solution}
                </SyntaxHighlighter>
            </div>
        </section>

        {/* Additional Information */}
        <section className="flex flex-col space-y-4">

            {/* Topics */}
            <div className="w-full max-w-full">
                <p className="font-semibold text-xl">Topics</p>
                <div className="bg-white rounded-lg p-3 text-lg font-medium flex flex-wrap gap-2 mt-2">
                    {problem.topics.map((topic, index) => (
                        <span key={index} className="bg-gray-200 rounded px-2 py-1">
                            {topic}
                        </span>
                    ))}
                </div>
            </div>

            {/* Time Complexity */}
            <div className="w-full max-w-full">
                <p className="font-semibold">Time Complexity</p>
                <div className="bg-white rounded-lg p-3 text-lg font-medium mt-1">
                    {problem.time_complexity}
                </div>
            </div>

            {/* Space Complexity */}
            <div className="w-full max-w-full">
                <p className="font-semibold">Space Complexity</p>
                <div className="bg-white rounded-lg p-3 text-lg font-medium mt-1">
                    {problem.space_complexity}
                </div>
            </div>

            {/* Problem Link */}
            <a
                href={problem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium underline hover:text-blue-800"
            >
                Problem Link
            </a>

            {/* Status Selector */}
            <div className="w-full max-w-full">
                <label className="text-lg font-semibold mb-2 block">Status</label>
                <div className="flex flex-wrap gap-2 w-full justify-start">
                    <button
                        className={`btn px-4 py-2 rounded-lg text-white ${
                            status === ProblemStatus.JustSolved
                                ? "bg-purple-600"
                                : "bg-purple-300 hover:bg-purple-400"
                        }`}
                        onClick={() => updateStatus(ProblemStatus.JustSolved)}
                    >
                        {ProblemStatus.JustSolved}
                    </button>
                    <button
                        className={`btn px-4 py-2 rounded-lg text-white ${
                            status === ProblemStatus.StillHard
                                ? "bg-red-600"
                                : "bg-red-300 hover:bg-red-400"
                        }`}
                        onClick={() => updateStatus(ProblemStatus.StillHard)}
                    >
                        {ProblemStatus.StillHard}
                    </button>
                    <button
                        className={`btn px-4 py-2 rounded-lg text-white ${
                            status === ProblemStatus.NeedsToReview
                                ? "bg-orange-600"
                                : "bg-orange-300 hover:bg-orange-400"
                        }`}
                        onClick={() => updateStatus(ProblemStatus.NeedsToReview)}
                    >
                        {ProblemStatus.NeedsToReview}
                    </button>
                    <button
                        className={`btn px-4 py-2 rounded-lg text-white ${
                            status === ProblemStatus.JustReviewed
                                ? "bg-blue-600"
                                : "bg-blue-300 hover:bg-blue-400"
                        }`}
                        onClick={() => updateStatus(ProblemStatus.JustReviewed)}
                    >
                        {ProblemStatus.JustReviewed}
                    </button>
                    <button
                        className={`btn px-4 py-2 rounded-lg text-white ${
                            status === ProblemStatus.EasyNow
                                ? "bg-green-600"
                                : "bg-green-300 hover:bg-green-400"
                        }`}
                        onClick={() => updateStatus(ProblemStatus.EasyNow)}
                    >
                        {ProblemStatus.EasyNow}
                    </button>
                </div>
            </div>

        </section>
    </div>
</div>

  )
}

export default DefaultAnalysis