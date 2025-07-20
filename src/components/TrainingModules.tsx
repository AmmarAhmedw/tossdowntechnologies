import React from "react";
import { Card, Button, Progress } from "@heroui/react";
import { Icon } from "@iconify/react";

const modules = [
  { id: 1, title: "Company Overview", progress: 100 },
  { id: 2, title: "Product Knowledge", progress: 60 },
  { id: 3, title: "Compliance Training", progress: 30 },
  { id: 4, title: "Role-specific Skills", progress: 0 },
];

export const TrainingModules: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {modules.map((module) => (
        <Card key={module.id} className="p-4">
          <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
          <Progress
            aria-label={`${module.title} progress`}
            value={module.progress}
            className="mb-2"
          />
          <div className="flex justify-between items-center">
            <span className="text-small text-default-500">
              {module.progress}% Complete
            </span>
            <Button 
              size="sm" 
              color="primary"
              className={`border-2 ${
                module.progress === 100 
                  ? "border-green-500 bg-green-50 text-green-700" 
                  : "border-blue-500 bg-blue-50 text-blue-700"
              }`}
            >
              {module.progress === 100 ? (
                <Icon icon="lucide:check" className="mr-1" />
              ) : (
                <Icon icon="lucide:play" className="mr-1" />
              )}
              {module.progress === 100 ? "Completed" : "Continue"}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};