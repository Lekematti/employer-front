
import React from 'react';
import Sidebar from '../components/Sidebar'; // Assuming the path is correct
import IconsComponent from '../components/IconsComponent.jsx'; // Assuming the path is correct
import '../CSS/Profile.css'; // Assuming the path is correct
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit } from "@fortawesome/free-solid-svg-icons"; // Assuming you want to use the edit icon
import { useNavigate } from 'react-router-dom';

function Profile() {
  const user = {
    name: 'Metropolia Karamalmi',
    email: 'karamalmi@metropolia.fi',
    address: 'Karaportti 2',
    pnumber: '+35858458485',
    busid: 'Y-2203023',
    avatar: 'https://www.metropolia.fi/sites/default/files/images/Kampukset/karamalmin-kampus.jpg', // Placeholder image
  };

  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/editprofile');
  };

  return (
    <div className="page-wrapper">
      <div className="profile-container">
      <h2 className="profile-title">Profile</h2>
        <img src={user.avatar} alt="Profile avatar" className="profile-avatar" />
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p><strong>Email: </strong>{user.email}</p>
          <p><strong>Address: </strong>{user.address}</p>
          <p><strong>Phone number: </strong>{user.pnumber}</p>
          <p><strong>Business ID: </strong>{user.busid}</p>
          <button className="edit-button" onClick={handleEditProfile}>
            <FontAwesomeIcon icon={faEdit} /> Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
