import { addToCart,fetchCartItems,updateCartItemQty,deleteCartItem } from "../controllers/cartcontroller.js";
import { Router } from "express";
const cartrouter = Router();

cartrouter.post("/add", addToCart);
cartrouter.get("/get/:userId", fetchCartItems);
cartrouter.put("/update-cart", updateCartItemQty);
cartrouter.delete("/deletecart/:userId/:productId", deleteCartItem);

export default cartrouter;