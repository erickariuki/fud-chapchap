const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const crypto = require('crypto');
const morgan = require('morgan');
const passport = require('passport');

// Import routes
const applicationRoutes = require('./routes/applicationRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const postRoutes = require('./routes/postRoutes.js');
const blogRoutes = require('./routes/blogRoutes.js');
const cuisineRoutes = require('./routes/cuisineRoutes.js');
// const bookingRoutes = require('./routes/bookingRoutes.js');
const foodRoutes = require('./routes/foodRoutes.js');
const riderRoutes = require('./routes/riderRoutes.js');
const recommendationRoutes = require('./routes/recommendationRoutes.js');
const yummypointsRoutes = require('./routes/yummypointsRoutes.js');
const reviewRoutes = require('./routes/reviewRoutes.js');
const ratingRoutes = require('./routes/ratingRoutes.js');
const commentRoutes = require('./routes/commentRoutes.js');
const replyRoutes = require('./routes/replyRoutes.js');
const orderItemRoutes = require('./routes/OrderItemsRoutes.js');
// const friendRoutes = require('./routes/friendRoutes.js');

// Create an Express application
const app = express();

// Generate a random secret key for your sessions
const secretKey = crypto.randomBytes(32).toString('hex');

// Middleware for handling CORS (configure with your allowed origins)
app.use(cors({ origin: 'http://localhost:4000' }));

// Middleware to parse JSON in request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.disable('x-powered-by');
app.set('view engine', 'ejs');

// Session middleware for Passport.js
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Define your routes
app.use('/restaurants', restaurantRoutes);
app.use('/orders', orderRoutes);

// API Routes
app.use('/api/users', userRoutes);
//  app.use('/api/posts', postRoutes);
// app.use('/api/blogs', blogRoutes);
 app.use('/api/cuisines', cuisineRoutes);
 app.use('/api/foods', foodRoutes);
// // app.use('/api/bookings', bookingRoutes);
 app.use('/api/riders', riderRoutes);
 app.use('/api/recommendations', recommendationRoutes);
 app.use('/api/yummypoints', yummypointsRoutes);
 app.use('/api/reviews', reviewRoutes);
 app.use('/api/ratings', ratingRoutes);
 app.use('/api/comments', commentRoutes);
 app.use('/api/replies', replyRoutes);
 app.use('/api/order-items', orderItemRoutes);
//  app.use('/api/friends', friendRoutes);
 app.use('/api', applicationRoutes);

// Basic route for the root URL
app.get('/', (req, res) => {
  res.status(200).send('Welcome to your food store application');
});

// MongoDB connection and server start
const port = 8080;
const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://EricKariuki:ericko2023@food.to45k.mongodb.net/?retryWrites=true&w=majority&appName=food";

// Function to connect to MongoDB and start the server
const startServer = async () => {
  try {
    // Connect to MongoDB without deprecated options
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    app.listen(port, () => {
      console.log(`Server connected to http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

startServer();
