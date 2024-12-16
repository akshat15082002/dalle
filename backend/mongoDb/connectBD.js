import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectBD = async () => {
    try {
        mongoose.set("strictQuery", true);
        mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");        
    } 
    catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}   

export default connectBD;