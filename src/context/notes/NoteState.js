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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwODMxYmUxODhlMWRkMDZmNzBjMWQ1In0sImlhdCI6MTY3ODI1ODYyMn0.O7dZYaY385s_GVECjq74NanJZgvg_sl24JPrvybyyCA"
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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwODMxYmUxODhlMWRkMDZmNzBjMWQ1In0sImlhdCI6MTY3ODI1ODYyMn0.O7dZYaY385s_GVECjq74NanJZgvg_sl24JPrvybyyCA"
      },
      body: JSON.stringify({title,description}), 
    });

    let note = {
      "_id": "64087888846b058a582b5226",
      "user": "640831be188e1dd06f70c1d5",
      "title": title,
      "description": description,
      "date": "2023-03-08T11:59:04.709Z",
      "__v": 0
    }

    setNotes(notes.concat(note));
  }

  // Function to Delete Note 
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/notes/deleteNote/${id}`, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwODMxYmUxODhlMWRkMDZmNzBjMWQ1In0sImlhdCI6MTY3ODI1ODYyMn0.O7dZYaY385s_GVECjq74NanJZgvg_sl24JPrvybyyCA"
      },
    });

    const json = await response.json();
    console.log(json); 

    console.log("Deleting note : " + id);
    let newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote);
  }

  // Function to Edit Note
  const editNote = async (id, title, description) => {

    // API CALL
    const response = await fetch(`${host}/notes/updateNote/${id}`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwODMxYmUxODhlMWRkMDZmNzBjMWQ1In0sImlhdCI6MTY3ODI1ODYyMn0.O7dZYaY385s_GVECjq74NanJZgvg_sl24JPrvybyyCA"
      },
      body: JSON.stringify({title,description}), 
    });

    for (let i = 0; i < notes.length(); i++) {
      if (notes[i]._id === id) {
        notes[i].title = title;
        notes[i].description = description;
      }
    }
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState; 