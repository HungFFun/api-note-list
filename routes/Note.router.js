const express = require("express");
const router = express.Router();
const noteController = require("../controllers/Note.controller");

router.get("/api/notes", noteController.getListNote);
router.post("/api/create-note", noteController.createNote);
router.post("/api/add-work", noteController.addWordOnNote);

module.exports = router;
