import React from "react";
import { Card, Button, Progress, Checkbox, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";

interface OnboardingGraduationProps {
  onComplete?: () => void;
}

const finalChecklistItems = [
  { id: 1, title: "Complete all required training modules", completed: false },
  { id: 2, title: "Sign all necessary documents", completed: false },
  { id: 3, title: "Set up IT equipment and accounts", completed: false },
  { id: 4, title: "Review company policies and handbook", completed: false },
  { id: 5, title: "Schedule first team meeting", completed: false },
  { id: 6, title: "Complete role-specific onboarding tasks", completed: false },
];

export const OnboardingGraduation: React.FC<OnboardingGraduationProps> = ({ onComplete }) => {
  const progress = 100; // Always 100% for graduation
  const [checklistItems, setChecklistItems] = React.useState(finalChecklistItems);
  const [showCongratulations, setShowCongratulations] = React.useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleChecklistItemToggle = (id: number) => {
    setChecklistItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleCompleteChecklist = () => {
    onOpen();
  };

  const handleConfirmCompletion = () => {
    setShowCongratulations(true);
    onOpenChange();
  };

  const handleFinalComplete = () => {
    console.log("Onboarding completed! Navigating to Tossdown website...");
    window.open('https://tossdown.com/', '_blank');
  };

  const completedCount = checklistItems.filter(item => item.completed).length;
  const totalItems = checklistItems.length;

  // Show congratulations screen
  if (showCongratulations) {
    return (
      <Card className="p-8 text-center max-w-2xl mx-auto">
        <div className="mb-6">
          <Icon icon="lucide:party-popper" className="text-8xl text-warning mb-4" />
          <Icon icon="lucide:trophy" className="text-6xl text-warning mb-4" />
        </div>
        
        <h1 className="text-4xl font-bold text-warning mb-4">🎉 Congratulations! 🎉</h1>
        
        <div className="space-y-4 mb-8">
          <p className="text-xl text-foreground-600">
            You have successfully completed your onboarding journey!
          </p>
          
          <div className="bg-success-50 p-6 rounded-lg border border-success-200">
            <h3 className="text-lg font-semibold text-success-800 mb-3">What's Next?</h3>
            <ul className="text-left space-y-2 text-success-700">
              <li className="flex items-center">
                <Icon icon="lucide:check-circle" className="text-success-600 mr-2" />
                You now have full access to all company systems
              </li>
              <li className="flex items-center">
                <Icon icon="lucide:check-circle" className="text-success-600 mr-2" />
                Your team is ready to welcome you aboard
              </li>
              <li className="flex items-center">
                <Icon icon="lucide:check-circle" className="text-success-600 mr-2" />
                You can start contributing to exciting projects
              </li>
              <li className="flex items-center">
                <Icon icon="lucide:check-circle" className="text-success-600 mr-2" />
                Your manager will reach out to schedule your first 1-on-1
              </li>
            </ul>
          </div>
          
          <div className="bg-primary-50 p-4 rounded-lg border border-primary-200">
            <p className="text-primary-800">
              <strong>Welcome to the team!</strong> We're excited to have you on board and can't wait to see what you'll accomplish.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            color="success" 
            size="lg"
            className="w-full max-w-md"
            onClick={handleFinalComplete}
          >
            <Icon icon="lucide:rocket" className="mr-2" />
            Start My Journey
          </Button>
          
          <Button 
            color="secondary" 
            variant="bordered"
            className="w-full max-w-md"
            onClick={() => setShowCongratulations(false)}
          >
            <Icon icon="lucide:arrow-left" className="mr-2" />
            Back to Checklist
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 text-center relative z-0">
      <Icon icon="lucide:award" className="text-6xl text-warning mb-4" />
      <h2 className="text-2xl font-semibold mb-4">Onboarding Graduation</h2>
      <Progress
        aria-label="Graduation progress"
        classNames={{
          base: "max-w-md mx-auto",
          track: "drop-shadow-md border border-default",
          indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
          label: "tracking-wider font-medium text-default-600",
          value: "text-foreground/60",
        }}
        color="warning"
        size="lg"
        value={progress}
        showValueLabel={true}
      />
      <p className="mt-4 mb-6 text-foreground-600">
        Congratulations! You've completed your onboarding program. Review your final checklist before graduating.
      </p>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Final Checklist</h3>
        <div className="space-y-2 max-w-md mx-auto text-left">
          {checklistItems.map((item) => (
            <div key={item.id} className="flex items-center">
              <Checkbox
                isSelected={item.completed}
                onValueChange={() => handleChecklistItemToggle(item.id)}
                color={item.completed ? "success" : "default"}
                className="mr-3"
              />
              <span className={item.completed ? "line-through text-success" : ""}>
                {item.title}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-foreground-500">
          {completedCount} of {totalItems} items completed
        </p>
      </div>

      <div className="space-y-3 relative z-10">
        <Button 
          color="warning" 
          variant="solid"
          className="w-full max-w-md bg-gradient-to-r from-pink-400 to-pink-500 text-white border-2 border-pink-300 shadow-lg hover:shadow-xl transition-all duration-200 hover:from-pink-500 hover:to-pink-600"
          onClick={handleCompleteChecklist}
          isDisabled={completedCount < totalItems}
        >
          <Icon icon="lucide:check-circle" className="mr-2" />
          Complete Final Checklist ({completedCount}/{totalItems})
        </Button>
        <Button 
          color="primary" 
          variant="solid"
          className="w-full max-w-md bg-gradient-to-r from-white to-pink-50 text-pink-700 border-2 border-pink-200 shadow-lg hover:shadow-xl transition-all duration-200 hover:from-pink-50 hover:to-pink-100"
        >
          <Icon icon="lucide:message-square" className="mr-2" />
          Schedule Graduation Meeting
        </Button>
      </div>

      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "z-[99999] !fixed",
          base: "z-[100000] !fixed",
          wrapper: "z-[99999] !fixed"
        }}
        style={{
          zIndex: 100000
        }}
      >
        <ModalContent className="bg-white shadow-2xl border-2 border-pink-200">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <Icon icon="lucide:party-popper" className="text-4xl text-warning mb-2" />
                Congratulations! 🎉
              </ModalHeader>
              <ModalBody>
                <p className="text-center text-lg">
                  You've successfully completed all onboarding requirements! 
                  You're now ready to graduate from the onboarding program.
                </p>
                <div className="bg-success-50 p-4 rounded-lg mt-4">
                  <p className="text-success-800 text-sm">
                    <strong>What's next:</strong> You'll receive access to all company systems 
                    and can start your journey with the team!
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="success" onPress={handleConfirmCompletion}>
                  <Icon icon="lucide:graduation-cap" className="mr-2" />
                  Graduate & Complete Onboarding
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
};