const SECRET = require("#root/configs/env");
const userModal = require("#root/database/model/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login function
async function socket_token(req, res) {
    try {
        // Check if user exists and is verified
        const user = await userModal.findOne({ username: req.body.username, isVerified: true }, 'password username');

        if (!user) {
            throw new Error("Login failed! User not found. Try again or sign up!");
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            throw new Error("Password mismatch! Try again or sign up.");
        }

        // Generate JWT token
        const token = jwt.sign({ username: user.username, socketId: null }, SECRET.JWT_SECRET, { expiresIn: '365d' });

        // Respond with success message and token
        res.status(200).json({
            message: "Login successful",
            status: true,
            token: token,
        });
    } catch (error) {
        // Handle errors
        res.status(400).json({
            error: error.message,
            status: false
        });
    }
}

module.exports = socket_token;
