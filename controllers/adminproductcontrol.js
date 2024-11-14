import { production } from "../model/production.models.js";

import { imageUploadUtil } from "../utiles/cloudnary.js";



 export const handleuploadimage = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};
export const addProduct =async(req,res)=>{
    try {
        const {
            image,name,description,category,brand,price,stock,averageReview
        } =req.body;
        if (!name || !description || !brand || !price) {
            return res.status(400).json({
              success: false,
              message: "Name, description, brand, and price are required.",
            });
          }
        const newlyCreatedProduct =new production({
            image,name,description,category,brand,price,stock,averageReview,
        });
        await newlyCreatedProduct.save();
        res.status(201).json({
            success:true,
            data:newlyCreatedProduct,
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occured",
          });
    }
}

 export const fetchAllProducts = async (req, res) => {
    try {
      const listOfProducts = await production.find({});
      res.status(200).json({
        success: true,
        data: listOfProducts,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Error occured",
      });
    }
  };

  export const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            image,
            name,
            description,
            category,
            brand,
            price,
            averageReview,
            stock,
        } = req.body;

        // Check if the product exists
        let findProduct = await production.findById(id);
        if (!findProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Update product fields only if new values are provided
        findProduct.name = name || findProduct.name;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.brand = brand || findProduct.brand;
        findProduct.price = price !== undefined ? price : findProduct.price;
        findProduct.stock = stock || findProduct.stock;
        findProduct.image = image || findProduct.image;
        findProduct.averageReview = averageReview || findProduct.averageReview;

        await findProduct.save();
        res.status(200).json({
            success: true,
            data: findProduct,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Error occurred",
        });
    }
};

   export const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await production.findByIdAndDelete(id);
  
      if (!product)
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
  
      res.status(200).json({
        success: true,
        message: "Product delete successfully",
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Error occured",
      });
    }
  };