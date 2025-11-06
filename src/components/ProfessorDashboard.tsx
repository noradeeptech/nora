import { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Bell, ExternalLink, MessageSquare, FileText } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { EditProfileDialog } from './EditProfileDialog';
import { CreateProjectDialog } from './CreateProjectDialog';
import { toast } from 'sonner';
import logoNora from 'figma:asset/68f3d69a803926650811221098a38d09fd1c2dc0.png';

interface UserProfile {
  name: string;
  university: string;
  photo?: string;
  presentation?: string;
  academicHistory?: string;
  lattesUrl?: string;
  linkedinUrl?: string;
}

interface ProfessorDashboardProps {
  onNavigate: (page: string, projectId?: string) => void;
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
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

export function ProfessorDashboard({ onNavigate, userProfile, onUpdateProfile }: ProfessorDashboardProps) {
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('projects');
  const [createProjectOpen, setCreateProjectOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <img 
              src={logoNora}
              alt="Nora"
              className="h-8 cursor-pointer"
              onClick={() => onNavigate('home')}
            />

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <Avatar className="cursor-pointer" onClick={() => setEditProfileOpen(true)}>
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
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Menu */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="space-y-2">
                <button
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    selectedMenu === 'projects'
                      ? 'bg-[#7C3AED]/10 text-[#7C3AED]'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedMenu('projects')}
                >
                  <FileText className="w-5 h-5" />
                  My Projects
                </button>

                <button
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    selectedMenu === 'messages'
                      ? 'bg-[#7C3AED]/10 text-[#7C3AED]'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedMenu('messages')}
                >
                  <MessageSquare className="w-5 h-5" />
                  Messages
                </button>

                <Button className="w-full mt-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white" onClick={() => setCreateProjectOpen(true)}>
                  Create New Project
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content - Projects */}
          <div className="col-span-6">
            <div className="space-y-4">
              <h2 className="text-2xl text-gray-900 mb-6">My Research Projects</h2>
              {mockProjects.map((project) => (
                <Card key={project.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl text-gray-900 mb-2">{project.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                        <div className="text-sm text-gray-700">
                          <span className="font-medium">{project.candidates}</span> candidates
                        </div>
                      </div>
                      <Button 
                        className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white ml-4"
                        onClick={() => onNavigate('project', project.id)}
                      >
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Profile Card */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex flex-col items-center text-center mb-4">
                <Avatar className="w-20 h-20 mb-3">
                  {userProfile.photo ? (
                    <AvatarImage src={userProfile.photo} alt={userProfile.name} />
                  ) : (
                    <AvatarFallback className="bg-[#7C3AED] text-white text-xl">
                      {userProfile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <h3 className="text-lg text-gray-900">{userProfile.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{userProfile.university}</p>
                <p className="text-xs text-gray-500">Research Area</p>
              </div>

              <div className="space-y-2">
                {userProfile.lattesUrl && (
                  <Button
                    variant="outline"
                    className="w-full border-gray-300"
                    onClick={() => window.open(userProfile.lattesUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Lattes
                  </Button>
                )}
                {userProfile.linkedinUrl && (
                  <Button
                    variant="outline"
                    className="w-full border-gray-300"
                    onClick={() => window.open(userProfile.linkedinUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full border-gray-300"
                  onClick={() => setEditProfileOpen(true)}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditProfileDialog
        open={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
        profile={userProfile}
        onSave={onUpdateProfile}
      />

      <CreateProjectDialog
        open={createProjectOpen}
        onClose={() => setCreateProjectOpen(false)}
        userInstitution={userProfile.university}
        onSave={(project) => {
          toast.success('Project created successfully!');
          console.log('New project:', project);
          // Add project to mockProjects or handle as needed
        }}
      />
    </div>
  );
}