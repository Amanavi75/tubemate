import {asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"

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

   const {fullName,email,userName,password} = req.body // step 1

   //if(fullName===""){
    //throw new ApiError(400,"full Name is required")
   //} common way to check validation 

   // for optimization we will use  .some() method 

   if(
    [fullName,email,userName,password].some((field)=>
        field?.trim()==="") // will check there shouldn't be any empty field
    ){
       throw new ApiError(400,"all fields are required")
    }
   
   
})





export {registerUser}