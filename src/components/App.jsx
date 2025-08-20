// App.jsx
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  // 🔑 API URL: use env var if provided, else fallback to localhost
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

  // Fetch notes on page load
  useEffect(() => {
    axios.get(`${API_URL}/notes`)
      .then(res => setNotes(res.data))
      .catch(err => console.error("Error fetching notes:", err));
  }, [API_URL]);

  function addNote(newNote) {
    axios.post(`${API_URL}/notes`, {
      title: newNote.title,
      content: newNote.content
    })
    .then(res => {
      setNotes(prev => [...prev, res.data]);
    })
    .catch(err => console.error("Error adding note:", err));
  }

  function deleteNote(id) {
    axios.delete(`${API_URL}/notes/${id}`)
      .then(() => {
        setNotes(prev => prev.filter(note => note.id !== id));
      })
      .catch(err => console.error("Error deleting note:", err));
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map(noteItem => (
        <Note
          key={noteItem.id}
          id={noteItem.id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
