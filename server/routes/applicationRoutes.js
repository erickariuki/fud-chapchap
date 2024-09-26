const express = require('express');
const ApplicationController = require('../controllers/applicationController.js'); // Assuming this is the correct path

const router = express.Router();

// Routes for handling CRUD operations on applications
router.get('/applications', ApplicationController.getAllApplications); // Fetch all applications
router.get('/applications/:id', ApplicationController.getApplicationById); // Fetch a specific application by ID
router.post('/applications', ApplicationController.createApplication); // Create a new application
router.put('/applications/:id', ApplicationController.updateApplication); // Update an existing application by ID
router.delete('/applications/:id', ApplicationController.deleteApplication); // Delete an application by ID

module.exports = router;
