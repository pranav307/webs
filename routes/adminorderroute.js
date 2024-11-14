
import {Router} from "express"
import { getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus } from "../controllers/adminordercontroll.js";


const adminrouter = Router();
adminrouter.get("/get", getAllOrdersOfAllUsers);
adminrouter.get("/details/:id", getOrderDetailsForAdmin);
adminrouter.put("/update/:id",updateOrderStatus);

export default adminrouter;