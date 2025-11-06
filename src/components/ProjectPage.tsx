import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Bell, ExternalLink, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import logoNora from 'figma:asset/68f3d69a803926650811221098a38d09fd1c2dc0.png';

interface ProjectPageProps {
  onNavigate: (page: string, projectId?: string, professorName?: string) => void;
  projectId?: string;
  userType: 'student' | 'professor' | null;
}

const mockProject = {
  id: '1',
  title: 'Cardiovascular Disease Research',
  institution: 'USP',
  researchArea: 'Cardiology',
  description: 'This comprehensive research project aims to investigate the various risk factors associated with cardiovascular diseases in urban populations. The study will involve data collection, patient interviews, clinical observations, and statistical analysis. Participants will gain hands-on experience with research methodologies, data analysis tools, and academic writing. The project is expected to span 12 months and may result in publishable findings in peer-reviewed journals.',
  requirements: {
    course: 'Medicine',
    semester: '7th semester or above',
    languages: 'Portuguese, English (reading scientific papers)',
    skills: 'Basic statistics, Research methodology',
    workload: '10 hours/week',
    mode: 'In-person',
  },
  professor: {
    name: 'Prof. João Silva',
    university: 'USP - Cardiology',
    researchArea: 'Cardiovascular Medicine',
    avatar: '',
    lattesUrl: 'http://lattes.cnpq.br/1234567890',
    linkedinUrl: 'https://linkedin.com/in/joaosilva',
  },
};

const mockCandidates = [
  { id: 1, name: 'Ana Costa', status: 'Pending', course: 'Medicine - 8th semester' },
  { id: 2, name: 'Pedro Santos', status: 'Approved', course: 'Medicine - 9th semester' },
  { id: 3, name: 'Maria Lima', status: 'Pending', course: 'Medicine - 7th semester' },
];

export function ProjectPage({ onNavigate, projectId, userType }: ProjectPageProps) {
  const handleViewProfile = () => {
    onNavigate('profile', undefined, mockProject.professor.name);
  };

  const handleBack = () => {
    onNavigate(userType === 'student' ? 'student' : 'professor');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <img 
                src={logoNora}
                alt="Nora"
                className="h-8"
              />
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Project Header */}
          <div>
            <h1 className="text-3xl text-gray-900 mb-2">{mockProject.title}</h1>
            <p className="text-lg text-gray-600">
              {mockProject.institution} – {mockProject.researchArea}
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              {/* Description Section */}
              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  <h2 className="text-xl text-gray-900 mb-3">Description</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {mockProject.description}
                  </p>
                </CardContent>
              </Card>

              {/* Requirements Section */}
              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  <h2 className="text-xl text-gray-900 mb-4">Requirements</h2>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">Course:</span>
                        <p className="text-gray-900">{mockProject.requirements.course}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Semester:</span>
                        <p className="text-gray-900">{mockProject.requirements.semester}</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Languages:</span>
                      <p className="text-gray-900">{mockProject.requirements.languages}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Required Skills:</span>
                      <p className="text-gray-900">{mockProject.requirements.skills}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">Workload:</span>
                        <p className="text-gray-900">{mockProject.requirements.workload}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Mode:</span>
                        <p className="text-gray-900">{mockProject.requirements.mode}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Candidates Section (Professor View Only) */}
              {userType === 'professor' && (
                <Card className="border border-gray-200">
                  <CardContent className="p-6">
                    <h2 className="text-xl text-gray-900 mb-4">Candidates ({mockCandidates.length})</h2>
                    <div className="space-y-3">
                      {mockCandidates.map((candidate) => (
                        <div key={candidate.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-gray-300">
                                {candidate.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-gray-900">{candidate.name}</div>
                              <div className="text-sm text-gray-600">{candidate.course}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={candidate.status === 'Approved' ? 'default' : 'secondary'}>
                              {candidate.status}
                            </Badge>
                            {candidate.status === 'Pending' && (
                              <>
                                <Button size="sm" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
                                  Approve
                                </Button>
                                <Button size="sm" variant="outline">
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Professor Information Card */}
            <div className="col-span-1">
              <Card className="border border-gray-200 sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-lg text-gray-900 mb-4">Professor</h3>
                  <div className="flex flex-col items-center text-center mb-4">
                    <Avatar className="w-20 h-20 mb-3 cursor-pointer" onClick={handleViewProfile}>
                      {mockProject.professor.avatar ? (
                        <AvatarImage src={mockProject.professor.avatar} alt={mockProject.professor.name} />
                      ) : (
                        <AvatarFallback className="bg-[#7C3AED] text-white text-xl">
                          {mockProject.professor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <h4 className="text-gray-900 cursor-pointer hover:text-[#7C3AED]" onClick={handleViewProfile}>
                      {mockProject.professor.name}
                    </h4>
                    <p className="text-sm text-gray-600">{mockProject.professor.university}</p>
                    <p className="text-sm text-gray-500 mt-1">{mockProject.professor.researchArea}</p>
                  </div>

                  <div className="space-y-2">
                    {mockProject.professor.lattesUrl && (
                      <Button
                        variant="outline"
                        className="w-full border-gray-300"
                        onClick={() => window.open(mockProject.professor.lattesUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Lattes
                      </Button>
                    )}
                    {mockProject.professor.linkedinUrl && (
                      <Button
                        variant="outline"
                        className="w-full border-gray-300"
                        onClick={() => window.open(mockProject.professor.linkedinUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                    )}
                  </div>

                  {userType === 'student' && (
                    <Button className="w-full mt-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
                      Apply Now
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}