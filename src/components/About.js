import noteContext from "../context/notes/NoteContext";
import React, {useContext, useEffect} from 'react';

function About() {
  const a = useContext(noteContext); 
  
  useEffect(() => {
    a.update();
  },);

  return (
    <div>
      <h1>About {a.state.name} of class {a.state.class}</h1>
    </div>
  );
}

export default About;
