import mongoose, { Schema } from "mongoose";
  const categorySchema= new Schema(
    {
        name:{
            type:String,
            required:true,
            minlength: [3, 'Category name must be at least 3 characters long'],
            maxlength: [10, 'Category name must not be at 10 characters long'],
            trim:true,
            unique:true,
        },
        description:{
            type:String,
            minlength: [5, 'Category name must be at least 3 characters long'],
            maxlength: [15, 'Category name must not be 15 characters long'],
          //  required:true,
            trim:true, 
        },
   /*    parentcategory:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Category',// ref it to create sub category
            default:null,
        },*/

    },{
        timestamps:true,
    }
  )
  export const category =mongoose.model('Category',categorySchema);