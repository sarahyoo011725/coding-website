import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header className='px-5 py-3 bg-white shadow-sm'>
      <nav className='flex justify-between items-center'>
        <Link href='/' className="text-xl font-bold">
            Leetcode Buddy
        </Link>

        <div className='flex items-center gap-5'>
            <h1>login</h1>
            <Link href='/problem'>Problems</Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar