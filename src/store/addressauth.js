import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState={
    isLoading : false,
    addressList:[],
};

export const addNewAddress =createAsyncThunk(
    '/address/addNewAddress',
    async(formdata) =>{
        const response =await axios.post("/api/adding",
        formdata)
    console.log(`${response?.data} adrress is created`)
    return response?.data;
        }
)

export const fetchAllAddresses=createAsyncThunk(
    '/address/fetch',
    async(userId)=>{
        const response = await axios.get(`/api/fetched/${userId}`)

        return response?.data;
    }
)

export const editaddress=createAsyncThunk(
    '/api/editAddress',
    async({userId,addressId,formdata})=>{
        const response= await axios.put(`/api/updateadd/${userId}/${addressId}`,
            formdata
        )
        return response?.data;
    }
)

export const deleteAddress = createAsyncThunk(
    "/addresses/deleteAddress",
    async ({ userId, addressId }) => {
      const response = await axios.delete(
        `/api/deleteadd/${userId}/${addressId}`
      );
  
      return response?.data;
    }
  );

  const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(addNewAddress.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(addNewAddress.fulfilled, (state, action) => {
          state.isLoading = false;
        })
        .addCase(addNewAddress.rejected, (state) => {
          state.isLoading = false;
        })
        .addCase(fetchAllAddresses.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchAllAddresses.fulfilled, (state, action) => {
          state.isLoading = false;
          state.addressList = action.payload.data || [];
        })
        .addCase(fetchAllAddresses.rejected, (state,action) => {
          state.isLoading = false;
          state.addressList = [];
          console.error("Fetch addresses failed:", action.payload);
        });
    },
  });

  export default addressSlice.reducer;