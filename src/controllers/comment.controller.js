import mongoose, { isValidObjectId } from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Video } from "../models/video.model.js";

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const {videoId} = req.params;
    const {content} = req.body ;

   if(!content){
    throw new ApiError("content is required")
   }
    const video = await Video.findById(videoId);

    if(!video){
        throw new ApiError("unable to  find video")
    }

    const comment = await Comment.create({
        content:content,
        video:videoId,
        owner:req.user?._id
    })

    if(!comment){
        throw new ApiError(400,"failed to add comment Please try again")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,comment,"comment added successfully"))

})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const {commentId} = req.params;
    const {content} = req.body;

    if(!content) {
        throw new ApiError(400,"content is required")

    }
    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    if(comment.owner.toString()!=req.user?._id.toString()){     
        throw new ApiError(400, "only owner can update his comment")
    }

    const updatedComment = await Comment.findByIdAndUpdate(
        comment?.id,
        {
            $set:{
                content:content
            }
          
        },
        {new:true}
    )

    if(!updatedComment){
        throw new ApiError(400,"unable to update or edit the comment")
    }
    
    return res
    .status(200)
    .json(new ApiResponse(200,updatedComment,"comment edited successfully"))
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const {commentId} = req.params;
   
    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    if(comment.owner.toString()!=req.user?._id.toString()){     
        throw new ApiError(400, "only comment  owner can delete  his comment")
    }

    await Comment.findByIdAndDelete(commentId)

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Comment deleted successfully"));
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }