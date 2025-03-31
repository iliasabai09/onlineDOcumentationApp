import {openDB} from 'idb';

const DB_NAME = 'myDatabase';
const STORE_NAME = 'documents';
const DB_VERSION = 1;

const initDB = async () => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, {keyPath: 'id', autoIncrement: true});
            }
        },
    });
};

export const addIndexedDocument = async (category: any) => {
    const db = await initDB();
    return db.add(STORE_NAME, category);
};

export const putIndexedDocument = async (category: any) => {
    const db = await initDB();
    return db.put(STORE_NAME, category);
};

export const getIndexedDocuments = async () => {
    const db = await initDB();
    return db.getAll(STORE_NAME);
};

export const deleteIndexedDocument = async (id: number) => {
    const db = await initDB();
    return db.delete(STORE_NAME, id);
};
