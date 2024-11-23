'use client'

import { redirect } from "next/navigation";
import { auth } from "../firebase";
import { getGoogleProvider, loginWithProvider } from "./firebase";

const LoginPage = () => {

  async function handleLogin() {
    const provider = getGoogleProvider(auth);
    await loginWithProvider(auth, provider);
    redirect('/');
  }
  return (
    <div>
        <button onClick={handleLogin}>LoginWithGoogle</button>
    </div>
  )
}

export default LoginPage