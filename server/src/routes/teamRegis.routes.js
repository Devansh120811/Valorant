import { Router } from "express";
import { verifyJWT } from '../middleware/auth.middleware.js'
import { upload } from '../middleware/multer.middleware.js'
import { createteam, getUserTeam, getAllteamsRegis, verifyPayment } from "../controller/teamRegis.controller.js";
const router = Router()
router.route("/registration").post(verifyJWT, upload.single("teamImage"), createteam)
router.route("/registration/payment").post(verifyJWT, verifyPayment)
router.route("/userteam").get(verifyJWT, getUserTeam)
router.route("/allteams").get(verifyJWT, getAllteamsRegis)
export default router