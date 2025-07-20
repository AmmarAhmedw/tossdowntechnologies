# Tab Persistence System

This document explains how the tab arrangement persistence system works and how to switch from localStorage to a real backend.

## 🎯 Current Implementation

The dashboard now supports **global persistence** of tab arrangements using localStorage. This means:

- ✅ Tab order is saved automatically when you drag and drop
- ✅ Custom categories are persisted across browser sessions
- ✅ Tab order is restored when you reload the page
- ✅ Works across different browser tabs/windows

## 🏗️ Architecture

### Frontend Components

1. **`src/services/tabService.ts`** - Service layer for tab persistence
2. **`src/utils/componentMapper.tsx`** - Maps component names to React components
3. **`src/components/Dashboard.tsx`** - Updated to use the persistence service

### Key Features

- **Automatic Saving**: Tab order is saved immediately after drag-and-drop
- **Loading States**: Shows loading spinner while fetching saved data
- **Error Handling**: Gracefully falls back to default tabs if loading fails
- **Custom Tab Management**: Add/remove custom tabs with persistence
- **Visual Feedback**: Shows "Saving..." indicator during operations

## 🔄 Switching to Backend API

The system is designed to easily switch from localStorage to a real backend. Here's how:

### Step 1: Set up the Backend

1. Navigate to the `backend-example` directory:
   ```bash
   cd backend-example
   npm install
   npm start
   ```

2. The server will run on `http://localhost:3001`

### Step 2: Update Frontend Configuration

1. Create a `.env` file in your project root:
   ```env
   REACT_APP_API_URL=http://localhost:3001
   ```

2. Uncomment the API calls in `src/services/tabService.ts`:
   ```typescript
   // In saveTabOrder method:
   const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
   await this.apiCall(`${API_BASE_URL}/api/tab-order`, {
     method: 'POST',
     body: JSON.stringify(data)
   });

   // In loadTabOrder method:
   const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
   const response = await this.apiCall(`${API_BASE_URL}/api/tab-order/${this.USER_ID}`);
   return response.tabs;
   ```

3. Uncomment the `apiCall` method at the bottom of the file.

### Step 3: Add Authentication (Optional)

When you implement user authentication, update the `apiCall` method:

```typescript
private async apiCall(endpoint: string, options?: RequestInit): Promise<any> {
  const response = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}` // Add your auth token
    },
    ...options
  });
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }
  
  return response.json();
}
```

## 🗄️ Database Integration

The backend example uses in-memory storage. To use a real database:

### Option 1: MongoDB
```javascript
// Install: npm install mongoose
const mongoose = require('mongoose');

const TabOrderSchema = new mongoose.Schema({
  userId: String,
  tabs: Array,
  lastUpdated: Date
});

const TabOrder = mongoose.model('TabOrder', TabOrderSchema);
```

### Option 2: PostgreSQL
```javascript
// Install: npm install pg
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Create table:
// CREATE TABLE tab_orders (
//   id SERIAL PRIMARY KEY,
//   user_id VARCHAR(255) NOT NULL,
//   tabs JSONB NOT NULL,
//   last_updated TIMESTAMP DEFAULT NOW()
// );
```

### Option 3: SQLite
```javascript
// Install: npm install sqlite3
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tabs.db');

// Create table:
// CREATE TABLE tab_orders (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   user_id TEXT NOT NULL,
//   tabs TEXT NOT NULL,
//   last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
// );
```

## 🔧 API Endpoints

The backend provides these endpoints:

- `GET /api/tab-order/:userId` - Get user's tab order
- `POST /api/tab-order` - Save tab order
- `PUT /api/tab-order/:userId` - Update tab order
- `POST /api/tab-order/:userId/custom-tab` - Add custom tab
- `DELETE /api/tab-order/:userId/custom-tab/:tabId` - Remove custom tab
- `GET /api/users` - Get all users (admin)
- `GET /api/health` - Health check

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Set environment variable: `REACT_APP_API_URL=https://your-backend-url.com`
2. Deploy your React app

### Backend (Heroku/Railway/Render)
1. Set environment variables:
   ```env
   PORT=3001
   DATABASE_URL=your_database_connection_string
   ```
2. Deploy the backend
3. Update frontend's `REACT_APP_API_URL` to point to your deployed backend

## 🧪 Testing

### Test localStorage persistence:
1. Open the dashboard
2. Drag tabs to reorder them
3. Add a custom tab
4. Refresh the page
5. Verify the order and custom tab are preserved

### Test backend persistence:
1. Start the backend server
2. Update frontend to use API calls
3. Perform the same tests as above
4. Check the backend logs to see API calls

## 🔍 Troubleshooting

### localStorage not working:
- Check browser console for errors
- Verify localStorage is enabled in browser
- Check if browser is in private/incognito mode

### Backend API not working:
- Verify backend server is running
- Check CORS configuration
- Verify API endpoints match frontend calls
- Check network tab for failed requests

### Custom tabs not loading:
- Verify component mapper includes all components
- Check if custom tab data is properly saved
- Verify component names match exactly

## 📝 Future Enhancements

- [ ] Real-time sync across multiple devices
- [ ] User authentication and authorization
- [ ] Tab sharing between users
- [ ] Tab templates and presets
- [ ] Analytics on tab usage
- [ ] Backup and restore functionality 