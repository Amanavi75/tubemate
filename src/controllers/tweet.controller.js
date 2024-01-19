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

     //* error in the simple query we have to use the aggregation pipeLines
    return res
    .status(200)
    .json(new ApiResponse(200,getTweet,"tweet successfully found"))
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
     const {content} = req.body;
     const {tweetId} = req.body;


    if(!isValidObjectId(tweetId)){
        throw new ApiError(404, " unable to find the tweetId or userId")
    }

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        throw new ApiError(404, "Tweet not found");
    }


    if(tweet.owner?.toString()!==req.user._id){
        throw new ApiError(400, " only woner of the tweet can update or edit the tweet")
    }
    const updatedTweet = await Tweet.findByIdAndUpdate(
        tweetId,{
            $set:{
                content:content
            }
        },
        {new:true}
    )

    if(!updatedTweet){
        throw new ApiError(400,"some error in updating the tweet")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,updatedTweet,"tweet Updated successfully"));



})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    const {tweetId} = req.body

    if(!isValidObjectId(tweetId)){
        throw new  ApiError(400,"tweetId is not valid")
    }

    const tweet = await Tweet.findById(tweetId);

    if(!tweet){
        throw new ApiError(404,"tweet not found")
    }

    if(tweet.owner?.toString()!==req.user._id){
        throw new ApiError(400, "only owner can delete his tweet")
    }

    const deleteTweet = await Tweet.findByIdAndDelete(tweetId)

    if(!deleteTweet){
        throw new ApiError(400, "error in deleting the tweet")

    }

    return res
    .status(200)
    .json(new ApiResponse(200,"tweet deleted successfully"))

})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}