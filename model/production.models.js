import mongoose, { Schema } from "mongoose";

const ProductionSchema = new Schema({
    name: {
        type: String,
        
        trim: true,
    },
    description: {
        type: String,
        
        trim: true,
    },
    price: {
        type: Number,
        default:0,
    },
    category: {
       type:String,
    },
    brand: {
        type: String,
        
    },
    stock: {
        type: Number,
        
        default: 0,
    },
    averageReview:{
          type:Number,
          default:0,
    },
    image: 
        {
           type:String, // Assuming you store image URLs
             // Specify the image type or purpose, e.g., 'thumbnail', 'gallery'
        },
    
   /* ratings: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', // Make sure this matches your User model name
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: { type: String },
        },
    ], */
    
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps automatically
});

// Export the model
export const production = mongoose.model("Production", ProductionSchema);
