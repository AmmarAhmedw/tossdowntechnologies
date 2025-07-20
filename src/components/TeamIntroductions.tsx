import React from "react";
import { Card, Avatar, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Textarea, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";

const teamMembers = [
  { id: 1, name: "Alice Johnson", role: "HR Manager", avatarId: 1, department: "Human Resources" },
  { id: 2, name: "Bob Smith", role: "Team Lead", avatarId: 2, department: "Engineering" },
  { id: 3, name: "Carol Williams", role: "Senior Developer", avatarId: 3, department: "Engineering" },
  { id: 4, name: "David Brown", role: "Product Manager", avatarId: 4, department: "Product" },
  { id: 5, name: "Eva Martinez", role: "UX Designer", avatarId: 5, department: "Design" },
  { id: 6, name: "Frank Lee", role: "Data Analyst", avatarId: 6, department: "Analytics" },
];

export const TeamIntroductions: React.FC = () => {
  const {isOpen: isMessageOpen, onOpen: onMessageOpen, onOpenChange: onMessageOpenChange} = useDisclosure();
  const {isOpen: isScheduleOpen, onOpen: onScheduleOpen, onOpenChange: onScheduleOpenChange} = useDisclosure();
  const [selectedMember, setSelectedMember] = React.useState(null);
  const [filter, setFilter] = React.useState("All");

  const handleMessage = (member) => {
    setSelectedMember(member);
    onMessageOpen();
  };

  const handleSchedule = (member) => {
    setSelectedMember(member);
    onScheduleOpen();
  };

  const filteredMembers = filter === "All" ? teamMembers : teamMembers.filter(member => member.department === filter);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Meet Your Team</h2>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">
              Filter: {filter} <Icon icon="lucide:chevron-down" className="ml-2" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Filter team members"
            onAction={(key) => setFilter(key.toString())}
          >
            <DropdownItem key="All">All</DropdownItem>
            <DropdownItem key="Human Resources">Human Resources</DropdownItem>
            <DropdownItem key="Engineering">Engineering</DropdownItem>
            <DropdownItem key="Product">Product</DropdownItem>
            <DropdownItem key="Design">Design</DropdownItem>
            <DropdownItem key="Analytics">Analytics</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar
                src={`https://img.heroui.chat/image/avatar?w=200&h=200&u=${member.avatarId}`}
                className="w-24 h-24 text-large"
              />
              <h3 className="text-lg font-semibold mt-4">{member.name}</h3>
              <p className="text-small text-default-500">{member.role}</p>
              <p className="text-tiny text-default-400">{member.department}</p>
            </div>
            <div className="mt-6 flex justify-center space-x-2">
              <Button size="sm" color="primary" variant="flat" onPress={() => handleMessage(member)}>
                <Icon icon="lucide:mail" className="mr-1" />
                Message
              </Button>
              <Button size="sm" color="secondary" variant="flat" onPress={() => handleSchedule(member)}>
                <Icon icon="lucide:calendar" className="mr-1" />
                Schedule
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <Modal isOpen={isMessageOpen} onOpenChange={onMessageOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Message {selectedMember?.name}</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Subject"
                  placeholder="Enter your message subject"
                  variant="bordered"
                />
                <Textarea
                  label="Message"
                  placeholder="Enter your message here"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Send
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isScheduleOpen} onOpenChange={onScheduleOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Schedule Meeting with {selectedMember?.name}</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Meeting Title"
                  placeholder="Enter meeting title"
                  variant="bordered"
                />
                <Input
                  type="date"
                  label="Date"
                  placeholder="Select date"
                  variant="bordered"
                />
                <Input
                  type="time"
                  label="Time"
                  placeholder="Select time"
                  variant="bordered"
                />
                <Textarea
                  label="Meeting Agenda"
                  placeholder="Enter meeting agenda"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Schedule
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};