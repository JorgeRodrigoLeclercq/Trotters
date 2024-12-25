const { User } = require('../models/user');

module.exports = {
    signUp: async (req, res) => {
        try {
            const { name, age, location, interests, description, profileImage, email } = req.body;

            const newUser = new User({
                name,
                age,
                location,
                interests,
                description,
                profileImage,
                email
            });

            await newUser.save();

            res.status(201).json({ _id: newUser._id });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
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
            res.status(500).json({ message: "Server error", error });
        }
    },

    searchUsers: async(req, res) => {
        try {
            // Regular expression search for nationality
            const regex = new RegExp(req.params.key, 'i'); // 'i' makes it case-insensitive
            const users = await User.find({ location: { $regex: regex } });
    
            // Send response with people data
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    },
}