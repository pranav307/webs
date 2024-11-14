import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app= express()
 app.use(cors({
  origin:process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials:true
 }))

 app.use(express.json({limit:"16kb"}))
  app.use(cookieParser())
  app.use(express.static("public/temp"))

 //routes declareton
 import {router} from "./routes/user.routes.js"
 import { routers } from "./routes/categoryroute.js";
import  routered  from "./routes/productionroute.js";
import cartrouter from "./routes/cartrouter.js";
import routeraddress from "./routes/addressRoute.js";
import orderrouter from "./routes/orderroute.js";
import adminrouter from "./routes/adminorderroute.js";
import searchroute from "./routes/searchroute.js";
import reviewroute from "./routes/reviewroute.js";
import imageroute from "./routes/featureroute.js";
 app.use("/api",router)
 app.use("/api",routers)
 app.use("/api",routered);
 app.use("/api",
cartrouter);
app.use("/api",routeraddress);
app.use("/api",orderrouter);
app.use("/api",adminrouter);
app.use("/api",searchroute);
app.use("/api",reviewroute);
app.use("/api",imageroute);
 export {app}