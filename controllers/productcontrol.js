//import { response } from "express";
import { production } from "../model/production.models.js";



/* export const createProduct = asyncHandler(async (req, res) => {
    // Destructure required fields from the request body
    const { name, description, price, category, brand, stock} = req.body;

    // Validate required fields
    if (!name) return res.status(400).send({ error: "Name is required" });
    if (!description) return res.status(400).send({ error: "Description is required" });
    if (!price) return res.status(400).send({ error: "Price is required" });
    if (!category) return res.status(400).send({ error: "Category is required" });
    if (!brand) return res.status(400).send({ error: "Brand is required" });
   
    if (!stock) return res.status(400).send({ error: "Stock is required" });
    

    // Create product object using the validated data
    const product = new production({
        name,
        description,
        price,
        category,
        brand,
        stock,
        
        
    });

    // If image exists, upload to Cloudinary (commented out for now)
     
    const imageLocalPath = req.files?.Images?.[0]?.path; 
    if (imageLocalPath) {
        const uploadedImage = await uploadOnCloudinary(imageLocalPath);
        product.Images.push({ data: uploadedImage.url, type: "image" });
    } 
    

    // Save the new product to the database
    await product.save();

    // Send a success response with the created product
    return res.status(200).json(
        new ApiResponse(200, product, "Product created successfully")
    );
}); 
  

export const getProduct=asyncHandler(async(req,res)=>{
    const productId= req.params.id;
    const product=await production.findById(productId)
    .populate('category')
    .populate('ratings.user')
    if(!product){
        new ApiError(400,"product not found")
    }
    return res.status(200).json(
        new ApiResponse (200,"product created succesffuly")
    )
});
export const getAllProduct = asyncHandler(async (req, res) => {
    const products = await production.find({}).populate('category').populate('ratings.user');
    if (!products || products.length === 0) {
        throw new ApiError(404, "No products found");
    }
    return res.status(200).json(
        new ApiResponse(200, products, "Products retrieved successfully")
    );
});

export const updateProduct= asyncHandler(async(req,res)=>{
    const {name,description,price,category,ratings,brand,stock}=req.body
   // const image =req.files
    if(!name || !description || !price || !category ||ratings || brand || stock ){
        throw new ApiError(400,"all fields are required")
    }
 if(!image){
        throw new ApiError(400,"image required")
    }  
      const updateProduct= await production.findByIdAndUpdate(
        req.params.id,
        {
            $set:{
                name,
                description,
                price,
                category,
                ratings,brand,stock
            }
        },
            {new:true} );
        
          //write acode to update image and also delete old one 
          
          return res.status(200).json(
            new ApiResponse(200,updateProduct,"product updated successfully")
          )
});
export const deleteProduct=asyncHandler(async(req,res)=>{
    
    
    await production.findByIdAndDelete(req.params.id)
    return res.status(200).json(
        new ApiResponse(200,"product deleted succesffully")
    )
})

export const Productprofile = asyncHandler(async(req,res)=>{
    const productids=await production.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(req.params.productids)
            }
        },
        {
            $lookup:{
                from:"categories",
                localField:"category",
                foreignField:"_id",
                as:"productinfos",
            }
        },
        {
        $lookup:{
                    from:"users",
                    localField:"ratings.user",
                    foreignField:"_id",
                         as:"userprofile",
        }
    },
    {
        $unwind:"$userprofile",
    },
        {
            $unwind:"$productinfos",
        },
        {
        $project:{
            "productinfos.name":1,
            "productinfos.description":1,
            "productinfos.categoty":1,
            brand:1,
            stock:1,
            Images:1,
           averageRating:1,
           "ratings.rating":1,
           "ratings.comment" :1,
            username:"$userprofile.username",
            email:"$userprofile.email",
            "userprofile.role":1,
        }
        },

    ])
}) 

export const productfilter=asyncHandler(async(req,res)=>{
    const {checked,radio} =req.body;
    let arg ={};
    if(checked.length>0) arg.category={$in:checked};
    if(radio.length) arg.price={$gte:radio[0],$lte:radio[1]};

    const products=await production.find(arg);
      if(products  && products.length>0){
        return res.status(200).json(
            new ApiResponse(200,products,"product filtered success")
        )
      }
      else{
        throw new ApiError(400,"no product match filter")
      }

}); 
//count total product
export const productcount=asyncHandler(async(req,res)=>{
    const total = await production.find({}).estimatedDocumentCount();
    if(!total){
        throw new ApiError(400,"error in counting product");
    }
    return res.status(200).json(
        new ApiResponse(200,total,"product count success")
    )
})

export const productListcontrol=asyncHandler(async(req,res)=>{
    const perpage=6;
    const page=req.params.page ? req.params.page:1;
    const productlist =await production.find({}).select("-Image").skip((page-1)*perpage).limit(perpage).sort({createdAt:-1});
    if(productlist==0){
        throw new ApiError(400,"no productlist fround")
    }
    return res.status(200).json(
        new ApiResponse(200,productlist,"product  listshown successfully")
    )
}) */
    
    export const getFilteredProducts = async (req, res) => {
      try {
        const { category = "", brand = "", sortBy = "price-lowtohigh" } = req.query;
    
        // Initialize filters object
        let filters = {};
    
        // Parse category and brand filters if provided
        if (category) {
          filters.category = { $in: Array.isArray(category) ? category : category.split(",") };
        }
    
        if (brand) {
          filters.brand = { $in: Array.isArray(brand) ? brand : brand.split(",") };
        }
    
        // Sorting logic
        let sort = {};
        switch (sortBy) {
          case "price-lowtohigh":
            sort.price = 1;
            break;
          case "price-hightolow":
            sort.price = -1;
            break;
          case "name-atoz":
            sort.name = 1;
            break;
          case "name-ztoa":
            sort.name = -1;
            break;
          default:
            sort.price = 1;
            sort.name=1; // Default sorting
            break;
        }
    
        // Fetch products with filters and sorting applied
        const products = await production.find(filters).sort(sort);
    
        res.status(200).json({
          success: true,
          data: products,
        });
      } catch (e) {
        console.error("Error fetching filtered products:", e);
        res.status(500).json({
          success: false,
          message: "Some error occurred",
        });
      }
    };
    
    export const getProductDetails = async (req, res) => {
      try {
        const { id } = req.params;
    
        // Find product by ID
        const product = await production.findById(id);
    
        if (!product) {
          return res.status(404).json({
            success: false,
            message: "Product not found!",
          });
        }
    
        res.status(200).json({
          success: true,
          data: product,
        });
      } catch (e) {
        console.error("Error fetching product details:", e);
        res.status(500).json({
          success: false,
          message: "Some error occurred",
        });
      }
    };
    