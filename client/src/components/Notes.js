import React, { useContext, useEffect, useRef, useState } from 'react'   //useRef hook se aap kisi bhi ek element ko reference de sakte ho
import NoteItem from './NoteItem';
import AddNote from './AddNote'
import noteContext from '../context/notes/noteContext'
import { useHistory } from 'react-router';

const Notes = (props) => {

    let history = useHistory();
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const context = useContext(noteContext);   /// context API ka use

    const { notes, getAllNotes, editNote } = context;   // destructuring the context and pulling out notes and setnotes
    useEffect(() => {
        if(localStorage.getItem('token')){    // agar local storage null nahi hai matlab aapki login details ke corresponding authtoken mila hai to saare notes fetch karlo
            getAllNotes();
        }
        else{     // agar login credentials daalne par authtoken nahi milta hai means credentials correct nahi hai to login waale page par hi redirect kardo
            history.push('/login');
        }
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();       // ref.current --> Abhi Filhaal Kaha point Kar raha hai ref(here currently at button) aur uske baad dot click 
        setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }
    const ref = useRef(null);   //useRef hook se aap kisi bhi ek element ko reference de sakte ho
    const refClose = useRef(null);

    const handleSubmitClick = (e) => {
        console.log("Updating the note...", note)
        e.preventDefault();
        console.log(note.id, note.etitle, note.edescription, note.etag);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        ref.current.click();   //click karne par update waali button, close waali button ki functionality ko adopt karlegi aur modal band ho jayega
        // Remember update button par click karne ke baad ref waala kaam sabse aakhir mein hi karna
        props.showAlert("Note Updated Successfully","success")
    }

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value });   // special syntax hai:)--->  '...' is spread operator
        //   jo bhi values note object ke andar hai wo rahe lekin jo properties comma ke baad likhi jaa rahi hai inko add ya overwrite kar dena
        //  [e.target.name]: e.target.value --> Jo bhi targeted event change ho raha hai(yaha name attribute hai input element ka) us targeted event ki jo value hai(title ke case mein name ki default value title hai and description in other one) wo uske barabar ho jaye jo bhi value/text usme enter kiya jaayega
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />

            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle} />
                                    <div id="emailHelp" className="form-text"></div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmitClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((noteElement) => {   // looping through the notes state containing notesInitial Array
                    return <NoteItem key={noteElement._id} updateNote={updateNote} notes={noteElement} showAlert={props.showAlert} />
                })}
            </div>
        </>
    )
}

export default Notes


