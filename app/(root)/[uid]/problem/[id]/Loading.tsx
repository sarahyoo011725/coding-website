import React from 'react'

const Loading = () => {
  return (
    <div className="flex w-full flex-col gap-4">
        <div className="skeleton h-2/3 w-full"></div>
        <div className="skeleton h-12 w-full"></div>
        <div className="skeleton h-12 w-full"></div>
    </div>
  )
}

export default Loading