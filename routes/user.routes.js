import { Router } from "express";
 // Import multer middleware
import {   loginUser, logoutUser, registerUser,authMiddleware  } from "../controllers/userauth.js"; // Import your controller



const router = Router();

// Define the POST route for user registration
router.route("/register").post(
     // Expect a single file field named 'avatar'
    registerUser // Your controller for registering the user
);
router.route("/login").post(loginUser);
router.route("/logout").delete(logoutUser);



router.route("/getuser").get(authMiddleware,(req,res)=>{
    const user =req.user;
    res.status(200).json({
        success:true,
        message:"authenticated user",
        user,
    })
});



   



export { router };
