import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import "./About.css";

function About() {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleReadMore = (index) => {
    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };

  useEffect(() => {
    let timeout;
    if (expandedCard !== null) {
      timeout = setTimeout(() => {
        setExpandedCard(null);
      }, 40000); // 60 seconds timeout
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [expandedCard]);

  const teamMembers = [
    {
      name: "Kapadia Devansh",
      image: "../../assets/member1.jpeg",
      description: "Experienced Full Stack Web Developer with expertise in React and Node.js. Passionate about building dynamic web applications.",
      instagram: "https://www.instagram.com/devansh_0_8_1_2/",
      linkedin: "https://www.linkedin.com/in/devansh-kapadia-789291251/",
      facebook: "#"
    },
    {
      name: "Patel Hetavi",
      image: "../../assets/member2.jpeg",
      description: "Experienced Website Manager with a strong focus on maintaining and optimizing websites.",
      instagram: "https://www.instagram.com/hetavi.15/",
      linkedin: "#",
      facebook: "#"
    },
    {
      name: "Kanjariya Amit",
      image: "../../assets/member4.jpg",
      description: "Talented UI Designer with a strong background in Adobe XD and Figma. Dedicated to enhancing user experience through creative design.",
      instagram: "https://www.instagram.com/amit_kanjariya._/",
      linkedin: "https://www.linkedin.com/in/amit-kanjariya-235078269/",
      facebook: "https://www.facebook.com/amit.kanjariya.547?mibextid=JRoKGi"
    },
    {
      name: "Shah Tejas",
      image: "../../assets/member3.jpeg",
      description: "Frontend Developer with a focus on React and JavaScript. Passionate about creating smooth and interactive web experiences.",
      instagram: "https://www.instagram.com/tejas.shahhh/",
      linkedin: "https://www.linkedin.com/in/tejas-shah-9674932b1/",
      facebook: "https://www.facebook.com/profile.php?id=100012554448361"
    },
  ];

  return (
    <div className="flex flex-col About h-auto w-full md:gap-2 gap-1 overflow-x-hidden">
      <Navbar />
      <div className="flex flex-col md:text-3xl font-bold text-sm text-white separator md:gap-10 gap-4 justify-center items-center mt-24">
        <p className="separator mt-2 text-center">About us</p>
      </div>
      <div className="flex flex-col md:text-3xl text-sm text-white separator1 md:gap-2 gap-4 justify-center items-center">
        <p className="separator mt-10 text-center md:text-5xl text-xl font-bold">
          Welcome to RNG
        </p>
        <p className="font-Poppins text-center md:text-2xl font-bold">
          - where every game is a chance to Run and Gun!
        </p>
      </div>
      <div className="flex justify-evenly md:flex-row flex-col">
        <div className="e-card m-3 playing w-auto md:w-1/3">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="text-justify px-5 absolute top-10 text-lg font-medium font-Poppins content-center">
            &emsp; &emsp; <i className="text-xl font-bold">RNG </i>(Run and Gun), we are dedicated to creating a competitive and
            engaging environment for gamers of all skill levels. Founded by
            passionate gamers, RNG is more than just a tournament organizer.{" "}
            <br /> We are a community of like-minded individuals who share a
            love for Valorant and competitive gaming. Our mission is to provide
            a platform where players can showcase their skills, connect with
            fellow gamers, and experience the thrill of high-stakes competition.
          </div>
        </div>
        <div className="e-card m-3 playing w-auto md:w-1/3 no-scrollbar overflow-y-auto">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="text-justify px-5 absolute top-10 text-lg font-medium font-Poppins content-center">
            <h2 className="text-2xl font-semibold mb-2">What We Offer</h2>
            <ul className="list-disc list-inside">
              <li>
                <i className="text-xl font-bold">Exciting Tournaments:</i> Whether
                you're a seasoned pro or just starting out, our tournaments are
                designed to challenge and excite. With various formats and prize
                pools, there's always something to look forward to at RNG.
              </li>
              <li>
                <i className="text-xl font-bold">Community Engagement:</i> Join our
                vibrant community of Valorant enthusiasts. Participate in
                discussions, find teammates, and share your gaming experiences.
                At RNG, you're never alone on your gaming journey.
              </li>
              <li>
                <i className="text-xl font-bold">Professional Organization:</i> Our
                team is committed to delivering top-notch tournaments with
                smooth operations, fair play, and exceptional player support. We
                take pride in our professionalism and dedication to the gaming
                community.
              </li>
              <li className="">
                <i className="text-xl font-bold">Growth Opportunities:</i> RNG is
                not just about competition; it's about growth. We provide
                resources, tips, and training sessions to help you improve your
                gameplay and reach new heights in your Valorant career.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div className="md:text-4xl text-lg font-semibold text-white separator text-center mb-5" data-aos="fade-left">
          Meet our Team
        </div>
        <div className="team-container">
          {[0, 1].map((rowIndex) => (
            <div key={rowIndex} className="team-row">
              {teamMembers.slice(rowIndex * 2, rowIndex * 2 + 2).map((member, index) => {
                const globalIndex = rowIndex * 2 + index;
                return (
                  <div key={globalIndex} className="container-card" data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}>
                    <div className="cover-photo">
                      <img src={member.image} className="profile" alt={member.name} />
                    </div>
                    <div className="profile-name md:font-bold md:text-2xl text-lg">{member.name}</div>
                    {expandedCard === globalIndex ? (
                      <p className="about text-center">{member.description}</p>
                    ) : (
                      <button onClick={() => handleReadMore(globalIndex)} className="msg-btn">Read more</button>
                    )}
                    <div>
                      <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                      </a>
                      <a href={member.facebook} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook"></i>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
