const mongoose = require("mongoose");

const { MONGODB_URI } = process.env;
console.log("MONGODB_URI:", MONGODB_URI);

if (!MONGODB_URI) {
    throw new Error(".ENV inválido. ");
};


const connectToMongo = async () => {
    console.log("MONGODB_URI:", MONGODB_URI);
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