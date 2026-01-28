// App.jsx - Main application component
// This component sets up routing and the overall app structure

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import RegisterUser from './pages/RegisterUser';
import RegisterEvent from './pages/RegisterEvent';
import MyRegistrations from './pages/MyRegistrations';

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <div style={appStyle}>
        {/* Navigation bar - appears on all pages */}
        <Navbar />
        
        {/* Main content area */}
        <main style={mainStyle}>
          <Routes>
            {/* Home page - shows list of all events */}
            <Route path="/" element={<Home />} />
            
            {/* Event details page - shows details of a specific event */}
            <Route path="/event/:id" element={<EventDetails />} />
            
            {/* User registration page - create new user account */}
            <Route path="/register-user" element={<RegisterUser />} />
            
            {/* Event registration page - register for a specific event */}
            <Route path="/register-event/:eventId" element={<RegisterEvent />} />
            
            {/* My registrations page - view user's event registrations */}
            <Route path="/my-registrations" element={<MyRegistrations />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Simple CSS styles for the app layout
const appStyle = {
  minHeight: '100vh',
  backgroundColor: '#f5f5f5'
};

const mainStyle = {
  minHeight: 'calc(100vh - 80px)', // Subtract navbar height
  paddingBottom: '2rem'
};

export default App;