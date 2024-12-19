const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    age: String,
    location: String,
    interests: [String],
    description: String,
    profileImage: String, 
    email: String,
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema, "user");
