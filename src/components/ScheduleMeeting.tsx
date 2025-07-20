import React from "react";
import { Input, Select, SelectItem, Textarea } from "@heroui/react";
import { Icon } from "@iconify/react";

interface Milestone {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  date: string;
}

interface ScheduleMeetingProps {
  milestone?: Milestone;
}

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
];

export const ScheduleMeeting: React.FC<ScheduleMeetingProps> = ({ milestone }) => {
  return (
    <div className="space-y-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <Input
        label="Meeting Title"
        placeholder="Enter meeting title"
        defaultValue={milestone ? `${milestone.title} - Review Meeting` : ""}
        variant="bordered"
        classNames={{
          base: "bg-white",
          mainWrapper: "bg-white",
          input: "bg-white border-gray-300 focus:border-pink-500 text-gray-800 placeholder:text-gray-400",
          label: "text-gray-700 font-medium -mt-10",
          inputWrapper: "bg-white border-0 focus-within:border-0 shadow-sm"
        }}
      />
      <Select
        label="Team Member"
        placeholder="Select a team member"
        variant="bordered"
        classNames={{
          base: "bg-white",
          mainWrapper: "bg-white",
          trigger: "bg-white border-gray-300 focus:border-pink-500 text-gray-800",
          label: "text-gray-700 font-medium -mt-10",
          listbox: "bg-white border border-gray-200 shadow-lg"
        }}
      >
        <SelectItem key="alice">Alice Johnson (HR Manager)</SelectItem>
        <SelectItem key="bob">Bob Smith (Team Lead)</SelectItem>
        <SelectItem key="carol">Carol Williams (Senior Developer)</SelectItem>
        <SelectItem key="david">David Brown (Product Manager)</SelectItem>
      </Select>
      <Input
        label="Date"
        placeholder="Select a date"
        type="date"
        defaultValue={milestone ? milestone.date : ""}
        variant="bordered"
        classNames={{
          base: "bg-white",
          mainWrapper: "bg-white",
          input: "bg-white border-gray-300 focus:border-pink-500 text-gray-800 placeholder:text-gray-400",
          label: "text-gray-700 font-medium -mt-10",
          inputWrapper: "bg-white border-0 focus-within:border-0 shadow-sm"
        }}
      />
      <Select
        label="Time Slot"
        placeholder="Select a time slot"
        variant="bordered"
        className="mb-4"
        classNames={{
          base: "bg-white",
          mainWrapper: "bg-white",
          trigger: "bg-white border-gray-300 focus:border-pink-500 text-gray-800",
          label: "text-gray-700 font-medium -mt-10",
          listbox: "bg-white border border-gray-200 shadow-lg"
        }}
      >
        {timeSlots.map((slot) => (
          <SelectItem key={slot}>{slot}</SelectItem>
        ))}
      </Select>
      <Textarea
        label="Meeting Agenda"
        placeholder="Enter the meeting agenda or topics to discuss"
        variant="bordered"
        classNames={{
          base: "bg-white",
          mainWrapper: "bg-white",
          input: "bg-white border-gray-300 focus:border-pink-500 text-gray-800 placeholder:text-gray-400",
          label: "text-gray-700 font-medium -mt-10",
          inputWrapper: "bg-white border-0 focus-within:border-0 shadow-sm"
        }}
      />
    </div>
  );
};