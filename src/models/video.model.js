import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoschema = new Schema (
    {
       videoFile :{
        type: String, //cloudnary
        required:true 
       },
      thumbnail :{
        type: String, //cloudnary
        required:true 
       },
       title :{
        type: String, //cloudnary
        required:true 
       },
       description :{
        type: String,
        required:true 
       },
        duration:{
        type: Number, // cloudnary  
        required:true 
       },
       views: {
        type:Number,
        default: 0,
       },
       isPublished: {
        type: Boolean,
        default:true,
       },
       owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
       }
    },
    {
        timestamps:true,
    }
)


videoschema.plugin(mongooseAggregatePaginate)  //plugin for mongooseAggregatePaginate



// aggregation queries in mongodb 
//*we will  mongoose-aggregate-paginate-v2 package for writting thses types of quereis 

export const Video = mongoose.model("Video",videoschema);