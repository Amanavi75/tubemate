import {asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req,res)=>{
    //* steps 
   // get user details from frontend 
   //validations- the field shoudn't be empty
   //check if user already exists: username or email 
   // check for thr images , check for the avatar ... (upload it on cloudinary server)
   // create user Object - create entry in db 
   // remove password and refresh token field from response 
   //check for the user creation 
   //return res

   const {fullName,email,username,password} = req.body // step 1

   //if(fullName===""){
    //throw new ApiError(400,"full Name is required")
   //} common way to check validation 

   // for optimization we will use  .some() method 

   if(
    [fullName,email,username,password].some((field)=>
        field?.trim()==="") // will check there shouldn't be any empty field
    ){
       throw new ApiError(400,"all fields are required");
    }
   
   const existedUser = await User.findOne({
        $or:[{ email }, { username }]
    })

    if(existedUser){
        throw ApiError(409,"user already Exist")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if(!avatarLocalPath){
        throw new ApiError (400,"avatar file is required");
    } // checking validation for the avatar 

   const avatar= await uploadOnCloudinary(avatarLocalPath);
   const coverImage= await uploadOnCloudinary(coverImageLocalPath);

   if(!avatar){
    throw new ApiError(400,"avatar file is required");
   }

   const user = await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage.url || "",
    email,
    password,
    username:username.toLowerCase(),

   

   })
   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken" // will ignore these two password and refreshToken 
   )

   if(!createdUser){
    throw new ApiError (500,"something went wrong while registering the user")
   }

   return res.status(201).json(
    new ApiResponse(200,createdUser,"user Registered successfully")
   )

   
})





export {registerUser}