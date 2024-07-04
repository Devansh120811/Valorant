import React, { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [showPass, setShowPass] = useState(false);
  const [initialImage, setInitialImage] = useState("../../../assets/User.png");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fileName, setFileName] = useState();
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+\.com$/;
    setEmailError(!emailRegex.test(email) && email !== "");
  };
  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%^&*])[A-Za-z\d!@#\$%^&*]{8,}$/;
    setPasswordError(!passwordRegex.test(password) && password !== "");
  };

  const handlePasswordToggle = () => {
    setShowPass(!showPass);
  };

  const handleSignup = async () => {
    validateEmail();
    validatePassword();
    if (!fileName) {
      alert("Please Provide the Avatar Image.");
      return;
    }
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("avatarImage", fileName);
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        body: formdata,
      });
      const dataa = await response.json();
      if (!response.ok) throw new Error("User cannot Signup");
      else {
        alert(dataa.message);
        console.log(dataa.data._id);
        navigate(`/Signup/verifyOTP/${dataa.data._id}`);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleImageClick = () => {
    inputRef.current.click();
  };
  const handleUpload = (event) => {
    // console.log(event.target.files[0])
    const file = event.target.files[0];
    // console.log(JSON.stringify(file.name))
    const reader = new FileReader();

    reader.onload = () => {
      setInitialImage(reader.result);
    };

    reader.readAsDataURL(file);
    setFileName(file);
  };
  return (
    <form id="signup-form" onSubmit={handleSubmit}>
      <section className="sec">
        {Array.from({ length: 160 }, (_, index) => (
          <span key={index} className="box-property"></span>
        ))}

        <div className="signup">
          <div className="main-box pt-0 rounded-md max-w-sm w-full text-white text-left content">
            <div className="signup">
              <div className="form">
                <div className="flex flex-col gap-2">
                  <div
                    onClick={handleImageClick}
                    className="flex flex-col justify-center items-center"
                  >
                    <h1 className="log-name text-3xl flex justify-center font-medium mb-4 ">
              SIGN UP
            </h1>
                    <img src={initialImage} width={40}></img>
                    <input
                      type="file"
                      id="upload-button"
                      accept="image/*"
                      ref={inputRef}
                      onChange={handleUpload}
                      className="hidden cursor-pointer rounded-full"
                    />
                  </div>
                  
                  <div className="input-username">
                    <input
                      className="input-tag  border-none text-white w-full h-12 px-4 rounded-md"
                      id="signup-username"
                      type="email"
                      placeholder="Email"
                      value={email}
                      name="email"
                      pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={validateEmail}
                      title={
                        emailError ? "Please enter valid email address" : ""
                      }
                      required
                    />
                  </div>

                  <div className="input-username flex py-3">
                    <input
                      className="input-tag  border-none bg-black text-white w-full h-12 px-4 rounded-md"
                      id="signup-password"
                      type={showPass ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%^&*])[A-Za-z\d!@#\$%^&*]{8,}$"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={validatePassword}
                      title={passwordError ? "Please enter valid password" : ""}
                      required
                    />
                  </div>
                  <div className="flex gap-3 mt-2">
                    <img
                      src={
                        showPass
                          ? "../../../assets/OpenEye.svg"
                          : "../../../assets/CloseEye.svg"
                      }
                      onClick={handlePasswordToggle}
                      className="hover:cursor-pointer"
                      alt="Toggle Password Visibility"
                    />
                    <p
                      onClick={handlePasswordToggle}
                      className="hover:cursor-pointer"
                    >
                      {showPass ? "Hide Password" : "Show Password"}
                    </p>
                  </div>
                </div>
                <div className="login-box">
                  <button
                    className="login-btn bg-green-600 text-black text-lg font-semibold w-full mt-4 mb-2 rounded-md h-10"
                    onClick={handleSignup}
                  >
                    Sign Up
                  </button>
                </div>
                <hr className="hr-className my-2 mx-5 border-gray-700" />
                <div className=" flex flex-col gap-3 mt-4">
                  <h2 className="h2-signup text-lg">
                    <p>Already have an account? </p>
                    <a href="/Login" className=" underline login-color">
                      Log in
                    </a>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
};

export default Signup;