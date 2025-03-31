import {collection, getDocs, query, where, addDoc, getDoc, doc, updateDoc, deleteDoc} from "firebase/firestore";
import {db} from "@/firebase"; // твоя инициализация Firestore

// Получение данных с фильтрацией по uuid и другим полям
export const getFirebaseData = async (collectionName: string, filters: Record<string, any>) => {
    if (filters.id) {
        const docRef = doc(db, collectionName, filters.id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? [{id: docSnap.id, ...docSnap.data()}] : [];
    }

    const q = query(
        collection(db, collectionName),
        ...Object.entries(filters).map(([key, value]) => where(key, "==", value))
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
};

// Добавление документа
export const addFirebaseData = async (collectionName: string, data: Record<string, any>) => {
    const docRef = await addDoc(collection(db, collectionName), data);
    return {id: docRef.id, ...data};
};

// Обновление документа
export const updateFirebaseData = async (collectionName: string, docId: string, data: Record<string, any>) => {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
    return {id: docRef.id, ...data};
};

// Удаление документа
export const deleteFirebaseData = async (collectionName: string, docId: string) => {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
};
