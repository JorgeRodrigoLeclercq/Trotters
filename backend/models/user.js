const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    age: String,
    nationality: String,
    interests: [String],
    description: String ,
    profilePicture: Buffer , 
    profilePictureType: String ,
    email: String,
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema, "user");
