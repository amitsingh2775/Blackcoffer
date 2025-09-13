# Blackcoffer Data Visualization Dashboard

A full-stack interactive data visualization dashboard built with Node.js/Express backend and React.js frontend, featuring D3.js visualizations for analyzing Blackcoffer insights data.

## 🚀 Features

### Backend (Node.js/Express)
- RESTful API with MongoDB integration
- Dynamic filtering system
- Optimized database queries with indexing
- CORS enabled for cross-origin requests
- Comprehensive error handling
- Environment variable configuration

### Frontend (React.js)
- Modern, responsive dashboard design
- Interactive D3.js visualizations:
  - **Intensity Bar Chart**: Average intensity by sector
  - **Likelihood Bubble Chart**: Relevance vs Likelihood scatter plot
  - **Regional World Map**: Geographic distribution of insights
  - **Topics Donut Chart**: Top 10 topics distribution
- Real-time filtering and data updates
- Professional dark theme UI
- Loading states and error handling
- Mobile-responsive design

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account with data loaded
- npm or yarn package manager

## 🛠 Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blackcoffer_dashboard?retryWrites=true&w=majority
PORT=5000
```

4. Start the backend server:
```bash
npm start
# or for development with auto-restart
npm run dev
```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The dashboard will be available at `http://localhost:3000`

## 📊 API Endpoints

### GET /api/data
Fetch filtered insights data
- **Query Parameters**: `end_year`, `topic`, `sector`, `region`, `pestle`, `source`, `country`
- **Response**: Filtered array of insight objects

### GET /api/filters
Get all available filter options
- **Response**: Object containing arrays of unique values for each filterable field

### GET /api/stats
Get dashboard statistics
- **Response**: Summary statistics including totals and averages

### GET /health
Health check endpoint
- **Response**: API status and timestamp

## 🗄 Database Schema

The MongoDB collection `insights` contains documents with the following structure:

```javascript
{
  end_year: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number
}
```

## 🎨 Design Features

- **Modern Dark Theme**: Professional appearance with blue and teal accents
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Interactive Tooltips**: Detailed information on hover
- **Smooth Animations**: Enhanced user experience with transitions
- **Loading States**: Visual feedback during data fetching
- **Error Handling**: Graceful error messages and retry options

## 🚀 Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Ensure MongoDB Atlas is accessible
3. Run `npm start` to start the production server

### Frontend Deployment
1. Build the production version:
```bash
npm run build
```
2. Deploy the `dist` folder to your hosting platform
3. Configure API proxy or update API base URL for production

## 📈 Performance Optimizations

- Database indexing for faster queries
- Data pagination and limiting for large datasets
- Optimized D3.js rendering with data filtering
- Lazy loading and code splitting
- Efficient state management with React hooks

## 🔧 Development

### Running in Development Mode
- Backend: `npm run dev` (with nodemon)
- Frontend: `npm run dev` (with Vite hot reload)

### Code Structure
```
backend/
├── models/          # Mongoose schemas
├── routes/          # API routes
├── server.js        # Main server file
└── package.json

frontend/
├── src/
│   ├── components/  # React components
│   ├── charts/      # D3.js visualization components
│   ├── utils/       # API utilities
│   └── App.jsx      # Main app component
├── public/          # Static assets
└── package.json
```

## 📝 License

This project is licensed under the MIT License.


