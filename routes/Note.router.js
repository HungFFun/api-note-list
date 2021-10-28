const express = require("express");
const router = express.Router();
const noteController = require("../controllers/Note.controller");

router.get("/api/notes", noteController.getListNote);
router.get("/api/note", noteController.getNoteByID);
router.post("/api/create-note", noteController.createNote);
router.put("/api/update-pin/:id", noteController.pinNotes);
router.put(
  "/api/update-background-color/:id",
  noteController.updateColorBackgroundNote
);
router.delete("/api/delete-note/:id", noteController.deleteNote);

module.exports = router;
