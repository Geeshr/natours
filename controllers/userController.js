const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

// Utility function to filter out unwanted fields from request body
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// Middleware to get the current user
exports.getMe = (req, res, next) => {
  // Set the user ID parameter to the current user's ID
  req.params.id = req.user.id;
  // Move to the next middleware
  next();
};

// Placeholder route handler for creating a user
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead'
  });
};

// Route handlers for CRUD operations on users
exports.getUser = factory.getOne(User); // Get a single user
exports.getAllUsers = factory.getAll(User); // Get all users

// Update user data (excluding password)
exports.updateUser = factory.updateOne(User); // Update an existing user
exports.deleteUser = factory.deleteOne(User); // Delete a user
