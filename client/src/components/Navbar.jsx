import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
function Navbar() {
  const [image, setimage] = useState(false)
  const cimage = () => {
      setimage(!image)
  }
  return (
    <div className='font-Poppins w-full h-20 Navbar p-5 flex items-center text-white justify-between'>
      <div>
        <img src='../../assets/Valorant.png' className='md:w-24 w-14'>
        </img>
      </div>
      <button className='md:hidden absolute right-20 cursor-pointer ' onClick={cimage}>
        <img src={image ? '../../assets/Close.svg' : '../../assets/Bars.svg'}>
        </img>
      </button>
      <div className={`md:static md:min-h-fit md:flex md:flex-row md:w-auto md:bg-transparent absolute right-10 ${image ? "top-5" : "top-[-100%]"} w-auto bg-transparent min-h-40 rounded-md flex flex-col justify-center items-center`}>
        <ul className='flex md:flex-row flex-col items-center md:justify-center md:items-center p-3 gap-3  text-xs md:text-sm'>
          <li>
            <NavLink className={`text-white hover:underline`} to="/">Home</NavLink>
          </li>
          <li>
            <NavLink className={`text-white hover:underline`} to="/About">About</NavLink>
          </li>
          <li>
            <NavLink className={`text-white hover:underline`} to="/ContactUs">Contact Us</NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar