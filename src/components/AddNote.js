import React, { useContext,useState } from 'react';
import noteContext from '../context/notes/NoteContext';

function AddNote() {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setnote] = useState({title:"",description:""});

    const handleClick = (e) => {
        e.preventDefault(); 
        addNote(note.title,note.description); 
    }
    const onChange = (e) => {
        setnote({...note, [e.target.name]:e.target.value})
    }

    return (

        <div>
            <h2>Add Notes</h2>
            <form>
                <div className="my-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp"
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-dark" onClick={handleClick}>Add</button>
            </form>
            <hr />
        </div>
    );
}

export default AddNote;
