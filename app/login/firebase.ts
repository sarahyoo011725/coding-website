import { auth } from "@/app/firebase";
import { 
    Auth,
    AuthProvider,
    browserPopupRedirectResolver, 
    GoogleAuthProvider, 
    useDeviceLanguage as setDeviceLanguage, 
    signInWithPopup, 
    signOut
} from "firebase/auth";

export const logout = async (): Promise<void> => {
  await signOut(auth);
  await fetch('/api/logout');
}

export const getGoogleProvider = (auth: Auth) => {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    setDeviceLanguage(auth);
    provider.setCustomParameters({
      display: 'popup',
      prompt: 'select_account'
    });
  
    return provider;
  };

  export const loginWithProvider = async (
    auth: Auth,
    provider: AuthProvider
  ): Promise<void> => {
    const credential = await signInWithPopup(
      auth,
      provider,
      browserPopupRedirectResolver
    );
    const idToken = await credential.user.getIdToken();
    await fetch('/api/login', {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    });
  };