import React from "react";
import { Input, Textarea, Button, Select, SelectItem } from "@heroui/react";
import { Icon } from "@iconify/react";

const roleOptions = [
  { key: "software_engineer", name: "Software Engineer" },
  { key: "designer", name: "Designer" },
  { key: "marketing_specialist", name: "Marketing Specialist" },
  { key: "sales_representative", name: "Sales Representative" },
  { key: "customer_support", name: "Customer Support" },
  { key: "sales_engineer", name: "Sales Engineer" },
];

export const SelfIntroduction: React.FC<{ employeeData: any; updateEmployeeData: (data: any) => void }> = ({ employeeData, updateEmployeeData }) => {
  const [introData, setIntroData] = React.useState({
    name: employeeData.name || "",
    role: employeeData.role || "",
    funFact: "",
    excitement: "",
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleChange = (key: string, value: string) => {
    setIntroData(prev => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!introData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!introData.role) {
      newErrors.role = "Please select your role";
    }
    
    if (!introData.funFact.trim()) {
      newErrors.funFact = "Please share a fun fact about yourself";
    }
    
    if (!introData.excitement.trim()) {
      newErrors.excitement = "Please share what excites you about your new role";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShare = () => {
    if (validateForm()) {
      updateEmployeeData({ introduction: introData });
      alert("Your introduction has been shared!");
    }
  };

  // Find the role key based on the role name
  const getRoleKey = (roleName: string) => {
    const role = roleOptions.find(r => r.name === roleName);
    return role ? role.key : "";
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-2xl font-semibold mb-8 text-center text-gray-900">Introduce Yourself</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Icon icon="lucide:user" className="w-4 h-4" />
            Name
          </label>
          <Input
            placeholder="Enter your full name"
            value={introData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            isInvalid={!!errors.name}
            errorMessage={errors.name}
            variant="bordered"
            size="lg"
            classNames={{
              input: "border-gray-300 focus:border-blue-500",
              inputWrapper: "border-gray-300 focus:border-blue-500 bg-white",
            }}
          />
        </div>

        <div className="space-y-2 relative">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Icon icon="lucide:briefcase" className="w-4 h-4" />
            Role
          </label>
          <Select
            placeholder="Select your role"
            selectedKeys={introData.role ? [getRoleKey(introData.role)] : []}
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string;
              const selectedRole = roleOptions.find(r => r.key === selectedKey);
              if (selectedRole) {
                handleChange("role", selectedRole.name);
              }
            }}
            isInvalid={!!errors.role}
            errorMessage={errors.role}
            variant="bordered"
            size="lg"
            classNames={{
              trigger: "border-gray-300 focus:border-blue-500 bg-white min-h-[48px]",
              value: "text-gray-900",
              popoverContent: "w-full min-w-[300px]",
            }}
            popoverProps={{
              placement: "bottom-start",
              classNames: {
                content: "w-full min-w-[300px] bg-white border border-gray-200 rounded-lg shadow-lg z-50",
                base: "z-50",
              },
              backdrop: "transparent"
            }}
          >
            {roleOptions.map((role) => (
              <SelectItem key={role.key} className="py-3 hover:bg-gray-50">
                {role.name}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Icon icon="lucide:sparkles" className="w-4 h-4" />
            Fun Fact
          </label>
          <Textarea
            placeholder="Share something interesting about yourself"
            value={introData.funFact}
            onChange={(e) => handleChange("funFact", e.target.value)}
            isInvalid={!!errors.funFact}
            errorMessage={errors.funFact}
            variant="bordered"
            size="lg"
            minRows={3}
            maxRows={5}
            classNames={{
              input: "border-gray-300 focus:border-blue-500",
              inputWrapper: "border-gray-300 focus:border-blue-500 bg-white",
            }}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Icon icon="lucide:heart" className="w-4 h-4" />
            What are you excited about in your new role?
          </label>
          <Textarea
            placeholder="Tell us what motivates and excites you about joining the team"
            value={introData.excitement}
            onChange={(e) => handleChange("excitement", e.target.value)}
            isInvalid={!!errors.excitement}
            errorMessage={errors.excitement}
            variant="bordered"
            size="lg"
            minRows={4}
            maxRows={6}
            classNames={{
              input: "border-gray-300 focus:border-blue-500",
              inputWrapper: "border-gray-300 focus:border-blue-500 bg-white",
            }}
          />
        </div>
      </div>
    </div>
  );
};