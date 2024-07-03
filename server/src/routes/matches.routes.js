import { Router } from "express";
import { verifyJWT } from '../middleware/auth.middleware.js'
import { getmatches,createMatch } from "../controller/matches.controller.js";

const router = Router()
router.route("/creatematch").post(verifyJWT,createMatch)
router.route("/getmatch").get(verifyJWT, getmatches)

export default router