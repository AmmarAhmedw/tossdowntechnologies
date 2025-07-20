import React from "react";
import { Card, Button, Input, Progress, Select, SelectItem, Avatar, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";

const departments = [
  { id: "engineering", name: "Engineering", icon: "lucide:code" },
  { id: "product", name: "Product Management", icon: "lucide:layout" },
  { id: "design", name: "Design", icon: "lucide:pen-tool" },
  { id: "marketing", name: "Marketing", icon: "lucide:megaphone" },
  { id: "sales", name: "Sales", icon: "lucide:trending-up" },
  { id: "hr", name: "Human Resources", icon: "lucide:users" },
];

const onboardingSteps = [
  { id: 1, title: "Personal Info", icon: "lucide:user" },
  { id: 2, title: "Department", icon: "lucide:briefcase" },
  { id: 3, title: "Team Intro", icon: "lucide:users" },
  { id: 4, title: "All Set!", icon: "lucide:check-circle" },
];

export const WelcomeScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [answers, setAnswers] = React.useState({
    name: "",
    department: "",
  });

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleAnswer = (key, value) => {
    setAnswers({ ...answers, [key]: value });
  };

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-center text-gray-800">What's your name?</h2>
            <Input
              placeholder="Enter your full name"
              value={answers.name}
              onChange={(e) => handleAnswer("name", e.target.value)}
              size="lg"
              variant="bordered"
              className="text-lg"
            />
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-center text-gray-800">Which department are you joining?</h2>
            <div className="grid grid-cols-2 gap-4">
              {departments.map((dept) => (
                <Button
                  key={dept.id}
                  color={answers.department === dept.id ? "primary" : "default"}
                  variant={answers.department === dept.id ? "solid" : "bordered"}
                  className="h-20 text-lg"
                  onPress={() => handleAnswer("department", dept.id)}
                >
                  <Icon icon={dept.icon} className="text-2xl mr-2" />
                  {dept.name}
                </Button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-center text-gray-800">Meet Your Team</h2>
            <div className="flex justify-center space-x-4">
              {[1, 2, 3, 4].map((id) => (
                <Avatar
                  key={id}
                  src={`https://img.heroui.chat/image/avatar?w=200&h=200&u=${id}`}
                  className="w-20 h-20 text-large"
                />
              ))}
            </div>
            <p className="text-center text-gray-600">
              You'll be working closely with these awesome people. We'll introduce you properly on your first day!
            </p>
          </div>
        );
      case 3:
        return (
          <div className="text-center space-y-6">
            <Icon icon="lucide:party-popper" className="text-8xl text-primary mx-auto" />
            <h2 className="text-3xl font-semibold text-gray-800">You're All Set, {answers.name}!</h2>
            <p className="text-xl text-gray-600">
              Welcome to the {departments.find(d => d.id === answers.department)?.name} team at Tossdown. We're thrilled to have you on board!
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl p-8 shadow-2xl bg-background">
        <div className="text-center mb-8">
          <Icon icon="logos:tossdown" className="text-7xl mb-4" />
          <h1 className="text-4xl font-bold text-primary mb-2">Welcome to Tossdown</h1>
          <p className="text-xl text-foreground-500">Let's get you started on your journey!</p>
        </div>

        <div className="mb-8">
          <Progress
            aria-label="Onboarding progress"
            value={progress}
            className="mb-4"
            color="primary"
            size="md"
            showValueLabel={true}
          />
          <div className="flex justify-between">
            {onboardingSteps.map((step, index) => (
              <Chip
                key={step.id}
                color={index <= currentStep ? "primary" : "default"}
                variant={index <= currentStep ? "solid" : "bordered"}
                startContent={<Icon icon={step.icon} />}
              >
                {step.title}
              </Chip>
            ))}
          </div>
        </div>

        <div className="mb-8">
          {renderStep()}
        </div>

        <Button
          color="primary"
          size="lg"
          className="w-full text-lg font-semibold"
          onPress={handleNext}
        >
          {currentStep < onboardingSteps.length - 1 ? "Next" : "Start My Journey"}
        </Button>
      </Card>
    </div>
  );
};