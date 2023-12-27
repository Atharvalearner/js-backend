import { asyncHandler } from "../utils/asyncHandlers.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponce } from "../utils/ApiResponce.js";

const registerUser = asyncHandler( async (req,res) => {
    const {fullname, email, username, password } = req.body
    console.log("email: ",email); 

    if(
        [fullname,email,username,password].some((field) => 
        field?.trim() === "")
    ){
        throw new ApiError(400,"All feilds are required")
    }

    const existedUser = User.findOne({
        $or: [{ username },{ email } ]
    })

    if(existedUser){
        throw new ApiError("user with email or username is already exists.");
    }

    const avtarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avtarLocalPath){
        throw new ApiError(400,"Avatar file is required");
    }

    const avatar = await uploadCloudinary(avtarLocalPath);
    const coverImage = await uploadCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(409,"Avatar is required");
    }

    User.create({
        fullname,
        avtar: avtar.url,
        coverImage: coverImage.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponce(200,createdUser,"user registerd succesfully");
    )

} )

export {
    registerUser
};