const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const { v4: uuidv4 } = require('uuid');

// Function to create a booking when checkout is completed
const createBookingCheckout = async session => {
  // Extracting tour ID from session
  const tour = session.client_reference_id;
  // Finding user ID using email from session data
  const user = (await User.findOne({ email: session.customer_email })).id;
  // Extracting price from session data
  const price = session.display_items[0].amount / 100;
  // Creating booking with extracted data
  await Booking.create({ tour, user, price });
};

// Webhook endpoint to handle checkout events
exports.webhookCheckout = (req, res, next) => {
  let event;
  // Assuming event is received in req.body, you need to parse it and assign to 'event' variable
  // Parse the incoming event from the request body
  event = req.body;
  // Checking if the event type is 'checkout.session.completed'
  if (event.type === 'checkout.session.completed')
    // Call function to create booking if checkout is completed
    createBookingCheckout(event.data.object);
  // Respond to the webhook, acknowledging receipt
  res.status(200).json({ received: true });
};

// These are handler functions for CRUD operations on bookings
// They are implemented using the factory pattern for generic handler functions
exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
