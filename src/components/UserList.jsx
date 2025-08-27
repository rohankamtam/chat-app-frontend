import React from 'react';

const UserList = ({ users }) => {
  return (
    <div className="user-list" style={{
      width: '200px',
      borderRight: '1px solid #444', // A slightly lighter border for dark mode
      padding: '10px',
      backgroundColor: '#2c2c2e', // Dark background
      color: 'white' // White text for readability
    }}>
      <h2>Online ({users.length})</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {users.map((user) => (
          <li key={user.id} style={{ marginBottom: '5px', color: '#d1d1d1' }}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;