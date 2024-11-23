import { clientConfig } from "@/config/client-config";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, inMemoryPersistence, setPersistence } from "firebase/auth";

const app = getApps().length ? getApp() : initializeApp(clientConfig);
const auth = getAuth(app);
setPersistence(auth, inMemoryPersistence);

export {app, auth};