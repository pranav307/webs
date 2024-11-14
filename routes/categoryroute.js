import { Router } from "express";
import { createCategory, deleteCategory, getcategory, getParentcategory, updateCategory } from "../controllers/categorycontroll.js";



const routers =Router()

routers.route("/createcategory").post(createCategory);
routers.route("/getcategory").get(getcategory);
routers.route("/updatecategory/:id").put(updateCategory);
routers.route("/deletecategory/:id").delete(deleteCategory);
routers.route("/getcategory/:categoryId/parent").get(getParentcategory);

export {routers}