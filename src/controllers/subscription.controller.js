import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    // TODO: toggle subscription
    if(!isValidObjectId(channelId)){
        throw new ApiError(400,"invalid channelId");
    }

    const isSubscribed = await Subscription.findOne({
        subscriber:req.user?._id,
        channelId:channelId
    })

    if(isSubscribed){

        await  Subscription.findByIdAndDelete(isSubscribed._id)
       return res
       .status(200)
       .json(new ApiResponse(200,{subscribed:false},"channel Unscribed successfully"))
    }

    const subscribed= await Subscription.create({
        subscriber:req.user?._id,
        channelId:channelId
    })

    return res
    .status(200)
    .json(new ApiResponse(200,{subscribed:true},"channel Subscribed successfully"))

    
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params

    if(!isValidObjectId(channelId)){
        throw new ApiError(400,"channel id is invalid")
    }

    const doesUserExist = await User.findById(channelId);

    if(!doesUserExist){
        throw new ApiError("400","user does'nt exist")
    }

    //* write the  aggregation pipelines for the getting the id


})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params
    if(!isValidObjectId(subscriberId)){
        throw new ApiError(400,"Subscriber id is not valid")
    }

    // check for the user existence 
    const user = await User.findById(subscriberId);

    if(!user){
        throw new ApiError(400,"unable to found the user")
    }

    //* write the aggregation pipeLines for getting the exact id
    




})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}