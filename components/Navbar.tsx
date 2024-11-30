"use client"

import { useAuth } from '@/app/auth/AuthContext';
import { logout } from '@/app/login/firebase';
import Link from 'next/link'
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { user } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push('/login');
  }

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
              <button onClick={handleLogout}>Sign out</button>
              <Link href={`/${user.uid}/problem`}>Problems</Link>
            </>
          ) : (
            <Link href='/login'>Sign in</Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar