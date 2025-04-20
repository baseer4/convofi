import bcrypt from "bcryptjs";
import User from "../models/users.model.js";
import { generateToken } from "../lib/ultis.js";

export const signup = async (req,res)=>{
    const {fullName,email,password} = req.body
    try{
        if( !fullName || !email || !password){
            return res.status(400).json({message: "All the required fields must be filled"});
        }


        if(password.length<6){
            return res.status(400).json({message: "Password must be atleast 6 characters"});
        }

        const user= await User.findOne({email});
        if (user) return res.status(400).json({message:"Email already exists"});

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        
        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
            })

        if(newUser){
            //generating jwt token
            generateToken(newUser._id,res); 
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullname:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            });
        }else{
            res.status(400).json({message: "Invalid user data"});
        }

        } catch(error){
            console.log("Error while signing up",error.message);
            res.status(500).json({message: "Internal server error"});
    }
}



//Login logic
export const login = async (req,res)=>{
    const { email,password } = req.body;
    try {
        const user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json({messasge:"Invalid credentials!"});
        }
       const ispasscorrect = await bcrypt.compare(password,user.password);
       if(!ispasscorrect){
             return res.status(400).json({messasge:"Invalid credentials!"});
       }
       generateToken(user._id,res)

       res.status(200).json({
        _id:user._id,
        fullname:user.fullName,
        email:user.email,
        profilePic:user.profilePic,
    });
    } catch (error) {
        console.log("Error during login",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const logout = (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message: "Logged out successfully"});
    }catch(error){
        console.log("Error in logout controller", error.message);
        res.status(500).json({message : "Internal server error"});
    }
}