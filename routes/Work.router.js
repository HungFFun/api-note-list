const express = require("express");
const router = express.Router();
const workController = require("../controllers/Work.controller");

router.post("/api/add-work", workController.addWordOnNote);
router.post("/api/delete-work", workController.remoteWork);
router.put("/api/update-status-work/:id", workController.updateStatusWork);

module.exports = router;
