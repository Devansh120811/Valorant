import React, { useEffect, useState } from 'react';
import './Matches.css';
import Navbar from '../../components/Navbar.jsx';
import Footer from '../../components/Footer.jsx'
import { generateMatches } from './Matchutils.js';

function Matches() {
  const [matches, setMatches] = useState([]);
  const [initialLoad, setInitialLoad] = useState(false); // State to track initial load
  const accesstoken = window.localStorage.getItem("accesstoken");

  useEffect(() => {
    const getAllTeams = async () => {
      if (!initialLoad) {
        const response = await fetch("http://localhost:5000/allteams", {
          method: "GET",
          headers: {
            'Authorization': 'Bearer ' + accesstoken
          }
        });
        const data = await response.json();
        const teams = data.data;
        const generatedMatches = generateMatches(teams);
        await createMatches(generatedMatches);
        fetchMatches();
        setInitialLoad(true); // Set initial load to true after fetching and creating matches
      }
    };

    const createMatches = async (matches) => {
      for (let match of matches) {
        const response = await fetch("http://localhost:5000/creatematch", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accesstoken
          },
          body: JSON.stringify({
            team1: match.team1.teamname,
            team2: match.team2.teamname,
            team1Image: match.team1.teamImage,
            team2Image: match.team2.teamImage,
            streamUrl: match.streamUrl,
            MatchDate: match.date.toISOString().split('T')[0], // Format to YYYY-MM-DD
            Matchtime: match.date.toTimeString().split(' ')[0] // Format to HH:MM:SS
          })
        });
        const data = await response.json();
        if (!response.ok) {
          console.error('Failed to create match:', data);
        }
      }
    };

    const fetchMatches = async () => {
      const response = await fetch("http://localhost:5000/getmatch", {
        method: "GET",
        headers: {
          'Authorization': 'Bearer ' + accesstoken
        }
      });
      const data = await response.json();
      setMatches(data.data);
    };

    getAllTeams();
  }, [accesstoken, initialLoad]);

  const formatDateTime = (date, time) => {
    return `${date}, ${time}`;
  };

  const filteredMatches = matches.filter(match => new Date(`${match.MatchDate}T${match.Matchtime}`) > new Date());

  return (
    <div className='matches-container h-auto w-full md:gap-24 gap-14 overflow-x-hidden'>
      <Navbar />
      <div className='matches-list'>
        {filteredMatches.slice(0, 6).map((match, index) => ( // Display only the first 6 matches
          <div key={index} className='flex md:flex-row flex-col justify-between matches1 items-center gap-10'>
            <div className='flex flex-col gap-2 items-center justify-center'>
              <p className='text-white text-center'>
                {formatDateTime(match.MatchDate, match.Matchtime)}
              </p>
              <p className='text-white md:text-xl font-semibold text-sm text-center match1'>
                {match.team1} VS {match.team2}
              </p>
            </div>
            <div className='flex flex-col w-14 gap-3 items-center justify-center'>
              <div className='Y1' onClick={() => window.open(match.streamUrl, "_blank")}>
                <img src='../../assets/Y.svg' className='w-10 h-10' alt='YouTube Icon' />
              </div>
              <p className='text-white text-center'>
                YouTube Stream
              </p>
            </div>
            <div className='flex gap-5 justify-between items-center'>
              <img src={match.team1Image} className='w-24 h-24 rounded-full hover:cursor-pointer' alt={match.team1} />
              <p className='text-white text-2xl'>
                VS
              </p>
              <img src={match.team2Image} className='w-24 h-24 rounded-full hover:cursor-pointer' alt={match.team2} />
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}

export default Matches;
