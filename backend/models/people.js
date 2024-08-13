const mongoose = require('mongoose');

const PeopleSchema = new mongoose.Schema({
    // gotta make this unique
    name: {type: String, required: true},
    age: {type: String, required: true},
    nationality: {type: String, required: true},
    interests: {type: [String], required: true},
    description: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
}, { timestamps: true });

module.exports = mongoose.model("people", PeopleSchema, "Person")