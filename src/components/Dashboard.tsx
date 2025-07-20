import React, { useState, useEffect } from "react";
import { Card, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { tabService, TabItem } from "../services/tabService";
import { getComponentByName } from "../utils/componentMapper";

// Lazy load dashboard components to reduce initial bundle size
const OnboardingProgress = React.lazy(() => import("./OnboardingProgress").then(module => ({ default: module.OnboardingProgress })));
const TaskList = React.lazy(() => import("./TaskList").then(module => ({ default: module.TaskList })));
const NotificationBell = React.lazy(() => import("./NotificationBell").then(module => ({ default: module.NotificationBell })));

interface SortableTabProps {
  tab: TabItem;
  isActive: boolean;
  onClick: () => void;
  onRemove?: () => void;
}

const SortableTab: React.FC<SortableTabProps> = ({ tab, isActive, onClick, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: tab.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        isActive 
          ? "bg-pink-200 text-pink-800" 
          : "text-pink-700 hover:bg-pink-100"
      }`}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-move p-1 hover:bg-pink-200 rounded"
        title="Drag to reorder"
      >
        <Icon icon="lucide:grip-vertical" className="w-4 h-4 text-gray-400" />
      </div>
      
      {/* Clickable content */}
      <div 
        className="flex items-center space-x-2 flex-1 cursor-pointer"
        onClick={onClick}
      >
        <Icon icon={tab.icon} />
        <span>{tab.title}</span>
      </div>
      
      {/* Remove button for custom tabs */}
      {tab.isCustom && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="p-1 rounded-full hover:bg-red-100 text-red-500"
          title="Remove custom tab"
        >
          <Icon icon="lucide:x" className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const [tabs, setTabs] = useState<TabItem[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState("lucide:plus");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load tabs on component mount
  useEffect(() => {
    loadTabs();
  }, []);

  const loadTabs = async () => {
    try {
      setIsLoading(true);
      const loadedTabs = await tabService.loadTabOrder();
      console.log('Loaded tabs:', loadedTabs);
      setTabs(loadedTabs);
      
      // Always set the first tab as selected when tabs are loaded
      if (loadedTabs.length > 0) {
        console.log('Setting selected tab to:', loadedTabs[0].id);
        setSelectedTab(loadedTabs[0].id);
      }
    } catch (error) {
      console.error('Failed to load tabs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const newTabs = arrayMove(tabs, 
        tabs.findIndex((item) => item.id === active.id),
        tabs.findIndex((item) => item.id === over?.id)
      );
      
      setTabs(newTabs);
      
      // Save the new order
      try {
        setIsSaving(true);
        await tabService.updateTabOrder(newTabs);
      } catch (error) {
        console.error('Failed to save tab order:', error);
        // Optionally revert the change on error
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleAddCategory = async () => {
    if (newCategoryName.trim()) {
      try {
        setIsSaving(true);
        const newTab = await tabService.addCustomTab(newCategoryName, newCategoryIcon);
        
        // Update local state
        setTabs(prev => [...prev, newTab]);
        setSelectedTab(newTab.id);
        
        // Reset form
        setNewCategoryName("");
        setNewCategoryIcon("lucide:plus");
        setIsAddModalOpen(false);
      } catch (error) {
        console.error('Failed to add category:', error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleRemoveCustomTab = async (tabId: string) => {
    try {
      setIsSaving(true);
      await tabService.removeCustomTab(tabId);
      
      // Update local state
      const newTabs = tabs.filter(tab => tab.id !== tabId);
      setTabs(newTabs);
      
      // If the removed tab was selected, select the first available tab
      if (selectedTab === tabId && newTabs.length > 0) {
        setSelectedTab(newTabs[0].id);
      }
    } catch (error) {
      console.error('Failed to remove tab:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const selectedTabData = tabs.find(tab => tab.id === selectedTab);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-pink-gradient p-8 flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" color="primary" />
          <p className="mt-4 text-pink-700">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-gradient p-8">
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-4xl font-bold text-pink-700">Welcome to Your Tossdown Dashboard</h1>
        <React.Suspense fallback={<div className="w-8 h-8 animate-pulse bg-pink-200 rounded-full"></div>}>
          <NotificationBell />
        </React.Suspense>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Card className="col-span-2 bg-white/95 backdrop-blur-sm shadow-lg">
          <React.Suspense fallback={
            <div className="p-6 flex items-center justify-center">
              <Spinner size="lg" color="primary" />
            </div>
          }>
            <OnboardingProgress />
          </React.Suspense>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
          <React.Suspense fallback={
            <div className="p-6 flex items-center justify-center">
              <Spinner size="lg" color="primary" />
            </div>
          }>
            <TaskList />
          </React.Suspense>
        </Card>
      </div>

      <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-pink-700">Dashboard Sections</h2>
              {isSaving && (
                <div className="flex items-center space-x-2 text-sm text-pink-600">
                  <Spinner size="sm" />
                  <span>Saving...</span>
                </div>
              )}
              <Button
                size="sm"
                color="secondary"
                variant="bordered"
                onClick={() => {
                  localStorage.removeItem('tossdown_tab_order');
                  localStorage.removeItem('onboarding_role');
                  localStorage.removeItem('user_role');
                  localStorage.removeItem('role');
                  localStorage.removeItem('selected_role');
                  window.location.reload();
                }}
                className="ml-auto"
              >
                Reset Tabs
              </Button>
            </div>
            <Button
              color="primary"
              variant="flat"
              startContent={<Icon icon="lucide:plus" />}
              onClick={() => setIsAddModalOpen(true)}
              className="bg-pink-500 text-white hover:bg-pink-600"
            >
              Add Category
            </Button>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={tabs.map(tab => tab.id)} strategy={horizontalListSortingStrategy}>
              <div className="flex flex-wrap gap-2 mb-6">
                {tabs.map((tab) => (
                  <SortableTab
                    key={tab.id}
                    tab={tab}
                    isActive={selectedTab === tab.id}
                    onClick={() => {
                      console.log('Clicking tab:', tab.id);
                      console.log('Tab component:', tab.component);
                      setSelectedTab(tab.id);
                    }}
                    onRemove={tab.isCustom ? () => handleRemoveCustomTab(tab.id) : undefined}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <div className="border-t border-pink-200 pt-6">
            {selectedTabData ? (
              <div className="min-h-[400px]">
                {getComponentByName(selectedTabData.component, {
                  title: selectedTabData.title,
                  icon: selectedTabData.icon
                })}
              </div>
            ) : (
              <div className="min-h-[400px] flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Icon icon="lucide:alert-circle" className="text-4xl mx-auto mb-2" />
                  <p>No tab selected or component not found</p>
                  <p className="text-sm">Selected tab: {selectedTab}</p>
                  <p className="text-sm">Available tabs: {tabs.map(t => t.id).join(', ')}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Add New Category</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Category Name"
                placeholder="Enter category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                variant="bordered"
                color="primary"
              />
              <Input
                label="Icon (Lucide icon name)"
                placeholder="e.g., lucide:star, lucide:heart"
                value={newCategoryIcon}
                onChange={(e) => setNewCategoryIcon(e.target.value)}
                variant="bordered"
                color="primary"
                startContent={<Icon icon={newCategoryIcon} />}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              color="primary" 
              onPress={handleAddCategory}
              isDisabled={!newCategoryName.trim() || isSaving}
              isLoading={isSaving}
              className="bg-pink-500 text-white hover:bg-pink-600"
            >
              Add Category
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};