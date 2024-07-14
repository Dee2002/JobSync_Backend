const express = require('express');
const connectDB = require('./config/db');
const passport = require('passport');
const session = require('express-session');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/job');

require('dotenv').config();
require('./config/passport')(passport);

const app = express();

/* Connect to database */
connectDB();

/* Middleware */
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/uploads', express.static('uploads'));

/* Rate limiting */
const apiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100
});
app.use('/api/', apiLimiter);

/* Routes */
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

/* Error handler */
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
