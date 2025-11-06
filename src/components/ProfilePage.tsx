import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Bell, MoreVertical, ExternalLink } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import logoNora from 'figma:asset/68f3d69a803926650811221098a38d09fd1c2dc0.png';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
  userId?: string;
}

// Mock data - em produção viria do backend
const mockUserProfile = {
  name: 'Prof. João Silva',
  university: 'USP - Cardiologia',
  photo: '',
  presentation: 'Pesquisador na área de cardiologia com foco em doenças cardiovasculares. Atuo há mais de 15 anos na área acadêmica e busco alunos motivados para participar de projetos de pesquisa inovadores.',
  academicHistory: 'Doutorado em Medicina pela USP (2010)\nMestrado em Cardiologia pela USP (2005)\nGraduação em Medicina pela USP (2002)',
  lattesUrl: 'http://lattes.cnpq.br/1234567890',
  linkedinUrl: 'https://linkedin.com/in/joaosilva',
};

export function ProfilePage({ onNavigate, userId }: ProfilePageProps) {
  const profile = mockUserProfile;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <img 
              src={logoNora}
              alt="Nora"
              className="h-8 cursor-pointer"
              onClick={() => onNavigate('landing')}
            />
            
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => onNavigate('landing')}>
                Voltar ao Início
              </Button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <Card>
          <CardContent className="p-8">
            {/* Profile Header */}
            <div className="flex items-start gap-6 mb-8">
              <Avatar className="w-24 h-24">
                {profile.photo ? (
                  <AvatarImage src={profile.photo} alt={profile.name} />
                ) : (
                  <AvatarFallback className="bg-gray-300 text-2xl">
                    {profile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                )}
              </Avatar>
              
              <div className="flex-1">
                <h2 className="text-2xl text-gray-900 mb-1">{profile.name}</h2>
                <p className="text-gray-600 mb-4">{profile.university}</p>
                
                {/* External Links */}
                {(profile.lattesUrl || profile.linkedinUrl) && (
                  <div className="flex gap-3">
                    {profile.lattesUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(profile.lattesUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Lattes
                      </Button>
                    )}
                    {profile.linkedinUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(profile.linkedinUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Presentation */}
            {profile.presentation && (
              <div className="mb-6">
                <h3 className="text-lg text-gray-900 mb-2">Apresentação</h3>
                <p className="text-gray-700 whitespace-pre-line">{profile.presentation}</p>
              </div>
            )}

            {/* Academic History */}
            {profile.academicHistory && (
              <div>
                <h3 className="text-lg text-gray-900 mb-2">Histórico Acadêmico</h3>
                <p className="text-gray-700 whitespace-pre-line">{profile.academicHistory}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6">
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
          >
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
}
