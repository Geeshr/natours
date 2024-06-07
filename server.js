// Import required modules
const mongoose = require('mongoose'); // MongoDB ODM
const dotenv = require('dotenv'); // Read environment variables

// Configure environment variables from config.env file
dotenv.config({ path: './config.env' });

// Handle uncaught exceptions
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log('error ->', err); // Log the error details
  console.log(err.name, err.message); // Log the error name and message
  process.exit(1); // Terminate the process
});

// Import the Express app
const app = require('./app');

// Define a route handler for the root URL
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the Natours API!',
    endpoints: {
      tours: '/api/v1/tours',
      users: '/api/v1/users',
      bookings: '/api/v1/bookings'
    }
  });
});

// Connect to MongoDB database
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true, // Parse connection string using new parser
    useCreateIndex: true, // Ensure indexes are created
    useFindAndModify: false // Disable deprecated findAndModify
  })
  .then(() => console.log('DB connection successful!')) // Log successful connection
  .catch(err => console.error('DB connection error:', err)); // Log connection error

// Set up the server to listen on specified port
const port = process.env.PORT || 3000; // Use specified port or default to 3000
console.log('port:', port); // Log the port number
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`); // Log server start message
});

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...'); // Log unhandled rejection
  console.log(err.name, err.message); // Log the error name and message
  server.close(() => {
    process.exit(1); // Close server and terminate process
  });
});

// Handle SIGTERM signal
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully'); // Log SIGTERM signal
  server.close(() => {
    console.log('💥 Process terminated!'); // Log process termination
  });
});
