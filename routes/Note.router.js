const express = require("express");
const router = express.Router();
const noteController = require("../controllers/Note.controller");

router.get("/api/notes", noteController.getListNote);
router.post("/api/note", noteController.getNoteByID);
router.post("/api/create-note", noteController.createNote);
router.patch("/api/update-pin/:id", noteController.pinNotes);
router.patch(
  "/api/update-background-color/:id",
  noteController.updateColorBackgroundNote
);
router.delete("/api/delete-note/:id", noteController.deleteNote);

module.exports = router;
