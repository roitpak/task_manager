import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { TASKS_COLLECTION, Task, USERS_COLLECTION, USERS_ID_KEY, User } from "./types";
import * as SecureStore from 'expo-secure-store';
import firebase from 'firebase/app';

/**
 * @deprecated Ignore this file
 */

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: "simple-task-manger.firebaseapp.com",
    projectId: "simple-task-manger",
    storageBucket: "simple-task-manger.appspot.com",
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};

export class MyFireStore {

    db;
    constructor() {
        const app = initializeApp(firebaseConfig);
        this.db = getFirestore(app);
    }

    async createUser() {
        const date = new Date(); //current date used as ID
        try {
            const data = await addDoc(collection(this.db, USERS_COLLECTION), { creationDate: date.toString().toString() });
            await SecureStore.setItemAsync(USERS_ID_KEY, data.id);
            const userDoc = doc(this.db, USERS_COLLECTION, data.id);
            this.addSubTaskCollection(userDoc)

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async addSubTaskCollection(userDoc: any) {
        const subCollectionRef = collection(userDoc, TASKS_COLLECTION);
        await addDoc(subCollectionRef, {
            title: "",
            description: "",
            status: 1,
        });
    }

    async getTasks() {
        const userId = await SecureStore.getItemAsync(USERS_ID_KEY);
        if (userId) {
            const docRef = doc(this.db, USERS_COLLECTION, userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const subCollectionRef = collection(docRef, TASKS_COLLECTION);
                const querySnapshot = await getDocs(subCollectionRef);
                const documents = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                return documents;
            }
        } else {
            return false;
        }
    }

    async updateTask(taskId: string, updatedData: Partial<Task>) {
        const userId = await SecureStore.getItemAsync(USERS_ID_KEY);

        if (userId) {
            const userDocRef = doc(this.db, USERS_COLLECTION, userId);
            const taskDocRef = doc(userDocRef, TASKS_COLLECTION, taskId);

            try {
                await updateDoc(taskDocRef, updatedData);
                console.log("Task updated successfully");
            } catch (error) {
                console.error("Error updating task: ", error);
            }
        }

    }
}

const myDatabase = new MyFireStore();
export default myDatabase;