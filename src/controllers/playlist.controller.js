import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {Video} from "../models/video.model.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body

    //TODO: create playlist

    if(!(name|| description)){
        throw  new ApiError (404,"name and description is required")
    } 
    // edge case for the fetching the name and description of the playlist from the body

    const playlist = await Playlist.create({
        name:name,
        description:description,
        owner:req.user?._id,
    })

    if(!playlist){
        throw new ApiError(404,"error in creating the playlist")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,playlist,"Playlist created successfully"))

})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    //TODO: get user playlists
    if(!isValidObjectId(userId)){
        throw new ApiError(400,"userid is invalid")
    }
    const userPlayList = await Playlist.find({ owner: userId })

    if(!userPlayList){
        throw new ApiError(404,"error in finding playList")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,userPlayList,"playlist generated successfully"))


})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    //TODO: get playlist by id
    if(!isValidObjectId(playlistId)){
        throw new ApiError(400,"playListId is invalid")
    }

    const playList = await Playlist.findById(playlistId);

    if(!playList){
        throw new ApiError(400,"unable to find playlist")
    }


    return res
    .status(200)
    .json( new ApiResponse(200,playList,"playList successfully Found"))



})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params

    if(!isValidObjectId(playlistId,videoId)){
        throw new ApiError(400,"playlistId or videoId is invalid")
    }

    const playlist = await Playlist.findById(playlistId)
    const video = await    Video.findById(videoId)
    
    if(!(playlist || video)){
        throw new ApiError(404,"playlist or video Not found")
    }

    if(playlist.owner?.toString() && video.owner.toString() !== req.user._id){
        throw new ApiError(400,"only owner can remove video from the playList")

    }

    const updatedPlayList = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $addToSet:{
                videos:videoId
            }

        },
        {new:true}
    )

    if(!updatedPlayList){
        throw new ApiError(404,"error in adding video to playlist")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,updatedPlayList,"video added successfully to the playList"))
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist

    if(!isValidObjectId(playlistId,videoId)){
        throw new ApiError(400,"playlistId or videoId is invalid")
    }

    const playlist = await Playlist.findById(playlistId)
    const video = await    Video.findById(videoId)
    
    if(!(playlist || video)){
        throw new ApiError(404,"playlist aur video Not found")
    }

    if(playlist.owner?.toString() && video.owner.toString() !== req.user._id){
        throw new ApiError(400,"only owner can remove video from the playList")

    }

    const updatedPlayList = await Playlist.findByIdAndUpdate(
        playlistId,{
            $pull:{
                video:videoId
            },
        },
        {new:true}
    )

    if(! updatedPlayList){
        throw new ApiError(404,"error in removing video from the playList")

    }

    return res
    .status(200)
    .json(new ApiResponse(200,updatedPlayList,"video removed successfully"))

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist

    if(!isValidObjectId(playlistId)){
        throw new ApiError(400,"playlist id is invalid")
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    if (playlist.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(400, "only owner can delete the playlist");
    }

    await Playlist.findByIdAndDelete(playlistId)

    return res
    .status(200)
    .json(new ApiResponse(200,playlist,"playList successfully deleted"))

    
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    //TODO: update playlist
    if(!(name|| description)){
        throw new ApiError(404,"name and description are required")
    }

    if(!isValidObjectId(playlistId)){
        throw new ApiError(500,"playlist id invalaid")
    }

    const playlist = await Playlist.findById(playlistId)

    if(!playlist){
        throw new ApiError(404,"playlist not found")
    }

    //* we have added a edge case to verify... so that only owner can edit the playlist
    if(playlist.owner.toString()!==req.user?._id.toString()){
        throw new ApiError(408,"only owner can update the playlist")

    }

    const updatedPlayList = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $set: {
                name:name,
                description:description,

            },

        },
        {new:true}
        
    )

    if(!updatedPlayList){
        throw new ApiError(404, " error in updating the playlist")
        
    }

    return res
    .status(200)
    .json(new ApiResponse(200,updatedPlayList,"playlist updated successfully"))

   
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}