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
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }