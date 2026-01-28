// pages/Home.jsx - Home page component
// This page displays a list of all available events

import { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import { getAllEvents } from '../api/api';

const Home = () => {
  // State to store the list of events
  const [events, setEvents] = useState([]);
  
  // State to track loading status
  const [loading, setLoading] = useState(true);
  
  // State to store any error messages
  const [error, setError] = useState('');

  // useEffect runs when the component first loads
  // It fetches all events from the backend
  useEffect(() => {
    fetchEvents();
  }, []); // Empty dependency array means this runs only once

  // Function to fetch events from the API
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Call the API to get all events
      const response = await getAllEvents();
      
      // Set the events in our state
      setEvents(response.events || []);
      
    } catch (err) {
      // If something goes wrong, show an error message
      setError(err.error || 'Failed to load events');
      console.error('Error fetching events:', err);
    } finally {
      // Always set loading to false when done
      setLoading(false);
    }
  };

  // Show loading message while fetching data
  if (loading) {
    return (
      <div style={containerStyle}>
        <h2>Loading events...</h2>
      </div>
    );
  }

  // Show error message if something went wrong
  if (error) {
    return (
      <div style={containerStyle}>
        <h2>Error</h2>
        <p style={errorStyle}>{error}</p>
        <button onClick={fetchEvents} style={buttonStyle}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1>Available Events</h1>
      
      {/* Show message if no events found */}
      {events.length === 0 ? (
        <p>No events available at the moment.</p>
      ) : (
        <>
          <p>Found {events.length} event(s)</p>
          
          {/* Display each event using EventCard component */}
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </>
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

export default Home;