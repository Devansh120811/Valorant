  import React, { useEffect, useState } from 'react';
  import './Matches.css';
  import Navbar from '../../components/Navbar/Navbar.jsx';
  import Footer from '../../components/Footer/Footer.jsx';
  import { generateMatches } from './Matchutils.js';

  function Matches() {
    const [matches, setMatches] = useState([]);
    const [teams, setTeams] = useState([]);
    const [initialLoad, setInitialLoad] = useState(false); // State to track initial load
    const accesstoken = window.localStorage.getItem("accesstoken");
    useEffect(() => {
      const getAllTeams = async () => {
        const response = await fetch("http://localhost:5000/allteams", {
          method: "GET",
          headers: {
            'Authorization': 'Bearer ' + accesstoken
          }
        });
        const data = await response.json();
        setTeams(data.data);
      };

      getAllTeams();
    }, [accesstoken]);

    useEffect(() => {
      const createInitialMatches = async () => {
        if (!initialLoad && teams.length > 0) {
          const generatedMatches = generateMatches(teams);
          // console.log(generatedMatches)
          await createMatches(generatedMatches);
          setMatches(generatedMatches);
          setInitialLoad(true); // Set initial load to true after creating matches
        }
      };
      createInitialMatches();
    }, [teams]);
    // console.log(matches)
    useEffect(() => {
      const createMatchesForNewTeams = async () => {
        if (initialLoad && teams.length % 2 === 0) {
          const newTeams = teams.slice(matches.length * 2);
          if (newTeams.length >= 2) {
            const generatedMatches = generateMatches(newTeams.slice(-2));
            await createMatches(generatedMatches);
            setMatches(prevMatches => [...prevMatches, ...generatedMatches]);
          }
        }
      };
      createMatchesForNewTeams();
    }, [teams]);

    const createMatches = async (newMatches) => {
      for (let match of newMatches) {
        // console.log(match)
        const response = await fetch("http://localhost:5000/creatematch", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accesstoken
          },
          body: JSON.stringify({
            team1: match.team1,
            team2: match.team2,
            team1Image: match.team1Image,
            team2Image: match.team2Image,
            streamUrl: match.streamUrl,
            MatchDate: match.MatchDate, // Format to YYYY-MM-DD
            Matchtime: match.Matchtime // Format to HH:MM:SS
          })
        });
        const data = await response.json();
        // console.log(data.data)
        // console.log(`${match.date.toISOString().split('T')[0]}T${match.date.toTimeString().split(' ')[0]}`)
        if (!response.ok) {
          console.error('Failed to create match:', data);
        }
      }
    };

    const formatDateTime = (date, time) => {
      return `${date}, ${time}`;
    };
    // console.log(matches)
    const filteredMatches = matches.filter(
      match => new Date(`${match.MatchDate}T${match.Matchtime}`) > new Date()
    );
    // console.log(filteredMatches)

    return (
      <div className='matches-container h-auto w-full md:gap-24 gap-14 overflow-x-hidden'>
        <Navbar />
        <div className='matches-list'>
          {filteredMatches.slice(0, Math.floor(teams.length / 2)).map((match, index) => (
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
        <Footer />
      </div>
    );
  }

  export default Matches;
