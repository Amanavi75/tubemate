import { Router } from "express";
import {registerUser} from "../controllers/user.controller.js"
 import {upload} from "../middlewares/multer.middleware.js"

const router = Router()

//adding  upload.field middleware so that we will able to upload file during registration 
router.route("/register").post(
    upload.fields([ 
      {
        name: "avatar",
        maxCount:1
      },
      {
        name:"coverImage",
        maxCount:1
      }
    ]),
    registerUser)


export default router;

