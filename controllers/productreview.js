import { ordermodels } from "../model/ordermodels.js";
import { reviewmodel } from "../model/reviewmodel.js";
import {production} from "../model/production.models.js";



export const addProductReview=async(req,res)=>{
    try {
         const {productId ,userId,username,reviewMessage,reviewValue} =req.body;
         const order =await ordermodels.findOne({
            userId,
            "cartItems.productId":productId,
            //orderStatus:"confirmed",
         });
         if(!order){
            return res.status(403).json({
                success:false,
                message:"you need purchase product to review it",
            })
         }
    const checkExistingReview =await reviewmodel.findOne({
        productId,
        userId,
    })
    if(checkExistingReview){
        return res.status(400).json({
            success:false,
            message:"you already reviewed this product",
        });
    }
    const newReview =new reviewmodel({
        productId,
        userId,
        username,
        reviewMessage,
        reviewValue,
    });
    await newReview.save();
    const reviews =await reviewmodel.find({productId});
    const totalReviewsLength =reviews.length;
    const averageReview = reviews.reduce((sum,reviewItem)=> sum + reviewItem.reviewValue,0)/ totalReviewsLength;
    await production.findByIdAndUpdate(productId,{averageReview});
    res.status(200).json({
        success:true,
        data :newReview,
    });


    } catch (error) {
       
        res.status(500).json({
            success:false,
            message:"error",
        })
    }
}

export const getProductReviews =async(req,res)   =>{
    try {
        const {productId} =req.params;
        const reviews =await reviewmodel.find({productId});
        res.status(200).json({
            success:true,
            data:reviews,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"error",
        })
    }
}