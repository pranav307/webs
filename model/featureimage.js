import mongoose, { Schema } from "mongoose";


const featureSchema=new Schema({
   
    image: String,


},{
    timeStamp:true
})

export const feature=mongoose.model("features",featureSchema);