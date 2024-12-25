import { useState, useEffect } from "react"
import { getAuth } from "firebase/auth"
import {write} from "../services/dbService.js"

//HANDLE TIMESTAMP ERROR FOR IMPOSSIBLE DATES

export function AddTodo() {

    const years = Array.from({ length: 2051 - 2000 }, (v, i) => i + 2000);
    years.unshift("please select a year")
    const months = Array.from({ length: 12}, (v, i) => i+1);
    months.unshift("please select a month")
    const days = Array.from({ length: 31}, (v, i) => i+1);
    days.unshift("please select a date")

    const times = [];

    for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
        const clock = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        times.push(clock);
    }
    }
    times.unshift("please select a time")

    // const AmPm = ["AM", "PM"]

    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [time, setTime] = useState("");
    // const [ampm, setAmpm] = useState("");

    const [task, setTask] = useState("");
    const [overdue, setOverdue] = useState(false)


    async function writeTodo(year, month, day, time, overdue) {
        function createTimestamp(year, month, day, time) {
            if (!year || !month || !day) {
                console.error("Missing values for timestamp creation.");
                return null;
              }
              // console.log(time)
              // Extract hours and minutes from the time string
              const [hours, minutes] = time.split(":").map(Number);
            
              // Create a Date object
              const date = new Date(year, month - 1, day, hours, minutes);
      
              if (isNaN(date.getTime())) {
                console.error("Invalid date created.");
                return null;
              }
            //   (dateconsole.log);
              return date;
        }
        const date = createTimestamp(year, month, day, time)
        const now = new Date()
        console.log(typeof(date), typeof(now))
        if (now.getTime() > date.getTime()) {
            console.log(date.getTime())
            setOverdue(true)
        }
        write(task, date, now, overdue)
      }

    return (
        <div className = "addtodo">
            <textarea className="addtask" placeholder="write task here..." onChange={(e) => setTask(e.target.value)}></textarea>
            <select onChange={(e) => setYear(e.target.value)}>
                {years.map((year) => (
                    <option key={year} value={year}>
                    {year}
                    </option>
                ))}
            </select>
            <select onChange={(e) => setMonth(e.target.value)}>
                {months.map((year) => (
                        <option key={year} value={year}>
                        {year}
                        </option>
                    ))}
            </select>
            <select onChange={(e) => setDay(e.target.value)}>
                {days.map((year) => (
                        <option key={year} value={year}>
                        {year}
                        </option>
                    ))}
            </select>
            <select  onChange={(e) => setTime(e.target.value)}>
                {times.map((year) => (
                        <option key={year} value={year}>
                        {year}
                        </option>
                    ))}
            </select>
            <button className="addtodobutton" onClick={() => writeTodo(year, month, day, time, overdue)}>Add Todo</button>
        </div>
    )
}