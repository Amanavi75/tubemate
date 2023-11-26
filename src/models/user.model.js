import mongoose, {Schema} from "mongoose";

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
      fullname: {
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




export const User = mongoose.model("User", userSchema)