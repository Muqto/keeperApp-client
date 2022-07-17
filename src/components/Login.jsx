import React, {useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from './App'
import Header from './Header'
const API_BASE = "https://mern-noted-app.herokuapp.com"
const API_LOCAL_BASE = "http://localhost:4000"
export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate();
  const {userInfo, setUserInfo, userID, setUserID} = useContext(userContext)
  return (
    <>
    <Header/>
    <div className='register'>
    
    <div className='login-register-header'>
      <h1>Login</h1>
      {isError ? <h4 className='error-msg' style={{color: "red"}}>username or password invalid</h4> : null}
    </div>
    
    <form className='register-form' onSubmit={ async (e) => {
        e.preventDefault();

        const data = await fetch(API_BASE + "/login", {
          method: 'POST',
          headers: {
                'Content-Type': 'application/json'
              },
          body: JSON.stringify({username,password})
        })
        .then(res => {
          if(!res.ok){
            setIsError(true)
            return null;
          }
          else{
            setIsError(false)
            navigate("/notes")
            return res.json()
          }
          
        })
        if(data!==null){
          setUserID(data._id)
          setUserInfo(" back, " + data.username)
        }
          
        
        
        
        
        
    }}>
        
        <input onChange={ e => setUsername(e.target.value)} placeholder='Username' type= 'text' />
        <input onChange={ e => setPassword(e.target.value)} placeholder='Password' type= 'password' />
        <button type = 'submit'>Login</button>
        <Link  className='login-link' to="/">Register</Link> 
        
    </form> 
    </div>
    </>
  )
}
