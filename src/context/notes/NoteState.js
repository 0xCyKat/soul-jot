import NoteContext from "./NoteContext";
// import { useState } from "react";
const NoteState = (props) => {

    return (
        <NoteContext.Provider>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState; 