import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./VerifyOTP.css";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [hue, setHue] = useState(0);
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    const interval = setInterval(() => {
      setHue((prevHue) => (prevHue + 1) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move to the next input field if the current input is not empty
    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const OTPVERIFY = async () => {
    try {
      const data = {
        OTP: otp.join("")
      }
      console.log(typeof (otp.join("")))
      const response = await fetch(`http://localhost:5000/signup/verify/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        throw new Error("Error while Verifying the OTP")
      }
      else {
        const r1 = await response.json()
        alert(r1.message)
        navigate("/Login")
      }
    } catch (error) {
      alert("Error:", error)
    }
  }
  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      e.target.previousSibling.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      e.target.nextSibling.focus();
    } else if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      if (!newOtp[index] && index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        e.target.previousSibling.focus();
      } else {
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  return (
    <div className="otp-container gap-4">
      <h2 className="otp-title text-center font-Poppins">OTP Verification</h2>
      <p className=" md:text-xl font-semibold text-center text-sm">
        Enter the Six digit OTP for Verification:
      </p>
      <div className="otp-inputs">
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            className="otp-input"
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>
      <button
        className="verify-button cursor-pointer"
        onClick={OTPVERIFY}
      >
        Verify
      </button>
    </div>
  );
};

export default VerifyOTP;
