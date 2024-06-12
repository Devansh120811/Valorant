import React from "react";
import "./Login.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { login } from "../../store/authslice.js";

function Login() {
    const [showPass, setshowPass] = useState(false);
    const [initialImage, setInitialImage] = useState("../../../assets/User.png")
    const [fileName, setFileName] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+\.com$/;
        setEmailError(!emailRegex.test(email) && email !== "");
    };

    const validatePassword = () => {
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%^&*])[A-Za-z\d!@#\$%^&*]{8,}$/;
        setPasswordError(!passwordRegex.test(password) && password !== "");
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
    const handleLogin = async (e) => {
        e.preventDefault();
        validateEmail();
        validatePassword();
        if (!fileName) {
            alert("Please Provide the Avatar Image.")
            return;
        }
        if (!emailError && !passwordError && email && password) {

            const formdata = new FormData()
            formdata.append("email", email)
            formdata.append("password", password)
            formdata.append("avatarImage", fileName)
            try {
                const response = await fetch("http://localhost:5000/login", {
                    method: "POST",
                    body: formdata,
                });
                const dataa = await response.json();
                const { accessToken, refreshToken } = dataa.data;
                if (!response.ok) throw new Error("User cannot login.");
                else {
                    alert("User Login Successfully.");
                    window.localStorage.setItem("authStatus", true)
                    window.localStorage.setItem("accesstoken", accessToken);
                    window.localStorage.setItem("refreshtoken", refreshToken);
                    dispatch(login({ accessToken, refreshToken }));
                    navigate("/Home");
                }
            } catch (error) {
                console.log("Error: ", Error);
            }
            if (rememberMe) {
                // Save email and password for at least one month
                localStorage.setItem("rememberedEmail", email);
                localStorage.setItem("rememberedPassword", password);
                // Set expiry date for one month from now
                const expiryDate = new Date();
                expiryDate.setMonth(expiryDate.getMonth() + 1);
                localStorage.setItem("expiryDate", expiryDate.toISOString());
            } else {
                // Clear remembered email and password if "Remember me" is unchecked
                localStorage.removeItem("rememberedEmail");
                localStorage.removeItem("rememberedPassword");
                localStorage.removeItem("expiryDate");
            }
        }
    };

    // Load remembered email and password if available
    useState(() => {
        const rememberedEmail = localStorage.getItem("rememberedEmail");
        const rememberedPassword = localStorage.getItem("rememberedPassword");
        const expiryDate = localStorage.getItem("expiryDate");

        if (rememberedEmail && rememberedPassword && expiryDate) {
            const expiry = new Date(expiryDate);
            if (expiry > new Date()) {
                setEmail(rememberedEmail);
                setPassword(rememberedPassword);
                setRememberMe(true);
            } else {
                // Clear remembered email and password if expired
                localStorage.removeItem("rememberedEmail");
                localStorage.removeItem("rememberedPassword");
                localStorage.removeItem("expiryDate");
            }
        }
    }, []);

    return (
        <form id="login-form" onSubmit={handleLogin}>
            <section>
                {Array.from({ length: 160 }, (_, index) => (
                    <span key={index}></span>
                ))}

                <div className="signin">
                    <div className="main-box  rounded-md">
                        <h1 className="log-name text-3xl text-white  text-center mb-5">
                            LOG IN
                        </h1>
                        <div className="signup">
                            <div className="form">
                                <div className="fieldset">
                                    <div onClick={handleImageClick} className="flex flex-col justify-center items-center">
                                        <img src={initialImage} width={100}>
                                        </img>
                                        <input
                                            type="file"
                                            id="upload-button"
                                            accept="image/*"
                                            ref={inputRef}
                                            onChange={handleUpload}
                                            className="hidden cursor-pointer"
                                        />
                                    </div>
                                    <div className="label">
                                        <div className="input-username">
                                            <input
                                                className="input-tag my-2 border-none text-white w-full h-12 px-4 rounded-md"
                                                id="signup-username"
                                                type="email"
                                                placeholder="Email"
                                                value={email}
                                                name="email"
                                                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                                                onChange={(e) => setEmail(e.target.value)}
                                                onBlur={validateEmail}
                                                title={emailError ? "Please enter valid email address" : ""}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="fieldset mb-3">
                                        <div className="label">
                                            <div className="input-password">
                                                <input
                                                    className="input-tag my-3 border-none bg-black text-white w-full h-12 px-4 rounded-md"
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
                                        </div>
                                        <div className="check mb-6 text-white flex gap-2 items-center">
                                            <input type="checkbox" id="accept-terms" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                                            <label htmlFor="accept-terms">
                                                Remember me
                                            </label>
                                            <input type="checkbox" id="ShowPass" checked={showPass} onChange={(e) => setshowPass(e.target.checked)} />
                                            <label htmlFor="ShowPass">
                                                Show Password
                                            </label>
                                        </div>
                                        <div className="login-box mb-2 flex flex-col">
                                            <button className="login-btn bg-green-500 text-black w-full font-semibold text-lg py-2 h-12 rounded-md" type="submit">
                                                Log In
                                            </button>
                                        </div>
                                        <div className="forget-password text-center ">
                                            <a href="/forgot-password" className="text-white underline">
                                                Forget your password?
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <hr className="hr-className mb-2 mx-10 border-gray-700" />
                                <div className="signup-acc">
                                    <h2 className="h2-signup text-center text-lg">
                                        <i className="text-gray-400">Don't have an account? </i>
                                        <a href="/Signup" className="underline text-white">
                                            Sign up
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
}

export default Login;