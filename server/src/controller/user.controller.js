import { asynchandler } from "../utils/asynchandler.js";
import Apierrors from "../utils/Apierrors.js";
import Apiresponse from '../utils/Apiresponse.js'
import { User } from '../models/user.model.js'
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const generateaccesstokenandrefreshtoken = async (id) => {
    try {
        const user = await User.findById(id)
        const accessToken = await user.generateaccesstoken()
        const refreshToken = await user.generaterefreshtoken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new Apierrors(500, "Something went wrong while generating access and refreshtoken.")
    }
}
const Signup = asynchandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password || email.trim() === "" || password.trim() === "") {
        throw new Apierrors(400, "Please provide all the required information");
    }
    const useralreadyexistornot = await User.findOne({
        "email": email
    })
    if (useralreadyexistornot) {
        throw new Apierrors(409, "User already exists")
    }
    let avatarimagelocalpath;
    if (req.file && req.file.path) {
        avatarimagelocalpath = req.file.path
    }
    else {
        throw new Apierrors(400, "Image file is required")
    }
    const image = await uploadOnCloudinary(avatarimagelocalpath)
    if (!image) {
        throw new Apierrors(400, "Image file is required")
    }
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    })
    const OTP = Math.floor(100000 + Math.random() * 900000)
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "OTP for Verification",
        text: `Your OTP for verification is ${OTP}`
    })
    const user = await User.create({
        email,
        password,
        avatarImage: image.secure_url,
        OTP,
        avatarImagepath: avatarimagelocalpath
    })
    const createdUser = await User.findById(user._id).select('-password -refreshToken')
    if (!createdUser) {
        throw new Apierrors(500, "Something went wrong while registering user.")
    }
    // console.log(createdUser)
    return res.status(200).json(new Apiresponse(200, createdUser, "OTP sent Successfully."))

})
const verifyOTPEmail = asynchandler(async (req, res) => {
    const userId = req.params.id
    const { OTP } = req.body
    const user = await User.findById(
        userId)
    if (!user) {
        throw new Apierrors(404, "User does not exists")
    }
    if (OTP === "") {
        return res.status(500).json(new Apiresponse(500, {}, "Please Provide the OTP."))
    }
    // console.log(parseInt(OTP, 10), user.OTP)
    if (parseInt(OTP, 10) !== user.OTP) {
        // console.log(OTP,user.OTP)
        throw new Apierrors(404, "Invalid OTP.")
    }
    user.OTP = undefined
    await user.save({ validateBeforeSave: false })
    const registereduser = await User.findById(user._id).select("-password -refershToken")
    if (!registereduser) {
        throw new Apierrors(500, "Something went wrong while completing registration.");
    }
    return res.status(200).json(new Apiresponse(200, registereduser, "User registered successfully"));
})
// const SignupPhone = asynchandler(async (req, res) => {
//     const { phoneNO, password } = req.body
//     if (!phoneNO || !password || phoneNO.trim() === "" || password.trim() === "") {
//         throw new Apierrors(400, "Please provide all the required information");
//     }
//     const useralreadyexistornot = await User.findOne({
//         "phoneNO": phoneNO
//     })
//     if (useralreadyexistornot) {
//         throw new Apierrors(409, "User already exists")
//     }
//     const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)
//     const OTP = Math.floor(100000 + Math.random() * 900000)
//     await client.messages.create({
//         from: '+15735080981',
//         to: phoneNO,
//         body: `Your OTP is ${OTP}`,
//     })
//     console.log(`OTP send Successfully to ${phoneNO}`)
//     let avatarimagelocalpath;
//     if (req.file && req.file.path) {
//         avatarimagelocalpath = req.file.path
//     }
//     else {
//         throw new Apierrors(400, "Image file is required")
//     }
//     const image = await uploadOnCloudinary(avatarimagelocalpath)
//     if (!image) {
//         throw new Apierrors(400, "Image file is required")
//     }
//     const option = {
//         httpOnly: true,
//         secure: true
//     }
//     const uniqueid = uuidv4()
//     const user = await User.create({
//         phoneNO,
//         password,
//         avatarImage: image.url,
//         OTP,
//         OTPTOKEN: uniqueid,
//         avatarImagepath: avatarimagelocalpath
//     })
//     const createdUser = await User.findById(user._id).select('-password -refreshToken')
//     if (!createdUser) {
//         throw new Apierrors(500, "Something went wrong while registering user.")
//     }

//     return res.status(500).cookie("OTPTOKEN", uniqueid, option).json(new Apiresponse(500, OTP, "OTP Sent Successfully."))

// })
// const verifyOTP = asynchandler(async (req, res) => {
//     const otptoken = req.cookies.OTPTOKEN
//     const { OTP } = req.body
//     const user = await User.findOne({ OTPTOKEN: otptoken })
//     if (!user) {
//         throw new Apierrors(404, "User does not exists")
//     }
//     if (OTP === "") {
//         return res.status(500).json(new Apiresponse(500, {}, "Please Provide the OTP."))
//     }
//     if (parseInt(OTP, 10) !== user.OTP) {
//         throw new Apierrors(404, "Invalid OTP.")
//     }
//     user.OTP = undefined
//     user.OTPTOKEN = undefined
//     await user.save({ validateBeforeSave: false })
//     const registereduser = await User.findById(user._id).select("-password -refershToken")
//     if (!registereduser) {
//         throw new Apierrors(500, "Something went wrong while completing registration.");
//     }
//     res.clearCookie("OTPTOKEN")
//     return res.status(200).json(new Apiresponse(200, registereduser, "User registered successfully"));
// })
const login = asynchandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new Apierrors(400, "email and password is required")
    }
    const user = await User.findOne({
        "email": email
    })
    if (!user) {
        throw new Apierrors(401, "Invalid Credentials")
    }
    const ispasswordcorrect = await user.isPasswordCorrect(password)
    // console.log(ispasswordcorrect)
    if (!ispasswordcorrect) {
        throw new Apierrors(401, 'Invalid Password')
    }
    let avatarimagelocalpath
    if (req.file && req.file.path) {
        avatarimagelocalpath = req.file.path
        // console.log(req.file.path)
    }
    else {
        // console.log(1)
        return res.status(400).json(new Apiresponse(400, {}, "Please provide the image."))
    }
    // console.log(avatarimagelocalpath,user.avatarImagepath)
    if (avatarimagelocalpath !== user.avatarImagepath) {
        return res.status(406).json(new Apiresponse(406, {}, "Please provide the same image."))

    }
    const image = await uploadOnCloudinary(avatarimagelocalpath)
    if (!image) {
        throw new Apierrors(400, "Image file is required")
    }
    const { accessToken, refreshToken } = await generateaccesstokenandrefreshtoken(user._id)
    const loginuser = await User.findById(user._id).select("-password -refreshToken")
    const option = {
        httpOnly: true,
        secure: true,
    }
    return res.status(200).cookie("accessToken", accessToken, option).cookie("refreshToken", refreshToken, option).json(new Apiresponse(200, { user: loginuser, accessToken, refreshToken }, "User Logged in Successfully"))
})
// const loginphone = asynchandler(async (req, res) => {
//     const { phoneNO, password } = req.body
//     const user = await User.findOne({
//         "phoneNO": phoneNO
//     })
//     if (!user) {
//         throw new Apierrors(401, "Invalid Credentials")
//     }
//     const ispasswordcorrect = await user.isPasswordCorrect(password)
//     if (!ispasswordcorrect) {
//         throw new Apierrors(401, 'Invalid Password')
//     }
//     let avatarimagelocalpath
//     if (req.file && req.file.path) {
//         avatarimagelocalpath = req.file.path
//     }
//     else {
//         return res.status(400).json(new Apiresponse(400, {}, "Please provide the image."))
//     }
//     let image = await uploadOnCloudinary(avatarimagelocalpath)
//     if (!image) {
//         return res.status(400).json(new Apiresponse(400, {}, "Please provide the image."))
//     }
//     if (avatarimagelocalpath !== user.avatarImagepath) {
//         return res.status(406).json(new Apiresponse(406, {}, "Please provide the same Image."))
//     }
//     const { accessToken, refreshToken } = await generateaccesstokenandrefreshtoken(user._id)
//     const loginuser = await User.findById(user._id).select("-password -refreshToken")
//     const option = {
//         httpOnly: true,
//         secure: true,
//     }
//     return res.status(200).cookie("accessToken", accessToken, option).cookie("refreshToken", refreshToken, option).json(new Apiresponse(200, { user: loginuser, accessToken, refreshToken }, "User Logged in Successfully"))
// })
const logout = asynchandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user?._id, {
        $unset: {
            refreshToken: 1
        }
    },
        {
            new: true
        }
    )
    const option = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).cookie("accessToken", option).cookie("refreshToken", option).json(new Apiresponse(200, {}, "User logout Successfully."))
})
const updatepassword = asynchandler(async (req, res) => {
    const { oldpassword, newpassword } = req.body
    const user = await User.findById(req.user?._id)
    const ispasswordcorrect = await user.isPasswordCorrect(oldpassword)
    if (!ispasswordcorrect) {
        throw new Apierrors(400, 'Password entered is wrong')
    }
    user.password = newpassword
    await user.save({ validateBeforeSave: false })
    return res.status(200).json(new Apiresponse(200, {}, "Password Changed Successfully."))
})
const getcurrentuser = asynchandler(async (req, res) => {
    // console.log(req.user._id)
    return res.status(200).json(new Apiresponse(200, req.user, "User Credentials fetched Successfully"))
})
const newrefreshToken = asynchandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if (!incomingRefreshToken) {
        throw new Apierrors(401, "unauthorized request")
    }
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        const user = await User.findById(decodedToken?._id)
        if (!user) {
            throw new Apierrors(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new Apierrors(401, "Refresh token is expired or used")

        }
        const options = {
            httpOnly: true,
            secure: true
        }
        const { accessToken, refreshToken } = await generateaccesstokenandrefreshtoken(user._id)
        // console.log(newrefreshToken)
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new Apiresponse(
                    200,
                    { accessToken, refreshToken },
                    "Refresh token renewed"
                )
            )
    } catch (error) {
        throw new Apierrors(401, error?.message || "Invalid refresh token")
    }

})
export { Signup, login, logout, updatepassword, getcurrentuser, newrefreshToken, verifyOTPEmail }