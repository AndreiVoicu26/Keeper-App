import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Footer from "./Footer";

function App() {
  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.href = "/login";
    }

    window.addEventListener("beforeunload", () => {
      localStorage.clear();
    });
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
