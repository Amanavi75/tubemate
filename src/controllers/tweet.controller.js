import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const {content} = req.body;

    if(!content){
        throw new ApiError(404,"content is required");
    }

    const tweet = await Tweet.create({
        content:content,
        owner:req.user?._id
    })

    if(!tweet){
        throw new ApiError(404,"unable to create tweet")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,tweet,"tweet created successfully"))
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    const {userId} = req.params;

    //todo : error in this controller
    if(!isValidObjectId(userId)){
        throw new ApiError(400,"userId is invalid")
    }

    if(tweet.owner?.toString()  !== req.user._id){
        throw new ApiError(400,"only owner can remove video from the playList")

    }

    const getTweet = await Tweet.findById(userId);

    if(!getTweet){
        throw new ApiError(404,"unable  to found tweet")

    }

    return res
    .status(200)
    .json(new ApiResponse(200,getTweet,"tweet successfully found"))
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
     

})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}