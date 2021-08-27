const express = require("express");
const router = express.Router();
const workController = require("../controllers/Work.controller");

router.post("/api/work-by-note", workController.getWorkByIdNote);
router.post("/api/add-work", workController.addNote);
router.delete("/api/delete-work/:id", workController.remoteWork);
router.put("/api/update-status-work/:id", workController.updateStatusWork);

module.exports = router;
