// add-sample-data.js - Script to add sample events for testing

const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

// Sample events data
const sampleEvents = [
  {
    title: "React.js Workshop",
    description: "Learn the fundamentals of React.js including components, state management, and hooks. Perfect for beginners!",
    date: "2024-02-15T10:00:00.000Z"
  },
  {
    title: "Node.js Backend Development",
    description: "Build REST APIs with Node.js and Express. Learn about MongoDB integration and authentication.",
    date: "2024-02-20T14:00:00.000Z"
  },
  {
    title: "Full Stack Project Showcase",
    description: "Present your full-stack projects and get feedback from industry experts. Networking opportunity included!",
    date: "2024-02-25T16:00:00.000Z"
  },
  {
    title: "JavaScript ES6+ Features",
    description: "Master modern JavaScript features including arrow functions, destructuring, async/await, and more.",
    date: "2024-03-01T11:00:00.000Z"
  },
  {
    title: "Database Design Workshop",
    description: "Learn how to design efficient database schemas for web applications. Covers both SQL and NoSQL approaches.",
    date: "2024-03-05T13:00:00.000Z"
  }
];

// Function to add sample events
async function addSampleEvents() {
  console.log('Adding sample events...');
  
  for (let i = 0; i < sampleEvents.length; i++) {
    try {
      const response = await axios.post(`${BASE_URL}/events`, sampleEvents[i]);
      console.log(`✅ Added event: ${sampleEvents[i].title}`);
    } catch (error) {
      console.log(`❌ Error adding event: ${sampleEvents[i].title}`);
      console.log('Error:', error.response?.data || error.message);
    }
  }
  
  console.log('\n🎉 Sample data setup complete!');
  console.log('You can now test the frontend application.');
}

// Run the script
addSampleEvents();