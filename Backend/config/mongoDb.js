const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
function connectDB(){
    try {
        mongoose.connect(`${process.env.MONGO_DB_URL}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');

    } catch (error) {
        console.log(error);
        
    }
}

module.exports = connectDB;

