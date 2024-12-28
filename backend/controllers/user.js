const { User } = require('../models/user');

module.exports = {
    signUp: async (req, res) => {
        try {
            const { name, age, location, interests, description, profileImage, email } = req.body;

            // Create the new user
            const newUser = new User({
                name,
                age,
                location,
                interests,
                description,
                profileImage,
                email
            });

            // Save the user
            await newUser.save();

            // Send response
            res.status(201).json({ _id: newUser._id });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    },

    signIn: async (req, res) => {
        try {
            // Find user by email
            const user = await User.findOne({ email: req.params.key });

            if (user) {
                // Prepare user data for response
                const { email, createdAt, updatedAt, __v, ...userData } = user._doc;

                // Send response
                res.status(200).json({ userData });
            } else {
                res.status(204).end();
            }
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    },

    searchUsers: async(req, res) => {
        const { userId, location } = req.query;
    
        try {
            // Find users matching location but excluding the current user
            const users = await User.find({
                location: location,
                _id: { $ne: userId } // Exclude the current user
            });
    
            // Send response 
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
}