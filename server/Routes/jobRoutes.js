const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');

// shows all jobs in user side , admin side both ...
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }); // latest first
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// ADD   job from admin side
router.post('/add', async (req, res) => {
  try {
    const { title, company, location,vacancies, salary, description } = req.body;
    const job = new Job({ title, company, location,vacancies, salary, description });
    await job.save();
    res.status(201).json({ message: 'Job added successfully', job });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add job' });
  }
});

// UPDATE job from admin side
router.put("/:id", async (req, res) => {
  try {
    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// DELETE job from admin side
router.delete("/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;