import { asyncHandler } from "../utiles/asyncHandler.js";
import { ApiError } from "../utiles/Apierror.js";
import { production } from "../model/production.models.js";
import { Cart } from "../model/cartmodel.js";
import { ApiResponse } from "../utiles/ApiResponse.js";

export const addToCart=asyncHandler(async(req,res)=>{
    const {userId,productId,quantity}=req.body;
    if(!userId || !productId || quantity <=0){
        return new ApiError(400,"invalid data provided");
    }

    const product =await production.findById(productId);
    if(!product){
        return new ApiError(404,"product not found");
    }
    let cart =await Cart.findOne({userId});
    if(!cart){
        cart= new Cart({userId,items:[]});
    }
    const findCurrentProductIndex = cart.items.findIndex((item)=>item.productId.toString() === productId);
    if(findCurrentProductIndex === -1){
        cart.items.push({productId ,quantity});
    }
    else{
        cart.items[findCurrentProductIndex].quantity +=quantity;
    }
    await cart.save();
    return res.status(200).json(
        new ApiResponse(200,cart,"added product successfully")
    )
})
  export const fetchCartItems = async (req, res) => {
    try {
      const { userId } = req.params;
  
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User id is manadatory!",
        });
      }
  
      const cart = await Cart.findOne({ userId }).populate({
        path: "items.productId",
        select: "image name price",
      });
  
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found!",
        });
      }
  
      const validItems = cart.items.filter(
        (productItem) => productItem.productId
      );
  
      if (validItems.length < cart.items.length) {
        cart.items = validItems;
        await cart.save();
      }
  
      const populateCartItems = validItems.map((item) => ({
        productId: item.productId._id,
        image: item.productId.image,
        name: item.productId.name,
        price: item.productId.price,
          quantity: item.quantity,
      }));
  
      res.status(200).json({
        success: true,
        data: {
          ...cart._doc,
          items: populateCartItems,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  };
  
  export const updateCartItemQty = async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
  
      if (!userId || !productId || quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid data provided!",
        });
      }
  
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found!",
        });
      }
  
      const findCurrentProductIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
  
      if (findCurrentProductIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Cart item not present !",
        });
      }
  
      cart.items[findCurrentProductIndex].quantity = quantity;
      await cart.save();
  
      await cart.populate({
        path: "items.productId",
        select: "image title price salePrice",
      });
  
      const populateCartItems = cart.items.map((item) => ({
        productId: item.productId ? item.productId._id : null,
        image: item.productId ? item.productId.image : null,
        name: item.productId ? item.productId.name : "Product not found",
        price: item.productId ? item.productId.price : null,
    
        quantity: item.quantity,
      }));
  
      res.status(200).json({
        success: true,
        data: {
          ...cart._doc,
          items: populateCartItems,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  };
  
  export const deleteCartItem = async (req, res) => {
    try {
      const { userId, productId } = req.params;
      if (!userId || !productId) {
        return res.status(400).json({
          success: false,
          message: "Invalid data provided!",
        });
      }
  
      const cart = await Cart.findOne({ userId }).populate({
        path: "items.productId",
        select: "image title price",
      });
  
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found!",
        });
      }
  
      cart.items = cart.items.filter(
        (item) => item.productId._id.toString() !== productId
      );
  
      await cart.save();
  
      await cart.populate({
        path: "items.productId",
        select: "image title price",
      });
  
      const populateCartItems = cart.items.map((item) => ({
        productId: item.productId ? item.productId._id : null,
        image: item.productId ? item.productId.image : null,
        name: item.productId ? item.productId.name : "Product not found",
        price: item.productId ? item.productId.price : null,
        
        quantity: item.quantity,
      }));
  
      res.status(200).json({
        success: true,
        data: {
          ...cart._doc,
          items: populateCartItems,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  };