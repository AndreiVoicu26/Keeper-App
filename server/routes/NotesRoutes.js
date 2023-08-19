import { Router } from "express";
import User from "../models/User.js";

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

const router = Router();

router.get("/", ensureAuthenticated, function (req, res) {
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user.notes);
    })
    .catch((err) => res.status(500).json({ error: "Internal server error" }));
});

router.post("/", ensureAuthenticated, function (req, res) {
  const { title, content } = req.body;
  const note = { title: title, content: content };
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.notes.push(note);
      user
        .save()
        .then(() =>
          res.status(201).json({ message: "Note added successfully" })
        )
        .catch((err) =>
          res.status(500).json({ error: "Internal server error" })
        );
    })
    .catch((err) => res.status(500).json({ error: "Internal server error" }));
});

router.put("/:noteId", ensureAuthenticated, function (req, res) {
  const noteId = req.params.noteId;
  const updatedNote = req.body;
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const noteToUpdate = user.notes.find(
        (note) => note._id.toString() === noteId
      );
      if (!noteToUpdate) {
        return res.status(404).json({ message: "Note not found" });
      }
      noteToUpdate.title = updatedNote.title;
      noteToUpdate.content = updatedNote.content;
      user
        .save()
        .then(() => {
          res.status(200).json({ message: "Note updated successfully" });
        })
        .catch((err) => {
          res.status(500).json({ error: "Internal server error" });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal server error" });
    });
});

router.delete("/:noteId", ensureAuthenticated, (req, res) => {
  const noteId = req.params.noteId;
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const noteIndex = user.notes.findIndex(
        (note) => note._id.toString() === noteId
      );
      if (noteIndex === -1) {
        return res.status(404).json({ message: "Note not found" });
      }
      user.notes.splice(noteIndex, 1);
      user
        .save()
        .then(() => {
          res.status(200).json({ message: "Note deleted successfully" });
        })
        .catch((err) => {
          res.status(500).json({ error: "Internal server error" });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal server error" });
    });
});

export default router;
