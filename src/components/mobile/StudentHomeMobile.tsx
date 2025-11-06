import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Search, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { MobileNav } from './MobileNav';
import { motion } from 'motion/react';
import { Badge } from '../ui/badge';

interface StudentHomeMobileProps {
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
    professor: 'Prof. João Silva',
    institution: 'USP - Cardiology',
    description: 'Study on heart disease risk factors in urban populations',
  },
  {
    id: '2',
    title: 'Neuroscience and Neuroplasticity',
    professor: 'Prof. Maria Santos',
    institution: 'UNICAMP - Neurology',
    description: 'Research on brain plasticity and cognitive functions',
  },
  {
    id: '3',
    title: 'Pediatric Health Outcomes',
    professor: 'Prof. Carlos Lima',
    institution: 'UFRJ - Pediatrics',
    description: 'Analysis of treatment outcomes in pediatric care',
  },
];

const filters = ['All', 'FASM', 'USP', 'UNICAMP', 'UNIFESP', 'Cardiologia', 'Neurologia', 'Pediatria', 'Presencial', 'Remoto'];

export function StudentHomeMobile({ onNavigate, userProfile }: StudentHomeMobileProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedFilter, setSelectedFilter] = useState('All');

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 px-4 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl text-gray-900">Welcome,</h1>
            <p className="text-lg text-[#7C3AED]">{userProfile.name.split(' ')[0]}</p>
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

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 bg-gray-50 border-gray-200 rounded-xl"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="px-4 py-3 overflow-x-auto no-scrollbar">
        <div className="flex gap-2">
          {filters.map((filter) => (
            <Badge
              key={filter}
              variant={selectedFilter === filter ? 'default' : 'outline'}
              className={`cursor-pointer whitespace-nowrap rounded-xl px-4 py-2 ${
                selectedFilter === filter
                  ? 'bg-[#7C3AED] text-white hover:bg-[#6D28D9]'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </Badge>
          ))}
        </div>
      </div>

      {/* Project Cards */}
      <div className="px-4 py-4 space-y-4">
        {mockProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="border border-gray-200 shadow-sm rounded-xl">
              <CardContent className="p-4">
                <h3 className="text-lg text-gray-900 mb-2">{project.title}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-gray-300 text-xs">
                      {project.professor.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm text-gray-900">{project.professor}</div>
                    <div className="text-xs text-gray-600">{project.institution}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                <Button 
                  className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl"
                  onClick={() => onNavigate('project', project.id)}
                >
                  View Project
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <MobileNav active={activeTab} onNavigate={setActiveTab} userType="student" />
    </div>
  );
}
