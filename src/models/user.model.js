import mongoose, {Schema} from "mongoose";
import  Jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema (
    {
      username: {
        type:String,
        required: true,
        unique: true,
        lowecase: true,
        trim : true,
        index : true   // used to enable the sarching field in mongodb database
      },
     email: {
        type:String,
        required: true,
        unique: true,
        lowecase: true,
        trim : true,
      },
      fullName: {
        type:String,
        required: true,
        trim : true,
        index: true
      },
      avatar:{
        type: String, // se will use cloudnary 
        required:true,
      },
      coverImage:{
        type: String, // se will use cloudnary 
      },
      watchHistory:[
             {
                type: Schema.Types.ObjectId,
                ref:"Video",

             }
      ],
      password: {
        type: String,
        required: [true,'password is required']
      },
      refreshToken: {
        type: String
      },
      
   },
   {
    timestamps: true,
   }
)


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10) // encrypting password
    next()
})
// direct encyption is not possible so we will use mongoose hooks 

userSchema.methods.isPasswaordCorrect = async function (password){
    return await bcrypt.compare(password,this.password)
}
//check for the password correction 
//has a return type of true and false 

// jwt is type of key 

userSchema.methods.generateAccessToken = function (){
      return  Jwt.sign(
        {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName,
        },
       process.env.ACCESS_TOKEN_SECRET,
       {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
       }
       )
}
//sign method use to generate token 

userSchema.methods.generateRefreshToken = function (){
    return  Jwt.sign(
        {
        _id: this._id,
        },
       process.env.REFRESH_TOKEN_SECRET,
       {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
       }
       )
    
}

export const User = mongoose.model("User", userSchema)


