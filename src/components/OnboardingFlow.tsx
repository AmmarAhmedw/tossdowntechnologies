import React from "react";
import { Card, Progress, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { WelcomeScreen } from "./onboarding/WelcomeScreen";
import { RoleSelection } from "./onboarding/RoleSelection";
import { RoleSpecificDashboard } from "./onboarding/RoleSpecificDashboard";
import { ITSetup } from "./onboarding/ITSetup";
import { DocumentSigning } from "./onboarding/DocumentSigning";
import { SelfIntroduction } from "./onboarding/SelfIntroduction";
import { HRHandbookReview } from "./onboarding/HRHandbookReview";
import { LearningDevelopment } from "./onboarding/LearningDevelopment";
import { TeamIntroductions } from "./onboarding/TeamIntroductions";

const steps = [
  { id: "welcome", component: WelcomeScreen },
  { id: "role", component: RoleSelection },
  { id: "it-setup", component: ITSetup },
  { id: "document-signing", component: DocumentSigning },
  { id: "self-introduction", component: SelfIntroduction },
  { id: "hr-handbook", component: HRHandbookReview },
  { id: "team-introductions", component: TeamIntroductions },
  { id: "learning-development", component: LearningDevelopment },
  { id: "role-specific", component: RoleSpecificDashboard },
];

export const OnboardingFlow: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [employeeData, setEmployeeData] = React.useState({});

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-pink-gradient flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-8 shadow-2xl bg-white/95 backdrop-blur-sm">
        <div className="mb-8">
          <Progress
            aria-label="Onboarding progress"
            value={progress}
            className="mb-4"
            color="primary"
            showValueLabel={true}
            classNames={{
              track: "bg-pink-100",
              indicator: "bg-pink-500",
              label: "text-pink-700 font-medium"
            }}
          />
          <div className="flex justify-between text-small text-pink-600">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        <CurrentStepComponent
          employeeData={employeeData}
          updateEmployeeData={(data) => setEmployeeData({ ...employeeData, ...data })}
        />

        <div className="mt-8 flex justify-between">
          {currentStep > 0 && (
            <Button 
              color="primary" 
              variant="flat" 
              onPress={() => setCurrentStep(currentStep - 1)}
              className="bg-pink-100 text-pink-700 hover:bg-pink-200"
            >
              <Icon icon="lucide:arrow-left" className="mr-2" />
              Previous
            </Button>
          )}
          <Button 
            color="primary" 
            onPress={handleNext}
            className="bg-pink-500 hover:bg-pink-600 text-white"
          >
            {currentStep === steps.length - 1 ? "Complete Onboarding" : "Next"}
            <Icon icon="lucide:arrow-right" className="ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
};