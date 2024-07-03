import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    team1: {
        type: String,
        required: true
    },
    team2: {
        type: String,
        required: true
    },
    team1Image: {
        type: String,
        required: true
    },
    team2Image: {
        type: String,
        required: true
    },
    streamUrl: {
        type: String,
        required: true
    },
    MatchDate: {
        type: String,
        required: true
    },
    Matchtime: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export const Match = mongoose.model("Match", matchSchema)