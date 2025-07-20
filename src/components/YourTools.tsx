import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Button, Badge, Progress, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea, Select, SelectItem } from "@heroui/react";
import { Icon } from "@iconify/react";

interface Tool {
  id: string;
  name: string;
  category: string;
  status: 'completed' | 'in-progress' | 'not-started' | 'required';
  progress: number;
  description: string;
  trainingUrl?: string;
  credentials?: {
    username?: string;
    email?: string;
    accessLevel: string;
    lastUpdated: string;
  };
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const YourTools: React.FC = () => {
  console.log('YourTools component is being rendered!');
  
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  
  // Always start with sales role since localStorage is cleared on refresh
  const [userRole, setUserRole] = useState<'sales' | 'design' | 'engineering' | 'marketing' | 'hr' | 'operations'>('sales');

  // Load user role from localStorage or default to sales
  useEffect(() => {
    const savedRole = localStorage.getItem('onboarding_role') || 
                     localStorage.getItem('user_role') || 
                     localStorage.getItem('role') || 
                     localStorage.getItem('selected_role') || 
                     'sales';
    setUserRole(savedRole as any);
  }, []);

  // Debug logging
  useEffect(() => {
    console.log('=== YOURTOOLS COMPONENT DEBUG ===');
    console.log('YourTools component mounted with role:', userRole);
    console.log('All localStorage keys:', Object.keys(localStorage));
    console.log('onboarding_role value:', localStorage.getItem('onboarding_role'));
    
    // Check for other possible role keys
    console.log('user_role value:', localStorage.getItem('user_role'));
    console.log('role value:', localStorage.getItem('role'));
    console.log('selected_role value:', localStorage.getItem('selected_role'));
    console.log('================================');
  }, [userRole]);

  const tools: Tool[] = [
    {
      id: '1',
      name: 'ClickUp',
      category: 'Project Management',
      status: 'completed',
      progress: 100,
      description: 'All-in-one project management platform for tasks, docs, goals, and team collaboration.',
      trainingUrl: 'https://help.clickup.com/',
      credentials: {
        username: 'john.doe',
        email: 'john.doe@tossdown.com',
        accessLevel: 'Admin',
        lastUpdated: '2024-01-15'
      },
      estimatedTime: '2 hours',
      difficulty: 'intermediate'
    },
    {
      id: '2',
      name: 'Metrixmate',
      category: 'Analytics',
      status: 'in-progress',
      progress: 65,
      description: 'Advanced analytics and reporting platform for tracking business metrics and KPIs.',
      trainingUrl: 'https://metrixmate.com/docs',
      credentials: {
        username: 'john.doe',
        email: 'john.doe@tossdown.com',
        accessLevel: 'Analyst',
        lastUpdated: '2024-01-10'
      },
      estimatedTime: '3 hours',
      difficulty: 'advanced'
    },
    {
      id: '3',
      name: 'Bizz',
      category: 'Business Tools',
      status: 'completed',
      progress: 100,
      description: 'Internal business management platform for operations and workflow automation.',
      trainingUrl: 'https://bizz.tossdown.com/docs',
      credentials: {
        username: 'john.doe',
        email: 'john.doe@tossdown.com',
        accessLevel: 'User',
        lastUpdated: '2024-01-05'
      },
      estimatedTime: '1.5 hours',
      difficulty: 'beginner'
    },
    {
      id: '4',
      name: 'Figma',
      category: 'Design',
      status: 'required',
      progress: 0,
      description: 'Design and prototyping tool for UI/UX collaboration and visual design.',
      trainingUrl: 'https://help.figma.com/',
      credentials: {
        username: 'john.doe',
        email: 'john.doe@tossdown.com',
        accessLevel: 'Editor',
        lastUpdated: '2024-01-18'
      },
      estimatedTime: '2.5 hours',
      difficulty: 'intermediate'
    },
    {
      id: '5',
      name: 'Adobe Creative Suite',
      category: 'Design',
      status: 'not-started',
      progress: 0,
      description: 'Professional design software suite including Photoshop, Illustrator, and InDesign.',
      trainingUrl: 'https://helpx.adobe.com/',
      credentials: {
        username: 'john.doe',
        email: 'john.doe@tossdown.com',
        accessLevel: 'Creative Cloud',
        lastUpdated: '2024-01-20'
      },
      estimatedTime: '4 hours',
      difficulty: 'advanced'
    },
    {
      id: '6',
      name: 'Canva',
      category: 'Design',
      status: 'completed',
      progress: 100,
      description: 'Easy-to-use graphic design platform for creating social media graphics and presentations.',
      trainingUrl: 'https://www.canva.com/help/',
      credentials: {
        username: 'john.doe',
        email: 'john.doe@tossdown.com',
        accessLevel: 'Pro',
        lastUpdated: '2024-01-12'
      },
      estimatedTime: '1 hour',
      difficulty: 'beginner'
    },
    {
      id: '7',
      name: 'CapCut',
      category: 'Video Editing',
      status: 'not-started',
      progress: 0,
      description: 'Professional video editing software for creating engaging social media content.',
      trainingUrl: 'https://www.capcut.com/help',
      credentials: {
        username: 'john.doe',
        email: 'john.doe@tossdown.com',
        accessLevel: 'Pro',
        lastUpdated: '2024-01-22'
      },
      estimatedTime: '3 hours',
      difficulty: 'intermediate'
    },
    {
      id: '8',
      name: 'Midjourney',
      category: 'AI Design',
      status: 'not-started',
      progress: 0,
      description: 'AI-powered image generation tool for creating unique visuals and artwork.',
      trainingUrl: 'https://docs.midjourney.com/',
      credentials: {
        username: 'john.doe',
        email: 'john.doe@tossdown.com',
        accessLevel: 'Standard',
        lastUpdated: '2024-01-25'
      },
      estimatedTime: '2 hours',
      difficulty: 'intermediate'
    },
    {
      id: '9',
      name: 'Augment',
      category: 'AI Tools',
      status: 'in-progress',
      progress: 40,
      description: 'AI-powered content creation and optimization platform for marketing materials.',
      trainingUrl: 'https://augment.ai/docs',
      credentials: {
        username: 'john.doe',
        email: 'john.doe@tossdown.com',
        accessLevel: 'Creator',
        lastUpdated: '2024-01-28'
      },
      estimatedTime: '2.5 hours',
      difficulty: 'intermediate'
    },
    {
      id: '10',
      name: 'Google Ads Manager',
      category: 'Marketing',
      status: 'required',
      progress: 0,
      description: 'Comprehensive advertising platform for managing Google Ads campaigns and performance.',
      trainingUrl: 'https://support.google.com/google-ads/',
      credentials: {
        username: 'john.doe',
        email: 'john.doe@tossdown.com',
        accessLevel: 'Manager',
        lastUpdated: '2024-01-30'
      },
      estimatedTime: '3.5 hours',
      difficulty: 'advanced'
    },
    {
      id: '11',
      name: 'Ahrefs',
      category: 'SEO',
      status: 'not-started',
      progress: 0,
      description: 'All-in-one SEO toolset for keyword research, site audit, and competitive analysis.',
      trainingUrl: 'https://ahrefs.com/academy',
      credentials: {
        username: 'john.doe',
        email: 'john.doe@tossdown.com',
        accessLevel: 'Standard',
        lastUpdated: '2024-02-01'
      },
      estimatedTime: '4 hours',
      difficulty: 'advanced'
    },
    {
      id: '12',
      name: 'Google Search Console',
      category: 'SEO',
      status: 'completed',
      progress: 100,
      description: 'Free web service for monitoring and maintaining site presence in Google Search results.',
      trainingUrl: 'https://support.google.com/webmasters/',
      credentials: {
        username: 'john.doe',
        email: 'john.doe@tossdown.com',
        accessLevel: 'Owner',
        lastUpdated: '2024-01-15'
      },
      estimatedTime: '1.5 hours',
      difficulty: 'beginner'
    },
    {
      id: '13',
      name: 'HubSpot',
      category: 'CRM',
      status: 'not-started',
      progress: 0,
      description: 'Customer relationship management platform for sales, marketing, and customer service.',
      trainingUrl: 'https://academy.hubspot.com/',
      credentials: {
        username: 'john.doe',
        email: 'john.doe@tossdown.com',
        accessLevel: 'Sales Rep',
        lastUpdated: '2024-02-05'
      },
      estimatedTime: '3 hours',
      difficulty: 'intermediate'
    },
    {
      id: '14',
      name: 'GitHub',
      category: 'Version Control',
      status: 'completed',
      progress: 100,
      description: 'Git-based version control platform for code collaboration and project management.',
      trainingUrl: 'https://docs.github.com/',
      credentials: {
        username: 'john.doe',
        email: 'john.doe@tossdown.com',
        accessLevel: 'Developer',
        lastUpdated: '2024-01-10'
      },
      estimatedTime: '2 hours',
      difficulty: 'intermediate'
    },
    {
      id: '15',
      name: 'Bitbucket',
      category: 'Version Control',
      status: 'not-started',
      progress: 0,
      description: 'Git code hosting and collaboration platform for professional teams.',
      trainingUrl: 'https://support.atlassian.com/bitbucket-cloud/',
      credentials: {
        username: 'john.doe',
        email: 'john.doe@tossdown.com',
        accessLevel: 'Developer',
        lastUpdated: '2024-02-08'
      },
      estimatedTime: '1.5 hours',
      difficulty: 'intermediate'
    },
    {
      id: '16',
      name: 'VS Code',
      category: 'Development',
      status: 'completed',
      progress: 100,
      description: 'Lightweight but powerful source code editor with extensive plugin ecosystem.',
      trainingUrl: 'https://code.visualstudio.com/docs',
      credentials: {
        username: 'john.doe',
        email: 'john.doe@tossdown.com',
        accessLevel: 'User',
        lastUpdated: '2024-01-08'
      },
      estimatedTime: '1 hour',
      difficulty: 'beginner'
    },
    {
      id: '17',
      name: 'Notion',
      category: 'Productivity',
      status: 'not-started',
      progress: 0,
      description: 'All-in-one workspace for notes, docs, projects, and team collaboration.',
      trainingUrl: 'https://www.notion.so/help',
      credentials: {
        username: 'john.doe',
        email: 'john.doe@tossdown.com',
        accessLevel: 'Member',
        lastUpdated: '2024-02-10'
      },
      estimatedTime: '2 hours',
      difficulty: 'intermediate'
    }
  ];

  const getStatusColor = (status: Tool['status']) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'not-started': return 'default';
      case 'required': return 'danger';
      default: return 'default';
    }
  };

  const getDifficultyColor = (difficulty: Tool['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'danger';
      default: return 'default';
    }
  };

  // Role-based tool filtering
  const getToolsByRole = (role: string) => {
    const roleTools = {
      sales: ['ClickUp', 'HubSpot', 'Bizz', 'Metrixmate', 'Notion'],
      marketing: ['ClickUp', 'Bizz', 'Metrixmate', 'Google Ads Manager', 'Ahrefs', 'Google Search Console', 'Canva', 'CapCut', 'Notion'],
      design: ['ClickUp', 'Metrixmate', 'Bizz', 'Figma', 'Adobe Creative Suite', 'Canva', 'CapCut', 'Midjourney', 'Notion'],
      engineering: ['ClickUp', 'Bizz', 'Metrixmate', 'GitHub', 'Bitbucket', 'VS Code', 'Notion'],
      hr: ['ClickUp', 'Bizz', 'Metrixmate', 'Notion'],
      operations: ['ClickUp', 'Bizz', 'Metrixmate', 'Augment', 'Notion']
    };
    
    return tools.filter(tool => roleTools[role as keyof typeof roleTools]?.includes(tool.name));
  };

  const roleFilteredTools = getToolsByRole(userRole);
  
  const filteredTools = roleFilteredTools.filter(tool => {
    if (filter === 'all') return true;
    return tool.status === filter;
  });

  const completedCount = roleFilteredTools.filter(t => t.status === 'completed').length;
  const totalCount = roleFilteredTools.length;
  const completionRate = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Your Tools & Credentials</h2>
          <p className="text-gray-600">Complete your training and manage access to internal tools</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600">{completionRate}%</div>
            <div className="text-sm text-gray-500">Complete</div>
          </div>
          <Progress 
            value={completionRate} 
            className="w-32"
            color="primary"
          />
        </div>
      </div>

      {/* Role Selector */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Role:</span>
          <Select
            size="sm"
            selectedKeys={[userRole]}
            onSelectionChange={(keys) => {
              const newRole = Array.from(keys)[0] as any;
              console.log('Changing role to:', newRole);
              setUserRole(newRole);
              // Save to localStorage for persistence
              localStorage.setItem('onboarding_role', newRole);
              console.log('Role changed to:', newRole);
            }}
            className="w-40"
            classNames={{
              popoverContent: "bg-white border border-pink-200 shadow-lg z-50",
              listbox: "bg-white",
              listboxWrapper: "bg-white",
              trigger: "border border-pink-200 rounded-md hover:border-pink-300 focus:border-pink-400"
            }}
          >
            <SelectItem key="sales" className="hover:bg-pink-50 focus:bg-pink-100 data-[selected=true]:bg-pink-100 data-[selected=true]:text-pink-700">Sales</SelectItem>
            <SelectItem key="marketing" className="hover:bg-pink-50 focus:bg-pink-100 data-[selected=true]:bg-pink-100 data-[selected=true]:text-pink-700">Marketing</SelectItem>
            <SelectItem key="design" className="hover:bg-pink-50 focus:bg-pink-100 data-[selected=true]:bg-pink-100 data-[selected=true]:text-pink-700">Design</SelectItem>
            <SelectItem key="engineering" className="hover:bg-pink-50 focus:bg-pink-100 data-[selected=true]:bg-pink-100 data-[selected=true]:text-pink-700">Engineering</SelectItem>
            <SelectItem key="hr" className="hover:bg-pink-50 focus:bg-pink-100 data-[selected=true]:bg-pink-100 data-[selected=true]:text-pink-700">Human Resources</SelectItem>
            <SelectItem key="operations" className="hover:bg-pink-50 focus:bg-pink-100 data-[selected=true]:bg-pink-100 data-[selected=true]:text-pink-700">Operations</SelectItem>
          </Select>

        </div>
        
        {/* Status Filters */}
        <div className="flex flex-wrap gap-2">
          <Chip
            variant={filter === 'all' ? 'solid' : 'bordered'}
            color={filter === 'all' ? 'primary' : 'default'}
            onClick={() => setFilter('all')}
            className="cursor-pointer"
          >
            All ({roleFilteredTools.length})
          </Chip>
          <Chip
            variant={filter === 'completed' ? 'solid' : 'bordered'}
            color={filter === 'completed' ? 'success' : 'default'}
            onClick={() => setFilter('completed')}
            className="cursor-pointer"
          >
            Completed ({roleFilteredTools.filter(t => t.status === 'completed').length})
          </Chip>
          <Chip
            variant={filter === 'in-progress' ? 'solid' : 'bordered'}
            color={filter === 'in-progress' ? 'warning' : 'default'}
            onClick={() => setFilter('in-progress')}
            className="cursor-pointer"
          >
            In Progress ({roleFilteredTools.filter(t => t.status === 'in-progress').length})
          </Chip>
          <Chip
            variant={filter === 'not-started' ? 'solid' : 'bordered'}
            color={filter === 'not-started' ? 'default' : 'default'}
            onClick={() => setFilter('not-started')}
            className="cursor-pointer"
          >
            Not Started ({roleFilteredTools.filter(t => t.status === 'not-started').length})
          </Chip>
          <Chip
            variant={filter === 'required' ? 'solid' : 'bordered'}
            color={filter === 'required' ? 'danger' : 'default'}
            onClick={() => setFilter('required')}
            className="cursor-pointer"
          >
            Required ({roleFilteredTools.filter(t => t.status === 'required').length})
          </Chip>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <Card 
            key={tool.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => {
              setSelectedTool(tool);
              setIsModalOpen(true);
            }}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 truncate">{tool.name}</h3>
                  <p className="text-sm text-gray-500">{tool.category}</p>
                </div>
                <Badge 
                  color={getStatusColor(tool.status)} 
                  variant="flat"
                  className="flex-shrink-0"
                >
                  {tool.status.replace('-', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {tool.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{tool.progress}%</span>
                </div>
                <Progress 
                  value={tool.progress} 
                  size="sm"
                  color={tool.status === 'completed' ? 'success' : 'primary'}
                />
                

                
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">Difficulty</span>
                  <Chip 
                    size="sm" 
                    color={getDifficultyColor(tool.difficulty)}
                    variant="flat"
                  >
                    {tool.difficulty}
                  </Chip>
                </div>
              </div>

              {tool.credentials && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Icon icon="lucide:key" className="w-4 h-4" />
                    <span>Access: {tool.credentials.accessLevel}</span>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Tool Details Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="2xl">
        <ModalContent>
          {selectedTool && (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center space-x-3">
                  <Icon icon="lucide:tool" className="text-2xl text-pink-600" />
                  <span>{selectedTool.name}</span>
                </div>
                <p className="text-sm text-gray-500">{selectedTool.category}</p>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-6">
                  {/* Status and Progress */}
                  <div className="flex items-center justify-between">
                    <Badge color={getStatusColor(selectedTool.status)} variant="flat" size="lg">
                      {selectedTool.status.replace('-', ' ')}
                    </Badge>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Progress</div>
                      <div className="text-lg font-semibold">{selectedTool.progress}%</div>
                    </div>
                  </div>
                  
                  <Progress 
                    value={selectedTool.progress} 
                    color={selectedTool.status === 'completed' ? 'success' : 'primary'}
                    className="w-full"
                  />

                  {/* Description */}
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-gray-600">{selectedTool.description}</p>
                  </div>

                  {/* Training Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Training Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Difficulty:</span>
                          <Chip 
                            size="sm" 
                            color={getDifficultyColor(selectedTool.difficulty)}
                            variant="flat"
                          >
                            {selectedTool.difficulty}
                          </Chip>
                        </div>
                      </div>
                    </div>

                    {/* Credentials */}
                    {selectedTool.credentials && (
                      <div>
                        <h4 className="font-semibold mb-2">Your Access</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Username:</span>
                            <span className="font-medium">{selectedTool.credentials.username}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Email:</span>
                            <span className="font-medium">{selectedTool.credentials.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Access Level:</span>
                            <span className="font-medium">{selectedTool.credentials.accessLevel}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Last Updated:</span>
                            <span className="font-medium">{selectedTool.credentials.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {selectedTool.trainingUrl && (
                      <Button 
                        color="primary" 
                        variant="solid"
                        startContent={<Icon icon="lucide:play" />}
                        className="flex-1"
                        as="a"
                        href={selectedTool.trainingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Start Training
                      </Button>
                    )}
                    <Button 
                      color="secondary" 
                      variant="bordered"
                      startContent={<Icon icon="lucide:external-link" />}
                      className="flex-1"
                    >
                      Access Tool
                    </Button>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => setIsModalOpen(false)}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}; 