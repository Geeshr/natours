const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.use(authController.protect);

router.get('/checkout-session/:tourId', bookingController.getCheckoutSession);

// router.use(authController.restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;

// const express = require('express');
// const bookingController = require('./../controllers/bookingController');
// const authController = require('./../controllers/authController');

// const router = express.Router();

// // Middleware to protect routes if needed
// router.use(authController.protect);

// // Define the route for creating bookings
// router.post('/', bookingController.getCheckoutSession);

// // Define routes for retrieving, updating, and deleting bookings
// router.get('/:id', bookingController.getBooking);
// router.patch('/:id', bookingController.updateBooking);
// router.delete('/:id', bookingController.deleteBooking);

// // Route for retrieving all bookings
// router.get('/', bookingController.getAllBookings);

// module.exports = router;



