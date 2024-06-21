import React from 'react';
import Navbar from '../components/Navbar.jsx';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
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
          <div className='separator1 card md:gap-5 gap-2 w-64 p-5' data-aos="fade-left">
            <img src='../../assets/GameNews.jpeg' className='rounded-md md:w-36 md:h-36 w-24 h-24'>
            </img>
            <p className='text-center md:text-base text-sm'>Engage with Your Favorite Gamers Live!</p>
            <p className='text-center md:text-base text-sm'>Stay updated with all the latest happenings in the world of Valorant. Get news on the newest agents, maps, patches, and tournaments. Read exclusive interviews with pro players!</p>
          </div>
          <div className='separator1 card md:gap-5 gap-2 w-64 p-5' data-aos="fade-right">
            <img src='../../assets/Game Tournament.jpeg' className='rounded-md md:w-36 md:h-36 w-24 h-24'>
            </img>
            <p className='text-center md:text-base text-sm'>Compete in Exciting Game Tournaments!</p>
            <p className='text-center md:text-base text-sm'>Join our thrilling game tournaments and showcase your skills. Compete solo or with a team, win prizes, and climb the leaderboards. Register now and be part of the action!</p>
          </div>
         </div>
      </div>
    </div>
  );
}

export default Home;
