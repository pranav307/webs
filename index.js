import dotenv from "dotenv";
import Connectdb from "./db/connection.js";
import { app } from "./app.js";
dotenv.config();




Connectdb()
.then(()=>{
  app.listen(process.env.PORT || 8000,()=>{
    console.log(`server is running at port http://localhost:${process.env.PORT}`)
  })
}).catch((err)=>{
  console.log("mongo db connection failed !!!",err)
})
