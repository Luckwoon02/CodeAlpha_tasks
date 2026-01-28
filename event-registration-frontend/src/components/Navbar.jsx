// components/Navbar.jsx - Navigation bar component
// This component shows navigation links to different pages

import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        {/* App title/logo */}
        <h2 style={titleStyle}>Event Registration System</h2>
        
        {/* Navigation links */}
        <div style={linksStyle}>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/register-user" style={linkStyle}>Register User</Link>
          <Link to="/my-registrations" style={linkStyle}>My Registrations</Link>
        </div>
      </div>
    </nav>
  );
};

// Simple CSS styles for the navbar
const navStyle = {
  backgroundColor: '#2c3e50',
  padding: '1rem 0',
  marginBottom: '2rem'
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 1rem'
};

const titleStyle = {
  color: 'white',
  margin: 0
};

const linksStyle = {
  display: 'flex',
  gap: '1.5rem'
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  transition: 'background-color 0.3s'
};

export default Navbar;