import mongoose from "mongoose"

const AddressSchema = new mongoose.Schema(
  {
   userId:{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  { timestamps: true }
);

export const Addressmodel = mongoose.model("Address", AddressSchema);