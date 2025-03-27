import mongoose from "mongoose";

const connectDB= async ()=>{
    try {
         const MONGO_URI='mongodb://localhost:27017/box_cricket'

        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connect Successfully');
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;