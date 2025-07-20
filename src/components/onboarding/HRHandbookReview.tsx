import React from "react";
import { Card, Checkbox, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";

const policies = [
  { id: "culture", name: "Tossdown Culture", reviewed: false },
  { id: "handbook", name: "Employee Handbook", reviewed: false },
  { id: "conduct", name: "Code of Conduct", reviewed: false },
];

export const HRHandbookReview: React.FC = () => {
  const [docs, setDocs] = React.useState(policies);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedPolicy, setSelectedPolicy] = React.useState(null);

  const handleReview = (id: string) => {
    setSelectedPolicy(docs.find(doc => doc.id === id));
    onOpen();
  };

  const handleAcknowledge = () => {
    if (selectedPolicy) {
      setDocs(prevDocs =>
        prevDocs.map(doc =>
          doc.id === selectedPolicy.id ? { ...doc, reviewed: true } : doc
        )
      );
    }
    onOpenChange();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">HR Policies & Procedures Review</h2>
      {docs.map(doc => (
        <Card key={doc.id} className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Checkbox isSelected={doc.reviewed} isReadOnly />
              <span className="ml-2">{doc.name}</span>
            </div>
            <Button
              size="sm"
              color={doc.reviewed ? "success" : "primary"}
              onPress={() => handleReview(doc.id)}
            >
              {doc.reviewed ? "Reviewed" : "Review"}
            </Button>
          </div>
        </Card>
      ))}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{selectedPolicy?.name}</ModalHeader>
              <ModalBody>
                <p>This is where the content of {selectedPolicy?.name} would be displayed.</p>
                <p>Please read through the document carefully and acknowledge that you have read and understood its contents.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleAcknowledge}>
                  Acknowledge
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};