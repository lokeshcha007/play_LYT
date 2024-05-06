import {asyncHandler} from "../utils/asyncHandler.js"
import {apiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/fileupload.cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js"

const registerUser = asyncHandler(async (req,res)=>{


   //user details
   const {email,username,fullname,password}= req.body
   console.log(email);
   console.log(fullname,password);
   

   //validations
   if(
      [username,fullname,password,email].some((field)=> field?.trim()==="")
   ){
       throw new apiError(400,"All fields are required")
   }
   
   //user already exists ? or not
   const existedUser = await User.findOne({
      $or :[{username},{email}]
   })
   if(existedUser){
      throw new apiError(409,"User with email or username already exists")
   }

   //check coverImage,avatar here we are getting local path from multer
   const avatarLocalPath = req.files?.avatar[0].path

   const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
   
   if(!avatarLocalPath){
      throw new apiError(400,"Avatar file is required")
   }

   //Upload them to cloudinary
   const avatarUploaded = await uploadOnCloudinary(avatarLocalPath)
   const coverImageUploaded = await uploadOnCloudinary(coverImageLocalPath)

   if(!avatarUploaded){
      throw new apiError(400,"Avatar file is required")
   }

   //Create an entry in db
   const user = await User.create({
      fullname,
      avatar:avatarUploaded.url,
      coverImage:coverImageUploaded?.url || "",
      email,
      password,
      username:username.toLowerCase()
   })
   //here it will remove the password without uploading
   //remove password & refreshToken
   const userCreated = await User.findById(user._id).select(
      "-password -refreshToken"
   )
   if(!userCreated){
      throw new apiError(500,"Something went wrong while registering")
   }

   return res.status(201).json(
      new apiResponse(200,userCreated,"User Created Succesfully"),
      //console.log(res)
   )

})

export {registerUser}