const { Router } = require("express");
const {
  createJobController,
  readJobController,
  readSingleJobController,
  deleteJobController,
  updateJobController,
} = require("../controllers/job.controller");

const router = Router();

// // read
router.post("/jobs", readJobController);

// // read single
router.get("/job/:id", readSingleJobController);

// add user/add-compnay
router.post("/add-job", createJobController);

// delete single
router.delete("/job/:id", deleteJobController);
// update single
router.put("/job/:id", updateJobController);

module.exports = router;
