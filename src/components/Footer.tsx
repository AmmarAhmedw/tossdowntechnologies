import React from "react";
import { Link } from "@heroui/react";
import { Icon } from "@iconify/react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-default-200 py-6 px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Icon icon="logos:tossdown" className="text-2xl mr-2" />
          <span className="text-default-600">&copy; 2023 Tossdown. All rights reserved.</span>
        </div>
        <nav className="flex gap-4">
          <Link href="#" size="sm" color="foreground">Privacy Policy</Link>
          <Link href="#" size="sm" color="foreground">Terms of Service</Link>
          <Link href="#" size="sm" color="foreground">Contact Us</Link>
        </nav>
      </div>
    </footer>
  );
};