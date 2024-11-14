import mongoose, { Schema } from 'mongoose';

  
const UserSchema =new Schema(
    {
      username:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        index:true,
        unique:true

      },
      email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
      },
      fullName:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,

      },
     /* avatar:{
       type:Buffer,
        //required:true,

      }, */
      password:{
        type:String,
        required:[true,'password is required'],
      },
        refreshToken:{
          type:String,
        },
        role:{
          type:String,
          default:"user",
          enum:["user","admin"],
          
        },
    },{
    timestamps:true
    }
)

export const User=mongoose.model("User",UserSchema);