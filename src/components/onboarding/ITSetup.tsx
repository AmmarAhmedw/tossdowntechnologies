import React from "react";
import { Card, Progress, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";

const itSetupTasks = [
  { id: "email", name: "Email Setup", icon: "lucide:mail", progress: 0 },
  { id: "slack", name: "Slack Configuration", icon: "lucide:message-square", progress: 0 },
];

export const ITSetup: React.FC = () => {
  const [tasks, setTasks] = React.useState(itSetupTasks);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedTask, setSelectedTask] = React.useState(null);

  const handleTaskProgress = () => {
    if (selectedTask) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === selectedTask.id ? { ...task, progress: 100 } : task
        )
      );
      onOpenChange();
    }
  };

  const openTaskModal = (task) => {
    setSelectedTask(task);
    onOpen();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">IT Setup</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.map(task => (
          <Card key={task.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow" isPressable onPress={() => openTaskModal(task)}>
            <div className="flex items-center mb-2">
              <Icon icon={task.icon} className="text-2xl text-primary mr-2" />
              <span className="font-medium">{task.name}</span>
            </div>
            <Progress value={task.progress} className="mb-2" />
            <span className="text-small text-default-500">{task.progress}% Complete</span>
          </Card>
        ))}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{selectedTask?.name}</ModalHeader>
              <ModalBody>
                {selectedTask?.id === "email" ? (
                  <p>An Email account has been created for you please check your registered email for the credentials.</p>
                ) : selectedTask?.id === "slack" ? (
                  <div className="space-y-4">
                    <p>Your Slack workspace has been configured. Here's what you need to do:</p>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>Download Slack from the official website or app store</li>
                      <li>Use your company email to sign in</li>
                      <li>Join the general channel and your team's specific channels</li>
                      <li>Set up your profile with a professional photo</li>
                      <li>Configure your notification preferences</li>
                    </ul>
                    <div className="bg-blue-50 p-3 rounded-lg">
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
                  <p>Task configuration details will appear here.</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleTaskProgress}>
                  Mark as Completed
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};