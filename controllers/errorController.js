const AppError = require('./../utils/appError');

// Error handling functions for various types of errors

// Handling CastError from MongoDB
const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

// Handling Duplicate Fields Error from MongoDB
const handleDuplicateFieldsDB = err => {
  if (err.errmsg) {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
  } else {
    return new AppError('An error occurred', 500);
  }
};

// Handling Validation Error from MongoDB
const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// Handling Invalid JWT Token Error
const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

// Handling Expired JWT Token Error
const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

// Error handling function for development environment
const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }
  console.error('ERROR 💥', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    error: err,
    msg: err.message
  });
};

// Error handling function for production environment
const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }
    // Log error
    console.error('ERROR 💥', err);
    // Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }

  // Log error
  console.error('ERROR 💥', err);
  // Send generic message
  return res.status(err.statusCode).json({
    status: err.status,
    message: 'Please try again later.'
  });
};

// Error handling middleware
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Error handling based on environment
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    // Handling different types of errors
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    // Sending error response to client
    sendErrorProd(error, req, res);
  }
};
