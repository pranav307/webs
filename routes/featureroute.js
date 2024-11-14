import { Router } from "express";
import { addFeatureImage, deleteFeatureImage, getFeatureImages } from "../controllers/features.js";

const imageroute =Router();

imageroute.post("/addimage", addFeatureImage);
imageroute.get("/getimage", getFeatureImages);
imageroute.delete("/featureimage/:id",deleteFeatureImage);

export default imageroute;