import React from "react";
import { Checkbox, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";

const tasks = [
  { id: 1, title: "Complete personal information", completed: true },
  { id: 2, title: "Sign employee handbook", completed: false },
  { id: 3, title: "Set up workstation", completed: false },
  { id: 4, title: "Attend welcome webinar", completed: false },
  { id: 5, title: "Complete company culture training", completed: false },
  { id: 6, title: "Set up direct deposit", completed: true },
  { id: 7, title: "Review benefits package", completed: false },
  { id: 8, title: "Schedule 1-on-1 with manager", completed: false },
  { id: 9, title: "Review OKRs/KPIs", completed: false },
  { id: 10, title: "Complete mandatory compliance training", completed: false },
  { id: 11, title: "Review HR policies and code of conduct", completed: false },
  { id: 12, title: "Complete benefits and payroll walkthrough", completed: false },
  { id: 13, title: "Review health & safety / IT security policies", completed: false },
  { id: 14, title: "Complete role-specific tools training", completed: false },
];

export const TaskList: React.FC = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selectedTasks, setSelectedTasks] = React.useState(tasks);

  const toggleTask = (id: number) => {
    setSelectedTasks(
      selectedTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Onboarding Tasks</h2>
      <ul className="space-y-3">
        {selectedTasks.slice(0, 4).map((task) => (
          <li key={task.id} className="flex items-center justify-between">
            <Checkbox
              isSelected={task.completed}
              onValueChange={() => toggleTask(task.id)}
              color={task.completed ? "success" : "default"}
            >
              <span className={task.completed ? "line-through text-success" : ""}>
                {task.title}
              </span>
            </Checkbox>
            <Button isIconOnly size="sm" variant="light">
              <Icon icon="lucide:more-vertical" className="text-default-500" />
            </Button>
          </li>
        ))}
      </ul>
      <Button color="primary" className="mt-4 w-full" onPress={onOpen}>
        View All Tasks
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">All Onboarding Tasks</ModalHeader>
              <ModalBody>
                <ul className="space-y-3">
                  {selectedTasks.map((task) => (
                    <li key={task.id} className="flex items-center justify-between">
                      <Checkbox
                        isSelected={task.completed}
                        onValueChange={() => toggleTask(task.id)}
                        color={task.completed ? "success" : "default"}
                      >
                        <span className={task.completed ? "line-through text-success" : ""}>
                          {task.title}
                        </span>
                      </Checkbox>
                    </li>
                  ))}
                </ul>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};