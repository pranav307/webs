import mongoose, {Schema} from "mongoose"

const OrderSchema =new Schema({
  userId:String,
  cartId:String,
  cartItems:[
    {
        productId:String,
        name:String,
        image: String,
      price: String,
      quantity: Number,
         }, ],

         addressInfo:{
            addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
         },
         orderStatus: String,
         paymentMethod: String,
         paymentStatus: String,
         totalAmount: Number,
         orderDate: Date,
         orderUpdateDate: Date,
         paymentId: String,
         payerId: String,
});

export const ordermodels = mongoose.model("Order",OrderSchema);