import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




const initialState ={
  
    isLoading:false,
    reviews:[],
};

export const addReview=createAsyncThunk(
    "/review/add",
    async(formdata)=>{
        const response =await axios.post('/api/addreview',formdata);
        return response.data;
    }
)

export const getReview=createAsyncThunk(
    "/review/get",
    async(id)=>{
        const response=await axios.get(`/api/getreview/${id}`);
        return response.data;
    }
)

const reviewSlice=createSlice(
    {
        name:"reviewSlice",
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(getReview.pending,(state)=>{
                state.isLoading =true;
            }).addCase(getReview.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.reviews=action.payload.data;
            }).addCase(getReview.rejected,(state)=>{
                state.isLoading=false;
                state.reviews=[];
            })

            
        }
    }
)


export default reviewSlice.reducer;