import React from "react";
import { TrainingModules } from "../components/TrainingModules";
import { ITProvisioning } from "../components/ITProvisioning";
import { TeamIntroductions } from "../components/TeamIntroductions";
import { MilestoneReviews } from "../components/MilestoneReviews";
import { OnboardingGraduation } from "../components/OnboardingGraduation";
import { WelcomeOverview } from "../components/WelcomeOverview";
import { YourTools } from "../components/YourTools";
import { Icon } from "@iconify/react";

// Custom tab component for user-created tabs
const CustomTab: React.FC<{ title: string; icon: string }> = ({ title, icon }) => (
  <div className="p-6 text-center">
    <Icon icon={icon} className="text-6xl text-pink-300 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-pink-700 mb-2">{title}</h3>
    <p className="text-gray-600">This is your custom category content.</p>
    <div className="mt-6 p-4 bg-pink-50 rounded-lg">
      <p className="text-sm text-pink-600">
        You can customize this content by editing the CustomTab component.
      </p>
    </div>
  </div>
);

// Component mapping
const componentMap: Record<string, React.ComponentType<any>> = {
  TrainingModules,
  ITProvisioning,
  TeamIntroductions,
  MilestoneReviews,
  OnboardingGraduation,
  WelcomeOverview,
  YourTools,
  CustomTab,
};

export const getComponentByName = (componentName: string, props?: any): React.ReactNode => {
  console.log('Getting component for:', componentName);
  console.log('Available components:', Object.keys(componentMap));
  
  const Component = componentMap[componentName];
  
  if (!Component) {
    console.warn(`Component ${componentName} not found, using fallback`);
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Component not found: {componentName}</p>
        <p className="text-sm text-gray-500">Available: {Object.keys(componentMap).join(', ')}</p>
      </div>
    );
  }

  console.log('Component found, rendering:', componentName);
  return <Component {...props} />;
};

export const isComponentAvailable = (componentName: string): boolean => {
  return componentName in componentMap;
}; 