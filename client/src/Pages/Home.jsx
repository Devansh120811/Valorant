import React from 'react'
import Navbar from '../components/Navbar.jsx'
import './Home.css'
function Home() {
  return (
    <div className='flex font-Poppins Home h-auto w-screen flex-col gap-12 overflow-auto'>
      <Navbar />
      <div className='text-white div h-full flex flex-col md:text-sm text-xs md:gap-5 gap-3'>
        <hr className='m-3'>
        </hr>
        <h1 className='text-center font-light md:font-semibold'>
          Welcome to the World of Valorant
        </h1>
        <div className='flex flex-col gap-4 ml-5'>
          <span className='ml-3'>
            What is Valorant?
          </span>
          <div className='flex flex-col gap-3 '>
            <span className='text-center'>
              Valorant is a free-to-play first-person shooter (FPS) developed and published by Riot Games. Released in 2020, it has quickly become one of the most popular competitive FPS games in the world. Combining precise gunplay with unique agent abilities, Valorant offers a dynamic and strategic gameplay experience that keeps players on the edge of their seats.
            </span>
            <div className='flex flex-col md:flex-row md:justify-center items-center gap-3'>
              <img src='../../assets/AllAgent.jpg' className='ml-3 md:w-96 w-24 rounded-md'>
              </img>
            </div>
          </div>
        </div>
        <hr>
        </hr>
        <div className='flex flex-col gap-4 ml-5'>
          <span className='ml-3'>
            Gameplay
          </span>
          <div className='flex flex-col gap-3'>
            <span className='text-center'>
              In Valorant, two teams of five players each compete in a variety of game modes. The primary mode is a 5v5 objective-based game where teams take turns attacking and defending bomb sites. The first team to win 13 rounds claims victory. Each player selects an agent with unique abilities, adding a layer of strategy and teamwork to traditional FPS gameplay.
            </span>
            <div className='flex flex-col md:flex-row md:justify-center items-center gap-3' data-aos="fade-left">
              <img src='../../assets/Act.jpg' className='ml-3 md:w-96 w-24 rounded-md'>
              </img>
            </div>
          </div>
        </div>
        <hr>
        </hr>
        <div className='flex flex-col gap-4 ml-5'>
          <div className='ml-4' data-aos="fade-right">
            Meet the Agents
          </div>
          <div className='flex flex-col gap-3'>
            <div className='text-center mr-12' data-aos="fade-left">
              Valorant features a diverse roster of agents, each with their own distinct abilities and playstyles. Whether you prefer to go in guns blazing, support your team with healing and utilities, or outsmart your opponents with cunning tactics, there's an agent for you. Some fan favorites include:
            </div>
            <div className='ml-3' data-aos="fade-right">
              <ul className='flex flex-col gap-3'>
               <li className='agents'>
                Jett: A nimble duelist with the ability to dash and take down enemies with deadly precision.
               </li>
               <li className='agents'>
                Sage: A sentinel who can heal teammates and create barriers to control the battlefield.
               </li>
               <li className='agents'>
                Pheonix: A fiery duelist who can use his abilities to heal himself and blind opponents.
               </li>
              </ul>
            </div>
          </div>
        </div>
        <hr>
        </hr>
        <div className='flex flex-col gap-4 ml-5'>
          <div className='ml-4' data-aos="fade-left">
            Maps
          </div>
          <div className='flex flex-col gap-3'>
            <div className='text-center mr-12' data-aos="fade-right">
            Valorant's maps are meticulously designed to encourage a variety of playstyles and strategies. Each map features multiple lanes, choke points, and unique environmental features that teams must master to gain an advantage. Current maps include:
            </div>
            <div className='ml-3' data-aos="fade-left">
              <ul className='flex flex-col gap-3'>
               <li className='agents'>
                Bind: Two sites. No middle. Gotta pick left or right. What’s it going to be then? Both offer direct paths for attackers and a pair of one-way teleporters make it easier to flank
               </li>
               <li className='agents'>
                Haven: Beneath a forgotten monastery, a clamour emerges from rival Agents clashing to control three sites. There’s more territory to control, but defenders can use the extra real estate for aggressive pushes.
               </li>
               <li className='agents'>
                Spilt: If you want to go far, you’ll have to go up. A pair of sites split by an elevated center allows for rapid movement using two rope ascenders. Each site is built with a looming tower vital for control. Remember to watch above before it all blows sky-high.
               </li>
              </ul>
            </div>
          </div>
          <div className='flex flex-col md:flex-row md:justify-between items-center gap-3' data-aos="fade-right">
            <div className='flex md:flex-row flex-col gap-3'>
              <li className='agents'>
                Bind:
              </li>
              <img src='../../assets/Bind.jpg' className='ml-3 md:w-96 w-24 rounded-md'>
              </img>
            </div>
            <div>
              <li className='agents'>
                Haven:
              </li>
              <img src='../../assets/Haven.png' className='md:mr-9 ml-3 md:w-96 w-24 rounded-md'>
              </img>
            </div>
            <div>
              <li className='agents'>
                Spilt:
              </li>
              <img src='../../assets/Spilt.jpg' className='md:mr-9 ml-3 md:w-96 w-24 rounded-md'>
              </img>
            </div>
            </div>
        </div>
        <hr>
        </hr>
        <div className='w-full text-center text-white h-auto bg-inherit flex flex-col items-center justify-center gap-3'>
          <div className='flex flex-col gap-3'>
            <div>
              Get Started Today!
            </div>
            <div>
            Ready to jump into the action? Download Valorant for free and start playing today. Gather your friends, form a team, and prove your skills in this thrilling tactical shooter. The battlefield awaits, agent. Are you ready?
            </div>
          </div>
          <div>
          &copy; 2024 Valorant Fan Site. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home