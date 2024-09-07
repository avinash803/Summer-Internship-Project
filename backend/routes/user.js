const router = require('express').Router();
const User = require('../models/user');

// sign-up functionality

router.post('/sign-up', async (req, res) => {
    try {
        const { username, password, email, address } = req.body;

        // Check for empty fields
        if (!username || !password || !email || !address) {
            return res.status(400).json({ message: "All input is required" });
        }
        
        // Check for username length
        else if (username.length < 4) {
            return res.status(400).json({ message: "Username length should be at least 4 characters" });
        }

        // Check for existing username
        const existUsername = await User.findOne({ username: username });
        if (existUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Check for existing email
        const existEmail = await User.findOne({ email: email });
        if (existEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Check for password length
        else if (password.length < 6) {
            return res.status(400).json({ message: "Password should be at least 6 characters" });
        }

        // Create new user
        const newUser = new User({
            username: username,
            email: email,
            password: password,
            address: address,
        });

        await newUser.save();
        res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// login functionality

module.exports = router;
