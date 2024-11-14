import { Addressmodel } from "../model/addressmodel.js";

export const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const newlyCreatedAddress = new Addressmodel({
      userId,
      address,
      city,
      pincode,
      notes,
      phone,
    });

    await newlyCreatedAddress.save();

    res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};
export const fetchAllAddress = async (req, res) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User id is required!",
        });
      }
  
      const addressList = await Addressmodel.find({ userId });
       
      res.status(200).json({
        success: true,
        data: addressList,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  };

  export const editAddress = async (req, res) => {
    try {
      const { userId, addressId } = req.params;
      const formData = req.body;
  
      if (!userId || !addressId) {
        return res.status(400).json({
          success: false,
          message: "User and address id is required!",
        });
      }
  
      const address = await Addressmodel.findOneAndUpdate(
        {
          _id: addressId,
          userId,
        },
        formData,
        { new: true }
      );
  
      if (!address) {
        return res.status(404).json({
          success: false,
          message: "Address not found",
        });
      }
  
      res.status(200).json({
        success: true,
        data: address,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  };
  
  
  
export const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required!",
      });
    }

    const address = await Addressmodel.findOneAndDelete({ _id: addressId, userId });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};
    
