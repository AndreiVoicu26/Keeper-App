import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import axios from "axios";
axios.defaults.withCredentials = true;

function Login() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [validationError, setValidationError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    const usernamePattern = /^[a-zA-Z0-9@_.]+$/;
    if (!usernamePattern.test(credentials.username)) {
      setValidationError("Username contains invalid characters.");
      return;
    }

    if (credentials.password.length < 6) {
      setValidationError("Password must be at least 6 characters long.");
      return;
    }

    const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
    if (!passwordPattern.test(credentials.password)) {
      setValidationError("Password must contain both letters and numbers");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/auth/login",
        credentials
      );
      if (res.status === 200) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/home");
      }
    } catch (err) {
      console.error("Error logging the user: ", err);
      setValidationError("Invalid credentials.");
    }
  };

  return (
    <div className="container px-4 py-5 px-md-5 my-5 background-container">
      <div className="row align-items-center">
        <div className="col-lg-6 mt-4 pt-5 pl-5 description">
          <h1 className="ml-5 mt-5 pb-2 pl-1">Keeper</h1>
          <h4 className="ml-5 my-2 pl-2">Your notes.</h4>
          <h4 className="ml-5 my-2 pl-4">Organized.</h4>
          <h4 className="ml-5 my-2 pl-5">Effortless.</h4>
        </div>
        <div className="col-lg-5 ml-5">
          <div className="card">
            {isLoggedIn ? (
              <div className="d-flex justify-content-center align-items-center custom-box">
                <h4>You are already logged in.</h4>
              </div>
            ) : (
              <div className="card-body p-md-5 mx-md-2">
                <div className="text-center">
                  <h3 className="mt-1 mb-5 pb-1">Sign In</h3>
                </div>
                <form onSubmit={handleLogin}>
                  {validationError && (
                    <Alert className="mb-3" severity="error">
                      {validationError}
                    </Alert>
                  )}
                  <div className="form-outline mb-4">
                    <input
                      name="username"
                      value={credentials.username}
                      className="form-control"
                      placeholder="Email or Username"
                      required
                      onChange={(e) => {
                        setCredentials({
                          ...credentials,
                          username: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      name="password"
                      value={credentials.password}
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      required
                      onChange={(e) => {
                        setCredentials({
                          ...credentials,
                          password: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="text-center pt-1 mb-3 pb-1">
                    <button
                      className="btn btn-warning btn-block fa-lg mb-3 btn-login"
                      type="submit"
                    >
                      Log In
                    </button>
                    <div className="divider d-flex align-items-center my-4">
                      <p className="text-muted text-center fw-bold mx-3 mb-0">
                        or
                      </p>
                    </div>
                    <Link
                      className="btn btn-block fa-lg mb-3 btn-google"
                      role="button"
                      to="http://localhost:8080/auth/google"
                    >
                      <img
                        className="img-google"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                        alt="google-logo"
                      />
                      Sign in with Google
                    </Link>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <p className="mb-0">Don't have an account?</p>
                    <Link className="ml-2 link-redirect" to="/register">
                      Sign Up
                    </Link>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
