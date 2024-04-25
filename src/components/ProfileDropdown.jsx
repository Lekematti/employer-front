import React from 'react';

const ProfileDropdown = () => {
  const styles = {
    profileDropdown: {
      position: 'absolute',
      top: '4.5rem',
      right: '1.5rem',
      width: '80px',
      borderRadius: '15px',
      padding: '15px',
      backgroundColor: 'white',
      border: '1px solid gray',
    },
    profileDropdownBefore: {
      content: '""', // Empty string for content
      position: 'absolute',
      top: '-1rem',
      right: '2rem',
      width: '25px',
      height: '25px',
      transform: 'rotate(45deg)',
      backgroundColor: 'white',
      borderLeft: '1px solid gray',
      borderTop: '1px solid gray',
    },
  };

  return (
    <div className='flex flex-col' style={styles.profileDropdown}>
      <ul className='flex flex-col gap-4'>
        <li>Profile</li>
        <li>Settings</li>
        <li>Log out</li>
      </ul>
      <div style={styles.profileDropdownBefore} /> {/* Inline style for before element */}
    </div>
  );
};

export default ProfileDropdown;