import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { userContext } from "./App";
import {useNavigate } from "react-router-dom";
const API_BASE = "https://mern-noted-app.herokuapp.com"
const API_LOCAL_BASE = "http://localhost:4000"
function NotedApp() {
  const navigate = useNavigate();
  const {userInfo, setUserInfo, userID, setUserID} = useContext(userContext);
  const [note, setNote] = useState([]);
  
////////////////////////////////////////////////Connecting to backend////////////////////////////////////////////////////////////  

  useEffect(() => {     //FIGURED A WAY TO USE THE UPDATED STATE FOR userID, used "prev" instead
    setUserID( prevUserID => {
      fetch(API_BASE + `/notes/${prevUserID}`)
      .then((res) => res.json())
      .then((data) => {setNote(data)})
      .catch((err) => console.error("Error: ", err))
        if(!prevUserID){
          navigate("/")
        }
        
      return prevUserID
    })
  }, [userID])

  async function deleteNote(id){
    const data = await fetch(API_BASE + `/note/delete/${id}/${userID}`, {method:"DELETE"})
    .then(res => res.json());
    setNote(data)

  }
  async function createNote(titleText, contentText){
    
    const data = await fetch(API_BASE + `/note/${userID}`, {
      method:"POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        title: titleText,
        content: contentText
  })})
    .then(res => res.json());
    setNote((prev) => {
      return [
        ...prev,
        data
      ];
    });

  }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 


  return (

    <div className="noted-app">
    <Header logout = {<p>Logout</p>}/>   
    <h1 className="welcome">Welcome{userInfo}</h1>
      <CreateArea addNote={createNote}  />
      {note.map((item, index) => {
        return (
          <Note
            key={index}
            id={item._id}
            title={item.title}
            content={item.content}
            removeItem={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default NotedApp;
