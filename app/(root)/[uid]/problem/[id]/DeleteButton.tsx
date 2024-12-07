'use client'

import { redirect } from "next/navigation";

async function deleteProblem(uid: string, id: string): Promise<void> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_ORIGIN}/api/${uid}/problem/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      throw new Error(`Failed to delete problem: ${res.statusText}`);
    }
    redirect(`/${uid}/problem`)
 }

const DeleteButton = ({ uid, id } : { uid: string, id: string }) => {
  return (
    <button 
        className='btn bg-red-500 text-white px-6 hover:bg-red-700'
        onClick={() => deleteProblem(uid, id)}
    >
        Delete Problem
  </button>
  )
}

export default DeleteButton