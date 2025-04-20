import mongoose from "mongoose";

export const connectDB = async() =>{
    try{
      const connection = await mongoose.connect(process.env.MONGODB_URI);
      console.log("DB connection established")
    }catch(error){
        console.log("Mongo DB connection error:",error)
    }
};