import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { Contactus, getmessage } from "../controller/Contact.controller.js";
const router = Router()

router.route("/ContactUs").post(verifyJWT, Contactus)
router.route("/ContactUs/:id").get(verifyJWT, getmessage)
export default router