import { FirestoreDataConverter, DocumentData, QueryDocumentSnapshot, doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "./firebase";
import { Problem, Topic } from "./types";

export const converter = <T>() : FirestoreDataConverter<T> => ({
    toFirestore: (data: T) => data as DocumentData,  
    fromFirestore: (snap: QueryDocumentSnapshot): T => snap.data() as T  
})

export const data = async <T>(collectionPath: string, id: string): Promise<T> => {
   const docRef = doc(db, collectionPath, id).withConverter(converter<T>());
    const userDoc = await getDoc(docRef);
   if (userDoc.exists()) {
        return userDoc.data() as T;
   } else {
        throw new Error("Document does not exist");
   }
}

export const datas = async <T>(collectionPath: string) : Promise<(T & {id: string})[]> => {
    const querySnapshot = await getDocs(collection(db, collectionPath).withConverter(converter<T>()));
    return querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
    }));
}

export const getTopics = async(uid: string) : Promise<Topic[]> => {
    const res = await (await fetch(`/api/topics?uid=${uid}`)).json();
    return res.data as Topic[];
}

export const getProblems = async(uid: string) : Promise<Problem[]> => {
    const res = await (await fetch(`/api/${uid}/problem`)).json();
    return res.data as Problem[];
}

export const getWeaknesses = async(uid: string) : Promise<string[]> => {
    const res = await (await fetch(`/api/weakpoints?uid=${uid}`)).json();
    return res.data as string[];
}