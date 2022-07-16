import React, {createContext, useState} from 'react'
import NotedApp from './NotedApp'
import Register from './Register'
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom"
import Login from './Login';
import Header from './Header';
export const userContext = createContext();
export default function App() {
  const [userInfo, setUserInfo] = useState(null)
  const [userID,  setUserID] = useState("");
  return (
    
    <userContext.Provider value = {{userInfo, setUserInfo, userID, setUserID}}>
    
    
    <Router>
        <Routes>
          
          <Route path = "/notes" exact element = {<NotedApp/> } /> 
           <Route path='/' exact element = {<Register />} />
           <Route path='/login' exact element = {<Login />} />

        </Routes>
    </Router>
    
    </userContext.Provider>
    
  )
}
