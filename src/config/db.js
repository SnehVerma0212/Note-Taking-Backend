const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectdb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo Database connected.");
    }catch(err){
        console.log(err.message);
    }
}

module.exports = connectdb;