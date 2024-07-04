import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    phoneNo: {
        type: String
    },
    message: {
        type: String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}, {
    timestamps: true
})

export const Contact = mongoose.model("Contact", ContactSchema)