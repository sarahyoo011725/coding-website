'use client'

import { useState } from 'react';
import { Task } from './TodoList'
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';

interface Props {
    task: Task; 
    showTopics: boolean; 
    index: number;
    deleteTask: (taskId: number) => void; 
  }

const TaskItem = ({ task, showTopics, index, deleteTask } : Props ) => {
    const [completed, setCompleted] = useState(task.completed);

  return (
    <li
    className={`flex justify-between items-center p-3 border rounded-md ${
        completed ? "bg-green-100 line-through text-gray-500" : "bg-gray-50"
    }`}
    >
    <div className="flex flex-col flex-1">
        <a
        href={task.link}
        target="_blank"
        className={`text-lg ${task.completed ? "cursor-not-allowed" : ""}`}
        >
        {task.title}
        </a>
        {showTopics && task.topics.length > 0 && (
            <div className="text-sm text-gray-500 italic mt-2">
                {task.topics.map((topic, index) => (
                <span key={index} className="mr-2">{topic}</span>
                ))}
            </div>
        )}
    </div>
    <div className="flex gap-2">
        <button
        onClick={() => setCompleted(!completed)}
        className="text-sm text-green-500 hover:underline"
        >
        {completed ? <FaCheckSquare size={24}/> : <FaRegSquare size={24}/>}
        </button>
        <button
            onClick={() => deleteTask(index)}
            className="text-sm text-red-500 hover:underline"
        >
        Delete
        </button>
    </div>
    </li>
  )
}

export default TaskItem