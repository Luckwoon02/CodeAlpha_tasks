// pages/EventDetails.jsx - Event details page component
// This page shows detailed information about a specific event

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById } from '../api/api';

const EventDetails = () => {
  // Get the event ID from the URL parameter
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State to store event details
  const [event, setEvent] = useState(null);
  
  // State to track loading status
  const [loading, setLoading] = useState(true);
  
  // State to store any error messages
  const [error, setError] = useState('');

  // useEffect runs when the component loads or when ID changes
  useEffect(() => {
    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  // Function to fetch event details from the API
  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Call the API to get event details by ID
      const response = await getEventById(id);
      
      // Set the event details in our state
      setEvent(response.event);
      
    } catch (err) {
      // If something goes wrong, show an error message
      setError(err.error || 'Failed to load event details');
      console.error('Error fetching event details:', err);
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

  // Function to handle registration button click
  const handleRegisterClick = () => {
    // Navigate to registration page with event ID
    navigate(`/register-event/${id}`);
  };

  // Show loading message while fetching data
  if (loading) {
    return (
      <div style={containerStyle}>
        <h2>Loading event details...</h2>
      </div>
    );
  }

  // Show error message if something went wrong
  if (error) {
    return (
      <div style={containerStyle}>
        <h2>Error</h2>
        <p style={errorStyle}>{error}</p>
        <button onClick={() => navigate('/')} style={buttonStyle}>
          Back to Home
        </button>
      </div>
    );
  }

  // Show message if event not found
  if (!event) {
    return (
      <div style={containerStyle}>
        <h2>Event not found</h2>
        <button onClick={() => navigate('/')} style={buttonStyle}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Back button */}
      <button onClick={() => navigate('/')} style={backButtonStyle}>
        ← Back to Events
      </button>
      
      {/* Event details */}
      <div style={eventDetailsStyle}>
        <h1>{event.title}</h1>
        
        <div style={detailSectionStyle}>
          <h3>Description</h3>
          <p>{event.description}</p>
        </div>
        
        <div style={detailSectionStyle}>
          <h3>Date & Time</h3>
          <p>{formatDate(event.date)}</p>
        </div>
        
        <div style={detailSectionStyle}>
          <h3>Event ID</h3>
          <p style={idStyle}>{event._id}</p>
        </div>
        
        {/* Register button */}
        <button onClick={handleRegisterClick} style={registerButtonStyle}>
          Register for This Event
        </button>
      </div>
    </div>
  );
};

// Simple CSS styles
const containerStyle = {
  maxWidth: '800px',
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

const eventDetailsStyle = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const detailSectionStyle = {
  marginBottom: '1.5rem'
};

const idStyle = {
  fontFamily: 'monospace',
  backgroundColor: '#f8f9fa',
  padding: '0.5rem',
  borderRadius: '4px',
  fontSize: '0.9rem'
};

const registerButtonStyle = {
  backgroundColor: '#27ae60',
  color: 'white',
  padding: '1rem 2rem',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1.1rem',
  marginTop: '1rem'
};

const errorStyle = {
  color: 'red',
  marginBottom: '1rem'
};

const buttonStyle = {
  backgroundColor: '#3498db',
  color: 'white',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default EventDetails;