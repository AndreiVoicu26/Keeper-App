import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zoom, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
axios.defaults.withCredentials = true;

function CreateArea(props) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputNote, setInputNote] = useState({
    title: "",
    content: "",
  });

  const handleAdd = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/notes", inputNote);
      if (res.status === 201) {
        props.onAdd(inputNote);
        navigate("/home");
      }
    } catch (err) {
      console.error("Error adding the note: ", err);
    }

    setInputNote({
      title: "",
      content: "",
    });
    setIsExpanded(false);
  };

  return (
    <div>
      <form
        className="create-note"
        onClick={() => setIsExpanded(true)}
        onSubmit={handleAdd}
      >
        <input
          name="title"
          value={inputNote.title}
          type={!isExpanded ? "hidden" : "text"}
          placeholder="Title"
          required
          onChange={(event) =>
            setInputNote({ ...inputNote, title: event.target.value })
          }
        />
        <textarea
          name="content"
          value={inputNote.content}
          type="text"
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          required
          onChange={(event) =>
            setInputNote({ ...inputNote, content: event.target.value })
          }
        />
        <Zoom in={isExpanded}>
          <Fab aria-label="add" role="button" type="submit">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
