// Create web server
// 1. npm install express --save
// 2. npm install body-parser --save
// 3. npm install mongoose --save
// 4. npm install --save-dev nodemon
// 5. npm install morgan --save
// 6. npm install cors --save
// 7. npm install helmet --save

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const router = express.Router();

const port = process.env.API_PORT || 8080;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mern-app', { useNewUrlParser: true });

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error: '));

// Allow CORS
app.use(cors());

// Log requests to console
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use helmet to secure Express headers
app.use(helmet());

// Set static path to serve React build
app.use(express.static(__dirname + '/client/build'));

// API routes
const comments = require('./routes/comments');
app.use('/api', comments);

// All other requests send React index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));