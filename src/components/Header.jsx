import React from "react";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

function Header() {
  return (
    <header>
      <h1>
        <LightbulbIcon sx={{ marginRight: "10px" }} />
        Keeper
      </h1>
    </header>
  );
}

export default Header;
