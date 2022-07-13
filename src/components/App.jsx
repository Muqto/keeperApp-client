import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
const API_BASE = "https://mern-noted-app.herokuapp.com/"
function App() {
  const [note, setNote] = useState([]);
////////////////////////////////////////////////Connecting to backend////////////////////////////////////////////////////////////  
  useEffect(() => {
    fetch(API_BASE + "/notes")
    .then((res) => res.json())
    .then((data) => {setNote(data)})
    .catch((err) => console.error("Error: ", err));
    
  }, [])

  async function deleteNote(id){
    const data = await fetch(API_BASE + `/note/delete/${id}`, {method:"DELETE"})
    .then(res => res.json());
    setNote(() => {
      return note.filter((item) => {
            return item._id !== data._id
      })
    })

  }
  async function createNote(titleText, contentText){
    
    const data = await fetch(API_BASE + "/note", {
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

  // function addNote(titleText, contentText) {
  //   setNote((prev) => {
  //     return [
  //       ...prev,
  //       {
  //         title: titleText,
  //         content: contentText
  //       }
  //     ];
  //   });
  // }
  // function removeNote(id) {
  //   setNote(
  //     note.filter((item, index) => {
  //       return index !== id;
  //     })
  //   );
  // }

  return (
    <div>
      <Header />
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

export default App;
