import React, { useState } from 'react';
import './Registration.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Registration = () => {
    const [avatar, setAvatar] = useState(null);
    const authstatus = useSelector((state) => state.auth.status)
    const [formData, setFormData] = useState({
        teamname: '',
        teamleadername: '',
        teamleaderEmail: '',
        teamleaderPhoneno: '',
        teamleaderRiotId: '',
        teammember1name: '',
        teammember1riotId: '',
        teammember2name: '',
        teammember2riotId: '',
        teammember3name: '',
        teammember3riotId: '',
        teammember4name: '',
        teammember4riotId: ''
    });
    const navigate = useNavigate()
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setAvatar(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const accesstoken = window.localStorage.getItem("accesstoken")
    const handleRegister = async () => {
        // Form validation
        try {
            console.log(authstatus)
            if (authstatus === "false") {
                navigate("/Login")
            }
            for (const key in formData) {
                if (formData[key] === '') {
                    alert(`Please fill in the ${key.replace(/([A-Z])/g, ' $1')}`);
                    return;
                }
            }

            if (!avatar) {
                alert('Please upload an avatar');
                return;
            }

            // Prepare data for submission
            const data = new FormData();
            data.append('teamImage', document.getElementById('avatar').files[0]);
            for (const key in formData) {
                data.append(key, formData[key]);
            }

            const response = await fetch('http://localhost:5000/registration', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accesstoken
                },
                body: data
            });

            if (!response.ok) {
                console.log(await response.json())
            }
            const result = await response.json();
            alert(result.message)
            // const { orderId, teamId } = result.data
            // initiatePayment(orderId, teamId)
            // Reset form
            setAvatar(null);
            setFormData({
                teamname: '',
                teamleadername: '',
                teamleaderEmail: '',
                teamleaderPhoneno: '',
                teamleaderRiotId: '',
                teammember1name: '',
                teammember1riotId: '',
                teammember2name: '',
                teammember2riotId: '',
                teammember3name: '',
                teammember3riotId: '',
                teammember4name: '',
                teammember4riotId: ''
            });
            navigate("/")
        } catch (error) {
            console.log("Error")
        }
    };
    // const initiatePayment = (orderId, teamId) => {
    //     const options = {
    //         key: String(import.meta.env.RAZORPAY_KEY),
    //         amount: "50000", // Amount in paise
    //         currency: "INR",
    //         name: "RNG",
    //         description: "Team Registration Fee",
    //         image: "../../../assets/Logo.jpeg",
    //         order_id: orderId,
    //         handler: function (response) {
    //             alert(response.razorpay_payment_id);
    //             alert(response.razorpay_order_id);
    //             alert(response.razorpay_signature);

    //             // Call your backend to verify the payment
    //             verifyPayment(response, teamId);
    //         },
    //         prefill: {
    //             name: String(formData.teamleadername),
    //             email: String(formData.teamleaderEmail),
    //             contact: String(formData.teamleaderPhoneno)
    //         },
    //         notes: {
    //             address: "Valorant Registration PVT Limited"
    //         },
    //         theme: {
    //             color: "#3399cc"
    //         }
    //     };
    //     const rzp1 = new window.Razorpay(options);
    //     rzp1.on('payment.failed', function (response) {
    //         alert(response.error.code);
    //         alert(response.error.description);
    //         alert(response.error.source);
    //         alert(response.error.step);
    //         alert(response.error.reason);
    //         alert(response.error.metadata.order_id);
    //         alert(response.error.metadata.payment_id);
    //     });
    //     rzp1.open();
    // };

    // const verifyPayment = async (paymentDetails, teamId) => {
    //     try {
    //         const response = await fetch('http://localhost:5000/registration/payment', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 ...paymentDetails,
    //                 teamId
    //             })
    //         });
    //         const data = await response.json();

    //         if (data.success) {
    //             alert(data.data.message);
    //             navigate("/")
    //             // Redirect or show success message
    //         } else {
    //             alert('Payment failed!');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };
    return (
        <main className='body'>
            <div className="wrapper">
                <form onSubmit={handleSubmit} className="form">
                    <div className="top">
                        <h1>Registration</h1>
                    </div>
                    <div className="input-box flex flex-col justify-center items-center gap-3">
                        <div className="avatar-wrapper">
                            <input
                                type="file"
                                id="avatar"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {avatar && <img id="output" src={avatar} alt="Avatar" />}
                        </div>
                        <label htmlFor="avatar" className="label">Team Logo</label>
                    </div>

                    <div className="input-box">
                        <label htmlFor="teamname" className="label">Team Name</label>
                        <div className="input-container">
                            <i className="bx bx-user"></i>
                            <input
                                type="text"
                                className="input-field"
                                name="teamname"
                                id="teamname"
                                placeholder="Team Name"
                                value={formData.teamname}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <label htmlFor="teamleadername" className="label">Leader Name</label>
                        <div className="input-container">
                            <i className="bx bx-user"></i>
                            <input
                                type="text"
                                className="input-field"
                                name="teamleadername"
                                id="teamleadername"
                                placeholder="Leader Name"
                                value={formData.teamleadername}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <label htmlFor="teamleaderEmail" className="label">Leader Email</label>
                        <div className="input-container">
                            <i className="bx bx-envelope"></i>
                            <input
                                type="email"
                                className="input-field"
                                name="teamleaderEmail"
                                id="teamleaderEmail"
                                placeholder="Email"
                                value={formData.teamleaderEmail}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <label htmlFor="teamleaderPhoneno" className="label">Leader Phone No.</label>
                        <div className="input-container">
                            <i className="bx bx-mobile-alt"></i>
                            <input
                                type="tel"
                                className="input-field"
                                name="teamleaderPhoneno"
                                id="teamleaderPhoneno"
                                pattern="[0-9]{10}"
                                placeholder="Phone No."
                                value={formData.teamleaderPhoneno}
                                onChange={handleInputChange}
                                maxLength={10}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <label htmlFor="teamleaderRiotId" className="label">Leader Riot Id</label>
                        <div className="input-container">
                            <input
                                type="text"
                                className="input-field"
                                name="teamleaderRiotId"
                                id="teamleaderRiotId"
                                placeholder="Leader Riot Id"
                                value={formData.teamleaderRiotId}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <label htmlFor="teammember1name" className="label">Member-1 Name</label>
                        <div className="input-container">
                            <i className="bx bx-user"></i>
                            <input
                                type="text"
                                className="input-field"
                                name="teammember1name"
                                id="teammember1name"
                                placeholder="Member name"
                                value={formData.teammember1name}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <label htmlFor="teammember1riotId" className="label">Member-1 Riot Id</label>
                        <div className="input-container">
                            <input
                                type="text"
                                className="input-field"
                                name="teammember1riotId"
                                id="teammember1riotId"
                                placeholder="Member Riot Id"
                                value={formData.teammember1riotId}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <label htmlFor="teammember2name" className="label">Member-2 Name</label>
                        <div className="input-container">
                            <i className="bx bx-user"></i>
                            <input
                                type="text"
                                className="input-field"
                                name="teammember2name"
                                id="teammember2name"
                                placeholder="Member name"
                                value={formData.teammember2name}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <label htmlFor="teammember2riotId" className="label">Member-2 Riot Id</label>
                        <div className="input-container">
                            <input
                                type="text"
                                className="input-field"
                                name="teammember2riotId"
                                id="teammember2riotId"
                                placeholder="Member Riot Id"
                                value={formData.teammember2riotId}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <label htmlFor="teammember3name" className="label">Member-3 Name</label>
                        <div className="input-container">
                            <i className="bx bx-user"></i>
                            <input
                                type="text"
                                className="input-field"
                                name="teammember3name"
                                id="teammember3name"
                                placeholder="Member name"
                                value={formData.teammember3name}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <label htmlFor="teammember3riotId" className="label">Member-3 Riot Id</label>
                        <div className="input-container">
                            <input
                                type="text"
                                className="input-field"
                                name="teammember3riotId"
                                id="teammember3riotId"
                                placeholder="Member Riot Id"
                                value={formData.teammember3riotId}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <label htmlFor="teammember4name" className="label">Member-4 Name</label>
                        <div className="input-container">
                            <i className="bx bx-user"></i>
                            <input
                                type="text"
                                className="input-field"
                                name="teammember4name"
                                id="teammember4name"
                                placeholder="Member name"
                                value={formData.teammember4name}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <label htmlFor="teammember4riotId" className="label">Member-4 Riot Id</label>
                        <div className="input-container">
                            <input
                                type="text"
                                className="input-field"
                                name="teammember4riotId"
                                id="teammember4riotId"
                                placeholder="Member Riot Id"
                                value={formData.teammember4riotId}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <button className='submit' onClick={handleRegister}>
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Registration;
