import "../Styling/Messages.css"
import io from 'socket.io-client'
import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/User";
const EP = 'http://localhost:9090'
let socket, selected


export const Messages = () => {
   const navigate = useNavigate()
   const { loggedUser, isLoggedIn } = useContext(UserContext)
   const [socketCon, setSocketCon] = useState(false)
   useEffect(() => {
      if (isLoggedIn) {
         socket = io(EP)
         socket.emit("setup", loggedUser)
         console.log(loggedUser._id)
         socket.on("connection", () => setSocketCon(true))
      } else {
         navigate('/login')
      }
   })
   return <>
      <ul id="messages"></ul>
      <form id="form" action="">
         <input id="input" autocomplete="off" />
         <button>Send</button>
      </form>
   </>

}