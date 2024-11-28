const { Router } = require("express");
const {
  createApplyController,
  readApplyController,
  readMyApplyController,
  statusApplyController,
} = require("../controllers/apply.controller");

const router = Router();

// create
router.post("/:id", createApplyController);
// read(for applier)

router.get("/myApply", readMyApplyController);
// read(fro company)
router.get("/:id", readApplyController);

// change status when company read the apply
router.put("/readApply", statusApplyController);

module.exports = router;
