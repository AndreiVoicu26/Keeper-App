import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import SaveIcon from "@mui/icons-material/Save";

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);

  const [editableNote, setEditableNote] = useState({
    title: props.title,
    content: props.content,
  });

  return !isEditing ? (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <ButtonGroup
        variant="text"
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
        <Button onClick={() => props.onDelete(props.id)}>
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
      <textarea
        name="content"
        value={editableNote.content}
        onChange={(event) => {
          setEditableNote({ ...editableNote, content: event.target.value });
        }}
      />
      <Button
        onClick={() => {
          props.onEdit(props.id, editableNote);
          setIsEditing(false);
        }}
      >
        <SaveIcon />
      </Button>
    </div>
  );
}

export default Note;
