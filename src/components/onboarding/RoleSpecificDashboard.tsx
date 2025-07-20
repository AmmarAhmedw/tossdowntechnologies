import React from "react";
import { Card, CardBody, CardHeader, Progress, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

const roleSpecificContent = {
  sales: {
    tasks: [
      "Complete sales methodology training",
      "Set up CRM account",
      "Review sales targets and KPIs",
      "Schedule shadow sessions with top performers",
    ],
    tools: ["Salesforce", "Outreach", "LinkedIn Sales Navigator"],
    milestones: [
      { title: "First demo call", date: "Week 2" },
      { title: "Solo prospecting", date: "Week 4" },
      { title: "First closed deal", date: "Month 3" },
    ],
  },
  marketing: {
    tasks: [
      "Review marketing strategy",
      "Set up marketing tools accounts",
      "Attend brand guidelines workshop",
      "Create first campaign draft",
    ],
    tools: ["HubSpot", "Canva", "Google Analytics"],
    milestones: [
      { title: "First content piece published", date: "Week 3" },
      { title: "Campaign launch", date: "Month 2" },
      { title: "Marketing ROI presentation", date: "Month 3" },
    ],
  },
  development: {
    tasks: [
      "Set up development environment",
      "Complete coding standards review",
      "Attend architecture overview session",
      "Push first commit to repository",
    ],
    tools: ["GitHub", "JIRA", "CircleCI"],
    milestones: [
      { title: "First pull request merged", date: "Week 2" },
      { title: "Complete first sprint", date: "Week 4" },
      { title: "Lead a code review", date: "Month 2" },
    ],
  },
  // Add more roles as needed
};

export const RoleSpecificDashboard: React.FC<{ role: string }> = ({ role }) => {
  const content = roleSpecificContent[role] || roleSpecificContent.sales; // Default to sales if role not found

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Role-Specific Tasks</h3>
        </CardHeader>
        <CardBody>
          <ul className="space-y-2">
            {content.tasks.map((task, index) => (
              <li key={index} className="flex items-center">
                <Icon icon="lucide:check-circle" className="text-primary mr-2" />
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Key Tools</h3>
        </CardHeader>
        <CardBody>
          <div className="flex flex-wrap gap-3">
            {content.tools.map((tool, index) => (
              <Button 
                key={index} 
                color="secondary" 
                variant="flat"
                className="border-2 border-blue-300 hover:border-blue-400 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium px-4 py-2"
              >
                {tool}
              </Button>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Role Milestones</h3>
        </CardHeader>
        <CardBody>
          <ul className="space-y-4">
            {content.milestones.map((milestone, index) => (
              <li key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{milestone.title}</span>
                  <span className="text-small text-default-500">{milestone.date}</span>
                </div>
                <Progress value={0} className="max-w-md" />
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
};