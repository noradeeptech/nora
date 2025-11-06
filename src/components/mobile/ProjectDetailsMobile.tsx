import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { motion } from 'motion/react';

interface ProjectDetailsMobileProps {
  onNavigate: (page: string, projectId?: string) => void;
  userType: 'student' | 'professor' | null;
  projectId?: string;
}

const mockProject = {
  id: '1',
  title: 'Cardiovascular Disease Research',
  institution: 'USP',
  researchArea: 'Cardiology',
  description: 'This comprehensive research project aims to investigate the various risk factors associated with cardiovascular diseases in urban populations. The study will involve data collection, patient interviews, clinical observations, and statistical analysis.',
  requirements: [
    '7th semester or above',
    'Medicine course',
    'Portuguese and English',
    'Basic statistics knowledge',
    '10 hours/week commitment',
    'In-person participation',
  ],
  professor: {
    name: 'Prof. João Silva',
    university: 'USP - Cardiology',
    researchArea: 'Cardiovascular Medicine',
    avatar: '',
    lattesUrl: 'http://lattes.cnpq.br/1234567890',
    linkedinUrl: 'https://linkedin.com/in/joaosilva',
  },
};

export function ProjectDetailsMobile({ onNavigate, userType, projectId }: ProjectDetailsMobileProps) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="min-h-screen bg-white"
    >
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 px-4 py-4 border-b border-gray-100 flex items-center gap-3">
        <button
          onClick={() => onNavigate(userType === 'student' ? 'student-home' : 'professor-home')}
          className="p-2 hover:bg-gray-100 rounded-full -ml-2"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg text-gray-900">Project Details</h1>
      </div>

      <div className="px-4 py-6 space-y-6 pb-24">
        {/* Project Header */}
        <div>
          <h2 className="text-2xl text-gray-900 mb-2">{mockProject.title}</h2>
          <p className="text-base text-gray-600">
            {mockProject.institution} – {mockProject.researchArea}
          </p>
        </div>

        {/* Description Section */}
        <Card className="border border-gray-200 rounded-xl">
          <CardContent className="p-4">
            <h3 className="text-lg text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {mockProject.description}
            </p>
          </CardContent>
        </Card>

        {/* Requirements Section */}
        <Card className="border border-gray-200 rounded-xl">
          <CardContent className="p-4">
            <h3 className="text-lg text-gray-900 mb-3">Requirements</h3>
            <ul className="space-y-2">
              {mockProject.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#7C3AED] mt-1">•</span>
                  <span className="text-gray-700 flex-1">{req}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Professor Card */}
        <Card className="border border-gray-200 rounded-xl">
          <CardContent className="p-4">
            <h3 className="text-lg text-gray-900 mb-3">Professor</h3>
            <div className="flex items-start gap-3 mb-4">
              <Avatar className="w-12 h-12">
                {mockProject.professor.avatar ? (
                  <AvatarImage src={mockProject.professor.avatar} alt={mockProject.professor.name} />
                ) : (
                  <AvatarFallback className="bg-[#7C3AED] text-white">
                    {mockProject.professor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1">
                <div className="text-gray-900">{mockProject.professor.name}</div>
                <div className="text-sm text-gray-600">{mockProject.professor.university}</div>
                <div className="text-sm text-gray-500">{mockProject.professor.researchArea}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="border-gray-300 rounded-xl"
                onClick={() => window.open(mockProject.professor.lattesUrl, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Lattes
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 rounded-xl"
                onClick={() => window.open(mockProject.professor.linkedinUrl, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        {userType === 'student' ? (
          <Button 
            className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white h-12 rounded-xl"
            onClick={() => onNavigate('apply-form', projectId)}
          >
            Apply Now
          </Button>
        ) : (
          <Button 
            variant="outline"
            className="w-full border-2 border-[#7C3AED] text-[#7C3AED] h-12 rounded-xl"
            onClick={() => onNavigate('candidate-management', projectId)}
          >
            View Candidates
          </Button>
        )}
      </div>
    </motion.div>
  );
}
