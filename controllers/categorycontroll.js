import { category } from "../model/category.models.js";
import { ApiError } from "../utiles/Apierror.js";
import { ApiResponse } from "../utiles/ApiResponse.js";
import { asyncHandler } from "../utiles/asyncHandler.js";

import mongoose from "mongoose";


export const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const categorys = new category({ name, description });
  if (!name || !description) {
    throw new ApiError(400, "error on creating file");
  }
  await categorys.save();
  console.log("your data", categorys);

  return res
    .status(201)
    .json(new ApiResponse(200, categorys, "category created successfully"));
});
export const getcategory = asyncHandler(async (req, res) => {
  // Fetch all categories from the database
  const categories = await category.find();

  // If no categories were found, throw an error
  if (!categories || categories.length === 0) {
    throw new ApiError(400, "No categories found");
  }

  // Send a 200 response with the categories data
  return res
    .status(200)
    .json(
      new ApiResponse(200, categories, "Categories successfully retrieved")
    );
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    throw new ApiError(
      400,
      "no filed are found name desciption updatecategory"
    );
  }
  const updatecategories = await category.findByIdAndUpdate(
    req.params.id,
    { name, description },
    { new: true, runValidators: true }
  );
  if (!updatecategories) {
    throw new ApiError(404, "Category not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, updatecategories, "updates succesfull"));
});
export const deleteCategory = asyncHandler(async (req, res) => {
  const deleteCategory = await category.findByIdAndDelete(req.params.id);

  // Check if the category was found and deleted
  if (!deleteCategory) {
    throw new ApiError(404, "No category found with the provided ID");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Category deleted successfully"));
});

export const getParentcategory = asyncHandler(async (req, res) => {
  try {
    const categoryId = await category.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.categoryId), // Assuming the categoryId comes from req.params
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "parentcategory",
          foreignField: "_id",
          as: "parent_category",
        },
      },
      {
        $unwind: {
          path: "$parent_category",
          preserveNullAndEmptyArrays: true, // Keep categories that don't have a parent
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          parentcategory: 1,
          parentCategoryName: { $ifNull: ["$parent_category.name", null] }, // Fixed field access and correct $ifNull
          parentCategoryId: { $ifNull: ["$parent_category._id", null] }, // Fixed field access and correct $ifNull
        },
      },
    ]);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          categoryId,
          "Parent category details fetched successfully"
        )
      );
  } catch (error) {
    console.error("Error fetching parent category:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});
