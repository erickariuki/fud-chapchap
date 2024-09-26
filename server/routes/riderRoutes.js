const express = require('express');
const router = express.Router();
const RidersController = require('../controllers/RiderController');

// Route to get all riders
router.get('/riders', RidersController.getAllRiders);

router.post('/riders', RidersController.createRider);
router.post('/riders/login', RidersController.loginRider);
router.get('/riders/profile', RidersController.showRider);
router.put('/riders/profile', RidersController.updateRider);
router.get('/riders/deliveries', RidersController.getRiderDeliveries);
router.post('/riders/deliveries/accept', RidersController.acceptDelivery);
router.post('/riders/deliveries/complete', RidersController.completeDelivery);

module.exports = router;
