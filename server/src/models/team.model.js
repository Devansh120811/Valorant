import mongoose from "mongoose";
const teamSchema = new mongoose.Schema({
    teamname: {
        type: String,
        required: true,
        unique: true
    },
    teamleadername: {
        type: String,
        required: true
    },
    teamleaderPhoneno: {
        type: Number,
        unique: true,
        required: true
    },
    teamleaderEmail:{
       type:String,
       required:true
    },
    teamleaderRiotId: {
        type: String,
        required: true
    },
    teamImage: {
        type: String,
        required: true
    },
    teamMembers: [
        {
            teammembername: {
                type: String,
                required: true
            },
            riotId: {
                type: String,
                required: true
            }
        }
    ],
    Points: {
        type: Number
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

export const teams = mongoose.model("teams", teamSchema)