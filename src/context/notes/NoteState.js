import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => { 
  const host = "http://localhost:5000"; 

  const [notes, setNotes] = useState([]);

  // get all notes
  const getNotes = async () => {
    // API CALL
    const response = await fetch(`${host}/notes/fetchAllNotes`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

    });
    const json = await response.json();
    setNotes(json); 
  }


  // Function to Add Note 
  const addNote = async (title, description) => {

    // API CALL
    const response = await fetch(`${host}/notes/addNote`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description}), 
    });

    let note = await response.json(); 

    setNotes(notes.concat(note));
  }

  // Function to Delete Note 
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/notes/deleteNote/${id}`, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });

    let newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote);
  }

  // Function to Edit Note
  const editNote = async (id, title, description) => {

    // API CALL
    const response = await fetch(`${host}/notes/updateNote/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description}), 
    });

    const newNotes = JSON.parse(JSON.stringify(notes))
    for (let i = 0; i < newNotes.length; i++) {
      if (newNotes[i]._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        break; 
      }
    } 
    setNotes(newNotes); 
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState; 