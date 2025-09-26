const Job = require("../models/jobModel"); 
const mongoose = require("mongoose");

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve jobs" });
  }
};


const createJob = async (req, res) => {
  try {
    const user_id = req.user._id;
    const newJob = await Job.create({ ...req.body, user_id });
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: "Failed to create job", error: error.message });
  }
};


const getJobById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid job ID" });
  }

  try {
    const job = await Job.findById(id);
    if (job) {
      res.status(200).json(job);
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve job" });
  }
};


const updateJob = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid job ID" });
  }

  try {
    const user_id = req.user._id;
    // We use findOneAndUpdate with the user_id to ensure the user owns the job.
    const job = await Job.findOneAndUpdate(
      { _id: id, user_id: user_id },
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!job) {
      return res.status(404).json({ message: "Job not found or not authorized" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ message: "Failed to update job", error: error.message });
  }
};


const deleteJob = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid job ID" });
  }

  try {
    const user_id = req.user._id;
    // findOneAndDelete also uses the user_id to restrict access.
    const job = await Job.findOneAndDelete({
      _id: id,
      user_id: user_id,
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found or not authorized" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete job", error: error.message });
  }
};


module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};