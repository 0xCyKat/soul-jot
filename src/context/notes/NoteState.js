import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "64087880846b058a582b5220",
          "user": "640831be188e1dd06f70c1d5",
          "title": "Note1",
          "description": "Hello I'm Note1",
          "date": "2023-03-08T11:58:56.496Z",
          "__v": 0
        },
        {
          "_id": "64087881846b058a582b5223",
          "user": "640831be188e1dd06f70c1d5",
          "title": "Note2",
          "description": "Hello I'm Note1",
          "date": "2023-03-08T11:58:57.212Z",
          "__v": 0
        },
        {
          "_id": "64087888846b058a582b5226",
          "user": "640831be188e1dd06f70c1d5",
          "title": "Note3",
          "description": "Hello I'm Note2",
          "date": "2023-03-08T11:59:04.709Z",
          "__v": 0
        }
      ]; 

      const [notes, setNotes] = useState(notesInitial);
    return (
        <NoteContext.Provider value = {{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState; 