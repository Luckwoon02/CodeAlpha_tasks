// pages/RegisterUser.jsx - User registration page component
// This page allows new users to create an account

import { useState } from 'react';
import { createUser } from '../api/api';

const RegisterUser = () => {
  // State to store form input values
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  
  // State to track form submission status
  const [loading, setLoading] = useState(false);
  
  // State to store success/error messages
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  // State to store the created user ID
  const [userId, setUserId] = useState('');

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update the form data state
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear any previous messages when user starts typing
    setMessage('');
    setError('');
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    
    // Basic form validation
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please fill in all fields');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      setMessage('');
      
      // Call the API to create a new user
      const response = await createUser(formData);
      
      // Show success message and store user ID
      setMessage('User registered successfully!');
      setUserId(response.user._id);
      
      // Clear the form
      setFormData({
        name: '',
        email: ''
      });
      
    } catch (err) {
      // Show error message if something goes wrong
      setError(err.error || 'Failed to register user');
      console.error('Error creating user:', err);
    } finally {
      // Always set loading to false when done
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h1>Register New User</h1>
      <p>Create your account to register for events</p>
      
      {/* Registration form */}
      <form onSubmit={handleSubmit} style={formStyle}>
        {/* Name input */}
        <div style={inputGroupStyle}>
          <label htmlFor="name" style={labelStyle}>Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            style={inputStyle}
            disabled={loading}
          />
        </div>
        
        {/* Email input */}
        <div style={inputGroupStyle}>
          <label htmlFor="email" style={labelStyle}>Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            style={inputStyle}
            disabled={loading}
          />
        </div>
        
        {/* Submit button */}
        <button 
          type="submit" 
          style={buttonStyle} 
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register User'}
        </button>
      </form>
      
      {/* Success message */}
      {message && (
        <div style={successStyle}>
          <p>{message}</p>
          {userId && (
            <div style={userIdStyle}>
              <strong>Your User ID:</strong> {userId}
              <br />
              <small>Save this ID - you'll need it to view your registrations!</small>
            </div>
          )}
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div style={errorStyle}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

// Simple CSS styles
const containerStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '1rem'
};

const formStyle = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  marginBottom: '1rem'
};

const inputGroupStyle = {
  marginBottom: '1.5rem'
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: 'bold',
  color: '#333'
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '1rem',
  boxSizing: 'border-box'
};

const buttonStyle = {
  backgroundColor: '#3498db',
  color: 'white',
  padding: '0.75rem 2rem',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
  width: '100%'
};

const successStyle = {
  backgroundColor: '#d4edda',
  color: '#155724',
  padding: '1rem',
  borderRadius: '4px',
  border: '1px solid #c3e6cb',
  marginBottom: '1rem'
};

const errorStyle = {
  backgroundColor: '#f8d7da',
  color: '#721c24',
  padding: '1rem',
  borderRadius: '4px',
  border: '1px solid #f5c6cb',
  marginBottom: '1rem'
};

const userIdStyle = {
  backgroundColor: '#fff3cd',
  color: '#856404',
  padding: '0.75rem',
  borderRadius: '4px',
  marginTop: '0.5rem',
  fontFamily: 'monospace'
};

export default RegisterUser;