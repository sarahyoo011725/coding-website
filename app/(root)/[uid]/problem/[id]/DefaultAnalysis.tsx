'use client'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Problem } from '@/app/types';
import { useState } from 'react'

const DefaultAnalysis = ({ problem } : { problem : Problem }) => {
    const [difficulty, setDifficulty] = useState<number>(problem.difficulty);

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

            {/* Additional Infos*/}
            <section className="flex flex-col space-y-4">
                <div className="font-semibold text-xl">
                    <p>Topics</p>
                    <div className="bg-white rounded-lg p-3 text-lg font-medium flex flex-wrap gap-2 mt-2">
                        {problem.topics.map((topic, index) => (
                            <span key={index} className="bg-gray-200 rounded px-2 py-1">
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="font-semibold">Time Complexity</p>
                    <div className="bg-white rounded-lg p-3 text-lg font-medium mt-1">
                        {problem.time_complexity}
                    </div>
                </div>
                <div>
                    <p className="font-semibold">Space Complexity</p>
                    <div className="bg-white rounded-lg p-3 text-lg font-medium mt-1">
                        {problem.space_complexity}
                    </div>
                </div>
                
                <a
                    href={problem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium underline hover:text-blue-800"
                >
                    Problem Link
                </a>

                <div className="flex flex-col space-y-2">
                    <label className="text-lg font-semibold">
                        How do you feel? <span>{difficulty}</span>
                    </label>
                    <div className="flex items-center gap-2">
                        <span>Hard</span>
                        <input
                            type="range"
                            min={0}
                            max="100"
                            value={difficulty}
                            className="range flex-1"
                            step="25"
                            onChange={(e) => setDifficulty(Number(e.target.value))}
                        />
                        <span>Easy</span>
                    </div>
                    <div className="flex justify-between px-2 text-xs">
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default DefaultAnalysis