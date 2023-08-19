import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
axios.defaults.withCredentials = true;

function Note(props) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editableNote, setEditableNote] = useState({
    title: props.title,
    content: props.content,
  });

  const handleEdit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/notes/${props.id}`,
        editableNote
      );
      if (res.status === 200) {
        props.onEdit(props.id, editableNote);
        navigate("/home");
      }
    } catch (err) {
      console.error("Error editing note: ", err);
    }

    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:8080/notes/${props.id}`);
      if (res.status === 200) {
        props.onDelete(props.id);
        navigate("/home");
      }
    } catch (err) {
      console.error("Error deleting note: ", err);
    }
  };

  return !isEditing ? (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <ButtonGroup
        variant="text"
        className="button-group"
        sx={{
          float: "right",
          ".MuiButtonGroup-grouped:not(:last-of-type)": {
            borderColor: "#FFFFFF",
          },
        }}
      >
        <Button onClick={() => setIsEditing(true)}>
          <EditIcon />
        </Button>
        <Button onClick={handleDelete}>
          <DeleteIcon />
        </Button>
      </ButtonGroup>
    </div>
  ) : (
    <div className="note">
      <input
        name="title"
        value={editableNote.title}
        onChange={(event) => {
          setEditableNote({ ...editableNote, title: event.target.value });
        }}
      />
      <TextareaAutosize
        name="content"
        value={editableNote.content}
        className="autosize"
        onChange={(event) => {
          setEditableNote({ ...editableNote, content: event.target.value });
        }}
      />
      <Button onClick={handleEdit}>
        <SaveIcon />
      </Button>
    </div>
  );
}

export default Note;
