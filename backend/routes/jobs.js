const express = require('express');
const router = express.Router();
const JobRequest = require('../models/JobRequest');
const auth = require('../middleware/auth');

// GET /api/jobs - List all jobs
router.get('/', async (req, res, next) => {
  try {
    const { category, status, search, sortBy, location } = req.query;
    let query = {};
    if (category) query.category = category;
    if (status) query.status = status;
    if (location) query.location = { $regex: location, $options: 'i' };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    console.log("Req Query:", req.query);
    console.log("Mongoose Query:", query);

    let sortObj = { createdAt: -1 }; // Default to newest
    if (sortBy === 'oldest') {
      sortObj = { createdAt: 1 };
    }

    const jobs = await JobRequest.find(query).sort(sortObj);
    res.json(jobs);
  } catch (error) {
    next(error);
  }
});

// GET /api/jobs/:id - Fetch a single job
router.get('/:id', async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    next(error);
  }
});

// POST /api/jobs - Create a new job
router.post('/', auth, async (req, res, next) => {
  try {
    const newJob = new JobRequest(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: error.message });
    } else {
      next(error);
    }
  }
});

// PATCH /api/jobs/:id - Update status
router.patch('/:id', async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const job = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: error.message });
    } else {
      next(error);
    }
  }
});

// DELETE /api/jobs/:id - Delete a job
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const job = await JobRequest.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
