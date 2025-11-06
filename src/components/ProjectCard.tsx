import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

export interface Project {
  id: string;
  title: string;
  description: string;
  professor: {
    name: string;
    university: string;
    avatar?: string;
  };
  requirements: string;
  availability: 'institution-only' | 'all-students';
  professorInstitution: string;
}

interface ProjectCardProps {
  project: Project;
  onViewDetails: (projectId: string) => void;
  userType?: 'student' | 'professor' | null;
}

export function ProjectCard({ project, onViewDetails, userType }: ProjectCardProps) {
  const availabilityLabel = project.availability === 'institution-only'
    ? 'Restrito à instituição do professor'
    : 'Aberto a todas as universidades';
  
  const availabilityColor = project.availability === 'institution-only'
    ? 'bg-amber-100 text-amber-800 border-amber-200'
    : 'bg-green-100 text-green-800 border-green-200';

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 flex-1">
            <Avatar>
              {project.professor.avatar ? (
                <AvatarImage src={project.professor.avatar} alt={project.professor.name} />
              ) : (
                <AvatarFallback className="bg-[#7C3AED] text-white">
                  {project.professor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl text-gray-900 mb-1">{project.title}</h3>
              <p className="text-sm text-gray-600">
                {project.professor.name} • {project.professor.university}
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-700 mb-3">{project.description}</p>
        
        <div className="flex items-center justify-between gap-3 mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Requisitos:</span> {project.requirements}
          </p>
        </div>

        {/* Availability Label */}
        <div className="mb-4">
          <Badge 
            variant="outline" 
            className={`${availabilityColor} text-xs`}
          >
            {availabilityLabel}
          </Badge>
        </div>

        {userType === 'student' && (
          <Button
            className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
            onClick={() => onViewDetails(project.id)}
          >
            Ver Detalhes
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// Component specifically for same institution projects
export function ProjectCard_SameInstitution({ project, onViewDetails, userType }: ProjectCardProps) {
  if (project.availability !== 'institution-only') return null;
  
  return <ProjectCard project={project} onViewDetails={onViewDetails} userType={userType} />;
}

// Component specifically for all institutions projects
export function ProjectCard_AllInstitutions({ project, onViewDetails, userType }: ProjectCardProps) {
  if (project.availability !== 'all-students') return null;
  
  return <ProjectCard project={project} onViewDetails={onViewDetails} userType={userType} />;
}
