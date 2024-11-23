"use client"

import { useAuth } from '@/app/auth/AuthContext';
import { logout } from '@/app/login/firebase';
import Link from 'next/link'

const Navbar = () => {
  const { user } = useAuth();
  console.log(user)

  return (
    <header className='px-5 py-3 bg-white shadow-sm'>
      <nav className='flex justify-between items-center'>
        <Link href='/' className="text-xl font-bold">
            Leetcode Buddy
        </Link>

        <div className='flex items-center gap-5'>
          {user ? (
            <>
              <span>{user?.displayName}</span>
              <button onClick={logout}>Sign out</button>
            </>
          ) : (
            <Link href='/login'>Sign in</Link>
          )}
            <Link href='/problem'>Problems</Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar