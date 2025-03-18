// src/api/firebaseApi.ts
import axios from 'axios';
import { getIdToken } from 'firebase/auth';
import { auth } from '@/firebase'; // путь к твоей настройке Firebase

const firebaseApi = axios.create({
    baseURL: 'https://firestore.googleapis.com/v1/projects/YOUR_PROJECT_ID/databases/(default)/documents',
});

firebaseApi.interceptors.request.use(async (config) => {
    const user = auth.currentUser;
    if (user) {
        const token = await getIdToken(user);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default firebaseApi;
