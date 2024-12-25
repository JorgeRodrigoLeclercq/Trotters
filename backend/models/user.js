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

const User = mongoose.model("User", UserSchema, "user");

module.exports = { User }
