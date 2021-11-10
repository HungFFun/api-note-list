const express = require("express");
const router = express.Router();
const workController = require("../controllers/Work.controller");
const { authJwt } = require("../middleware");

router.get(
  "/api/work-by-note/:id",
  [authJwt.verifyToken],
  workController.getWorkByIdNote
);
router.post("/api/add-work", [authJwt.verifyToken], workController.addWork);
router.delete(
  "/api/delete-work/:id",
  [authJwt.verifyToken],
  workController.remoteWork
);
router.put(
  "/api/update-status-work/:id",
  [authJwt.verifyToken],
  workController.updateStatusWork
);

module.exports = router;
