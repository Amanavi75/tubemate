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
        unique: true,
        lowecase: true,
        trim : true,
      },

   }
)








export const User = mongoose.model("User", userSchema)