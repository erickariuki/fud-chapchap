// routes/yummypointRoutes.js

const express = require('express');
const { createYummypoint, getYummypoint, deleteYummypoint } = require('../controllers/YummyPointsController');

const router = express.Router();

// Route to create a Yummypoint
router.post('/', (req, res) => {
  createYummypoint(req, res);
});

// Route to get a Yummypoint by user ID
router.get('/:id', (req, res) => {
  getYummypoint(req, res);
});

// Route to delete a Yummypoint by ID
router.delete('/:id', (req, res) => {
  deleteYummypoint(req, res);
});

module.exports = router;
