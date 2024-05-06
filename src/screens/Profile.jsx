import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import userHooks from '../hooks/userHooks';
import { MainContext } from '../Context/MainContext';
import Sidebar from '../components/Sidebar'; // Ensure correct import path
import IconsComponent from '../components/IconsComponent'; // Ensure correct import path
import '../CSS/Profile.css'; // Ensure CSS is correctly applied

function Profile() {
  const { user } = useContext(MainContext); // Assuming user ID is stored here
  const { getEmployeeById } = userHooks(); // Assuming this is how you access the hook
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.account.id) {
      getEmployeeById(user.account.id).then(data => {
        // Assuming the data returned is an array and the first item is the profile
        setProfile(data[0]); // Set the first item of the array to state
      });
    }
  }, []); // Add dependencies to useEffect
  
 console.log(profile);
  const handleEditProfile = () => {
    navigate('/editprofile'); // Ensure the route is correct
  };

  if (!profile) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="page-wrapper1">
        <IconsComponent />
        <div className="profile-container">
            <h2 className="profile-title">Profile</h2>
            <img 
                src={`http://localhost:3000/uploads/${profile.picture || 'default_avatar.png'}`} 
                alt="Profile" 
                className="profile-avatar" 
            />
            <div className="profile-info">
                <h2>{profile.name}</h2>
                <p><strong>Email: </strong>{profile.email}</p>
                <p><strong>Address: </strong>{profile.address}</p>
                <p><strong>Phone number: </strong>{profile.phone}</p>
                <p><strong>Business ID: </strong>{profile.businessId}</p>
                <button className="edit-button" onClick={handleEditProfile}>
                    <FontAwesomeIcon icon={faEdit} /> Edit Profile
                </button>
            </div>
        </div>
    </div>
);
}

export default Profile;
