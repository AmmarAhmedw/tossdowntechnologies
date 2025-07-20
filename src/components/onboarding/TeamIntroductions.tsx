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
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-black/50 backdrop-blur-sm",
          base: "bg-white/95 backdrop-blur-md border border-pink-200 shadow-2xl",
          header: "bg-gradient-to-r from-pink-50 to-white border-b border-pink-100",
          body: "bg-white/90",
          footer: "bg-gradient-to-r from-white to-pink-50 border-t border-pink-100"
        }}
        style={{ zIndex: 9999 }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-gray-800">
                <h3 className="text-xl font-semibold text-pink-700">{selectedMember?.name}</h3>
              </ModalHeader>
              <ModalBody className="py-6">
                <div className="flex items-center space-x-4 mb-6 p-4 bg-gradient-to-r from-pink-50 to-white rounded-lg border border-pink-100">
                  <Avatar
                    src={`https://img.heroui.chat/image/avatar?w=200&h=200&u=${selectedMember?.avatarId}`}
                    size="lg"
                    className="ring-2 ring-pink-200"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{selectedMember?.name}</h3>
                    <p className="text-small text-pink-600 font-medium">{selectedMember?.role}</p>
                  </div>
                </div>
                <div className="p-4 bg-white/80 rounded-lg border border-pink-100">
                  <p className="text-gray-700 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </ModalBody>
              <ModalFooter className="gap-2">
                <Button 
                  color="danger" 
                  variant="light" 
                  onPress={onClose}
                  className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                >
                  Close
                </Button>
                <Button 
                  color="primary" 
                  onPress={onClose}
                  className="bg-pink-500 hover:bg-pink-600 text-white"
                >
                  <Icon icon="lucide:mail" className="mr-2" />
                  Message
                </Button>
                <Button 
                  color="secondary" 
                  onPress={onClose}
                  className="bg-pink-100 hover:bg-pink-200 text-pink-700 border border-pink-300"
                >
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