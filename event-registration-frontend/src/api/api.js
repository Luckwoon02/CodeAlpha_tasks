// api/api.js - This file handles all API calls to our backend
// It uses Axios to make HTTP requests to the Node.js server

import axios from 'axios';

// Base URL for our backend API
// This is where our Node.js server is running
const BASE_URL = 'http://localhost:3000';

// Create an axios instance with the base URL
// This means we don't have to write the full URL every time
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==================== USER API CALLS ====================

// Create a new user
// This calls POST /users endpoint
export const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data; // Returns the created user data
  } catch (error) {
    throw error.response?.data || { error: 'Failed to create user' };
  }
};

// ==================== EVENT API CALLS ====================

// Get all events
// This calls GET /events endpoint
export const getAllEvents = async () => {
  try {
    console.log('🔄 Making API call to:', `${BASE_URL}/events`);
    const response = await api.get('/events');
    console.log('✅ API call successful:', response.data);
    return response.data; // Returns list of all events
  } catch (error) {
    console.error('❌ API call failed:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    throw error.response?.data || { error: 'Failed to fetch events' };
  }
};

// Get a specific event by ID
// This calls GET /events/:id endpoint
export const getEventById = async (eventId) => {
  try {
    const response = await api.get(`/events/${eventId}`);
    return response.data; // Returns the specific event details
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch event details' };
  }
};

// Create a new event (for admin use)
// This calls POST /events endpoint
export const createEvent = async (eventData) => {
  try {
    const response = await api.post('/events', eventData);
    return response.data; // Returns the created event
  } catch (error) {
    throw error.response?.data || { error: 'Failed to create event' };
  }
};

// ==================== REGISTRATION API CALLS ====================

// Register a user for an event
// This calls POST /register endpoint
export const registerForEvent = async (registrationData) => {
  try {
    const response = await api.post('/register', registrationData);
    return response.data; // Returns registration confirmation
  } catch (error) {
    throw error.response?.data || { error: 'Failed to register for event' };
  }
};

// Get all registrations for a specific user
// This calls GET /registrations/:userId endpoint
export const getUserRegistrations = async (userId) => {
  try {
    const response = await api.get(`/registrations/${userId}`);
    return response.data; // Returns user's registrations
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch registrations' };
  }
};

// Cancel a registration
// This calls DELETE /registrations/:id endpoint
export const cancelRegistration = async (registrationId) => {
  try {
    const response = await api.delete(`/registrations/${registrationId}`);
    return response.data; // Returns cancellation confirmation
  } catch (error) {
    throw error.response?.data || { error: 'Failed to cancel registration' };
  }
};

// Export the api instance in case we need it elsewhere
export default api;