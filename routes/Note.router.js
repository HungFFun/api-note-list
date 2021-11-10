const express = require("express");
const router = express.Router();
const noteController = require("../controllers/Note.controller");
const { authJwt } = require("../middleware");

router.get("/api/notes", [authJwt.verifyToken], noteController.getListNote);
router.get("/api/note", [authJwt.verifyToken], noteController.getNoteByID);
router.post(
  "/api/create-note",
  [authJwt.verifyToken],
  noteController.createNote
);
router.put(
  "/api/update-pin/:id",
  [authJwt.verifyToken],
  noteController.pinNotes
);
router.put(
  "/api/update-background-color/:id",
  [authJwt.verifyToken],
  noteController.updateColorBackgroundNote
);
router.delete(
  "/api/delete-note/:id",
  [authJwt.verifyToken],
  noteController.deleteNote
);

module.exports = router;
