import Razorpay from "razorpay";
import { teams } from "../models/team.model.js";
import { Payment } from '../models/Payment.model.js'
import { asynchandler } from '../utils/asynchandler.js'
import Apiresponse from '../utils/Apiresponse.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'

// const razorpayInstance = new Razorpay({
//     key_id: process.env.RAZOR_KEY,
//     key_secret: process.env.RAZOR_SECRET
// });

const createteam = asynchandler(async (req, res) => {
    const user = req.user;
    const {
        teamname,
        teamleadername,
        teamleaderPhoneno,
        teamleaderEmail,
        teamleaderRiotId,
        teammember1name,
        teammember1riotId,
        teammember2name,
        teammember2riotId,
        teammember3name,
        teammember3riotId,
        teammember4name,
        teammember4riotId
    } = req.body;

    // Validate team details
    if (!teamname || !teamleadername || !teamleaderPhoneno || !teamleaderRiotId) {
        return res.status(400).json(new Apiresponse(400, {}, "Please provide all the required fields."));
    }

    if (!/^\d{10}$/.test(teamleaderPhoneno)) {
        return res.status(400).json(new Apiresponse(400, {}, "Phone number must be exactly 10 digits."));
    }

    const existingTeam = await teams.findOne({ teamname });
    if (existingTeam) {
        return res.status(409).json(new Apiresponse(409, {}, "Team name already exists."));
    }

    const teammembers = [
        { teammembername: teammember1name, riotId: teammember1riotId },
        { teammembername: teammember2name, riotId: teammember2riotId },
        { teammembername: teammember3name, riotId: teammember3riotId },
        { teammembername: teammember4name, riotId: teammember4riotId }
    ];

    if (teammembers.some(member => !member.teammembername || !member.riotId)) {
        return res.status(400).json(new Apiresponse(400, {}, "Each team member must have a name and a riot ID"));
    }

    let teamImage;
    if (req.file && req.file.path) {
        teamImage = await uploadOnCloudinary(req.file.path);
        if (!teamImage) {
            return res.status(400).json(new Apiresponse(400, {}, "Image upload failed"));
        }
    } else {
        return res.status(400).json(new Apiresponse(400, {}, "Image is required"));
    }

    // Temporarily save team details (not marking as fully registered)
    const team = teams.create({
        teamname,
        teamleadername,
        teamleaderPhoneno,
        teamleaderEmail,
        teamleaderRiotId,
        teamImage: teamImage.url,
        teamMembers: teammembers,
        userId: user._id,
        isRegistered: false // Mark as not fully registered
    });
    // await team.save();

   
    // const paymentOptions = {
    //     amount: 10000, 
    //     currency: "INR",
    //     receipt: `receipt_${new Date().getTime()}`,
    //     payment_capture: 1 
    // };

    // try {
    //     const order = await razorpayInstance.orders.create(paymentOptions);
    //     if (!order) return res.status(500).send("Error creating payment order");

    //     const payment = await Payment.create({
    //         teamId: team._id,
    //         orderId: order.id,
    //         amount: order.amount,
    //         currency: order.currency,
    //         receipt: order.receipt,
    //         status: 'created'
    //     });

    //     return res.status(201).json(new Apiresponse(201, { orderId: order.id, teamId: team._id, payment }, "Payment order created successfully. Navigate to payment page."));
    // } catch (error) {
    //     return res.status(500).json(new Apiresponse(500, {}, "Error while creating payment order"));
    // }
    if (!team) {
        return res.status(500).json(new Apiresponse(500, {}, "Error while Registering the team"));
    }
    return res.status(201).json(new Apiresponse(201, team, "Team Registered Sucessfully."));
});
const verifyPayment = asynchandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);

    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
        // Payment is successful, update the team registration status in your database
        const payment = await Payment.findOneAndUpdate(
            { orderId: razorpay_order_id },
            { status: 'completed', paymentId: razorpay_payment_id, signature: razorpay_signature },
            { new: true }
        );

        if (!payment) {
            return res.status(404).json(new Apiresponse(404, {}, "Payment record not found"));
        }

        // Mark the team as fully registered
        const team = await teams.findByIdAndUpdate(payment.teamId, { isRegistered: true }, { new: true });
        if (!team) {
            return res.status(404).json(new Apiresponse(404, {}, "Team not found"));
        }

        return res.status(200).json(new Apiresponse(200, { payment, team }, "Payment verified and team registered successfully"));
    } else {
        return res.status(400).json(new Apiresponse(400, {}, "Payment verification failed"));
    }
});

const getUserTeam = asynchandler(async (req, res) => {
    const team = await teams.find({ userId: req.user })
    if (!team) {
        return res.status(404).json(new Apiresponse(404, "No team found with login user."))
    }
    return res.status(200).json(new Apiresponse(200, team, "Successfully Got the team."))
})
const getAllteamsRegis = asynchandler(async (req, res) => {
    const teamss = await teams.find()
    return res.status(200).json(new Apiresponse(200, teamss, "Teams Fetched Successfully."))
})
export { createteam, getUserTeam, getAllteamsRegis, verifyPayment }