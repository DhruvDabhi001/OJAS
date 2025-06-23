const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const Job = require("../models/Job");
const auth = require('../middleware/auth'); // JWT middleware

// ✅ USER SIDE: Get own applications (uses JWT)
router.get("/my-applications", auth, async (req, res) => {
  try {
    const email = req.user.email; // Extracted from JWT

    const applications = await Application.find({ email }).sort({ createdAt: -1 });

    if (!applications.length) {
      return res.status(404).json({ message: "No applications found" });
    }

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ USER SIDE: Apply for a job
router.post("/apply", auth, async (req, res) => {
  try {
    const { jobName, companyName, applyDate, jobId } = req.body;
    const username = req.user.fullName;
    const email = req.user.email;

    if (!username || !email || !jobName || !companyName || !applyDate || !jobId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (!jobId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID"
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    // Prevent duplicate applications
    const alreadyApplied = await Application.findOne({ email, jobId });
    if (alreadyApplied) {
      return res.status(400).json({ success: false, message: "Already applied to this job" });
    }

    const newApplication = new Application({
      username,
      email,
      jobName,
      companyName,
      applyDate: new Date(applyDate),
      jobId
    });

    await newApplication.save();

    return res.status(200).json({
      success: true,
      message: "Application submitted successfully"
    });

  } catch (error) {
    console.error("Error while applying:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again."
    });
  }
});

// ✅ ADMIN SIDE: Get all applications
router.get("/applications", async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('jobId', 'jobName companyName')
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({
      message: "Error fetching applications",
      error: err.message
    });
  }
});

// ✅ ADMIN SIDE: Update application status (accept/reject)
router.put("/application/:id/status", async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const application = await Application.findById(id).populate("jobId");
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.status === "accepted" || application.status === "rejected") {
      return res.status(400).json({
        message: `This application has already been ${application.status}.`,
      });
    }
    
    const job = application.jobId;

    if (status.toLowerCase() === "accepted") {
      const existingAccepted = await Application.findOne({
        email: application.email,
        status: "accepted",
      });

      if (existingAccepted) {
        return res.status(400).json({
          message: `User already accepted for another job. Cannot accept multiple jobs.`,
        });
      }

      if (!job) {
        return res.status(404).json({ message: "Associated job not found" });
      }

      if (job.vacancies <= 0) {
        return res.status(400).json({ message: "No vacancies left" });
      }

      job.vacancies -= 1;
      await job.save();

      application.status = "accepted";
      await application.save();

      return res.json({ message: `Application accepted.`, newStatus: "accepted" });
    }

    // Reject logic
    application.status = "rejected";
    await application.save();

    return res.json({ message: `Application rejected.`, newStatus: "rejected" });

  } catch (err) {
    console.error("Error updating application status:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ ADMIN SIDE: Get all accepted (hired) users
router.get("/accepted", async (req, res) => {
  try {
    const acceptedApplications = await Application.find({ status: "accepted" }).populate("jobId");
    res.json(acceptedApplications);
  } catch (error) {
    console.error("Error fetching accepted users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;