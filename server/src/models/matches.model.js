import mongoose from "mongoose";
const roundSchema = new mongoose.Schema({
    team1Score: { type: Number, required: true },
    team2Score: { type: Number, required: true }
});

const mapSchema = new mongoose.Schema({
    rounds: [roundSchema],
    team1RoundsWon: { type: Number, default: 0 },
    team2RoundsWon: { type: Number, default: 0 },
    mapWinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
});

const matchSchema = new mongoose.Schema({
    team1: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    team2: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    maps: [mapSchema],
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

export const Match = mongoose.model('Match', matchSchema);