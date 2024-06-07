// Import required modules
const express = require('express');
const morgan = require('morgan'); // Logging middleware
const rateLimit = require('express-rate-limit'); // Rate limiting middleware
const helmet = require('helmet'); // Security middleware
const mongoSanitize = require('express-mongo-sanitize'); // Data sanitization against NoSQL query injection
const xss = require('xss-clean'); // Data sanitization against XSS
const hpp = require('hpp'); // Prevent parameter pollution
const cookieParser = require('cookie-parser'); // Parse cookies
const bodyParser = require('body-parser'); // Parse incoming request bodies
const compression = require('compression'); // Compress HTTP responses
const cors = require('cors'); // Enable Cross-Origin Resource Sharing (CORS)

// Import custom modules
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const bookingController = require('./controllers/bookingController');

// Create express app
const app = express();

// Allow proxies
app.set('trust proxy', 'loopback');

// 1) GLOBAL MIDDLEWARES

// Enable CORS
app.use(cors());
app.options('*', cors()); // Enable pre-flight requests for all routes

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100, // Max number of requests
  windowMs: 60 * 60 * 1000, // 1 hour window
  message: 'Too many requests from this IP, please try again in an hour!' // Error message
});
app.use('/api', limiter); // Apply rate limiting middleware to all routes under /api

// Parse request body and cookies
app.use(express.json({ limit: '10kb' })); // JSON body parser with size limit
app.use(express.urlencoded({ extended: true, limit: '10kb' })); // URL-encoded body parser with size limit
app.use(cookieParser()); // Parse cookies

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ] // Whitelist parameters that can be duplicated in query string
  })
);

// Compress HTTP responses
app.use(compression());

// Test middleware to add request timestamp
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString(); // Add request timestamp to req object
  next(); // Call next middleware
});

// 3) ROUTES

// Mount routers
app.use('/api/v1/tours', tourRouter); // Tour routes
app.use('/api/v1/users', userRouter); // User routes
app.use('/api/v1/bookings', bookingRouter); // Booking routes

// Global error handling middleware
app.use(globalErrorHandler);

// Export express app
module.exports = app;
