'use client'

import { useAuth } from '@/app/auth/AuthContext';
import { model_json } from '@/app/gemini';
import { ProblemStatus } from '@/app/types';
import { getProblems, getTopics, getWeaknesses } from '@/app/utils'
import TaskItem from './TaskItem';
import { useState } from 'react';

export type Task = {
    title: string;
    link: string;
    topics: string[];
    completed: boolean;
}

async function generate_study_tasks(uid: string) {
    const [topics, problems_solved, weaknesses] = await Promise.all([
        getTopics(uid),
        getProblems(uid),
        getWeaknesses(uid)
    ]);

    const generate_review_tasks = `
        Based on the status of the problems solved, generate a to-do list for studying and reviewing these problems.
        For each problem, extract the title, link, and topics from the given JSON of problems

        Return the result in this JSON format:
        tasks = {
            'title': string,
            'link': string,
            'topics: string[],
            'completed': false
        }
        Return tasks;

        *Always make 'completed' false.

        Rank problems to review in this hiearchy:
        1st ${ProblemStatus.StillHard}
        2nd ${ProblemStatus.NeedsToReview}
        3rd ${ProblemStatus.JustReviewed}
        4th ${ProblemStatus.JustSolved}
        5th  ${ProblemStatus.EasyNow}

        Inputs:
        - problems solved:
        ${JSON.stringify(problems_solved)}
    `

    const generate_practice_tasks = `
        A student is studying Data Structures and Algorithms. 
        Based on the topics they have studied and their weaknesses, find coding problems that will help them improve. 
        The problems should be sourced from well-known coding platforms such as Leetcode, HackerRank, and others.

        Return results in this JSON format:
        tasks = {'title': string, 'link': string, 'topics': string[], 'completed': false}
        Return tasks;

        Rank the problems in the order from the least studied topics to the most studied topics
        
        Input1:
        - Topics studied: 
        ${topics}

        Input 2:
        - Weaknesses: 
        ${weaknesses}
    `;

    const [practicesResult, reviewsResult] = await Promise.all([
        model_json.generateContent(generate_practice_tasks),
        model_json.generateContent(generate_review_tasks)
    ])
    const practices =  JSON.parse(practicesResult.response.text());
    const reviews = JSON.parse(reviewsResult.response.text());

    return {practices, reviews}
}

const TodoList =  () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showTopics, setShowTopics] = useState(false);
    const [loading, setLoading] = useState(false);

    async function generate_tasks() {
        if(!user) return;
        setLoading(true);
        const { practices, reviews } = await generate_study_tasks(user.uid);
        console.log(reviews)
        setTasks([...reviews.tasks, ...practices.tasks]);
        setLoading(false);
    }

    const deleteTask = (index: number) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

  return (
    <>
        <section className='bg-white shadow-md rounded-lg p-6 w-full max-w-md'>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left">
                To-Do List
            </h1>
            {tasks.length > 0 ? (
                <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={generate_tasks}
                    className="text-sm px-4 py-2 sm:px-5 sm:py-2 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 transition-transform duration-300 shadow-lg transform hover:scale-105"
                >
                    Re-generate Study Plans
                </button>
                <button
                    className={`text-sm px-4 py-2 sm:px-5 sm:py-2 rounded-lg font-medium transition-transform duration-300 shadow-lg transform hover:scale-105 ${
                    showTopics
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                    }`}
                    onClick={() => setShowTopics(!showTopics)}
                >
                    {showTopics ? "Hide Topics" : "Show Topics"}
                </button>
                </div>
            ) : (
                <button
                onClick={generate_tasks}
                className="text-sm px-4 py-2 sm:px-5 sm:py-2 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 transition-transform duration-300 shadow-lg transform hover:scale-105"
                >
                Generate Study Plans
                </button>
            )}
            </div>
            
            {loading ? (
                <span className="loading loading-spinner loading-lg"></span>
            ) : (
                <ul className="space-y-3">
                    {tasks.map((task, i) => (
                    <TaskItem 
                        key={i}
                        index={i}
                        task={task}
                        showTopics={showTopics}
                        deleteTask={deleteTask}
                    />
                    ))}
                </ul>
            )}
        </section>
    </>
  )
}

export default TodoList
