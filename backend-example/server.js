const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (replace with your database)
const tabOrders = new Map();

// Default tabs configuration
const defaultTabs = [
  {
    id: "welcome",
    title: "Welcome & Overview",
    icon: "lucide:home",
    component: "WelcomeOverview"
  },
  {
    id: "tools",
    title: "Your Tools",
    icon: "lucide:tool",
    component: "YourTools"
  },
  {
    id: "training",
    title: "Training",
    icon: "lucide:book-open",
    component: "TrainingModules"
  },
  {
    id: "it",
    title: "IT Setup",
    icon: "lucide:laptop",
    component: "ITProvisioning"
  },
  {
    id: "team",
    title: "Team",
    icon: "lucide:users",
    component: "TeamIntroductions"
  },
  {
    id: "milestones",
    title: "Milestones",
    icon: "lucide:flag",
    component: "MilestoneReviews"
  },
  {
    id: "graduation",
    title: "Graduation",
    icon: "lucide:award",
    component: "OnboardingGraduation"
  }
];

// API Routes

// Get tab order for a user
app.get('/api/tab-order/:userId', (req, res) => {
  const { userId } = req.params;
  
  if (!tabOrders.has(userId)) {
    // Return default tabs for new users
    return res.json({
      userId,
      tabs: defaultTabs,
      lastUpdated: new Date().toISOString()
    });
  }
  
  res.json(tabOrders.get(userId));
});

// Save tab order for a user
app.post('/api/tab-order', (req, res) => {
  const { userId, tabs, lastUpdated } = req.body;
  
  if (!userId || !tabs) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const data = {
    userId,
    tabs,
    lastUpdated: lastUpdated || new Date().toISOString()
  };
  
  tabOrders.set(userId, data);
  
  res.json({ 
    message: 'Tab order saved successfully',
    data 
  });
});

// Update tab order
app.put('/api/tab-order/:userId', (req, res) => {
  const { userId } = req.params;
  const { tabs } = req.body;
  
  if (!tabs) {
    return res.status(400).json({ error: 'Missing tabs data' });
  }
  
  const existingData = tabOrders.get(userId) || { userId, tabs: defaultTabs };
  const updatedData = {
    ...existingData,
    tabs,
    lastUpdated: new Date().toISOString()
  };
  
  tabOrders.set(userId, updatedData);
  
  res.json({ 
    message: 'Tab order updated successfully',
    data: updatedData 
  });
});

// Add custom tab
app.post('/api/tab-order/:userId/custom-tab', (req, res) => {
  const { userId } = req.params;
  const { title, icon } = req.body;
  
  if (!title || !icon) {
    return res.status(400).json({ error: 'Missing title or icon' });
  }
  
  const existingData = tabOrders.get(userId) || { userId, tabs: defaultTabs };
  const newTab = {
    id: `custom-${uuidv4()}`,
    title: title.trim(),
    icon,
    component: "CustomTab",
    isCustom: true,
    createdAt: new Date().toISOString()
  };
  
  const updatedData = {
    ...existingData,
    tabs: [...existingData.tabs, newTab],
    lastUpdated: new Date().toISOString()
  };
  
  tabOrders.set(userId, updatedData);
  
  res.json({ 
    message: 'Custom tab added successfully',
    tab: newTab,
    data: updatedData 
  });
});

// Remove custom tab
app.delete('/api/tab-order/:userId/custom-tab/:tabId', (req, res) => {
  const { userId, tabId } = req.params;
  
  const existingData = tabOrders.get(userId);
  if (!existingData) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const updatedTabs = existingData.tabs.filter(tab => tab.id !== tabId);
  
  if (updatedTabs.length === existingData.tabs.length) {
    return res.status(404).json({ error: 'Tab not found' });
  }
  
  const updatedData = {
    ...existingData,
    tabs: updatedTabs,
    lastUpdated: new Date().toISOString()
  };
  
  tabOrders.set(userId, updatedData);
  
  res.json({ 
    message: 'Custom tab removed successfully',
    data: updatedData 
  });
});

// Get all users (for admin purposes)
app.get('/api/users', (req, res) => {
  const users = Array.from(tabOrders.keys()).map(userId => ({
    userId,
    tabCount: tabOrders.get(userId).tabs.length,
    lastUpdated: tabOrders.get(userId).lastUpdated
  }));
  
  res.json(users);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    userCount: tabOrders.size
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app; 