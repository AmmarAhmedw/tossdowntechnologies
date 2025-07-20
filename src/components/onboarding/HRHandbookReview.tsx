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
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">HR Policies & Procedures Review</h2>
        <Button
          isIconOnly
          variant="light"
          size="sm"
          className="text-gray-500 hover:text-gray-700"
        >
          <Icon icon="lucide:x" className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        {docs.map(doc => (
          <Card key={doc.id} className="p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Checkbox 
                  isSelected={doc.reviewed} 
                  isReadOnly 
                  classNames={{
                    wrapper: "text-pink-500",
                  }}
                />
                <span className="ml-3 text-gray-900 font-medium">{doc.name}</span>
              </div>
              <Button
                size="sm"
                color={doc.reviewed ? "success" : "primary"}
                variant={doc.reviewed ? "flat" : "solid"}
                onPress={() => handleReview(doc.id)}
                className={`min-w-[80px] ${doc.reviewed ? 'bg-green-100 text-green-700' : 'bg-pink-500 hover:bg-pink-600 text-white'}`}
              >
                {doc.reviewed ? "Reviewed" : "Review"}
              </Button>
            </div>
            {doc.id === "culture" && (
              <div className="mt-3 text-sm text-gray-600">
                This is where the content of Tossdown Culture would be displayed. Please read through the document carefully and acknowledge that you have read and understood its contents.
              </div>
            )}
          </Card>
        ))}
      </div>

      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        size="3xl"
        classNames={{
          backdrop: "bg-black/50 backdrop-blur-sm",
          base: "z-[9999]",
          wrapper: "z-[9999]",
        }}
        backdrop="blur"
      >
        <ModalContent className="bg-white shadow-2xl border border-gray-200">
          {(onClose) => (
            <>
              <ModalHeader className="bg-pink-500 text-white">
                <div className="flex items-center justify-between w-full">
                  <span className="text-lg font-semibold">{selectedPolicy?.name}</span>
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onPress={onClose}
                    className="text-white hover:bg-pink-600"
                  >
                    <Icon icon="lucide:x" className="w-4 h-4" />
                  </Button>
                </div>
              </ModalHeader>
              <ModalBody className="p-6">
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    This is where the content of <strong>{selectedPolicy?.name}</strong> would be displayed.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Please read through the document carefully and acknowledge that you have read and understood its contents.
                  </p>
                </div>
              </ModalBody>
              <ModalFooter className="p-6 border-t border-gray-200">
                <div className="flex gap-3 w-full justify-end">
                  <Button 
                    color="danger" 
                    variant="light" 
                    onPress={onClose}
                    className="px-6"
                  >
                    Close
                  </Button>
                  <Button 
                    color="primary" 
                    onPress={handleAcknowledge}
                    className="px-6 bg-pink-500 hover:bg-pink-600 text-white"
                  >
                    Acknowledge
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};