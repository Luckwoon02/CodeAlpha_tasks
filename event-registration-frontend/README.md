# Event Registration System - Frontend

A simple React.js frontend application that connects to the Event Registration System backend APIs.

## 🚀 Features

- **View Events**: Browse all available events
- **Event Details**: View detailed information about specific events
- **User Registration**: Create new user accounts
- **Event Registration**: Register for events using User ID
- **My Registrations**: View and cancel event registrations

## 🛠️ Tech Stack

- **React.js** (with Vite)
- **JavaScript** (No TypeScript)
- **Axios** for API calls
- **React Router** for navigation
- **Basic CSS** for styling

## 📋 Prerequisites

Before running this frontend, make sure you have:

1. **Node.js** installed (version 14 or higher)
2. **Backend server** running on `http://localhost:3000`
3. **MongoDB** database connected to the backend

## 🏃‍♂️ How to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   - Go to `http://localhost:5173`
   - The frontend will automatically connect to the backend at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── api/
│   └── api.js              # API calls and Axios configuration
├── components/
│   ├── EventCard.jsx       # Individual event card component
│   └── Navbar.jsx          # Navigation bar component
├── pages/
│   ├── Home.jsx            # Home page (list of events)
│   ├── EventDetails.jsx    # Event details page
│   ├── RegisterUser.jsx    # User registration page
│   ├── RegisterEvent.jsx   # Event registration page
│   └── MyRegistrations.jsx # User's registrations page
├── App.jsx                 # Main app component with routing
├── main.jsx                # Entry point
└── index.css               # Global styles
```

## 🔄 How Frontend Connects to Backend

### API Configuration (`src/api/api.js`)
- Uses **Axios** to make HTTP requests
- Base URL set to `http://localhost:3000` (backend server)
- All API functions handle errors and return promises

### API Endpoints Used:
- `POST /users` - Create new user
- `GET /events` - Get all events
- `GET /events/:id` - Get specific event
- `POST /register` - Register for event
- `GET /registrations/:userId` - Get user's registrations
- `DELETE /registrations/:id` - Cancel registration

## 🎯 User Flow

1. **First Time User:**
   - Go to "Register User" page
   - Fill in name and email
   - Get User ID (save this!)

2. **Browse Events:**
   - Home page shows all events
   - Click "View Details" to see event information

3. **Register for Event:**
   - From event details, click "Register for This Event"
   - Enter your User ID
   - Confirm registration

4. **Manage Registrations:**
   - Go to "My Registrations"
   - Enter your User ID
   - View all your registrations
   - Cancel registrations if needed

## 🔧 Key React Concepts Used

### State Management
- `useState` for component state
- `useEffect` for API calls when component loads

### Routing
- `react-router-dom` for navigation
- `useParams` to get URL parameters
- `useNavigate` for programmatic navigation

### API Integration
- Axios for HTTP requests
- Async/await for handling promises
- Error handling with try/catch

### Component Structure
- Functional components with hooks
- Props passing between components
- Conditional rendering based on state

## 🚨 Important Notes

1. **User ID Management:**
   - No authentication system
   - Users must save their User ID after registration
   - User ID is required to view/manage registrations

2. **Error Handling:**
   - All API calls have error handling
   - User-friendly error messages
   - Loading states for better UX

3. **No Advanced Features:**
   - No Redux or Context API
   - No complex state management
   - Simple, beginner-friendly code

## 🌐 Deployment

To deploy this frontend:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder to:**
   - Netlify
   - Vercel
   - GitHub Pages
   - Any static hosting service

3. **Update API URL:**
   - Change `BASE_URL` in `src/api/api.js`
   - Point to your deployed backend URL

## 🤝 How This Connects to Backend

1. **Frontend makes HTTP requests** using Axios
2. **Backend receives requests** on Express.js routes
3. **Backend processes data** with MongoDB
4. **Backend sends JSON responses** back to frontend
5. **Frontend updates UI** based on response data

This creates a complete **full-stack application** where:
- Frontend handles user interface and user interactions
- Backend handles data storage and business logic
- They communicate through REST API calls

## 📚 Learning Outcomes

After building this project, you'll understand:
- How to connect React frontend to Node.js backend
- Making API calls with Axios
- React Router for navigation
- State management with hooks
- Error handling in React
- Building a complete user flow
- Real-world frontend-backend integration