// Connecting to the database
const mongoose = require('mongoose');
require('dotenv').config();

let connectionString = process.env.MONGO_URI;

mongoose
    .connect(`${connectionString}`, {
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
        serverSelectionTimeoutMS: 40000 // Increase timeout to 30 seconds
    })
    .then(() => console.log("Successfully Connected to Database"))
    .catch((err) => {
        console.log("Error Connecting to Database", err.message)
    });

const db = mongoose.connection;

module.exports = db;