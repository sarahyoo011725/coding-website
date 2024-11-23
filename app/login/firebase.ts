import { auth } from "@/app/firebase";
import { 
    Auth,
    AuthProvider,
    browserPopupRedirectResolver, 
    GoogleAuthProvider, 
    useDeviceLanguage as setDeviceLanguage, 
    signInWithPopup, 
    signOut, 
    UserCredential 
} from "firebase/auth";

export const logout = async (): Promise<void> => {
    return signOut(auth);
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
  ): Promise<UserCredential> => {
    const result = await signInWithPopup(
      auth,
      provider,
      browserPopupRedirectResolver
    );
    console.log(result)
  
    return result;
  };

