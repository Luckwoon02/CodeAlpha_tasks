// pages/MyRegistrations.jsx - User registrations page component
// This page shows all events a user has registered for

import { useState } from 'react';
import { getUserRegistrations, cancelRegistration } from '../api/api';

const MyRegistrations = () => {
  // State to store user ID input
  const [userId, setUserId] = useState('');
  
  // State to store user registrations
  const [registrations, setRegistrations] = useState([]);
  
  // State to store user name
  const [userName, setUserName] = useState('');
  
  // State to track loading status
  const [loading, setLoading] = useState(false);
  
  // State to track if registrations have been fetched
  const [hasFetched, setHasFetched] = useState(false);
  
  // State to store success/error messages
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Function to handle user ID input change
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    
    // Clear any previous messages when user starts typing
    setMessage('');
    setError('');
  };

  // Function to fetch user registrations
  const fetchRegistrations = async (e) => {
    if (e) e.preventDefault(); // Prevent page refresh if called from form
    
    // Basic validation
    if (!userId.trim()) {
      setError('Please enter your User ID');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      setMessage('');
      
      // Call the API to get user registrations
      const response = await getUserRegistrations(userId.trim());
      
      // Set the registrations and user name in our state
      setRegistrations(response.registrations || []);
      setUserName(response.user || 'User');
      setHasFetched(true);
      
      // Show message if no registrations found
      if (!response.registrations || response.registrations.length === 0) {
        setMessage('No registrations found for this user.');
      }
      
    } catch (err) {
      // Show error message if something goes wrong
      setError(err.error || 'Failed to fetch registrations');
      console.error('Error fetching registrations:', err);
      setRegistrations([]);
      setHasFetched(false);
    } finally {
      // Always set loading to false when done
      setLoading(false);
    }
  };

  // Function to cancel a registration
  const handleCancelRegistration = async (registrationId, eventTitle) => {
    // Ask for confirmation before canceling
    const confirmed = window.confirm(`Are you sure you want to cancel your registration for "${eventTitle}"?`);
    
    if (!confirmed) return;
    
    try {
      setError('');
      setMessage('');
      
      // Call the API to cancel the registration
      await cancelRegistration(registrationId);
      
      // Remove the canceled registration from our state
      setRegistrations(prev => 
        prev.filter(reg => reg._id !== registrationId)
      );
      
      // Show success message
      setMessage(`Successfully canceled registration for "${eventTitle}"`);
      
    } catch (err) {
      // Show error message if something goes wrong
      setError(err.error || 'Failed to cancel registration');
      console.error('Error canceling registration:', err);
    }
  };

  // Format the date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={containerStyle}>
      <h1>My Event Registrations</h1>
      
      {/* User ID input form */}
      <form onSubmit={fetchRegistrations} style={formStyle}>
        <div style={inputGroupStyle}>
          <label htmlFor="userId" style={labelStyle}>Enter Your User ID:</label>
          <div style={inputRowStyle}>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={handleUserIdChange}
              placeholder="Enter your User ID"
              style={inputStyle}
              disabled={loading}
            />
            <button 
              type="submit" 
              style={searchButtonStyle} 
              disabled={loading}
            >
              {loading ? 'Loading...' : 'View Registrations'}
            </button>
          </div>
        </div>
      </form>
      
      {/* Success message */}
      {message && (
        <div style={successStyle}>
          <p>{message}</p>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div style={errorStyle}>
          <p>{error}</p>
        </div>
      )}
      
      {/* Registrations list */}
      {hasFetched && (
        <div style={registrationsStyle}>
          <h2>Registrations for {userName}</h2>
          
          {registrations.length === 0 ? (
            <p>No registrations found.</p>
          ) : (
            <>
              <p>Found {registrations.length} registration(s)</p>
              
              {/* Display each registration */}
              {registrations.map((registration) => (
                <div key={registration._id} style={registrationCardStyle}>
                  <h3>{registration.eventId.title}</h3>
                  <p><strong>Description:</strong> {registration.eventId.description}</p>
                  <p><strong>Event Date:</strong> {formatDate(registration.eventId.date)}</p>
                  <p><strong>Registered On:</strong> {formatDate(registration.registeredAt)}</p>
                  
                  {/* Cancel button */}
                  <button 
                    onClick={() => handleCancelRegistration(registration._id, registration.eventId.title)}
                    style={cancelButtonStyle}
                  >
                    Cancel Registration
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

// Simple CSS styles
const containerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '1rem'
};

const formStyle = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  marginBottom: '1.5rem'
};

const inputGroupStyle = {
  marginBottom: '1rem'
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: 'bold',
  color: '#333'
};

const inputRowStyle = {
  display: 'flex',
  gap: '0.5rem'
};

const inputStyle = {
  flex: 1,
  padding: '0.75rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '1rem'
};

const searchButtonStyle = {
  backgroundColor: '#3498db',
  color: 'white',
  padding: '0.75rem 1.5rem',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem'
};

const registrationsStyle = {
  marginTop: '1rem'
};

const registrationCardStyle = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  marginBottom: '1rem',
  border: '1px solid #ddd'
};

const cancelButtonStyle = {
  backgroundColor: '#e74c3c',
  color: 'white',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '1rem'
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

export default MyRegistrations;