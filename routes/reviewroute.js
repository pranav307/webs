import {Router} from "express";
import { addProductReview, getProductReviews } from "../controllers/productreview.js";


const reviewroute=Router();

reviewroute.post("/addreview", addProductReview);
reviewroute.get("/getreview/:productId", getProductReviews);


export default reviewroute;