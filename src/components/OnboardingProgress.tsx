import React from "react";
import { Progress, Card } from "@heroui/react";

export const OnboardingProgress: React.FC = () => {
  const progress = 65; // This would be dynamically calculated based on completed tasks

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Onboarding Progress</h2>
      <Progress
        aria-label="Onboarding progress"
        classNames={{
          base: "max-w-md",
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
      <p className="mt-2 text-foreground-500">
        You're doing great! {100 - progress}% more to go.
      </p>
    </Card>
  );
};