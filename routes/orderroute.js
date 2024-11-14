import { Router } from "express";

import { createOrder,capturePayment, getOrderDetails, getAllOrdersByUser,} from "../controllers/odercontrol.js"
const orderrouter = Router();

orderrouter.post("/createorder", createOrder);
orderrouter.post("/captureorder", capturePayment);
orderrouter.get("/listuser/:userId",getAllOrdersByUser );
orderrouter.get("/detailsuser/:id", getOrderDetails);


export default orderrouter;