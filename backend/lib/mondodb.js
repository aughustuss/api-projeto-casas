const mongoose = require("mongoose");
require("dotenv").config();

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
    throw new Error(".ENV inválido. ");
};


const connectToMongo = async () => {
    try {
        const { connection } = await mongoose.connect(MONGODB_URI);
        if (connection.readyState === 1) {
            return Promise.resolve(true);
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

module.exports = connectToMongo;