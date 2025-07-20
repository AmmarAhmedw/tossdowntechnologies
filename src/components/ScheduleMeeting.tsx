import React from "react";
import { Input, Select, SelectItem, Textarea } from "@heroui/react";
import { Icon } from "@iconify/react";

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
];

export const ScheduleMeeting: React.FC = ({ milestone }) => {
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
        <SelectItem key="alice" value="Alice Johnson">Alice Johnson (HR Manager)</SelectItem>
        <SelectItem key="bob" value="Bob Smith">Bob Smith (Team Lead)</SelectItem>
        <SelectItem key="carol" value="Carol Williams">Carol Williams (Senior Developer)</SelectItem>
        <SelectItem key="david" value="David Brown">David Brown (Product Manager)</SelectItem>
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
          <SelectItem key={slot} value={slot}>{slot}</SelectItem>
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