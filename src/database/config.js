const mongoose = require('mongoose');
require('dotenv').config();
const { ENVIRONMENT, MONGODB_URI, MONGODB_URI_DEV } = process.env
const URI = () => {
    if (ENVIRONMENT == "dev") return MONGODB_URI_DEV
    else return MONGODB_URI;
}

const connectDB = async () => {
    try {
        mongoose.connect(URI()).then((res) => {
            console.log('MongoDB connected successfully');
        }).catch((err) => {
            console.log('Error connecting to MongoDB:', err);
        });
    } catch (error) {
        // Handle any unexpected errors (though in this example, it's an empty block)
    }
};

module.exports = connectDB;
