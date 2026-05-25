# Project2 - JSON Array Parser

A full-stack REST API application that parses JSON arrays and categorizes elements into numbers, alphabets, and special characters.

## 🚀 Features

- **Frontend**: React + Vite with Tailwind CSS
- **Backend**: Node.js + Express.js
- **REST API**: POST endpoint for parsing JSON arrays
- **Beautiful UI**: Modern, responsive design with Tailwind CSS
- **Real-time parsing**: Instant categorization of array elements

## 📁 Project Structure

```
project2/
├── frontend/           # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx    # Main application component
│   │   ├── main.jsx   # Entry point
│   │   └── index.css  # Tailwind CSS imports
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── backend/            # Node.js + Express backend
│   ├── server.js      # Express server with API endpoints
│   └── package.json
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd project2/backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd project2/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🖥️ Running on Localhost

1. **Start Backend** (Terminal 1):
```bash
cd project2/backend
npm start
```

2. **Start Frontend** (Terminal 2):
```bash
cd project2/frontend
npm run dev
```

3. Open your browser and visit: `http://localhost:3000`

## 📡 API Documentation

### Endpoint: Parse JSON Array

**URL**: `POST http://localhost:5000/api/parse`

**Request Body**:
```json
{
  "data": ["a", "1", "334", "R", "$"]
}
```

**Response**:
```json
{
  "numbers": ["1", "334"],
  "alphabets": ["a", "R"],
  "special_characters": ["$"]
}
```

### Health Check

**URL**: `GET http://localhost:5000/api/health`

**Response**:
```json
{
  "status": "Server is running!"
}
```

## 🎨 How to Use

1. Enter a JSON array in the input box (e.g., `["a", "1", "334", "R", "$"]`)
2. Click the **Submit** button
3. View the categorized results:
   - **Numbers**: Numeric values
   - **Alphabets**: Letters (a-z, A-Z)
   - **Special Characters**: Everything else

## 🚀 Deployment

### Backend Deployment (e.g., Heroku, Railway, Render)

1. Create a `Procfile` in the backend directory:
```
web: node server.js
```

2. Set environment variables:
```
PORT=5000
```

3. Deploy using your platform's CLI or dashboard

### Frontend Deployment (e.g., Vercel, Netlify)

1. Build the frontend:
```bash
cd project2/frontend
npm run build
```

2. Update the API URL in `src/App.jsx`:
```javascript
const response = await fetch('YOUR_BACKEND_URL/api/parse', {
  // ...
});
```

3. Deploy the `dist` folder to your hosting platform

### Environment Variables

**Backend**:
- `PORT`: Server port (default: 5000)

**Frontend**:
- Update the API endpoint URL in production build

## 🧪 Testing the API

Using curl:
```bash
curl -X POST http://localhost:5000/api/parse \
  -H "Content-Type: application/json" \
  -d '{"data": ["a", "1", "334", "R", "$"]}'
```

Using Postman:
1. Method: POST
2. URL: `http://localhost:5000/api/parse`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "data": ["a", "1", "334", "R", "$"]
}
```

## 📦 Dependencies

### Backend
- `express`: Web framework
- `cors`: Enable CORS
- `nodemon`: Development auto-reload (dev dependency)

### Frontend
- `react`: UI library
- `react-dom`: React DOM rendering
- `vite`: Build tool
- `tailwindcss`: CSS framework
- `autoprefixer`: PostCSS plugin
- `postcss`: CSS processor

## 🐛 Troubleshooting

### Port Already in Use
If port 5000 or 3000 is already in use:

**Backend**: Change port in `server.js`:
```javascript
const PORT = process.env.PORT || 5001;
```

**Frontend**: Change port in `vite.config.js`:
```javascript
server: {
  port: 3001,
}
```

### CORS Issues
Make sure the backend is running and CORS is enabled in `server.js`.

### Connection Refused
Ensure both frontend and backend servers are running simultaneously.

## 📝 License

ISC

## 👨‍💻 Author

Built with ❤️ using React, Vite, Tailwind CSS, Node.js & Express

---

**Happy Coding! 🎉**
