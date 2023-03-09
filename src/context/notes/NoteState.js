import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
    const s1 = {
        "name":"Srinivas",
        "class":"Btech"
    } 
    const [state, setstate] = useState(s1); 

    const update = () => {
        setTimeout(() => {
            setstate({
                "name":"SAI SRINIVAS",
                "class":"Btech"
            } )
        }, 3000);
    }
    return (
        <NoteContext.Provider value = {{state,update}}>
           {props.children} 
        </NoteContext.Provider>
    )
}

export default NoteState; 