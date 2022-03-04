import "../Styling/Messages.css"
import io from 'socket.io-client'
import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/User";
import { Header } from "../Components/Header"
const EP = 'http://localhost:9090'
let socket,


export const Messages = () => {
   const navigate = useNavigate()
   const { loggedUser, isLoggedIn } = useContext(UserContext)
   useEffect(() => {
      if (isLoggedIn) {
         socket = io(EP)
         socket.emit("setup", loggedUser)
      } else {
         navigate('/login')
      }
   })
   return <>
      <Header />
      <ul id="messages"></ul>
      <form id="form" action="">
         <input id="input" autocomplete="off" />
         <button>Send</button>
      </form>
   </>

}