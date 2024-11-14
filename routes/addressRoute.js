
import {Router} from "express";

import { addAddress, deleteAddress, editAddress, fetchAllAddress } from "../controllers/adresscontrol.js";

  
  const routeraddress =Router();
  
  routeraddress.post("/adding", addAddress);
  routeraddress.get("/fetched/:userId", fetchAllAddress);
  routeraddress.delete("/deleteadd/:userId/:addressId", deleteAddress);
  routeraddress.put("/updateadd/:userId/:addressId", editAddress);

  export default routeraddress;