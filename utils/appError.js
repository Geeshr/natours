class AppError extends Error {
  // Constructor for creating custom error objects
  constructor(message, statusCode) {
    // Call the Error class constructor with the provided message
    super(message);

    // Set custom properties for the error object
    this.statusCode = statusCode; // HTTP status code
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // Status: fail for client errors, error for server errors
    this.isOperational = true; // Flag to distinguish operational errors from programming errors

    // Capture the stack trace to provide information about where the error occurred
    Error.captureStackTrace(this, this.constructor);
  }
}

// Export the AppError class
module.exports = AppError;
