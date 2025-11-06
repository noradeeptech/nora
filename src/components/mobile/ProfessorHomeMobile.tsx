import { useState } from 'react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Plus, ExternalLink, Users } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { MobileNav } from './MobileNav';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { motion } from 'motion/react';

interface ProfessorHomeMobileProps {
  onNavigate: (page: string, projectId?: string) => void;
  userProfile: {
    name: string;
    university: string;
    photo?: string;
    lattesUrl?: string;
    linkedinUrl?: string;
  };
}

const mockProjects = [
  {
    id: '1',
    title: 'Cardiovascular Disease Research',
    candidates: 8,
    description: 'Study on heart disease risk factors',
  },
  {
    id: '2',
    title: 'Neuroscience and Neuroplasticity',
    candidates: 5,
    description: 'Research on brain plasticity',
  },
  {
    id: '3',
    title: 'Pediatric Health Outcomes',
    candidates: 3,
    description: 'Analysis of treatment outcomes',
  },
];

export function ProfessorHomeMobile({ onNavigate, userProfile }: ProfessorHomeMobileProps) {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 px-4 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl text-gray-900">Hello,</h1>
            <p className="text-lg text-[#7C3AED]">Dr. {userProfile.name.split(' ').pop()}</p>
          </div>
          <div className="flex items-center gap-2">
            {userProfile.lattesUrl && (
              <button
                className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
                onClick={() => window.open(userProfile.lattesUrl, '_blank')}
              >
                <ExternalLink className="w-4 h-4 text-gray-600" />
              </button>
            )}
            <Avatar className="w-10 h-10">
              {userProfile.photo ? (
                <AvatarImage src={userProfile.photo} alt={userProfile.name} />
              ) : (
                <AvatarFallback className="bg-[#7C3AED] text-white">
                  {userProfile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
        </div>

        {/* New Project Button */}
        <Button 
          className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl h-11"
          onClick={() => onNavigate('apply-form')}
        >
          <Plus className="w-5 h-5 mr-2" />
          New Project
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="w-full grid grid-cols-2 p-1 mx-4 mt-4 bg-gray-100 rounded-xl">
          <TabsTrigger value="projects" className="rounded-lg data-[state=active]:bg-white">
            My Projects
          </TabsTrigger>
          <TabsTrigger value="messages" className="rounded-lg data-[state=active]:bg-white">
            Messages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="px-4 py-4 space-y-4">
          {mockProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border border-gray-200 shadow-sm rounded-xl">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg text-gray-900 mb-1">{project.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Users className="w-4 h-4" />
                        <span>{project.candidates} candidates</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5 ml-2">
                      <button
                        className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
                        onClick={() => window.open(userProfile.lattesUrl, '_blank')}
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                      <button
                        className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
                        onClick={() => window.open(userProfile.linkedinUrl, '_blank')}
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl mt-3"
                    onClick={() => onNavigate('candidate-management', project.id)}
                  >
                    Manage
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="messages" className="px-4 py-4">
          <div className="text-center text-gray-500 py-12">
            <p>No messages yet</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Bottom Navigation */}
      <MobileNav active={activeTab} onNavigate={setActiveTab} userType="professor" />
    </div>
  );
}
