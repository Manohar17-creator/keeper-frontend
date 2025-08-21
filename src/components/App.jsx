import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateArea from "./CreateArea";
import Note from "./Note";
import Header from "./Header";
// Use backend URL from .env
const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [notes, setNotes] = useState([]);

  // Fetch notes on load
  useEffect(() => {
    axios
      .get(`${API_URL}/notes`)
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => {
        console.error("Error fetching notes:", err);
      });
  }, []);

  // Add a new note
  function addNote(newNote) {
    axios
      .post(`${API_URL}/notes`, newNote)
      .then((res) => {
        setNotes((prevNotes) => [...prevNotes, res.data]);
      })
      .catch((err) => {
        console.error("Error adding note:", err);
      });
  }

  // Delete a note
  function deleteNote(id) {
    axios
      .delete(`${API_URL}/notes/${id}`)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      })
      .catch((err) => {
        console.error("Error deleting note:", err);
      });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
        />
      ))}
    </div>
  );
}

export default App;
