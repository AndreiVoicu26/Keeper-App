import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import axios from "axios";
axios.defaults.withCredentials = true;

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [isLoggedInWithGoogle, setIsLoggedInWithGoogle] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/auth/check").then((res) => {
      if (res.data === true) {
        setIsLoggedInWithGoogle(true);
        localStorage.setItem("isLoggedIn", "true");
      }
    });
  }, [isLoggedInWithGoogle]);

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:8080/auth/logout");
      if (res.status === 200) {
        setIsLoggedInWithGoogle(false);
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
      }
    } catch (err) {
      console.error("Error logging out: ", err);
    }
  };

  return (
    <header className="d-flex justify-content-between align-items-center">
      <h1>
        <LightbulbIcon className="icon" />
        Keeper
      </h1>
      {(isLoggedIn || isLoggedInWithGoogle) && (
        <button
          className="btn btn-outline-light btn-logout"
          onClick={handleLogout}
        >
          Log Out
        </button>
      )}
    </header>
  );
}

export default Header;
