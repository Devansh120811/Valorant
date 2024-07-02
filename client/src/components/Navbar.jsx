import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setAuthStatus } from '../store/authslice.js';
import './Navbar.css';

function Navbar() {
  const [image, setImage] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const authstatus = useSelector((state) => state.auth.status);
  const [authStatusLoaded, setAuthStatusLoaded] = useState(false);
  const accesstoken = window.localStorage.getItem('accesstoken');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cimage = () => {
    setImage(!image);
  };

  const lgout = () => {
    window.localStorage.removeItem('authStatus');
    window.localStorage.removeItem('accesstoken')
    window.localStorage.removeItem('refreshtoken')
    dispatch(logout());
  };

  useEffect(() => {
    const storedAuthStatus = localStorage.getItem('authStatus');
    if (storedAuthStatus !== null) {
      dispatch(setAuthStatus(true)); // Dispatch an action to update auth status in Redux store
      setAuthStatusLoaded(true);
    } else {
      setAuthStatusLoaded(true);
    }
  }, [dispatch]);

  useEffect(() => {
    const checkTokenExpiration = async () => {
      if (!accesstoken) {
        // No access token found, user is not logged in
        navigate('/');
        return;
      }
      try {
        const { exp } = JSON.parse(atob(accesstoken.split('.')[1])); // Decode the token and extract expiration time
        const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
        // console.log(currentTime,Math.floor(Date.now()))
        if (exp < currentTime) {
          // Access token has expired, logout the user
          dispatch(logout());
          dispatch(setAuthStatus(false));
          localStorage.removeItem('authStatus');
          window.localStorage.removeItem('accesstoken')
          window.localStorage.removeItem('refreshtoken')
          navigate('/');
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
  }, [accesstoken, dispatch, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {authStatusLoaded && (
        authstatus ? (
          <div className={`Navbar ${scrolled ? 'Scrolled' : ''} w-screen p-2`}>
            <div className='flex md:gap-10 gap-2 items-center'>
              <img src='../../assets/Logo.jpeg' className='rounded-full md:w-24 md:h-24 w-12 h-12' alt='Logo' />
              <p className='separator text-white font-semibold md:text-3xl text-sm'>
                RNG
              </p>
            </div>
            <img src={image ? '../../assets/Close.svg' : '../../assets/Bars.svg'} className='hover:cursor-pointer md:hidden Hamburger' onClick={cimage} alt='Menu' />
            <div className={`md:static md:min-h-fit md:bg-transparent absolute Content ${image ? 'top-10' : 'top-[-1000px]'} w-auto min-h-40 rounded-md flex md:flex-row md:gap-5 gap-3 flex-col justify-center items-center`}>
              <NavLink to='/' className='text-white hover:underline md:text-base text-sm'>
                Home
              </NavLink>
              <NavLink to='/About' className='text-white hover:underline md:text-base text-sm'>
                About
              </NavLink>
              <NavLink to='/ContactUs' className='text-white hover:underline md:text-base text-sm'>
                Contact Us
              </NavLink>
              <NavLink to='/Matches' className='text-white hover:underline md:text-base text-sm'>
                Matches
              </NavLink>
            </div>
            <div>
              <button className='md:static Signup absolute md:right-24 top-2 right-20 md:w-32 text-center w-24 md:text-base text-sm' onClick={lgout}>
                LOGOUT
              </button>
            </div>
          </div>
        ) : (
          <div className={`Navbar ${scrolled ? 'Scrolled' : ''} w-screen p-1`}>
            <div className='flex md:gap-10 gap-2 items-center'>
              <img src='../../assets/Logo.jpeg' className='rounded-full md:w-24 md:h-24 w-12 h-12' alt='Logo' />
              <p className='font-Poppins text-white font-semibold md:text-base text-sm'>
                RNG
              </p>
            </div>
            <img src={image ? '../../assets/Close.svg' : '../../assets/Bars.svg'} className='hover:cursor-pointer md:hidden Hamburger' onClick={cimage} alt='Menu' />
            <div className={`md:static md:min-h-fit md:bg-transparent absolute Content ${image ? 'top-10' : 'top-[-1000px]'} w-auto min-h-40 rounded-md flex md:flex-row md:gap-5 gap-3 flex-col justify-center items-center`}>
              <NavLink to='/' className='text-white hover:underline md:text-base text-sm'>
                Home
              </NavLink>
              <NavLink to='/About' className='text-white hover:underline md:text-base text-sm'>
                About
              </NavLink>
              <NavLink to='/ContactUs' className='text-white hover:underline md:text-base text-sm'>
                Contact Us
              </NavLink>
              <NavLink to='/Matches' className='text-white hover:underline md:text-base text-sm'>
                Matches
              </NavLink>
            </div>
            <div>
              <NavLink to='/Signup' className='md:static Signup absolute top-2 right-20 md:w-32 text-center w-24 md:text-base text-sm'>
                SIGN UP
              </NavLink>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Navbar;
