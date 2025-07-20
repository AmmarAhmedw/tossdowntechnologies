import React from "react";
import { Card, Progress, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Radio, RadioGroup } from "@heroui/react";
import { Icon } from "@iconify/react";

const modules = {
  sales: [
    { id: "sales1", name: "Sales Excellence", progress: 0 },
    { id: "sales2", name: "Product Knowledge", progress: 0 },
    { id: "sales3", name: "CRM Training", progress: 0 },
  ],
  marketing: [
    { id: "marketing1", name: "Marketing Strategy", progress: 0 },
    { id: "marketing2", name: "Digital Marketing Tools", progress: 0 },
    { id: "marketing3", name: "Brand Guidelines", progress: 0 },
  ],
  development: [
    { id: "dev1", name: "Coding Standards", progress: 0 },
    { id: "dev2", name: "Version Control", progress: 0 },
    { id: "dev3", name: "Agile Methodology", progress: 0 },
  ],
};

const quizzes = {
  sales1: [
    { question: "What is the SPIN selling technique?", options: ["A sales strategy", "A product feature", "A marketing campaign", "A customer type"], correct: 0 },
    { question: "Which of these is not a stage in the sales funnel?", options: ["Awareness", "Consideration", "Promotion", "Decision"], correct: 2 },
  ],
  marketing1: [
    { question: "What does SEO stand for?", options: ["Search Engine Optimization", "Social Engagement Opportunity", "Sales Enablement Operations", "Strategic Executive Overview"], correct: 0 },
    { question: "Which of these is not a type of marketing?", options: ["Content Marketing", "Inbound Marketing", "Outbound Marketing", "Downbound Marketing"], correct: 3 },
  ],
  dev1: [
    { question: "What does DRY stand for in programming?", options: ["Don't Repeat Yourself", "Data Retrieval Yield", "Develop Robust Yield", "Direct Response Yield"], correct: 0 },
    { question: "Which of these is not a version control system?", options: ["Git", "SVN", "Mercurial", "Python"], correct: 3 },
  ],
};

export const LearningDevelopment: React.FC<{ employeeData: any }> = ({ employeeData }) => {
  const [learningModules, setLearningModules] = React.useState(modules[employeeData.role] || modules.sales);
  const [currentQuiz, setCurrentQuiz] = React.useState<any>(null);
  const [quizAnswers, setQuizAnswers] = React.useState<number[]>([]);
  const [quizResults, setQuizResults] = React.useState<{ correct: number; total: number } | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const startQuiz = (moduleId: string) => {
    const quiz = quizzes[moduleId as keyof typeof quizzes];
    if (quiz) {
      setCurrentQuiz(quiz);
      setQuizAnswers(new Array(quiz.length).fill(-1));
      setQuizResults(null);
      onOpen();
    }
  };

  const submitQuiz = () => {
    if (!currentQuiz) return;
    
    const correct = quizAnswers.reduce((count, answer, index) => {
      return count + (answer === currentQuiz[index].correct ? 1 : 0);
    }, 0);
    
    setQuizResults({ correct, total: currentQuiz.length });
    
    // Update module progress
    const moduleId = Object.keys(quizzes).find(key => quizzes[key as keyof typeof quizzes] === currentQuiz);
    if (moduleId) {
      setLearningModules(prev => prev.map(module => 
        module.id === moduleId 
          ? { ...module, progress: Math.min(100, module.progress + (correct / currentQuiz.length) * 100) }
          : module
      ));
    }
  };

  const closeQuiz = () => {
    setCurrentQuiz(null);
    setQuizAnswers([]);
    setQuizResults(null);
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Learning & Development</h2>
        <div className="text-sm text-gray-500">
          Complete modules to advance your skills
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {learningModules.map((module) => (
          <Card key={module.id} className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{module.name}</h3>
                <span className="text-sm text-gray-500">{module.progress.toFixed(0)}%</span>
              </div>
              
              <Progress 
                value={module.progress} 
                className="w-full"
                color={module.progress === 100 ? "success" : "primary"}
              />
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  color="primary"
                  variant="flat"
                  onPress={() => startQuiz(module.id)}
                  isDisabled={!quizzes[module.id as keyof typeof quizzes]}
                >
                  Take Quiz
                </Button>
                {module.progress > 0 && (
                  <Button size="sm" variant="light" color="success">
                    <Icon icon="mdi:check" className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isOpen} onClose={closeQuiz} size="2xl">
        <ModalContent>
          <ModalHeader>
            {currentQuiz && !quizResults ? "Module Quiz" : "Quiz Results"}
          </ModalHeader>
          <ModalBody>
            {currentQuiz && !quizResults ? (
              <div className="space-y-6">
                {currentQuiz.map((question: any, index: number) => (
                  <div key={index} className="space-y-3">
                    <h4 className="font-medium">Question {index + 1}</h4>
                    <p className="text-gray-700">{question.question}</p>
                    <RadioGroup
                      value={quizAnswers[index]?.toString() || ""}
                      onValueChange={(value) => {
                        const newAnswers = [...quizAnswers];
                        newAnswers[index] = parseInt(value);
                        setQuizAnswers(newAnswers);
                      }}
                    >
                      {question.options.map((option: string, optionIndex: number) => (
                        <Radio key={optionIndex} value={optionIndex.toString()}>
                          {option}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>
            ) : quizResults ? (
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold text-primary">
                  {quizResults.correct}/{quizResults.total}
                </div>
                <p className="text-lg">
                  {quizResults.correct === quizResults.total 
                    ? "Perfect! You've mastered this module!" 
                    : `Good effort! You got ${quizResults.correct} out of ${quizResults.total} correct.`}
                </p>
                <div className="text-sm text-gray-500">
                  {quizResults.correct / quizResults.total >= 0.7 
                    ? "Module progress updated!" 
                    : "Keep studying and try again!"}
                </div>
              </div>
            ) : null}
          </ModalBody>
          <ModalFooter>
            {!quizResults ? (
              <Button color="primary" onPress={submitQuiz}>
                Submit Quiz
              </Button>
            ) : (
              <Button color="primary" onPress={closeQuiz}>
                Close
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};