import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [inputNote, setInputNote] = useState({
    title: "",
    content: "",
  });

  const [isExpanded, setExpanded] = useState(false);

  function submitNote(event) {
    props.onAdd(inputNote);
    setInputNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  return (
    <div>
      <form onClick={() => setExpanded(true)} className="create-note">
        <input
          name="title"
          onChange={(event) =>
            setInputNote({ ...inputNote, title: event.target.value })
          }
          value={inputNote.title}
          type={!isExpanded && "hidden"}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={(event) =>
            setInputNote({ ...inputNote, content: event.target.value })
          }
          value={inputNote.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded} appear={true}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
