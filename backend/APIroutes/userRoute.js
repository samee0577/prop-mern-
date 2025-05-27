import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import bcrypt from "bcryptjs"
import User from "../database/models/user.js"
const router = express.Router()

// APIs
// get user data for profile
// update user data

router.get("/profile",authMiddleware,async (req,res)=>{
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId).select("-password");
        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
})

router.put("/profile",authMiddleware,async (req,res)=>{
    try {
        const new_data = req.body
        const password =req.body.password;
        if(password){
            const salt = await bcrypt.genSalt(10);
            new_data.password = await bcrypt.hash(password, salt);
        }

        const userId = req.user.userId;
        const user = await User.findByIdAndUpdate(userId, new_data, {new: true, select: "-password"});
        
        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
})



export default router

