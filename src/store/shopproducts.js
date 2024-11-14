import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"; // Missing import

const initialState = {
  isLoading: false,
  productListshop: [],
  productDetails:null,
};

export const fetchAllFilterProducts = createAsyncThunk(
  "/products/productfilter",
  async ({filterParams ,sortParams}) => {
    console.log(fetchAllFilterProducts,"fetchAllfiltersproduct");
    const query=new URLSearchParams({
      ...filterParams,
      sortBy:sortParams,
    });
    const result = await axios.get(`/api/productfilter?${query}`);
    console.log("API Result:", result.data); // Add this log to verify the response
    return result?.data; // Ensure you're returning the data correctly
  }
);

export const fetchProductDetails=createAsyncThunk(
  "/products/getproductdetails",
  async(id)=>{
    const result =await axios.get(`/api/getproductdetails/${id}`);
    console.log("getproductdetails",result?.data);
    return result?.data;
  }
)
const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails:(state)=>{
      state.productDetails=null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilterProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilterProducts.fulfilled, (state, action) => {
        console.log("Redux Payload:", action.payload.data); // Add log to check the payload received
        state.isLoading = false;
        state.productListshop = action.payload.data; // Make sure this line is setting the data correctly
      })
      .addCase(fetchAllFilterProducts.rejected, (state) => {
        state.isLoading = false;
        state.productListshop = []; // Reset on error
      })
      .addCase(fetchProductDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  }
  
});

export const {setProductDetails} = shoppingProductSlice.actions;
export default shoppingProductSlice.reducer;
