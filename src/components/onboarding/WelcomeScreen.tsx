import React from "react";
import { Input, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";

export const WelcomeScreen: React.FC<{ employeeData: any; updateEmployeeData: (data: any) => void }> = ({ employeeData, updateEmployeeData }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        {/* Logo */}
        <Avatar
          src="/assets/td.jpg"
          className="w-24 h-24 text-large mx-auto mb-6"
        />
        
        {/* Welcome Message */}
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Welcome to tossdown technologies!</h1>
        <p className="text-xl mb-8 text-gray-700">Let's get started with your onboarding journey.</p>
        
        {/* TossBot Introduction */}
        <div className="flex items-center justify-center mb-8">
          <Icon icon="lucide:bot" className="text-4xl text-pink-500 mr-4" />
          <p className="text-lg text-gray-800">
            Hi, I'm TossBot, your buddy! I'll guide you through the process.
          </p>
        </div>
        
        {/* Name Input Field */}
        <div className="w-full max-w-xs mx-auto">
          <label className="block text-gray-600 font-medium mb-2 text-left">
            Your Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={employeeData.name || ""}
            onChange={(e) => updateEmployeeData({ name: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 text-gray-900 placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
};