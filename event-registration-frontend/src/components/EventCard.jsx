// components/EventCard.jsx - Individual event card component
// This component displays a single event's information in a card format

import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
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
    <div style={cardStyle}>
      {/* Event title */}
      <h3 style={titleStyle}>{event.title}</h3>
      
      {/* Event description */}
      <p style={descriptionStyle}>{event.description}</p>
      
      {/* Event date */}
      <p style={dateStyle}>
        <strong>Date:</strong> {formatDate(event.date)}
      </p>
      
      {/* View details button */}
      <Link to={`/event/${event._id}`} style={buttonStyle}>
        View Details
      </Link>
    </div>
  );
};

// Simple CSS styles for the event card
const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '1.5rem',
  margin: '1rem 0',
  backgroundColor: 'white',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const titleStyle = {
  color: '#2c3e50',
  marginBottom: '0.5rem'
};

const descriptionStyle = {
  color: '#666',
  marginBottom: '1rem',
  lineHeight: '1.5'
};

const dateStyle = {
  color: '#333',
  marginBottom: '1rem'
};

const buttonStyle = {
  display: 'inline-block',
  backgroundColor: '#3498db',
  color: 'white',
  padding: '0.5rem 1rem',
  textDecoration: 'none',
  borderRadius: '4px',
  transition: 'background-color 0.3s'
};

export default EventCard;