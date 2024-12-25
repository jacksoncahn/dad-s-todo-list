import { useState, useEffect } from "react"
// import { signInWithPopup, GoogleAuthProvider, signOut, signInWithRedirect } from "firebase/auth"
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { auth } from "../components/firebaseConfig"

export async function register(email, password) {
  await createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  // console.log('login started')
  return signInWithEmailAndPassword(auth, email, password);
}

// export const login = async () => {
//   const provider = new GoogleAuthProvider();
//   provider.setCustomParameters({ prompt: 'select_account' });

//   try {
//     const result = await signInWithPopup(auth, provider);
//     console.log("Signed in as:", result.user);
//   } catch (error) {
//     console.error("Sign-in error:", error.message, error.code);
//   }
// };
  
// export const login = async () => {
//   const provider = new GoogleAuthProvider();
//   provider.setCustomParameters({ prompt: 'select_account' });
//   await signInWithRedirect(auth, provider);
// };

export function logout() {
  return signOut(auth)
}

export function loggedInUserDisplayName() {
  return auth.currentUser.displayName
}

export function useAuthentication() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null)
    })
  }, [])
  return user
}