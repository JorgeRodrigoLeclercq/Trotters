const { User } = require('../models/user');
const { Message, Conversation } = require('../models/messaging');

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
            res.status(500).json({ message: 'Server error' });
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
            res.status(500).json({ message: 'Server error' });
        }
    },

    searchUsers: async (req, res) => {    
        try {
            const { userId, location } = req.query;
    
            // Create a regex to match users based on country or city
            const locationRegex = new RegExp(`^(${location}|.*, ${location})$`, 'i');
    
            // Find users matching the location criteria, excluding the current user
            const users = await User.find({
                location: { $regex: locationRegex }, 
                _id: { $ne: userId } 
            });
            
            // Send response
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    },
    
    deleteUserPage: (req, res) => {
        res.send(`
            <html>
                <head>
                    <title>Delete your account</title>
                </head>
                <body>
                    <h1>Delete your account</h1>
                    <p>Enter your email to delete your account and all of its related data.</p>
                    <form action="/users/delete-user" method="POST">
                        <input type="email" name="email" required placeholder="Enter your email" />
                        <button type="submit">Delete</button>
                    </form>
                </body>
            </html>
        `);
    },
    
    deleteUser: async (req, res) => {
        try {
            // Find user by email
            const { email } = req.body;
            const user = await User.findOne({ email });
    
            if (!user) { // the email isn't registered
                return res.status(404).send('User not found.');
            }
    
            const userId = user._id.toString();
    
            // Delete all messages where the user is either sender or receiver
            await Message.deleteMany({ $or: [{ senderId: userId }, { receiverId: userId }] });
    
            // Delete all conversations where the user is a participant
            await Conversation.deleteMany({ participants: userId });
    
            // Delete the user
            await User.deleteOne({ _id: userId });
            
            // Send response
            res.send('Your account and all related data have been deleted successfully.');
        } catch (error) {
            res.status(500).send('Server error');
        }
    }      
}