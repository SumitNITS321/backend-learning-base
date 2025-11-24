require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// MongoDB connection
const dbURL = process.env.DB_URL;

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    });

// Define a simple User schema (adjust if your app has a different schema)
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Create a test user
async function createTestUser() {
    const email = "testuser@example.com";
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.log("⚠️ Test user already exists.");
        return generateToken(existingUser);
    }

    const hashedPassword = await bcrypt.hash("Test1234", 10);
    const newUser = new User({
        name: "Test User",
        email,
        password: hashedPassword
    });

    await newUser.save();
    console.log("✅ Test user created in MongoDB");
    generateToken(newUser);
}

// Generate JWT token
function generateToken(user) {
    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
    console.log("\n🎯 Use this JWT token in Authorization header:\n");
    console.log(token, "\n");
    process.exit(0);
}

createTestUser();
