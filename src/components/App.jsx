import { useState } from 'react'
import { SignIn, SignOut, SignUp } from './Auth.jsx'
import { getAuth } from 'firebase/auth'
import './App.css'
import { useAuthentication } from '../services/authService.js'
import { AddTodo } from "./AddTodo.jsx"
import { DisplayTodos } from './ReadDb.jsx'

function App() {
  const user = useAuthentication()
  // console.log(user)
  return (
    <>
      <header className="signinout">
        {user ? 
              <SignOut />: 
              <div className="reglogin"><SignIn /> <p></p>
          <SignUp /></div>
         }
      </header>
      {user? <AddTodo /> : null}
      <DisplayTodos />
    </>
  )
}

export default App
