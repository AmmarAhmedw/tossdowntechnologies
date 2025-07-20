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
    <div className="space-y-4">
      <Input
        label="Meeting Title"
        placeholder="Enter meeting title"
        defaultValue={milestone ? `${milestone.title} - Review Meeting` : ""}
        variant="bordered"
      />
      <Select
        label="Team Member"
        placeholder="Select a team member"
        variant="bordered"
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
      />
      <Select
        label="Time Slot"
        placeholder="Select a time slot"
        variant="bordered"
      >
        {timeSlots.map((slot) => (
          <SelectItem key={slot}>{slot}</SelectItem>
        ))}
      </Select>
      <Textarea
        label="Meeting Agenda"
        placeholder="Enter the meeting agenda or topics to discuss"
        variant="bordered"
      />
    </div>
  );
};