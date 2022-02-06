import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

  // const host = 'http://localhost:5000';
  const host = 'https://inotebookmern.herokuapp.com/';
  // Abhi filhall ke liye notes ko hardcode kar diya hai par baad mein hum api se fetch karenge
  const notesInitial = []
  const [notes, setnotes] = useState(notesInitial);  // notes state

  // Get All Notes
  const getAllNotes = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);

    // notes state is updated by sending the response in setNotes
    setnotes(json);
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag
      })
    });
    const json = await response.json();
    console.log(json);

    console.log("Adding a New Note")
    
    setnotes(notes.concat(json));   // We used concat instead push because concat returns an array whereas push Updates an array
  }

  // Delete A note
  const deleteNote = async (id) => {

    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);

    console.log("Deleting Note With Id: " + id);
    const newNotes = notes.filter((notes) => { return notes._id !== id });
    setnotes(newNotes);
  }

  // Edit A note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag
      })
    });
    const json = await response.json();
    console.log(json);

    let newUpdatedNotes = JSON.parse(JSON.stringify(notes));  // Kyunki react mein directly hum state ko aise change nahi kar sakte isliye newUpdatedNotes banaya hai,,,,,,  JSON.stringify(notes)--> notes array stringify ho jayega uske baad json.parse jo kiya hai usse deep copy ban jayegi,,,,, :):):) hahahaha kuch samajh nahi aaya is line mein bas ratlo
    // Logic to edit in client
    for (let index = 0; index < newUpdatedNotes.length; index++) {
      if (newUpdatedNotes[index]._id === id) {
        newUpdatedNotes[index].title = title;
        newUpdatedNotes[index].description = description;
        newUpdatedNotes[index].tag = tag;
      }
    }
    setnotes(newUpdatedNotes);

  }

  return (
    // {/* value = {{notes:notes,setnotes:setnotes}} ,object banakar jaisa value mein kar rakha hai, agar aap direct bhi naam likhdoge without making object to bhi kaam ho jayega according to modern javascript like, value = {{notes, setnotes}}*/}
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>    {/*Exporting values*/}
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;