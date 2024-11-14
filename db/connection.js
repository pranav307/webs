import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";



const Connectdb=async()=>{
    try {
        const connectioninstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`/n mongodb connected || db host ${connectioninstance.connection.host}`)
    } catch (error) {
        console.log("mongo db connection failed")
        process.exit(1)
    }
}

export default Connectdb;