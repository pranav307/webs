import mongoose, { Schema } from "mongoose";


const CartSchema= new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          items: [
            {
              productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Production",
                required: true,
              },
              quantity: {
                type: Number,
                required: true,
                min: 1,
              },
            },
          ],
        },
        {
          timestamps: true,
        }
    
)


export const Cart=mongoose.model('cartschema',CartSchema);