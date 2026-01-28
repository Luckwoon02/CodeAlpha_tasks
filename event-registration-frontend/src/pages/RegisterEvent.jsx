// pages/RegisterEvent.jsx - Event registration page component
// This page allows users to register for a specific event

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, registerForEvent } from '../api/api';

const RegisterEvent = () => {
  // Get the event ID from the URL parameter
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  // State to store event details
  const [event, setEvent] = useState(null);
  
  // State to store user ID input
  const [userId, setUserId] = useState('');
  
  // State to track loading status
  const [loading, setLoading] = useState(false);
  const [eventLoading, setEventLoading] = useState(true);
  
  // State to store success/error messages
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // useEffect runs when the component loads to fetch event details
  useEffect(() => {
    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  // Function to fetch event details from the API
  const fetchEventDetails = async () => {
    try {
      setEventLoading(true);
      setError('');
      
      // Call the API to get event details by ID
      const response = await getEventById(eventId);
      
      // Set the event details in our state
      setEvent(response.event);
      
    } catch (err) {
      // If something goes wrong, show an error message
      setError(err.error || 'Failed to load event details');
      console.error('Error fetching event details:', err);
    } finally {
      // Always set loading to false when done
      setEventLoading(false);
    }
  };

  // Function to handle user ID input change
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    
    // Clear any previous messages when user starts typing
    setMessage('');
    setError('');
  };

  // Function to handle registration form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    
    // Basic validation
    if (!userId.trim()) {
      setError('Please enter your User ID');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      setMessage('');
      
      // Prepare registration data
      const registrationData = {
        userId: userId.trim(),
        eventId: eventId
      };
      
      // Call the API to register for the event
      const response = await registerForEvent(registrationData);
      
      // Show success message
      setMessage('Successfully registered for the event!');
      
      // Clear the user ID input
      setUserId('');
      
    } catch (err) {
      // Show error message if something goes wrong
      setError(err.error || 'Failed to register for event');
      console.error('Error registering for event:', err);
    } finally {
      // Always set loading to false when done
      setLoading(false);
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

  // Show loading message while fetching event details
  if (eventLoading) {
    return (
      <div style={containerStyle}>
        <h2>Loading event details...</h2>
      </div>
    );
  }

  // Show error message if event couldn't be loaded
  if (!event) {
    return (
      <div style={containerStyle}>
        <h2>Event not found</h2>
        <p style={errorStyle}>{error}</p>
        <button onClick={() => navigate('/')} style={buttonStyle}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Back button */}
      <button onClick={() => navigate(`/event/${eventId}`)} style={backButtonStyle}>
        ← Back to Event Details
      </button>
      
      <h1>Register for Event</h1>
      
      {/* Event information */}
      <div style={eventInfoStyle}>
        <h2>{event.title}</h2>
        <p><strong>Date:</strong> {formatDate(event.date)}</p>
        <p><strong>Description:</strong> {event.description}</p>
      </div>
      
      {/* Registration form */}
      <form onSubmit={handleSubmit} style={formStyle}>
        <h3>Registration Details</h3>
        
        <div style={inputGroupStyle}>
          <label htmlFor="userId" style={labelStyle}>Your User ID:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={handleUserIdChange}
            placeholder="Enter your User ID (from user registration)"
            style={inputStyle}
            disabled={loading}
          />
          <small style={helpTextStyle}>
            Don't have a User ID? <button 
              type="button" 
              onClick={() => navigate('/register-user')} 
              style={linkButtonStyle}
            >
              Register as a new user first
            </button>
          </small>
        </div>
        
        {/* Submit button */}
        <button 
          type="submit" 
          style={submitButtonStyle} 
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register for Event'}
        </button>
      </form>
      
      {/* Success message */}
      {message && (
        <div style={successStyle}>
          <p>{message}</p>
          <button onClick={() => navigate('/my-registrations')} style={buttonStyle}>
            View My Registrations
          </button>
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
  maxWidth: '700px',
  margin: '0 auto',
  padding: '1rem'
};

const backButtonStyle = {
  backgroundColor: '#95a5a6',
  color: 'white',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginBottom: '1rem'
};

const eventInfoStyle = {
  backgroundColor: '#f8f9fa',
  padding: '1.5rem',
  borderRadius: '8px',
  marginBottom: '1.5rem',
  border: '1px solid #dee2e6'
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

const helpTextStyle = {
  display: 'block',
  marginTop: '0.5rem',
  color: '#666',
  fontSize: '0.9rem'
};

const linkButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#3498db',
  textDecoration: 'underline',
  cursor: 'pointer',
  fontSize: '0.9rem'
};

const submitButtonStyle = {
  backgroundColor: '#27ae60',
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

const buttonStyle = {
  backgroundColor: '#3498db',
  color: 'white',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '0.5rem'
};

export default RegisterEvent;