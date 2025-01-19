const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Import bcryptjs for password hashing and comparison

// Initialize dotenv to load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8000;

// MongoDB connection setup
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;

mongoose.connect(MONGO_URL, { dbName: DB_NAME })
  .then(() => {
    console.log('Connected to Database');
  })
  .catch((err) => {
    console.log("Error connecting to database: " + err);
    process.exit(1); // Exit the process if the connection fails
  });

// Use middlewares
app.use(bodyParser.json());
app.use(cors());

// Define User model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// POST /register (Signup)
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);  // 10 is the salt rounds

  // Save the user to the database
  try {
    await User.create({
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err });
  }
});

// POST /login (Signin)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Attempting login for email:', email); // Log the email for debugging

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Successful login
    console.log('Login successful');
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error("Error during login:", err);  // Log any unexpected errors
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Server is working fine' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
