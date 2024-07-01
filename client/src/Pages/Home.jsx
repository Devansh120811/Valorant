import React from 'react';
import Navbar from '../components/Navbar.jsx';
import { Link } from 'react-router-dom';
import './Home.css';
function Home() {
  const live = () => {
    //  console.log("ok")
    window.open('https://www.youtube.com/watch?v=JzsKAapsmKQ', '_blank');
  }
  const t1 = () => {
    window.open('https://www.youtube.com/watch?v=UdysEP8nJsk', '_blank');
  }
  const t2 = () => {
    window.open('https://www.youtube.com/watch?v=ljhzgBwoVkY', '_blank');
  }
  const t3 = () => {
    window.open('https://www.youtube.com/watch?v=Ejl5HKs6ZJ4', '_blank');
  }
  return (
    <div className='flex flex-col Home h-auto w-full md:gap-2 gap-1 overflow-x-hidden'>
      <Navbar />
      <div className='flex flex-col md:text-3xl font-bold text-sm text-white  separator md:gap-10 gap-4 justify-center items-center mt-24'>
        <p className=' separator mt-2 text-center'>
          Welcome to RNG
        </p>
        <p className=' separator text-center'>
          Register here for Valorant Tournament!
        </p>
        <Link to='/Registration' className='Register'>
          Register Here
        </Link>
      </div>
      <div className='flex flex-col md:text-3xl text-sm text-white separator1 md:gap-5 gap-4 justify-center items-center'>
        <p className='font-Poppins mt-10 text-center font-semibold'>
          YOU ARE MOST WELCOME IN
        </p>
        <p className='font-Poppins text-center font-semibold'>
          GAMING WORLD.
        </p>
        <div className='flex md:flex-row flex-col gap-5 md:gap-10 items-center justify-evenly w-full'>
          <div className='separator1 card md:gap-5 gap-2 w-64 p-5' data-aos="fade-left">
            <img src='../../assets/Live Streaming.jpeg' className='rounded-md md:w-36 md:h-36 w-24 h-24'>
            </img>
            <p className='text-center md:text-base text-sm'>Engage with Your Favorite Gamers Live!</p>
            <p className='text-center md:text-base text-sm'>Join our live streams to watch and interact with top gamers. Enjoy real-time gameplay, commentary, and exclusive events. Connect with the community and never miss a moment!</p>
          </div>
          <div className='separator1 card md:gap-5 gap-2 w-64 p-5' data-aos="fade-right">
            <img src='../../assets/GameNews.jpeg' className='rounded-md md:w-36 md:h-36 w-24 h-24'>
            </img>
            <p className='text-center md:text-base text-sm'>Engage with Your Favorite Gamers Live!</p>
            <p className='text-center md:text-base text-sm'>Stay updated with all the latest happenings in the world of Valorant. Get news on the newest agents, maps, patches, and tournaments. Read exclusive interviews with pro players!</p>
          </div>
          <div className='separator1 card md:gap-5 gap-2 w-64 p-5' data-aos="fade-left">
            <img src='../../assets/Game Tournament.jpeg' className='rounded-md md:w-36 md:h-36 w-24 h-24'>
            </img>
            <p className='text-center md:text-base text-sm'>Compete in Exciting Game Tournaments!</p>
            <p className='text-center md:text-base text-sm'>Join our thrilling game tournaments and showcase your skills. Compete solo or with a team, win prizes, and climb the leaderboards. Register now and be part of the action!</p>
          </div>
        </div>
      </div>
      <div className='watchlive md:h-80 md:w-96 rounded-lg mx-auto h-64 w-72 mt-5' data-aos="fade-right">
        <div className='animation'>
          <div className='youtube' onClick={live}>
            <img src='../../assets/Y.svg'>
            </img>
          </div>
        </div>
        <div className='text-white font-bold absolute md:top-64 md:text-lg top-48 l'>
          <p>
            Watch Live
          </p>
        </div>
      </div>
      <div className='mt-10 flex flex-col items-center justify-center gap-3' data-aos="fade-left">
        <p className='text-white font-bold md:text-xl text-sm text-center'>
          UPCOMING MATCHES
        </p>
        <p className='text-white md:text-xl text-sm text-center'>
          Stay tuned for these exciting upcoming matches, featuring top teams and players competing for glory. Don’t miss out on the action!
        </p>
      </div>
      <div className='flex flex-col gap-3 justify-center items-center'>
        <div className='flex justify-between  matches items-center gap-10' data-aos="fade-right">
          <div className='flex flex-col gap-2 items-center justify-center'>
            <p className='text-white text-center'>
              1 August,2024,12:00:00 PM
            </p>
            <p className='text-white md:text-xl font-semibold text-sm text-center match'>
              LUMINOUS AURA VS AESTHETIC VIPERS
            </p>
          </div>
          <div className='flex flex-col w-14 gap-3 items-center justify-center'>
            <div className='Y' onClick={t1}>
              <img src='../../assets/Y.svg' className='w-10 h-10'>
              </img>
            </div>
            <p className='text-white text-center'>
              Youtube Stream
            </p>
          </div>
          <div className='flex gap-5   justify-between items-center'>
            <img src='../../assets/t2.jpeg' className='w-24 h-24 rounded-full hover:cursor-pointer'>
            </img>
            <p className='text-white text-2xl'>
              VS
            </p>
            <img src='../../assets/t6.jpeg' className='w-24 h-24 rounded-full hover:cursor-pointer'>
            </img>
          </div>
        </div>
        <div className='flex justify-between  matches items-center gap-10' data-aos="fade-left">
          <div className='flex flex-col gap-2 items-center justify-center'>
            <p className='text-white text-center'>
              15 August,2024,12:00:00 AM
            </p>
            <p className='text-white md:text-xl font-semibold text-sm text-center match'>
              RADIANT REBELS VS PHANTOM SQUAD
            </p>
          </div>
          <div className='flex flex-col w-14 gap-3 items-center justify-center'>
            <div className='Y' onClick={t2}>
              <img src='../../assets/Y.svg' className='w-10 h-10'>
              </img>
            </div>
            <p className='text-white text-center'>
              Youtube Stream
            </p>
          </div>
          <div className='flex gap-5   justify-between items-center'>
            <img src='../../assets/t4.jpeg' className='w-24 h-24 rounded-full hover:cursor-pointer'>
            </img>
            <p className='text-white text-2xl'>
              VS
            </p>
            <img src='../../assets/team1.jpeg' className='w-24 h-24 rounded-full hover:cursor-pointer'>
            </img>
          </div>
        </div>
        <div className='flex justify-between  matches items-center gap-10' data-aos="fade-right">
          <div className='flex flex-col gap-2 items-center justify-center'>
            <p className='text-white text-center'>
              1 September,2024,22:00:00 PM
            </p>
            <p className='text-white md:text-xl font-semibold text-sm text-center match'>
              VIPER VANGUARDS VS ECHO ENFORCER
            </p>
          </div>
          <div className='flex flex-col w-14 gap-3 items-center justify-center'>
            <div className='Y' onClick={t3}>
              <img src='../../assets/Y.svg' className='w-10 h-10'>
              </img>
            </div>
            <p className='text-white text-center'>
              Youtube Stream
            </p>
          </div>
          <div className='flex gap-5   justify-between items-center'>
            <img src='../../assets/t3.jpeg' className='w-24 h-24 rounded-full hover:cursor-pointer'>
            </img>
            <p className='text-white text-2xl'>
              VS
            </p>
            <img src='../../assets/t5.jpeg' className='w-24 h-24 rounded-full hover:cursor-pointer'>
            </img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
