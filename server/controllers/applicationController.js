const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const Rider = require('../models/Rider.js');
const Restaurant = require('../models/Restaurant.js');
const Application = require('../models/Application'); // Assuming there is an Application model

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

// Authentication middleware (as defined previously)
const authenticateUser = async (req, res, next) => { /*...*/ };
const authenticateRider = async (req, res, next) => { /*...*/ };
const authenticateRestaurant = async (req, res, next) => { /*...*/ };

// Application CRUD functions
const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find(); // Assuming you are using a MongoDB database
        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({ error: 'Server error while fetching applications' });
    }
};

const getApplicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await Application.findById(id);
        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.status(200).json(application);
    } catch (err) {
        res.status(500).json({ error: 'Server error while fetching application by ID' });
    }
};

const createApplication = async (req, res) => {
    try {
        const newApplication = new Application(req.body);
        await newApplication.save();
        res.status(201).json(newApplication);
    } catch (err) {
        res.status(500).json({ error: 'Server error while creating application' });
    }
};

const updateApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedApplication = await Application.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedApplication) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.status(200).json(updatedApplication);
    } catch (err) {
        res.status(500).json({ error: 'Server error while updating application' });
    }
};

const deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedApplication = await Application.findByIdAndDelete(id);
        if (!deletedApplication) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error while deleting application' });
    }
};

// Export the authentication and application CRUD functions
module.exports = {
    authenticateUser,
    authenticateRider,
    authenticateRestaurant,
    getAllApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication,
};
