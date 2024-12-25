import { login, logout, loggedInUserDisplayName, register } from "../services/authService"
import {useState} from "react"



export function SignIn() {
  const [visible2, setVisible2] = useState(false);
  const  [email2, setEmail2] = useState("");
  const [password2, setPassword2] = useState("");
  function Email2(e) {
    e.preventDefault()
    setEmail2(String(e.target.value))
  }
  function Password2(e) {
    e.preventDefault()
    setPassword2(String(e.target.value))
  }
  async function submit(e) {
    e.preventDefault()
    // console.log("submit attempted")
    if (!email2 || !password2) {
      console.log("Invalid email or password");
      return;
    }
    try {
      await login(email2, password2);
      // setEmail2("")
      // setPassword2("")
    } catch (error) {
      console.error("Sign in failed:", error.message);
    }
  }

  async function showLogin() {
    setVisible2(!visible2);
    // console.log("visibility set")
  }
  
  return (
    <div className="login">
      <button type="button"onClick={showLogin}>Login</button>
      <p></p>
        <form onSubmit={submit} style={{ visibility: visible2 ? "visible" : "hidden" }}>
          <input type="email" name="emailInput" onChange={Email2} autoComplete="email"/>
          <p></p>
          <input type="password" name="passwordInput" onChange={Password2} autoComplete="current-password"/>
          <p></p>
          <button onClick={submit}>submit</button>
      </form>
    </div>
  )
}

export function SignUp() {
  const [visible, setVisible] = useState(false);
  const  [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function Email(e) {
    // e.preventDefault()
    setEmail(String(e.target.value))
  }
  function Password(e) {
    // e.preventDefault()
    setPassword(String(e.target.value))
  }
  async function submit(e) {
    e.preventDefault()
    if (!email || !password) {
      console.log("Invalid email or password");
      return;
    }
    try {
      await register(email, password);
      setEmail("")
      setPassword("")
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  }

  async function showSignUp() {
    setVisible(!visible);
    // console.log("visibility set")
  }
  
  return (
    <div className="register">
      <button onClick={showSignUp}>Register</button>
      <p></p>
      <form style={{ visibility: visible ? "visible" : "hidden" }}>
        <input type="email2" name="emailInput2" onChange={Email} />
        <p></p>
        <input type="password2" name="passwordInput2" onChange={Password} />
        <p></p>
        <button onClick={submit}>Sign Up</button>
      </form>
    </div>
  )
}

export function SignOut() {

  return (
    <div className="signout">
     <button onClick={logout}>Sign Out</button>
    </div>
  )
}

