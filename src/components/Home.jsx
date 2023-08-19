import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
axios.defaults.withCredentials = true;

function Home() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/notes");
      if (res.status === 200) {
        setNotes(res.data);
      }
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [notes.length]);

  const addNote = (note) => {
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  const editNote = (id, editedNote) => {
    fetchNotes();
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note._id === id ? editedNote : note))
    );
  };

  const deleteNote = (id) => {
    fetchNotes();
    setNotes((prevNotes) => prevNotes.filter((note, index) => index !== id));
  };

  return (
    <div>
      <CreateArea onAdd={addNote} />
      {notes.length !== 0 ? (
        <Masonry
          breakpointCols={7}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {notes.map((note, index) => (
            <Note
              key={index}
              id={note._id}
              title={note.title}
              content={note.content}
              onEdit={editNote}
              onDelete={deleteNote}
            />
          ))}
        </Masonry>
      ) : (
        <div
          className=" text-muted d-flex align-items-center justify-content-center"
          style={{ height: "600px" }}
        >
          <h1>Your notes will appear here</h1>
        </div>
      )}
    </div>
  );
}

export default Home;
