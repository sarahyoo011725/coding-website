'use client' 
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="h-full flex items-center justify-center bg-slate-200">
        <div className="text-center text-red-500">
            Failed to load problem data. 
        </div>
        <button onClick={()=>reset()}
        > 
            Try again
        </button>
    </div>
  )
}