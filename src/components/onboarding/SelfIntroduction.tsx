import React from "react";
import { Input, Textarea, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";

const roleOptions = [
  { key: "software_engineer", name: "Software Engineer" },
  { key: "designer", name: "Designer" },
  { key: "marketing_specialist", name: "Marketing Specialist" },
  { key: "sales_representative", name: "Sales Representative" },
  { key: "customer_support", name: "Customer Support" },
];

export const SelfIntroduction: React.FC<{ employeeData: any; updateEmployeeData: (data: any) => void }> = ({ employeeData, updateEmployeeData }) => {
  const [introData, setIntroData] = React.useState({
    name: employeeData.name || "",
    role: employeeData.role || "",
    funFact: "",
    excitement: "",
  });

  const handleChange = (key: string, value: string) => {
    setIntroData(prev => ({ ...prev, [key]: value }));
  };

  const handleShare = () => {
    updateEmployeeData({ introduction: introData });
    alert("Your introduction has been shared!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Introduce Yourself</h2>
      <Input
        label="Name"
        value={introData.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <Dropdown>
        <DropdownTrigger>
          <Button 
            variant="bordered" 
            className="w-full justify-start"
            endContent={<Icon icon="lucide:chevron-down" />}
          >
            {introData.role || "Select your role"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu 
          aria-label="Role selection"
          onAction={(key) => handleChange("role", roleOptions.find(r => r.key === key)?.name || "")}
        >
          {roleOptions.map((role) => (
            <DropdownItem key={role.key}>
              {role.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <Input
        label="Fun Fact"
        placeholder="Share something interesting about yourself"
        value={introData.funFact}
        onChange={(e) => handleChange("funFact", e.target.value)}
      />
      <Textarea
        label="What are you excited about in your new role?"
        value={introData.excitement}
        onChange={(e) => handleChange("excitement", e.target.value)}
      />
      <Button color="primary" onPress={handleShare}>
        <Icon icon="lucide:share" className="mr-2" />
        Share Introduction
      </Button>
    </div>
  );
};