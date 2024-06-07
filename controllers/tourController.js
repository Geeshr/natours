const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

// Middleware to alias top tours for easy access
exports.aliasTopTours = (req, res, next) => {
  // Set query parameters to retrieve top 5 tours sorted by price with limited fields
  req.query.limit = '5';
  req.query.sort = 'price';
  req.query.fields = 'name,price,summary,difficulty';
  // Pass control to the next middleware
  next();
};

// Route handlers using factory functions for CRUD operations on tours
exports.getAllTours = factory.getAll(Tour); // Get all tours
exports.getTour = factory.getOne(Tour); // Get a single tour
exports.createTour = factory.createOne(Tour); // Create a new tour
exports.updateTour = factory.updateOne(Tour); // Update an existing tour
exports.deleteTour = factory.deleteOne(Tour); // Delete a tour
