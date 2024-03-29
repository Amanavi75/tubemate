import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Tweet } from "../models/tweet.model.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    //TODO: toggle like on video
    if(!isValidObjectId(videoId)){
        throw new ApiError(400, "videoId is not valid")
    }

    const likedAlready = await Like.findOne({
        video:videoId,
        likedBy:req.user?._id
    });

    //* check if the video is already Liked if it is then it will be unliked
    if(likedAlready){
        await Like.findByIdAndDelete(likedAlready?._id)


        return res
        .status(200)
        .json(new ApiResponse(200,"video unliked Successfully"))
    }

    await Like.create({
        video:videoId,
        likedBy:req.user?._id
    })

    return res
    .status(200)
    .json(new ApiResponse(200,"Liked create successfully"))
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment
    if(!isValidObjectId(commentId)){
        throw new ApiError(400,"comment id is invalid")
    }

    const likedAlready = await Like.findOne({
        comment:commentId,
        likedBy:req.user?._id
    })

    if(likedAlready){
        await Like.findByIdAndDelete(likedAlready?._id)

        return res
        .status(200)
        .json(new ApiResponse(200,"comment unliked successfully "))
    }

    await Like.create({
        comment:commentId,
        likedBy:req.user?._id
    })

    return res
    .status(200)
    .json(new ApiResponse(200,"comment succesfully Liked"))


})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet
    if(!isValidObjectId(tweetId)){
        throw new ApiError(400,"invalid tweetId")
    }

    const likedAlready = Like.findOne({
        tweet:tweetId,
        likedBy:req.user?._id
    })

    if(likedAlready){
        await Like.findByIdAndDelete(likedAlready?._id);
    }

    await Like.create({
        tweet: tweetId,
        likedBy: req.user?._id,
    });

    return res
    .status(200)
    .json(new ApiResponse(200,"Liked tweet successfully"))
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}