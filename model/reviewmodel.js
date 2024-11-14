
import mongoose from "mongoose";
import { Schema } from "mongoose";

const ProductReviewSchema = new Schema(
    {
      productId: String,
      userId: String,
      username: String,
      reviewMessage: String,
      reviewValue: Number,
    },
    { timestamps: true }
  );

  export  const reviewmodel =mongoose.model("review",ProductReviewSchema);