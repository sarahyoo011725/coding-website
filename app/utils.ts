import { FirestoreDataConverter, DocumentData, QueryDocumentSnapshot, doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "./firebase";

export const converter = <T>() : FirestoreDataConverter<T> => ({
    toFirestore: (data: T) => data as DocumentData,  
    fromFirestore: (snap: QueryDocumentSnapshot): T => snap.data() as T  
})

export const data = async <T>(collectionPath: string, id: string): Promise<T> => {
   const docRef = doc(db, collectionPath, id).withConverter(converter<T>());
    const docSnapshot = await getDoc(docRef);
   if (docSnapshot.exists()) {
        return docSnapshot.data() as T;
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