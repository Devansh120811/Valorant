import React from "react";
import { NavLink } from "react-router-dom";
import './Footer.css';

function FooterC() {
    return (
        <div className="footer-container flex flex-col justify-between items-center w-full">
            <div className="footer-bg w-full h-auto  flex flex-col items-center p-4">
                <div className="flex flex-col md:flex-row md:gap-20 gap-5 items-center w-full justify-between">
                    <div className="flex flex-col gap-2 w-auto items-center md:items-start">
                        <div className="flex justify-center items-center">
                            <img
                                src="../../assets/Logo.jpeg"
                                className="rounded-full md:w-24 md:h-24 w-12 h-12"
                                alt="Logo"
                            />
                            <NavLink to="/" className="separator text-white md:text-3xl text-sm font-semibold ml-6">
                                RNG
                            </NavLink>
                        </div>
                        <p className="text-white text-center md:text-left md:text-lg text-sm font-Poppins w-52">
                            Join the ultimate Valorant showdown—where champions rise and legends form!
                        </p>
                    </div>
                    <div className="w-auto flex flex-col justify-center gap-1">
                        <h2 className="text-white md:text-2xl text-sm text-center md:text-left">Need Help?</h2>
                        <div className="h-1.5 w-14 bg-purple-300 rounded-e-full mx-auto md:mx-0"></div>
                        <div className="flex flex-col gap-2 items-center md:items-start">
                            <a className="font-Poppins text-white font-medium md:text-base text-sm hover:text-slate-100 hover:text-lg cursor-pointer">
                                Tournaments
                            </a>
                            <a className="font-Poppins text-white font-medium md:text-base text-sm hover:text-slate-100 hover:text-lg cursor-pointer">
                                Terms & Conditions
                            </a>
                            <a className="font-Poppins text-white font-medium md:text-base text-sm hover:text-slate-100 hover:text-lg cursor-pointer">
                                Privacy Policy
                            </a>
                            <a className="font-Poppins text-white font-medium md:text-base text-sm hover:text-slate-100 hover:text-lg cursor-pointer">
                                Refund Policy
                            </a>
                        </div>
                    </div>
                    <div className="w-auto flex flex-col items-center md:items-start Contact">
                        <h2 className="text-white md:text-2xl text-sm text-center md:text-left">Contact Us</h2>
                        <div className="h-1.5 w-14 bg-purple-300 rounded-e-full mx-auto md:mx-0"></div>
                        <div className="flex flex-col items-center md:items-start">
                            <h4 className="font-Poppins mt-3 text-white font-semibold md:text-lg text-sm">
                                Location
                            </h4>
                            <p className="font-Poppins text-white font-semibold md:text-base text-sm text-center md:text-left">
                                122 Veione Plaza, Ahmedabad 391083
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex md:mt-5  gap-2 justify-center">
                    <a href="https://www.instagram.com/amit_kanjariya._/" target="_blank" className="btn">
                        <img
                            src="../../assets/instagram.svg"
                            alt="Instagram"
                            className="w-7 h-7 text-gray-800 dark:text-white invert"
                        />
                    </a>
                    <a href="https://www.linkedin.com/in/amit-kanjariya-235078269/" target="_blank" className="btn">
                        <img
                            src="../../assets/linkedin.svg"
                            alt="LinkedIn"
                            className="w-7 h-7 text-gray-800 dark:text-white invert"
                        />
                    </a>
                    <a href="https://x.com/DEVANSHKAP89484" target="_blank" className="btn">
                        <img
                            src="../../assets/twitter.svg"
                            alt="Twitter"
                            className="w-6 h-6 text-gray-800 dark:text-white"
                        />
                    </a>
                    <a href="https://www.youtube.com/channel/UCAmSYcj55CRgeNshYpBMclQ" className="btn" target="_blank">
                        <img
                            src="../../assets/youtube.svg"
                            alt="YouTube"
                            className="w-7 h-7 text-gray-800 dark:text-white invert"
                        />
                    </a>
                </div>
            </div>
            <div className="flex items-center h-8 justify-center w-full footerEnd-bg">
                <p className="font-Poppins pr-1 text-white font-semibold md:text-base text-sm">
                    Copyright ©️ 2024
                </p>
                <p className="font-Poppins text-white font-semibold md:text-base text-sm">
                    All Rights Reserved
                </p>
                <NavLink to="/" className="text-purple-500 font-Poppins pl-1">
                    @RNG
                </NavLink>
            </div>
        </div>
    );
}

export default FooterC;
