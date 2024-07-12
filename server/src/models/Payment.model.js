import mongoose from 'mongoose'

const PaymentSchema = new mongoose.Schema({
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teams"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    orderId: {
        type: String
    },
    paymentId:{
        type:String
    },
    signature:{
        type:String
    },
    amount: {
        type: Number
    },
    currency: {
        type: String
    },
    receipt: {
        type: String
    },
    status: {
        type: String
    }
}, {
    timestamps: true
})

export const Payment = mongoose.model("Payment", PaymentSchema)