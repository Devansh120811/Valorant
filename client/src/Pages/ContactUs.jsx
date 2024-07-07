import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import "./ContactUs.css";

function ContactUs() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [phoneNO, setPhoneNO] = useState("");
  const [phoneNOError, setPhoneNOError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validatePhoneNO = () => {
    const phoneNORegex = /^\d{10}$/;
    setPhoneNOError(!phoneNORegex.test(phoneNO) && phoneNO !== "");
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(email) && email !== "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleContact();
  };

  const handleContact = async () => {
    validateEmail();
    validatePhoneNO();

    if (fname && lname && email && phoneNO && message && !emailError && !phoneNOError) {
      const data = {
        firstName: fname,
        lastName: lname,
        email,
        phoneNo: phoneNO,
        message,
      };
      const token = window.localStorage.getItem("accesstoken");
      try {
        const response = await fetch("http://localhost:5000/ContactUs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        if (!response.ok) throw new Error("Failed to send message! Please try again.");
        else {
          alert(result.message);
          console.log(result.data.user._id);
          navigate('/');
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };

  return (
    <div className="gap-20 flex flex-col bodyy">
      <Navbar />
      <section id="section-wrapper">
        <div className="box-wrapper">
          <div className="info-wrap">
            <h2 className="info-title">Contact Information</h2>
            <h3 className="info-sub-title">
              Fill up the form and our Team will get back to you within 24 hours
            </h3>
            <ul className="info-details">
              <li>
                <i className="fas fa-phone-alt"></i>
                <span>Phone:</span> <a href="tel:+1235235598">+1235235598</a>
              </li>
              <li>
                <i className="fas fa-paper-plane"></i>
                <span>Email:</span>{" "}
                <a href="mailto:info@yoursite.com">info@yoursite.com</a>
              </li>
              <li>
                <i className="fas fa-globe"></i>
                <span>Website:</span> <a href="#">yoursite.com</a>
              </li>
            </ul>
            <ul className="social-icons">
              <li>
                <a href="https://www.instagram.com/hetavi.15/" target="_blank">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/amit-kanjariya-235078269/" target="_blank">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="form-wrap">
            <form onSubmit={handleSubmit}>
              <h2 className="form-title">Send us a message</h2>
              <div className="form-fields">
                <div className="form-group">
                  <input
                    type="text"
                    className="fname"
                    placeholder="First Name"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="lname"
                    placeholder="Last Name"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="email"
                    placeholder="Mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={validateEmail}
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    title={emailError ? "Invalid email format" : ""}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    className="phone"
                    placeholder="Phone"
                    value={phoneNO}
                    onChange={(e) => setPhoneNO(e.target.value)}
                    onBlur={validatePhoneNO}
                    pattern="^\d{10}$"
                    title={phoneNOError ? "Invalid phone number format" : ""}
                    required
                    maxLength={10}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Write your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="submit-button"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default ContactUs;
