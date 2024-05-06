import React, { useState } from 'react';
import '../CSS/EditProfile.css'; // Assuming the path is correct
import IconsComponent from '../components/IconsComponent.jsx'; // Assuming the path is correct
import '../CSS/Profile.css'; // Assuming the path is correct
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit } from "@fortawesome/free-solid-svg-icons";
import Sidebar from '../components/Sidebar.jsx';
import PropTypes from 'prop-types';


function EditProfile({ user = {}, updateUser = () => {} }) {
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    address: user.address || '',
    pnumber: user.pnumber || '',
    busid: user.busid || '',
    bio: user.bio || '',
    avatar: user.avatar || '', 
  });

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          avatar: reader.result, // Base64 string of the uploaded image
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user profile
    updateUser(formData);
  };

  return (
    <div className="page-wrapper">
    <div className="edit-profile-container">
    <h2 className="edit">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>Profile Picture:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Phone number:</label>
          <input
            type="number"
            name="pnumber"
            value={formData.pnumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Business ID:</label>
          <input
            type="text"
            name="busid"
            value={formData.busid}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="update-button">
          Update Profile
        </button>
      </form>
    </div>
    </div>
  );
}

EditProfile.propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.string,
      pnumber: PropTypes.string,
      busid: PropTypes.string,
      bio: PropTypes.string,
      avatar: PropTypes.string,
    }),
    updateUser: PropTypes.func,
  };

export default EditProfile;
