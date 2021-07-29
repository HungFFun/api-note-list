const express = require("express");
const router = express.Router();
const noteController = require("../controllers/Note.controller");

router.post("/api/create-note", noteController.createNote);
router.get("/api/notes", noteController.getListNote);

module.exports = router;
