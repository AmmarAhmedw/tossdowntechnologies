import React from "react";
import { OnboardingFlow } from "./components/OnboardingFlow";
import { Dashboard } from "./components/Dashboard";

export default function App() {
  const [onboardingComplete, setOnboardingComplete] = React.useState(false);

  if (!onboardingComplete) {
    return <OnboardingFlow onComplete={() => setOnboardingComplete(true)} />;
  }

  return <Dashboard />;
}