import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState={
    cartItems:[],
    isLoading:false,
};

export const addToCart=createAsyncThunk(
    "/cart/addtocart",
    async({userId,productId,quantity})=>{
        const response =await axios.post('/api/add',{
            userId,
            productId,
            quantity
        });
        console.log(response.data,"response.data")
        return response.data;
    }
);

export const fetchCartItems=createAsyncThunk(
    "/cart/fetchcartitems",
    async(userId)=>{
        const response =await axios.get(`/api/get/${userId}`);
        console.log(response.data,"fetchcartitems data");
        return response.data;
    }
)


export const updateCartQuantity = createAsyncThunk(
    "cart/updateCartQuantity",
    async ({ userId, productId, quantity }) => {
      const response = await axios.put(
        "/api/update-cart",
        {
          userId,
          productId,
          quantity,
        }
      );
  
      return response.data;
    }
  );

  export const deleteCartItem = createAsyncThunk(
    "cart/deleteCartItem",
    async ({ userId, productId }) => {
      const response = await axios.delete(
        `/api/deletecart/${userId}/${productId}`
      );
  
      return response.data;
    }
  );


  const shoppingCartSlice=createSlice({
    name:"shoppingCart",
    initialState,
    reducers:{
      ClearCart:(state)=>{
        state.cartItems=[];
      },
    },
    extraReducers:(builder)=>{
        builder.addCase(addToCart.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addToCart.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.cartItems=action.payload.data;
        })
        
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});
 export const {ClearCart} =shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;