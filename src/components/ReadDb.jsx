import { useState, useEffect } from "react";
import { useAuthentication } from "../services/authService";
import {read} from "../services/dbService"
import {getAuth} from "firebase/auth"
import {auth} from "./firebaseConfig.js"
import {deleteTodo} from"../services/dbService.js"

export function DisplayTodos() {
    async function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function Delete(id) {
        await delay(1000)
        await deleteTodo(id)
    }
    const [data, setData] = useState(null)
    const user = auth.currentUser
    useEffect(() => {
        const interval = setInterval(async () => {
            const user = auth.currentUser
            if (user) {
                const fetchData  = await read()
                setData(fetchData)
                if (data) {
                    setData(data.sort((a,b) => b.complete_by - a.complete_by))
                }
            }
        }, 1000)
      }, []);
    return (
        <ul className="todolist">
            {data && user? data.map(todo => (
                <div className="tasks" key={todo.id}>
                    {/* {todo.overdue? <p style={{color: 'red'}}>Overdue</p>: null} */}
                    <p>{todo.task}</p>
                    <p className="duedate">Complete by: {todo.complete_by.toDate().toLocaleString()}</p>
                    <button className="deletebutton" onClick={() => Delete(todo.id)}>done</button>
                </div>
            )):<p className="nodata">No user data</p>}
        </ul>
    )
}