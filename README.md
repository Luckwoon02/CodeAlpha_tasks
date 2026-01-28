# Event Registration System - Full Stack Application

A complete full-stack web application for event registration built with React.js frontend and Node.js/Express backend.

## 🚀 Project Overview

This project consists of two main parts:
- **Backend**: Node.js + Express.js + MongoDB (REST API)
- **Frontend**: React.js + Vite + Axios (User Interface)

## 📁 Project Structure

```
├── CodeAlpha_Event_Registration_System/    # Backend (Node.js + Express)
│   ├── models/                             # MongoDB models
│   │   ├── Event.js                        # Event schema
│   │   ├── Registration.js                 # Registration schema
│   │   └── User.js                         # User schema
│   ├── routes/                             # API routes
│   │   ├── eventRoutes.js                  # Event endpoints
│   │   ├── registrationRoutes.js           # Registration endpoints
│   │   └── userRoutes.js                   # User endpoints
│   ├── server.js                           # Main server file
│   └── package.json                        # Backend dependencies
│
├── event-registration-frontend/            # Frontend (React.js)
│   ├── src/
│   │   ├── api/                            # API calls
│   │   │   └── api.js                      # Axios configuration
│   │   ├── components/                     # Reusable components
│   │   │   ├── EventCard.jsx               # Event display component
│   │   │   └── Navbar.jsx                  # Navigation component
│   │   ├── pages/                          # Page components
│   │   │   ├── Home.jsx                    # Events list page
│   │   │   ├── EventDetails.jsx            # Event details page
│   │   │   ├── RegisterUser.jsx            # User registration page
│   │   │   ├── RegisterEvent.jsx           # Event registration page
│   │   │   └── MyRegistrations.jsx         # User registrations page
│   │   ├── App.jsx                         # Main app component
│   │   ├── main.jsx                        # Entry point
│   │   └── index.css                       # Global styles
│   ├── index.html                          # HTML template
│   └── package.json                        # Frontend dependencies
│
├── add-sample-data.js                      # Script to add test data
└── README.md                               # This file
```

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **JavaScript** - Programming language (no TypeScript)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- Git

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Luckwoon02/CodeAlpha_tasks.git
   cd CodeAlpha_tasks/CodeAlpha_Event_Registration_System
   ```

2. **Setup Backend:**
   ```bash
   # Navigate to backend directory
   cd CodeAlpha_Event_Registration_System
   
   # Install dependencies
   npm install
   
   # Start the backend server
   npm start
   # or
   node server.js
   ```
   Backend will run on `http://localhost:3000`

3. **Setup Frontend:**
   ```bash
   # Navigate to frontend directory (from project root)
   cd event-registration-frontend
   
   # Install dependencies
   npm install
   
   # Start the development server
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

4. **Add Sample Data (Optional):**
   ```bash
   # From project root directory
   node add-sample-data.js
   ```

## 🔧 Configuration

### Backend Configuration
- **MongoDB URI**: Update in `CodeAlpha_Event_Registration_System/server.js`
- **Port**: Default is 3000, can be changed in server.js
- **CORS**: Configured to allow requests from `http://localhost:5173`

### Frontend Configuration
- **API Base URL**: Update in `event-registration-frontend/src/api/api.js`
- **Port**: Default is 5173 (Vite default)

## 📚 API Endpoints

### Users
- `POST /users` - Create a new user
- Response: `{ message, user: { _id, name, email } }`

### Events
- `GET /events` - Get all events
- `GET /events/:id` - Get specific event by ID
- `POST /events` - Create a new event

### Registrations
- `POST /register` - Register user for an event
- `GET /registrations/:userId` - Get user's registrations
- `DELETE /registrations/:id` - Cancel a registration

## 🎯 Features

### User Features
- ✅ View all available events
- ✅ View detailed event information
- ✅ Register as a new user
- ✅ Register for events
- ✅ View personal registrations
- ✅ Cancel event registrations

### Technical Features
- ✅ RESTful API design
- ✅ CORS enabled for cross-origin requests
- ✅ Error handling and validation
- ✅ Responsive design
- ✅ Real-time data updates
- ✅ Clean, beginner-friendly code structure

## 🔄 User Flow

1. **First-time User:**
   - Visit the application
   - Go to "Register User" page
   - Fill in name and email
   - Save the returned User ID

2. **Browse Events:**
   - View all events on home page
   - Click "View Details" for more information

3. **Register for Events:**
   - From event details, click "Register for This Event"
   - Enter your User ID
   - Confirm registration

4. **Manage Registrations:**
   - Go to "My Registrations"
   - Enter your User ID to view all registrations
   - Cancel registrations if needed

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Ensure backend server is running
   - Check CORS configuration in server.js
   - Verify frontend is running on port 5173

2. **MongoDB Connection:**
   - Ensure MongoDB is running locally
   - Check connection string in server.js
   - Verify database permissions

3. **API Calls Failing:**
   - Check if backend server is running on port 3000
   - Verify API endpoints in browser/Postman
   - Check network tab in browser dev tools

## 🚀 Deployment

### Backend Deployment
- Deploy to Heroku, Railway, or similar platform
- Update MongoDB connection string for production
- Set environment variables for sensitive data

### Frontend Deployment
- Build the project: `npm run build`
- Deploy to Netlify, Vercel, or similar platform
- Update API base URL to point to deployed backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is part of the CodeAlpha internship program.

## 👨‍💻 Author

Created as part of CodeAlpha Full Stack Development internship.

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack web development
- RESTful API design and implementation
- React.js frontend development
- Database integration with MongoDB
- CORS configuration and debugging
- Error handling and user experience
- Git version control and deployment

---

**Happy Coding! 🚀**