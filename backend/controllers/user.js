const User = require('../models/user');

module.exports = {
    signUp: async (req, res) => {
        try {
            const { name, age, nationality, interests, description, email } = req.body;
    
            // Create a new user
            const newUser = new User({
                name,
                age,
                nationality,
                interests,
                description,
                profilePicture: req.file.buffer, // store image as binary data
                profilePictureType: req.file.mimetype, // store MIME type
                email,
            });
    
            // Save the user to the database
            await newUser.save();
            
            res.status(201).json({ message: "User created successfully" }); // TODO: return new user's _id
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
                const userData = { ...user._doc }; // spread the user object to manipulate it
                userData.profileImage = `data:${user.profileImageType};base64,${user.profileImage.toString('base64')}`; // convert binary image to Base64 and add to the response
     
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
            const users = await User.find({ nationality: { $regex: regex } });
    
            // Convert profileImage for each person
            users.forEach(user => {
                user.profilePicture = `data:${user.profilePictureType};base64,${user.profilePicture.toString('base64')}`;
            });
    
            // Send response with people data
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    },
}