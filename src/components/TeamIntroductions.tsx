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
            <Button 
              variant="bordered"
              className="border-pink-200 text-pink-700 hover:bg-pink-50 hover:border-pink-300 focus:border-pink-400"
            >
              Filter: {filter} <Icon icon="lucide:chevron-down" className="ml-2" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Filter team members"
            onAction={(key) => setFilter(key.toString())}
            className="bg-white border border-pink-200 shadow-lg z-50"
          >
            <DropdownItem key="All" className="hover:bg-pink-50 focus:bg-pink-100 data-[selected=true]:bg-pink-100 data-[selected=true]:text-pink-700">All</DropdownItem>
            <DropdownItem key="Human Resources" className="hover:bg-pink-50 focus:bg-pink-100 data-[selected=true]:bg-pink-100 data-[selected=true]:text-pink-700">Human Resources</DropdownItem>
            <DropdownItem key="Engineering" className="hover:bg-pink-50 focus:bg-pink-100 data-[selected=true]:bg-pink-100 data-[selected=true]:text-pink-700">Engineering</DropdownItem>
            <DropdownItem key="Product" className="hover:bg-pink-50 focus:bg-pink-100 data-[selected=true]:bg-pink-100 data-[selected=true]:text-pink-700">Product</DropdownItem>
            <DropdownItem key="Design" className="hover:bg-pink-50 focus:bg-pink-100 data-[selected=true]:bg-pink-100 data-[selected=true]:text-pink-700">Design</DropdownItem>
            <DropdownItem key="Analytics" className="hover:bg-pink-50 focus:bg-pink-100 data-[selected=true]:bg-pink-100 data-[selected=true]:text-pink-700">Analytics</DropdownItem>
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
              <Button 
                size="sm" 
                variant="bordered" 
                onPress={() => handleMessage(member)}
                className="border-pink-200 text-pink-700 hover:bg-pink-50 hover:border-pink-300 focus:border-pink-400"
              >
                <Icon icon="lucide:mail" className="mr-1" />
                Message
              </Button>
              <Button 
                size="sm" 
                variant="bordered" 
                onPress={() => handleSchedule(member)}
                className="border-pink-200 text-pink-700 hover:bg-pink-50 hover:border-pink-300 focus:border-pink-400"
              >
                <Icon icon="lucide:calendar" className="mr-1" />
                Schedule
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <Modal 
        isOpen={isMessageOpen} 
        onOpenChange={onMessageOpenChange}
        classNames={{
          backdrop: "bg-black/50 backdrop-blur-sm",
          base: "z-[9999]",
          wrapper: "z-[9999]"
        }}
      >
        <ModalContent className="bg-white border border-pink-200 shadow-xl">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Message {selectedMember?.name}</ModalHeader>
              <ModalBody className="pt-2">
                <Input
                  autoFocus
                  label="Subject"
                  placeholder="Enter your message subject"
                  variant="bordered"
                  className="mb-4"
                  labelPlacement="outside-left"
                  classNames={{
                    label: "text-sm font-medium text-gray-700 -mt-1"
                  }}
                />
                <Textarea
                  label="Message"
                  placeholder="Enter your message here"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button 
                  variant="bordered" 
                  onPress={onClose}
                  className="border-pink-200 text-pink-700 hover:bg-pink-50 hover:border-pink-300"
                >
                  Close
                </Button>
                <Button 
                  color="primary" 
                  onPress={onClose}
                  className="bg-pink-600 hover:bg-pink-700 text-white"
                >
                  Send
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal 
        isOpen={isScheduleOpen} 
        onOpenChange={onScheduleOpenChange}
        classNames={{
          backdrop: "bg-black/50 backdrop-blur-sm",
          base: "z-[9999]",
          wrapper: "z-[9999]"
        }}
      >
        <ModalContent className="bg-white border border-pink-200 shadow-xl">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Schedule Meeting with {selectedMember?.name}</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Meeting Title"
                  placeholder="Enter meeting title"
                  variant="bordered"
                  labelPlacement="outside-left"
                  classNames={{
                    label: "text-sm font-medium text-gray-700 -mt-1"
                  }}
                />
                <Input
                  type="date"
                  label="Date"
                  placeholder="Select date"
                  variant="bordered"
                  labelPlacement="outside-left"
                  classNames={{
                    label: "text-sm font-medium text-gray-700 -mt-1",
                    input: "pr-8 text-sm"
                  }}
                />
                <Input
                  type="time"
                  label="Time"
                  placeholder="Select time"
                  variant="bordered"
                  labelPlacement="outside-left"
                  classNames={{
                    label: "text-sm font-medium text-gray-700 -mt-1",
                    input: "pr-8 text-sm"
                  }}
                />
                <Textarea
                  label="Meeting Agenda"
                  placeholder="Enter meeting agenda"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button 
                  variant="bordered" 
                  onPress={onClose}
                  className="border-pink-200 text-pink-700 hover:bg-pink-50 hover:border-pink-300"
                >
                  Cancel
                </Button>
                <Button 
                  color="primary" 
                  onPress={onClose}
                  className="bg-pink-600 hover:bg-pink-700 text-white"
                >
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