const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobControllers");

const requireAuth = require("../middleware/requireAuth");
///router.use(requireAuth);
// Public routes
router.get("/", getAllJobs);
router.get("/:id", getJobById);



router.post("/",requireAuth, createJob);
router.put("/:id",requireAuth, updateJob);
router.delete("/:id",requireAuth, deleteJob);

module.exports = router;