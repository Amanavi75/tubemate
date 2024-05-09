import { Router } from "express";

import  {getChannelStats,getChannelVideos} from "../controllers/dashboard.controller"
import { verifyJWT } from "../middlewares/auth.middleware";


const router = Router();

router.route("/channelstats").get(verifyJWT,getChannelStats);
router.route("/channelVideos").get(verifyJWT,getChannelVideos);

export default router;

