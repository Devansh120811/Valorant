import React, { useState } from 'react';
import './Registration.css';

const Registration = () => {
    const [avatar, setAvatar] = useState(null);
    const [formData, setFormData] = useState({
        leaderName: '',
        leaderEmail: '',
        leaderPhone: '',
        leaderRiotId: '',
        member1Name: '',
        member1RiotId: '',
        member2Name: '',
        member2RiotId: '',
        member3Name: '',
        member3RiotId: '',
        member4Name: '',
        member4RiotId: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setAvatar(URL.createObjectURL(e.target.files[0]));
    };
    const handleSubmit = (e) => {
     e.preventDefault()
    }
    const handleRegister = async () => {

        // Form validation
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
        data.append('avatar', document.getElementById('avatar').files[0]);
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await fetch('http://localhost:5000/registration', {
                method: 'POST',
                body: data
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            alert('Registration successful!');
            console.log('Success:', result);

            // Reset form
            setAvatar(null);
            setFormData({
                leaderName: '',
                leaderEmail: '',
                leaderPhone: '',
                leaderRiotId: '',
                member1Name: '',
                member1RiotId: '',
                member2Name: '',
                member2RiotId: '',
                member3Name: '',
                member3RiotId: '',
                member4Name: '',
                member4RiotId: ''
            });
        } catch (error) {
            alert('There was a problem with your submission');
            console.error('Error:', error);
        }
    };

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
                        <label htmlFor="leaderName" className="label">Leader Name</label>
                        <div className="input-container">
                            <i className="bx bx-user"></i>
                            <input
                                type="text"
                                className="input-field"
                                name="leaderName"
                                id="leaderName"
                                placeholder="Leader Name"
                                value={formData.leaderName}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <label htmlFor="leaderEmail" className="label">Leader Email</label>
                        <div className="input-container">
                            <i className="bx bx-envelope"></i>
                            <input
                                type="email"
                                className="input-field"
                                name="leaderEmail"
                                id="leaderEmail"
                                placeholder="Email"
                                value={formData.leaderEmail}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <label htmlFor="leaderPhone" className="label">Leader Phone No.</label>
                        <div className="input-container">
                            <i className="bx bx-mobile-alt"></i>
                            <input
                                type="tel"
                                className="input-field"
                                name="leaderPhone"
                                id="leaderPhone"
                                pattern="[0-9]{10}"
                                placeholder="Phone No."
                                value={formData.leaderPhone}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <label htmlFor="leaderRiotId" className="label">Leader Riot Id</label>
                        <div className="input-container">
                            <input
                                type="text"
                                className="input-field"
                                name="leaderRiotId"
                                id="leaderRiotId"
                                placeholder="Leader Riot Id"
                                value={formData.leaderRiotId}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <label htmlFor="member1Name" className="label">Member-1 Name</label>
                        <div className="input-container">
                            <i className="bx bx-user"></i>
                            <input
                                type="text"
                                className="input-field"
                                name="member1Name"
                                id="member1Name"
                                placeholder="Member name"
                                value={formData.member1Name}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <label htmlFor="member1RiotId" className="label">Member-1 Riot Id</label>
                        <div className="input-container">
                            <input
                                type="text"
                                className="input-field"
                                name="member1RiotId"
                                id="member1RiotId"
                                placeholder="Member Riot Id"
                                value={formData.member1RiotId}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <label htmlFor="member2Name" className="label">Member-2 Name</label>
                        <div className="input-container">
                            <i className="bx bx-user"></i>
                            <input
                                type="text"
                                className="input-field"
                                name="member2Name"
                                id="member2Name"
                                placeholder="Member name"
                                value={formData.member2Name}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <label htmlFor="member2RiotId" className="label">Member-2 Riot Id</label>
                        <div className="input-container">
                            <input
                                type="text"
                                className="input-field"
                                name="member2RiotId"
                                id="member2RiotId"
                                placeholder="Member Riot Id"
                                value={formData.member2RiotId}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <label htmlFor="member3Name" className="label">Member-3 Name</label>
                        <div className="input-container">
                            <i className="bx bx-user"></i>
                            <input
                                type="text"
                                className="input-field"
                                name="member3Name"
                                id="member3Name"
                                placeholder="Member name"
                                value={formData.member3Name}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <label htmlFor="member3RiotId" className="label">Member-3 Riot Id</label>
                        <div className="input-container">
                            <input
                                type="text"
                                className="input-field"
                                name="member3RiotId"
                                id="member3RiotId"
                                placeholder="Member Riot Id"
                                value={formData.member3RiotId}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <label htmlFor="member4Name" className="label">Member-4 Name</label>
                        <div className="input-container">
                            <i className="bx bx-user"></i>
                            <input
                                type="text"
                                className="input-field"
                                name="member4Name"
                                id="member4Name"
                                placeholder="Member name"
                                value={formData.member4Name}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <label htmlFor="member4RiotId" className="label">Member-4 Riot Id</label>
                        <div className="input-container">
                            <input
                                type="text"
                                className="input-field"
                                name="member4RiotId"
                                id="member4RiotId"
                                placeholder="Member Riot Id"
                                value={formData.member4RiotId}
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
