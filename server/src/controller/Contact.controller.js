import { Contact } from "../models/Contact.model.js";
import { asynchandler } from "../utils/asynchandler.js";
import Apiresponse from "../utils/Apiresponse.js";
import nodemailer from 'nodemailer'
const Contactus = asynchandler(async (req, res) => {
    const { firstName, lastName, email, phoneNo, message } = req.body
    const Id = req.user
    if (!firstName || !lastName || !email || !phoneNo || !message) {
        return res.status(400).json(new Apiresponse(400, {}, "Please Provide All the information"))
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
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Issue Related",
            text: `Thanks for contacting us and sending your feedback.
            We will highly consider your problem and try to resolve it.`
        });

        const user = await Contact.create({
            firstName,
            lastName,
            email,
            phoneNo,
            message,
            userId: Id
        });

        if (!user) {
            return res.status(500).json(new Apiresponse(500, {}, "Error while Contacting Us."));
        }

        res.status(201).json(new Apiresponse(201, { user }, "Contacted Us successfully."));
    } catch (error) {
        res.status(500).json(new Apiresponse(500, {}, "Error while sending email or contacting."));
    }
})
const getmessage = asynchandler(async (req, res) => {
    const message = await Contact.findById(req.params.id)
    return res.status(200).json(new Apiresponse(200, message, "The message sent by the user is successfully fetched."))
})
export { Contactus,getmessage }