'use client'

import { auth } from "../firebase";
import { getGoogleProvider, loginWithProvider } from "./firebase";

const LoginPage = () => {

  async function handleLogin() {
    const provider = getGoogleProvider(auth);
    await loginWithProvider(auth, provider);
  }

  return (
    <div>
        <button onClick={handleLogin}>LoginWithGoogle</button>
    </div>
  )
}

export default LoginPage