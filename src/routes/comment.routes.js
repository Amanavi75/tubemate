import { Router } from "express";
import {getVideoComments, 
    addComment, 
    updateComment,
     deleteComment} from "../controllers/comment.controller.js"

import { verifyJWT } from "../middlewares/auth.middleware.js";
import router from "./user.routes.js";

const router = Router(); // creating instance for using the router object 


     router.route("/comments").get( verifyJWT, getVideoComments);
     router.route("/addComment").post(verifyJWT, addComment);
     router.route("/updatecomment").patch(updateComment);
     router.route("/deletecomment").patch(deleteComment);


    export default router ;
