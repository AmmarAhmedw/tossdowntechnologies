import React from "react";
import { Card, Avatar, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";

const teamMembers = [
  { id: 1, name: "Alice Johnson", role: "HR Manager", avatarId: 1 },
  { id: 2, name: "Bob Smith", role: "Team Lead", avatarId: 2 },
  { id: 3, name: "Carol Williams", role: "Senior Developer", avatarId: 3 },
  { id: 4, name: "David Brown", role: "Product Manager", avatarId: 4 },
];

export const TeamIntroductions: React.FC<{ employeeData: any; updateEmployeeData: (data: any) => void }> = ({ employeeData, updateEmployeeData }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedMember, setSelectedMember] = React.useState(null);

  const openMemberModal = (member) => {
    setSelectedMember(member);
    onOpen();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Meet Your Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow" isPressable onPress={() => openMemberModal(member)}>
            <div className="flex items-center space-x-4">
              <Avatar
                src={`https://img.heroui.chat/image/avatar?w=200&h=200&u=${member.avatarId}`}
                size="lg"
              />
              <div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-small text-default-500">{member.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{selectedMember?.name}</ModalHeader>
              <ModalBody>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar
                    src={`https://img.heroui.chat/image/avatar?w=200&h=200&u=${selectedMember?.avatarId}`}
                    size="lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{selectedMember?.name}</h3>
                    <p className="text-small text-default-500">{selectedMember?.role}</p>
                  </div>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  <Icon icon="lucide:mail" className="mr-2" />
                  Message
                </Button>
                <Button color="secondary" onPress={onClose}>
                  <Icon icon="lucide:calendar" className="mr-2" />
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