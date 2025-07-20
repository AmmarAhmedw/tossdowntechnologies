export interface TabItem {
  id: string;
  title: string;
  icon: string;
  component: string; // Store component name instead of React component
  isCustom?: boolean;
  createdAt?: string;
}

export interface TabOrderData {
  userId: string;
  tabs: TabItem[];
  lastUpdated: string;
}

class TabService {
  private readonly STORAGE_KEY = 'tossdown_tab_order';
  private readonly USER_ID = 'default_user'; // In a real app, this would come from auth

  // Get default tabs configuration
  getDefaultTabs(): TabItem[] {
    return [
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
        id: "team",
        title: "Meet the Team",
        icon: "lucide:users",
        component: "TeamIntroductions"
      },
      {
        id: "training",
        title: "Training & Learning",
        icon: "lucide:book-open",
        component: "TrainingModules"
      },
      {
        id: "milestones",
        title: "Milestones",
        icon: "lucide:flag",
        component: "MilestoneReviews"
      },
      {
        id: "graduation",
        title: "Onboarding Wrap-up",
        icon: "lucide:award",
        component: "OnboardingGraduation"
      }
    ];
  }

  // Save tab order to localStorage (or API in the future)
  async saveTabOrder(tabs: TabItem[]): Promise<void> {
    try {
      const data: TabOrderData = {
        userId: this.USER_ID,
        tabs,
        lastUpdated: new Date().toISOString()
      };

      // For now, save to localStorage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));

      // TODO: Uncomment the lines below to use the backend API
      // const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      // await this.apiCall(`${API_BASE_URL}/api/tab-order`, {
      //   method: 'POST',
      //   body: JSON.stringify(data)
      // });

      console.log('Tab order saved successfully');
    } catch (error) {
      console.error('Failed to save tab order:', error);
      throw error;
    }
  }

  // Load tab order from localStorage (or API in the future)
  async loadTabOrder(): Promise<TabItem[]> {
    try {
      // For now, load from localStorage
      const stored = localStorage.getItem(this.STORAGE_KEY);
      
      if (stored) {
        const data: TabOrderData = JSON.parse(stored);
        
        // Validate that we have the expected structure
        if (data.tabs && Array.isArray(data.tabs)) {
          console.log('Tab order loaded from storage');
          return data.tabs;
        }
      }

      // TODO: Uncomment the lines below to use the backend API
      // const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      // const response = await this.apiCall(`${API_BASE_URL}/api/tab-order/${this.USER_ID}`);
      // return response.tabs;

      // Return default tabs if nothing is stored
      console.log('No saved tab order found, using defaults');
      return this.getDefaultTabs();
    } catch (error) {
      console.error('Failed to load tab order:', error);
      // Return default tabs on error
      return this.getDefaultTabs();
    }
  }

  // Add a new custom tab
  async addCustomTab(title: string, icon: string): Promise<TabItem> {
    const newTab: TabItem = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      icon,
      component: "CustomTab",
      isCustom: true,
      createdAt: new Date().toISOString()
    };

    // Get current tabs and add the new one
    const currentTabs = await this.loadTabOrder();
    const updatedTabs = [...currentTabs, newTab];
    
    // Save the updated order
    await this.saveTabOrder(updatedTabs);
    
    return newTab;
  }

  // Remove a custom tab
  async removeCustomTab(tabId: string): Promise<void> {
    const currentTabs = await this.loadTabOrder();
    const updatedTabs = currentTabs.filter(tab => tab.id !== tabId);
    
    if (updatedTabs.length !== currentTabs.length) {
      await this.saveTabOrder(updatedTabs);
    }
  }

  // Update tab order
  async updateTabOrder(tabs: TabItem[]): Promise<void> {
    await this.saveTabOrder(tabs);
  }

  // Get sync status (useful for future real-time features)
  getLastSyncTime(): string | null {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const data: TabOrderData = JSON.parse(stored);
      return data.lastUpdated;
    }
    return null;
  }

  // Clear all saved data (useful for testing or reset)
  clearSavedData(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Future: API call method for when backend is added
  // private async apiCall(endpoint: string, options?: RequestInit): Promise<any> {
  //   const response = await fetch(endpoint, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // Add auth headers here when implementing authentication
  //       // 'Authorization': `Bearer ${getAuthToken()}`
  //     },
  //     ...options
  //   });
  //   
  //   if (!response.ok) {
  //     throw new Error(`API call failed: ${response.statusText}`);
  //   }
  //   
  //   return response.json();
  // }
}

export const tabService = new TabService(); 