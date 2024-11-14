import { Router } from "express";
import {  getFilteredProducts, getProductDetails } from "../controllers/productcontrol.js";
import { upload } from "../utiles/cloudnary.js";
import { addProduct, deleteProduct, editProduct, fetchAllProducts, handleuploadimage } from "../controllers/adminproductcontrol.js";


 const routered=Router();
routered.route("/createproducts").post(addProduct);
routered.route("/getproduct").get(fetchAllProducts);
//routered.route("updateproduct/:id").put( editProduct);
routered.route("/updateproduct/:id").put(editProduct);
    
routered.route("/deleteproduct/:id").delete(deleteProduct);
routered.route("/uploadimage").post(upload.single("file"),handleuploadimage);
routered.route("/productfilter").get(getFilteredProducts);
routered.route("/getproductdetails/:id").get(getProductDetails);

export default routered;