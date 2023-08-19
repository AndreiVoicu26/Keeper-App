import { Router } from "express";
import passport from "passport";
import User from "../models/User.js";

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

const router = Router();

router.post("/register", function (req, res) {
  const { username, password } = req.body;
  User.register(new User({ username }), password, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error registering the user" });
    }
    passport.authenticate("local")(req, res, () => {
      res.status(200).json({ message: "Registration and login successful" });
    });
  });
});

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user) {
    if (err) {
      return res.status(500).json({ message: "Error logging the user" });
    }
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      res.status(200).json({ message: "Login successful" });
    });
  })(req, res, next);
});

router.get("/logout", ensureAuthenticated, function (req, res) {
  req.logout(function (err) {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.status(200).json({ message: "Logout successful" });
  });
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  function (req, res) {
    res.redirect("http://localhost:3000/home");
  }
);

router.get("/check", function (req, res) {
  if (req.isAuthenticated()) {
    res.status(200).json(true);
  } else {
    res.status(200).json(false);
  }
});

export default router;
