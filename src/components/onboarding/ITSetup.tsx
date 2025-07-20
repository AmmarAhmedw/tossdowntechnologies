import React from "react";
import { Card, Progress, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

const itSetupTasks = [
  { id: "email", name: "Email Setup", icon: "lucide:mail", progress: 0 },
  { id: "slack", name: "Slack Configuration", icon: "lucide:message-square", progress: 0 },
];

export const ITSetup: React.FC = () => {
  const [tasks, setTasks] = React.useState(itSetupTasks);
  const [selectedTask, setSelectedTask] = React.useState(itSetupTasks[0]);

  const handleTaskProgress = () => {
    if (selectedTask) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === selectedTask.id ? { ...task, progress: 100 } : task
        )
      );
    }
  };

  const openTaskModal = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Left Panel - Navigation */}
        <div className="w-1/3 pr-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">IT Setup</h2>
          <div className="space-y-3">
            {tasks.map(task => (
              <div
                key={task.id}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedTask?.id === task.id 
                    ? 'bg-pink-50 border-l-4 border-pink-500' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => openTaskModal(task)}
              >
                <Icon icon={task.icon} className="text-xl text-gray-600 mr-3" />
                <span className="font-medium text-gray-800">{task.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Current Task Details */}
        <div className="flex-1 pl-6 border-l border-gray-200">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-semibold text-gray-900">{selectedTask?.name}</h3>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              className="text-gray-400 hover:text-gray-600"
            >
              <Icon icon="lucide:x" />
            </Button>
          </div>

          <div className="space-y-6">
            {selectedTask?.id === "email" ? (
              <div>
                <p className="text-gray-700 mb-6">
                  An Email account has been created for you please check your registered email for the credentials.
                </p>

              </div>
            ) : selectedTask?.id === "slack" ? (
              <div>
                <p className="text-gray-700 mb-4">
                  Your Slack workspace has been configured. Here's what you need to do:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 mb-6">
                  <li>Download Slack from the official website or app store</li>
                  <li>Use your company email to sign in</li>
                  <li>Join the general channel and your team's specific channels</li>
                  <li>Set up your profile with a professional photo</li>
                  <li>Configure your notification preferences</li>
                </ul>
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>Workspace URL:</strong>{" "}
                    <a 
                      href="http://tossdownteam.slack.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      http://tossdownteam.slack.com
                    </a>
                  </p>
                </div>

              </div>
            ) : (
              <div>
                <p className="text-gray-700">Task configuration details will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};