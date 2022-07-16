import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
function CreateArea(props) {
  const [valid, setValid] = useState(true);
  const [inputText, setInputText] = useState("");
  const [textAreaText, setTextAreaText] = useState("");
  function handleChange(e) {
    var { value, name } = e.target;
    if (name === "title") {
      setInputText(value);
    } else if (name === "content") {
      setTextAreaText(value);
    }
  }
  return (
    <div>
      <form
        className = "note-text-form"
        onSubmit={(e) => {
          e.preventDefault();
          
          if (inputText === "" || textAreaText === "") {
              setValid(false)
              
          } else {
            setValid(true)
            props.addNote(inputText, textAreaText);
            setInputText("");
            setTextAreaText("");
          }
        }}
      >
        {valid ? null : <p style={{color:"red"}}>Please enter a valid note.</p>}
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={inputText}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows="3"
          onChange={handleChange}
          value={textAreaText}
        />
        <button type="submit">
          <AddIcon />
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
