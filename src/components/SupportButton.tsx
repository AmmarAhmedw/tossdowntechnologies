import React from "react";
import { Button, Popover, PopoverTrigger, PopoverContent, Input, Textarea } from "@heroui/react";
import { Icon } from "@iconify/react";

export const SupportButton: React.FC = () => {
  return (
    <Popover placement="top-end">
      <PopoverTrigger>
        <Button
          isIconOnly
          color="primary"
          variant="shadow"
          className="fixed bottom-6 right-6 z-50"
          size="lg"
        >
          <Icon icon="lucide:help-circle" className="text-2xl" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="px-1 py-2">
          <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
          <p className="text-small text-default-500 mb-4">
            We're here to assist you with your onboarding process.
          </p>
          <form className="space-y-4">
            <Input
              label="Name"
              placeholder="Enter your name"
              variant="bordered"
            />
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              variant="bordered"
            />
            <Textarea
              label="Message"
              placeholder="How can we help you?"
              variant="bordered"
            />
            <Button color="primary" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};