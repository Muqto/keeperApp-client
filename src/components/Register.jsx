
import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { userContext } from './App';
import { Link } from 'react-router-dom';
import Header from './Header';
const API_BASE = "https://mern-noted-app.herokuapp.com"
const API_LOCAL_BASE = "http://localhost:4000"

export default function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isError, setIsError] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const navigate = useNavigate();
    const {userInfo, setUserInfo, userID, setUserID} = useContext(userContext)
  return (
    <>
    <Header/>
    <div className='register'>
        
        <div className='login-register-header'>
            <h1>Register</h1>
            <p className='heads-up'>(might take a few seconds to register/login)</p>
            {isValid ? null : <h4 style ={{color: "red"}}>Please choose a valid username and password</h4>}
            {isError ? <h4 style ={{color: "red"}}>Username already taken</h4> : null}
        </div>
        <form className='register-form' onSubmit={ async (e) => {
            e.preventDefault();
            const data = await fetch(API_BASE + "/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({username,password})
        }).then((res) => {
            if (!res.ok){
                setIsError(true)
                return null;
            }
            else{
                setIsError(false)  
                return res.json()

                
            }
        }).catch(err => console.error("error is" + err)) 
        if(username && password && data!==null){
            setIsValid(true)
            setUserInfo(", " + data.username)
            setUserID(data._id)
            navigate("/notes")  
        }
        else{
            setIsValid(false)
        }
            
        }
        }>
            
            
            <input onChange={ (e) => (setUsername(e.target.value))} placeholder='Username' type= 'text' />
            <input onChange={ (e) => (setPassword(e.target.value))} placeholder='Password' type= 'password' />
            <button type = 'submit'>Register</button>
            
        </form>   
        <Link className='login-link' to="/login">Login</Link> 
        
    </div>
    </>
  )
}
