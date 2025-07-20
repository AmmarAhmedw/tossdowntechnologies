import React, { useState } from "react";
import { Button, Popover, PopoverTrigger, PopoverContent, Badge, Chip, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: Date;
  read: boolean;
  avatar?: string;
  icon?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Welcome to Tossdown!",
    message: "Your onboarding journey has begun. Complete your profile to get started.",
    type: "info",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    icon: "lucide:rocket"
  },
  {
    id: "2",
    title: "IT Setup Complete",
    message: "Your laptop and email account have been successfully configured.",
    type: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    icon: "lucide:check-circle"
  },
  {
    id: "3",
    title: "Training Module Available",
    message: "New compliance training module is now available for completion.",
    type: "warning",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    icon: "lucide:book-open"
  },
  {
    id: "4",
    title: "Team Meeting Scheduled",
    message: "Your first team meeting has been scheduled for tomorrow at 10 AM.",
    type: "info",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    read: true,
    icon: "lucide:calendar"
  }
];

export const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "success": return "success";
      case "warning": return "warning";
      case "error": return "danger";
      default: return "primary";
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <Popover 
      isOpen={isOpen} 
      onOpenChange={setIsOpen}
      placement="bottom-end"
      showArrow={true}
      classNames={{
        content: "bg-white border border-pink-200 shadow-2xl z-[9999]"
      }}
    >
      <PopoverTrigger>
        <Button
          isIconOnly
          variant="light"
          className="relative"
          size="lg"
        >
          <Icon icon="lucide:bell" className="text-xl text-pink-700" />
          {unreadCount > 0 && (
            <Badge
              color="danger"
              size="sm"
              className="absolute -top-1 -right-1"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="p-4 border-b border-pink-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-pink-700">Notifications</h3>
            {unreadCount > 0 && (
              <Button
                size="sm"
                variant="light"
                color="primary"
                onPress={markAllAsRead}
                className="text-xs"
              >
                Mark all read
              </Button>
            )}
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <Icon icon="lucide:bell-off" className="text-3xl mx-auto mb-2" />
              <p>No notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-pink-100">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-pink-50 cursor-pointer transition-colors ${
                    !notification.read ? 'bg-pink-50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full bg-pink-100 ${
                      !notification.read ? 'ring-2 ring-pink-300' : ''
                    }`}>
                      <Icon 
                        icon={notification.icon || "lucide:info"} 
                        className={`text-lg ${
                          notification.type === 'success' ? 'text-green-600' :
                          notification.type === 'warning' ? 'text-yellow-600' :
                          notification.type === 'error' ? 'text-red-600' :
                          'text-pink-600'
                        }`}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-sm font-medium ${
                          !notification.read ? 'text-pink-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {notification.message}
                      </p>
                      {!notification.read && (
                        <div className="mt-2">
                          <Chip
                            size="sm"
                            color="primary"
                            variant="flat"
                            className="text-xs"
                          >
                            New
                          </Chip>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {notifications.length > 0 && (
          <div className="p-3 border-t border-pink-200 bg-pink-50">
            <Button
              size="sm"
              variant="light"
              color="primary"
              className="w-full text-sm"
              onPress={() => setIsOpen(false)}
            >
              View All Notifications
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}; 