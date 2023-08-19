import "dotenv/config";
import express from "express";
import passport from "passport";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";

const initializeMiddlewares = (app) => {
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.static("public"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};

export default initializeMiddlewares;
