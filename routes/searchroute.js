
import {Router} from "express";
import { searchProduct } from "../controllers/searchcontrol.js";

const searchroute =Router();

searchroute.get("/search/:keyword",searchProduct);

export default searchroute;