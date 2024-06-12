import { asynchandler } from '../utils/asynchandler.js'
import Apierrors from '../utils/Apierrors.js'
import Apiresponse from '../utils/Apiresponse.js'
import { teams } from '../models/team.model.js'
import { Match } from '../models/matches.model.js'
const createMatch = asynchandler(async (req, res) => {
    try {
        const { team1Id, team2Id } = req.body;
        // Check if both teams exist
        const team1 = await teams.findById(team1Id);
        const team2 = await teams.findById(team2Id);

        if (!team1 || !team2) {
            throw new Apierrors(404, 'One or both teams not found');
        }

        // Initialize the match with 4 maps and each map with 13 rounds
        const maps = Array.from({ length: 4 }, () => ({
            rounds: Array.from({ length: 13 }, () => ({ team1Score: 0, team2Score: 0 }))
        }));

        const newMatch = new Match({
            team1: team1._id,
            team2: team2._id,
            maps
        });
        await newMatch.save();
        res.status(201).json(new Apiresponse(201, newMatch, "Match created successfully"));
    } catch (error) {
        throw new Apierrors(500, "Falied to create Match.")
    }

})
const updateMatchResult = asynchandler(async (req, res) => {
    try {
        const { matchId, mapIndex, roundIndex, team1Score, team2Score } = req.body;

        const match = await Match.findById(matchId);
        if (!match) {
            throw new Apierrors(404, 'Match not found');
        }

        // Update the specific round score
        match.maps[mapIndex].rounds[roundIndex] = { team1Score, team2Score };

        // Calculate rounds won for the current map
        const currentMap = match.maps[mapIndex];
        currentMap.team1RoundsWon = currentMap.rounds.filter(round => round.team1Score > round.team2Score).length;
        currentMap.team2RoundsWon = currentMap.rounds.filter(round => round.team2Score > round.team1Score).length;

        // Determine if there's a map winner
        if (currentMap.team1RoundsWon >= 13 && currentMap.team1RoundsWon >= currentMap.team2RoundsWon + 2) {
            currentMap.mapWinner = match.team1;
        } else if (currentMap.team2RoundsWon >= 13 && currentMap.team2RoundsWon >= currentMap.team1RoundsWon + 2) {
            currentMap.mapWinner = match.team2;
        } else {
            currentMap.mapWinner = null; // No winner yet, might go into overtime
        }

        // Calculate map wins
        const team1MapWins = match.maps.filter(map => map.mapWinner && map.mapWinner.equals(match.team1)).length;
        const team2MapWins = match.maps.filter(map => map.mapWinner && map.mapWinner.equals(match.team2)).length;

        // Determine match winner if any team wins 2 maps
        if (team1MapWins >= 2) {
            match.winner = match.team1;
            await updateTeamPoints(match.team1); // Update team points
        } else if (team2MapWins >= 2) {
            match.winner = match.team2;
            await updateTeamPoints(match.team2); // Update team points
        } else {
            match.winner = null; // No match winner yet
        }

        await match.save();
        res.status(200).json(new Apiresponse(200, match, "Match results updated successfully"));
    } catch (error) {
        throw new Apierrors(500, "Failed to update due to some error.")
    }
});
// Helper function to update team points
const updateTeamPoints = async (teamId) => {
    const team = await teams.findById(teamId);
    if (team) {
        team.Points = (team.Points || 0) + 1; // Increment team points by 1
        await team.save();
    }
};

export { createMatch, updateMatchResult, updateTeamPoints }