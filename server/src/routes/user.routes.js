import { Router } from 'express'
import { Signup, login, logout, newrefreshToken, updatepassword, getcurrentuser, verifyOTPEmail } from '../controller/user.controller.js'
import { verifyJWT } from '../middleware/auth.middleware.js'
import { upload } from '../middleware/multer.middleware.js'
const router = Router()
router.route("/signup").post(upload.single('avatarImage'), Signup)
router.route("/signup/verify").post(verifyOTPEmail)
// router.route("/signup/phoneno").post(upload.single('avatarImage'), SignupPhone)
// router.route("/signup/phoneno/verify").post(verifyOTP)
router.route("/login").post(upload.single('avatarImage'), login)
// router.route("/login/phoneno").post(upload.single('avatarImage'), loginphone)
router.route("/logout").post(verifyJWT, logout)
router.route("/refreshtoken").post(newrefreshToken)
router.route("/current-user").get(verifyJWT, getcurrentuser);
router.route("/forgot-password").post(verifyJWT, updatepassword)
export default router