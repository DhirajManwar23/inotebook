
import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState =(props) =>{
    const host = "http://localhost:3000"
   const notesInitial =[];
    const [notes , setNotes] =useState(notesInitial)

       // Get all Notes
    //    const getNotes = async() =>{
    //     const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    //         method: 'GET',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcxOWVhNDAyMmE2MDFjMTk5ZjljNWQyIn0sImlhdCI6MTcyOTc1MTYxNn0.jBTvVMHIB9rhWsQ3jHZ6IwrWabGn14OWMZEbTNcualc"
    //         }
    //       });
    //       const json = await response.json()
    //       setNotes(json)
    // }
 

    const getNotes = async () => {
      try {
          const response = await fetch(`${host}/api/notes/fetchallnotes`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcxOWVhNDAyMmE2MDFjMTk5ZjljNWQyIn0sImlhdCI6MTcyOTc1MTYxNn0.jBTvVMHIB9rhWsQ3jHZ6IwrWabGn14OWMZEbTNcualc"  // Consider storing this securely
              }
          });
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const json = await response.json();
          setNotes(json.notes || []); // Ensure notes is an array
      
      } catch (error) {
          console.error("Error fetching notes:", error);
      }
  };

     // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    try {
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcxOWVhNDAyMmE2MDFjMTk5ZjljNWQyIn0sImlhdCI6MTcyOTc1MTYxNn0.jBTvVMHIB9rhWsQ3jHZ6IwrWabGn14OWMZEbTNcualc"
        },
        body: JSON.stringify({title, description, tag})
      });
      
      console.log("Adding a new note")
      const note = {
        "_id": "61322f119553781a8ca8d0e08",
        "user": "6131dc5e3e4037cd4734a0664",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2021-09-03T14:20:09.668Z",
        "__v": 0
      };
      setNotes(notes.concat(note))
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
    
  }



   // Delete a Note
   const deleteNote = async(id) => {
      // API Call 
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcxOWVhNDAyMmE2MDFjMTk5ZjljNWQyIn0sImlhdCI6MTcyOTc1MTYxNn0.jBTvVMHIB9rhWsQ3jHZ6IwrWabGn14OWMZEbTNcualc"
        },
      });

    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  
 // Edit a Note
 const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcxOWVhNDAyMmE2MDFjMTk5ZjljNWQyIn0sImlhdCI6MTcyOTc1MTYxNn0.jBTvVMHIB9rhWsQ3jHZ6IwrWabGn14OWMZEbTNcualc"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = response.json();

    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
}

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}            
        </NoteContext.Provider>
    )

 }

export default NoteState;