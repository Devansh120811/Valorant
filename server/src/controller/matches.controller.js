import { Match } from "../models/matches.model.js";
import { asynchandler } from "../utils/asynchandler.js";
import Apiresponse from '../utils/Apiresponse.js'
const createMatch = asynchandler(async (req, res) => {
    const { team1, team2, team1Image, team2Image, streamUrl, MatchDate, Matchtime } = req.body;

    // Validate required fields
    if (!team1 || !team2 || !team1Image || !team2Image || !streamUrl || !MatchDate || !Matchtime) {
        return res.status(400).json(new Apiresponse(400, {}, "Please provide all required fields."));
    }

    // Create new match
    const match = await Match.create({
        team1,
        team2,
        team1Image,
        team2Image,
        streamUrl,
        MatchDate,
        Matchtime
    });

    if (!match) {
        return res.status(500).json(new Apiresponse(500, {}, "Error while creating match."));
    }

    return res.status(201).json(new Apiresponse(201, match, "Match created successfully."));
});
const getmatches = asynchandler(async (req, res) => {
    const allmatch = await Match.find()
    return res.status(200).json(new Apiresponse(200, allmatch, "Matches Fetched Successfully."))
})
export { getmatches, createMatch }