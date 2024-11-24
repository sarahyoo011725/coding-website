'use client'

import Head from "next/head";
import { auth } from "../firebase";
import { getGoogleProvider, loginWithProvider } from "./firebase";
import { redirect } from "next/navigation";

const LoginPage = () => {
  
  async function handleGoogleSignIn() {
    const provider = getGoogleProvider(auth);
    await loginWithProvider(auth, provider);
    redirect('/');
  }

 return (
  <>
    <Head>
      <title>Login</title>
    </Head>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 sm:bg-gradient-to-bl">
      <div className="w-11/12 max-w-md bg-white shadow-lg rounded-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-4">
          Sign In
        </h1>
        <p className="text-sm sm:text-base text-center text-gray-500 mb-6">
          Access your account using Google
        </p>
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition ease-in-out duration-300"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.25 0 5.925 1.2 8.125 3.175l6.075-6.075C34.35 3.2 29.525 1 24 1 14.7 1 7 7.2 4.075 15.125l7.05 5.45C12.625 14.675 17.725 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M48 24c0-1.675-.15-3.3-.425-4.875H24v9.275h13.675c-.6 3.275-2.325 6.025-4.925 7.9l7.55 5.85C45.175 37.1 48 31.075 48 24z"
            />
            <path
              fill="#FBBC05"
              d="M10.825 28.325A14.4 14.4 0 0 1 9.5 24c0-1.5.25-2.975.725-4.325l-7.05-5.45C1.4 17.6 0 20.65 0 24c0 3.35 1.4 6.4 3.875 8.775l6.95-5.45z"
            />
            <path
              fill="#4285F4"
              d="M24 48c6.5 0 11.95-2.125 15.925-5.825l-7.55-5.85c-2.15 1.5-4.9 2.375-8.375 2.375-6.3 0-11.6-4.125-13.5-9.925l-7.05 5.45C7.025 42.8 14.7 48 24 48z"
            />
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  </>
  );
}

export default LoginPage