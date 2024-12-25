// import OpenAIApi from "openai";
// import { apiKeyGPT } from "../firebase/firebaseConfig";
import { getFirestore, doc, getDocs, addDoc, collection, deleteDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthentication } from "./authService";
import {auth} from "../components/firebaseConfig.js"
import {useState} from "react"

const db = getFirestore();

export async function write(todo, dueDate, now, overdue) {
    const user = auth.currentUser
    if (user) {
        const userColRef = collection(db, "users", user.uid, "todos");
        await addDoc(userColRef, {
            task: todo,
            complete_by: dueDate,
            upload_time: now,
            overdue: overdue,
        });
    } else  {
        // console.log("no one logged in")
    }
    
}

export async function read() {
    const user = auth.currentUser;
    if (user) {
        const todosCollectionRef = collection(db, 'users', user.uid, 'todos');
        const querySnapshot = await getDocs(todosCollectionRef);
        if (!querySnapshot.empty) {
            // Map through the snapshot docs and return the data
            const todos = querySnapshot.docs.map(doc => ({
                id: doc.id, 
                ...doc.data()
        }));
            todos.sort((a,b) => a.complete_by - b.complete_by)
            return todos; // Return the array of todos
            
        }
    } else {
        console.log("Can't get data from no user")
        return null;
    }
}

export async function deleteTodo(docId) {
    const user = getAuth().currentUser
    const todoDocRef = doc(db, "users", user.uid, "todos", docId); // Replace "userId" with actual user ID
    try {
        await deleteDoc(todoDocRef); // Delete the document
        console.log("document deleted")
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
}