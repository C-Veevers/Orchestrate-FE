import "../Styling/Login.css";
import "../Styling/animate.css"
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { login, getUserByUsername } from "../Utils/api";
import { UserContext } from "../Contexts/User";
import { Header } from "./Header";



export function Login() {
  const { setUser, setLoggedIn } = useContext(UserContext)
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [username, setUsername] = useState("")
  const [status, setStatus] = useState('')
  const [errorClass, setErrorClass] = useState('uk-margin-bottom')

  const navigate = useNavigate()

  const handleChangeUser = (event) => {
    setUsernameInput(event.target.value)
  };

  const handleChangePass = (event) => {
    setPasswordInput(event.target.value)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorClass("")
    login(usernameInput, passwordInput).then(res => {
      setUsername(usernameInput)
      setStatus(res)
    })
  };
  useEffect(() => {
    if (status === "Success") {
      getUserByUsername(username).then(res => {
        setUser(res)
        setLoggedIn(true)
        navigate('/home')
      })
    } else if (status === "Failed") {
      setErrorClass("animated shake")
    }
  }, [navigate, status, setLoggedIn, setUser, username])



  return (
    <>
      <Header />
      <div className="login-main">
        <form onSubmit={handleSubmit}>
          <div className="login-instruction-text">
            <p>Please enter your username and password</p>
          </div>
          <div className="uk-inline">
            <span className="uk-form-icon" uk-icon="icon: user"></span>
            <input onChange={handleChangeUser} type="text" required></input>
          </div>
          <div className="uk-inline">
            <span className="uk-form-icon" uk-icon="icon: lock"></span>
            <input onChange={handleChangePass} type="password" required></input>
          </div>
          <div className="button-cont">
            <button className={`${errorClass} uk-margin-bottom`} type="submit">Login</button>
          </div>
          {
            (status === "Failed")
              ? <p className="error">Username or password incorrect</p>
              : null
          }
          <div><p>Don't have an account?</p>
            <p><a href="/register">Register</a> now, it's quick and easy to get started!</p></div>
        </form >


      </div >
    </>
  );
}
