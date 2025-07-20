import React from "react";
import { Card, Button, Progress, Accordion, AccordionItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";
import { ScheduleMeeting } from "./ScheduleMeeting";

interface Milestone {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  date: string;
}

const milestones = [
  {
    id: 1,
    title: "Career Development Discussion",
    description: "Career path and future goals",
    completed: false,
    date: "2023-07-20",
  },
];

export const MilestoneReviews: React.FC = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selectedMilestone, setSelectedMilestone] = React.useState<Milestone | null>(null);

  const completedMilestones = milestones.filter(m => m.completed).length;
  const progress = (completedMilestones / milestones.length) * 100;

  const handleScheduleReview = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
    onOpen();
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Milestone Reviews</h2>
      <Progress
        aria-label="Milestone progress"
        value={progress}
        className="mb-4"
        color="success"
        showValueLabel={true}
      />
      <p className="text-small text-default-500 mb-4">
        {completedMilestones} of {milestones.length} milestones completed
      </p>
      <Accordion variant="shadow">
        {milestones.map((milestone) => (
          <AccordionItem
            key={milestone.id}
            aria-label={milestone.title}
            title={
              <div className="flex items-center justify-between">
                <span className="font-medium">{milestone.title}</span>
                {milestone.completed ? (
                  <Icon icon="lucide:check-circle" className="text-success text-xl" />
                ) : (
                  <span className="text-small text-default-400">{milestone.date}</span>
                )}
              </div>
            }
          >
            <div className="py-2">
              <p className="text-small text-default-600 mb-3">{milestone.description}</p>
              {!milestone.completed && (
                <Button size="sm" color="primary" onPress={() => handleScheduleReview(milestone)}>
                  <Icon icon="lucide:calendar" className="mr-1" />
                  Schedule Review
                </Button>
              )}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-6 space-y-3">
        <Button color="secondary" className="w-full">
          <Icon icon="lucide:file-text" className="mr-2" />
          Generate Milestone Report
        </Button>
        <Button color="primary" className="w-full" onPress={() => handleScheduleReview(milestones[0])}>
          <Icon icon="lucide:calendar-check" className="mr-2" />
          Schedule 90-Day Review
        </Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Schedule {selectedMilestone?.title}</ModalHeader>
              <ModalBody>
                <ScheduleMeeting milestone={selectedMilestone} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
};