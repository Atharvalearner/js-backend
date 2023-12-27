import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,   //cloudnary URL
        required: true,
    },
    coverImage: {       //cloudnary URL
        type: String,
    },
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
},{timestamps : true});

userSchema.pre("save", async function (next) {      // function for pre execution of some methods like checking the password is modified or not.
    if(!this.isModified("password"))
        return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password){   // function for checking password is correct or not and campare it with encripted password of bcrypt library/packege
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){        // function for generate the Access token from id,email,username and fullname
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY      // each token having the validity after that it update
        }
    )
}
userSchema.methods.generateRefreshToken = function(){       // function for generate the Refresh token, it will only refresh id.
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,    // each token having the validity after that it update
        }
    )
}

export const User = mongoose.model("User",userSchema);