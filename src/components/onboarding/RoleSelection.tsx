import React from "react";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";

const roles = [
  { id: "sales", name: "Sales", icon: "lucide:trending-up" },
  { id: "marketing", name: "Marketing", icon: "lucide:megaphone" },
  { id: "development", name: "Engineering", icon: "lucide:code" },
  { id: "design", name: "Design", icon: "lucide:pen-tool" },
  { id: "hr", name: "Human Resources", icon: "lucide:users" },
  { id: "sales_engineer", name: "Operations", icon: "lucide:settings" },
];

export const RoleSelection: React.FC<{ employeeData: any; updateEmployeeData: (data: any) => void }> = ({ employeeData, updateEmployeeData }) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-6 text-pink-700">Select Your Role</h2>
      <p className="text-gray-600 mb-8">Your onboarding journey will be tailored based on your role.</p>
      <Dropdown>
        <DropdownTrigger>
          <Button 
            color="primary"
            endContent={<Icon icon="lucide:chevron-down" />}
            className="bg-pink-500 hover:bg-pink-600 text-white"
          >
            {employeeData.role ? roles.find(r => r.id === employeeData.role)?.name : "Select Role"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu 
          aria-label="Role selection"
          onAction={(key) => updateEmployeeData({ role: key })}
          classNames={{
            base: "bg-white border border-pink-200"
          }}
        >
          {roles.map((role) => (
            <DropdownItem
              key={role.id}
              startContent={<Icon icon={role.icon} className="text-pink-500" />}
              description={`Tailored onboarding for ${role.name}`}
            >
              {role.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};