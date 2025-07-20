import React from "react";
import { Card, Chip, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";

const initialItems = [
  { id: 1, name: "Laptop", status: "Delivered", icon: "lucide:laptop" },
  { id: 2, name: "Email Account", status: "Active", icon: "lucide:mail" },
  { id: 3, name: "VPN Access", status: "Pending", icon: "lucide:shield" },
  { id: 4, name: "Software Licenses", status: "In Progress", icon: "lucide:package" },
];

const statusOrder = ["Pending", "In Progress", "Active", "Delivered"];

export const ITProvisioning: React.FC = () => {
  const [itItems, setItItems] = React.useState(initialItems);

  const handleStatusChange = (id: number) => {
    setItItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const currentIndex = statusOrder.indexOf(item.status);
          const nextIndex = (currentIndex + 1) % statusOrder.length;
          return { ...item, status: statusOrder[nextIndex] };
        }
        return item;
      })
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">IT Provisioning Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {itItems.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Icon icon={item.icon} className="text-2xl text-primary" />
                <span className="font-medium">{item.name}</span>
              </div>
              <Tooltip content="Click to change status">
                <Chip
                  className="cursor-pointer transition-all hover:opacity-80"
                  color={
                    item.status === "Delivered" || item.status === "Active"
                      ? "success"
                      : item.status === "Pending"
                      ? "warning"
                      : "primary"
                  }
                  onClick={() => handleStatusChange(item.id)}
                >
                  {item.status}
                </Chip>
              </Tooltip>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};