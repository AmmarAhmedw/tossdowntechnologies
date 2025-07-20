import React from "react";
import { Input, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";

export const WelcomeScreen: React.FC<{ employeeData: any; updateEmployeeData: (data: any) => void }> = ({ employeeData, updateEmployeeData }) => {
  return (
    <div className="text-center">
      <Avatar
        src="/assets/td.jpg"
        className="w-24 h-24 text-large mx-auto mb-4"
      />
      <h1 className="text-3xl font-bold mb-4">Welcome to tossdown technologies!</h1>
      <p className="text-xl mb-8">Let's get started with your onboarding journey.</p>
      <div className="flex items-center justify-center mb-8">
        <Icon icon="lucide:bot" className="text-4xl text-primary mr-4" />
        <p className="text-lg">
          Hi, I'm TossBot, your buddy! I'll guide you through the process.
        </p>
      </div>
      <Input
        label="Your Name"
        placeholder="Enter your full name"
        value={employeeData.name || ""}
        onChange={(e) => updateEmployeeData({ name: e.target.value })}
        variant="bordered"
        className="max-w-xs mx-auto"
      />
    </div>
  );
};