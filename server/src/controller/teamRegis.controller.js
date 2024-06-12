import { teams } from "../models/team.model.js";
import { asynchandler } from '../utils/asynchandler.js'
import Apierrors from '../utils/Apierrors.js'
import Apiresponse from '../utils/Apiresponse.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'

const createteam = asynchandler(async (req, res) => {
    const user = req.user
    const { teamname, teamleadername, teamleaderPhoneno, teamleaderRiotId, teammember1name, teammember1riotId, teammember2name, teammember2riotId, teammember3name, teammember3riotId, teammember4name, teammember4riotId } = req.body
    const teaam = await teams.findOne({ teamname: teamname })
    // console.log(teaam)
    if (teaam) {
        return res.status(409).json(new Apiresponse(409, {}, "Team name already exists."))
    }
    if (!teamname || !teamleadername || !teamleaderPhoneno || !teamleaderRiotId) {
        return res.status(400).json(new Apiresponse(400, {}, "Please Provide all the fields."))
    }
    const teammember1 = {
        teammembername: teammember1name,
        riotId: teammember1riotId
    }
    const teammember2 = {
        teammembername: teammember2name,
        riotId: teammember2riotId
    }
    const teammember3 = {
        teammembername: teammember3name,
        riotId: teammember3riotId
    }
    const teammember4 = {
        teammembername: teammember4name,
        riotId: teammember4riotId
    }
    const teammembers = []
    teammembers.push(teammember1, teammember2, teammember3, teammember4)
    // console.log(teammembers)
    if (!Array.isArray(teammembers) || teammembers.length !== 4) {
        return res.status(400).json(new Apiresponse(400, {}, "Team must have exactly 4 members."))
    }
    teammembers.forEach((member) => {
        if (!member.teammembername || !member.riotId) {
            throw new Apierrors(400, "Each team member must have a name and a riot ID")
        }
    })
    let teammemberimagepath
    if (req.file && req.file.path) {
        teammemberimagepath = req.file.path
    }
    else {
        return res.status(400).json(new Apiresponse(400, {}, "Image is required."))
    }
    const image = await uploadOnCloudinary(teammemberimagepath)
    if (!image) {
        throw new Apierrors(400, "Image is required.")
    }
    const team = await teams.create({
        teamname,
        teamleadername,
        teamleaderPhoneno,
        teamleaderRiotId,
        teamImage: image.url,
        teamMembers: teammembers,
        userId: user._id
    })
    if (!team) {
        return res.status(500).json(new Apiresponse(500, {}, "Error While registering team."))
    }
    return res.status(201).json(new Apiresponse(201, team, "Team registered Successfully."))
})
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
export { createteam, getUserTeam, getAllteamsRegis }