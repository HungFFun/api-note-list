const express = require("express");
const router = express.Router();
const workController = require("../controllers/Work.controller");

router.get("/api/work-by-note/:id", workController.getWorkByIdNote);
router.post("/api/add-work", workController.addWork);
router.delete("/api/delete-work/:id", workController.remoteWork);
router.put("/api/update-status-work/:id", workController.updateStatusWork);

module.exports = router;
