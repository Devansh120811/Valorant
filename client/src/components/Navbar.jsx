import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, setAuthStatus } from '../store/authslice.js'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'
function Navbar() {
  const [image, setimage] = useState(false)
  const authstatus = useSelector((state) => state.auth.status)
  const [email, setuseremail] = useState("")
  const [authStatusLoaded, setAuthStatusLoaded] = useState(false);
  const accesstoken = window.localStorage.getItem("accesstoken")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cimage = () => {
    setimage(!image)
  }
  const lgout = () => {
    window.localStorage.removeItem("authStatus")
    dispatch(logout())
  }
  const changetext = () => {
    const login = document.getElementById("Login")
    login.style.fontSize = "large"
  }
  const ct = () => {
    const login = document.getElementById("Login")
    login.style.fontSize = "16px"
  }
  useEffect(() => {
    const user = async () => {
      try {
        const response = await fetch("http://localhost:5000/current-user", {
          method: "GET",
          headers: {
            'Authorization': 'Bearer ' + accesstoken
          }
        })
        const data = await response.json()
        // console.log(data.data.email.split("@")[0])
        setuseremail(data.data.email.split("@")[0])
      } catch (error) {
        console.log("Error Fetching the User.")
      }
    }
    user()
  }, [])
  useEffect(() => {
    const storedAuthStatus = localStorage.getItem('authStatus');
    if (storedAuthStatus !== null) {
      dispatch(setAuthStatus(true)); // Dispatch an action to update auth status in Redux store
      setAuthStatusLoaded(true);
    } else {
      setAuthStatusLoaded(true);
    }
  }, []);
  useEffect(() => {
    const checkTokenExpiration = async () => {
      if (!accesstoken) {
        // No access token found, user is not logged in
        navigate("/")
        return;
      }
      try {
        const { exp } = JSON.parse(atob(accesstoken.split('.')[1])); // Decode the token and extract expiration time
        const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
        if (exp < currentTime) {
          // Access token has expired, logout the user
          dispatch(logout());
          dispatch(setAuthStatus(false))
          localStorage.removeItem("authStatus")
          navigate("/")

        }
      } catch (error) {
        console.error('Error decoding access token:', error);
      }
    };

    // Check token expiration periodically (e.g., every minute)
    const intervalId = setInterval(checkTokenExpiration, 60000);

    // Initial check on component mount
    checkTokenExpiration();

    // Cleanup function
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      {
        authStatusLoaded && (
          authstatus ? (
            <div className='font-Poppins w-full h-20 Navbar p-5 flex items-center text-white justify-between'>
              <div className='flex gap-1 items-center'>
                <img src="../../assets/User.png" className='md:w-20 w-14 rounded-full'>
                </img>
                <p className='font-Poppins md:text-lg text-sm'>
                  {email}
                </p>
              </div>
              <button className='md:hidden absolute Ham cursor-pointer ' onClick={cimage}>
                <img src={image ? '../../assets/Close.svg' : '../../assets/Bars.svg'}>
                </img>
              </button>
              <div className={`md:static md:min-h-fit md:bg-transparent absolute Hamm ${image ? "top-10" : "top-[-100%]"} w-auto  min-h-40 rounded-md flex flex-col justify-center items-center`}>
                <ul className='flex md:flex-row flex-col items-center md:justify-center md:items-center  gap-3  text-xs md:text-sm'>
                  <li>
                    <NavLink className={`text-white hover:underline`} to="/Home">Home</NavLink>
                  </li>
                  <li>
                    <NavLink className={`text-white hover:underline`} to="/About">About</NavLink>
                  </li>
                  <li>
                    <NavLink className={`text-white hover:underline`} to="/ContactUs">Contact Us</NavLink>
                  </li>
                  <li>
                    <button className="w-20 bg-white rounded-full p-4 font-semibold font-Poppins text-black hover:bg-slate-200 duration-150" onClick={lgout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className='font-Poppins w-full h-20 Navbar p-5 flex items-center text-white justify-between'>
              <Link to='/Signup'>
                <button className='w-32 bg-neutral-900 text-neutral-600 font-Poppins text-pretty font-semibold hover:text-white duration-200 rounded-full p-3'>Sign up</button>
              </Link>
              <Link to='/'>
                <button className='w-32 bg-white rounded-full p-3 font-semibold font-Poppins text-black hover:bg-slate-200 duration-150' id="Login" onMouseOver={changetext} onMouseOut={ct}>Log in</button>
              </Link>
            </div>
          )
        )

      }
    </div>
  )
}

export default Navbar