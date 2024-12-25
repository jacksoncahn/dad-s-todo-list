import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHXKsPiULQiLnTruqh9F2Pqh1G6OzUHCA",
  authDomain: "dad-final-todolist.firebaseapp.com",
  projectId: "dad-final-todolist",
  storageBucket: "dad-final-todolist.appspot.com",
  messagingSenderId: "585709773964",
  appId: "1:585709773964:web:eb6f041e594369c5a9c7a9"
};

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore(app)