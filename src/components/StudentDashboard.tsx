import { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Bell, Search, ExternalLink } from 'lucide-react';
import { EditProfileDialog } from './EditProfileDialog';
import { ProjectCard, Project } from './ProjectCard';
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

interface StudentDashboardProps {
  onNavigate: (page: string, projectId?: string) => void;
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Pesquisa em Doenças Cardiovasculares',
    description: 'Estudo sobre fatores de risco de doenças cardíacas em populações urbanas',
    professor: {
      name: 'Prof. João Silva',
      university: 'USP - Cardiologia',
      avatar: '',
    },
    requirements: '7º semestre ou superior',
    availability: 'institution-only',
    professorInstitution: 'USP - Cardiologia',
  },
  {
    id: '2',
    title: 'Neurociência e Neuroplasticidade',
    description: 'Pesquisa sobre plasticidade cerebral e funções cognitivas',
    professor: {
      name: 'Prof. Maria Santos',
      university: 'UNICAMP - Neurologia',
      avatar: '',
    },
    requirements: '6º semestre ou superior',
    availability: 'all-students',
    professorInstitution: 'UNICAMP - Neurologia',
  },
  {
    id: '3',
    title: 'Resultados de Saúde Pediátrica',
    description: 'Análise de resultados de tratamentos em cuidados pediátricos',
    professor: {
      name: 'Prof. Carlos Lima',
      university: 'UFRJ - Pediatria',
      avatar: '',
    },
    requirements: '8º semestre ou superior',
    availability: 'all-students',
    professorInstitution: 'UFRJ - Pediatria',
  },
  {
    id: '4',
    title: 'Estudos Avançados em Bioquímica',
    description: 'Pesquisa sobre interações moleculares em processos celulares',
    professor: {
      name: 'Prof. Ana Costa',
      university: 'USP - Cardiologia',
      avatar: '',
    },
    requirements: '5º semestre ou superior',
    availability: 'institution-only',
    professorInstitution: 'USP - Cardiologia',
  },
];

export function StudentDashboard({ onNavigate, userProfile, onUpdateProfile }: StudentDashboardProps) {
  const [filters, setFilters] = useState({
    area: '',
    instituicao: '',
    modalidade: '',
  });
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return mockProjects.filter(project => {
      // Filter by availability - institution-only projects only shown to same institution
      if (project.availability === 'institution-only') {
        // Extract base institution name (e.g., "USP" from "USP - Cardiologia")
        const projectInstitution = project.professorInstitution.split(' - ')[0].toLowerCase();
        const studentInstitution = userProfile.university.split(' - ')[0].toLowerCase();
        
        if (!projectInstitution.includes(studentInstitution) && !studentInstitution.includes(projectInstitution)) {
          return false; // Don't show institution-only projects from other institutions
        }
      }
      
      // Apply other filters
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesInstitution = filters.instituicao ? project.professorInstitution.toLowerCase().includes(filters.instituicao.toLowerCase()) : true;
      const matchesArea = filters.area ? project.description.toLowerCase().includes(filters.area.toLowerCase()) : true;
      const matchesMode = filters.modalidade ? project.availability.toLowerCase().includes(filters.modalidade.toLowerCase()) : true;
      
      return matchesSearch && matchesInstitution && matchesArea && matchesMode;
    });
  }, [searchQuery, filters, userProfile.university]);

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
            
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar projetos de pesquisa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 bg-gray-50 border-gray-200"
                />
              </div>
            </div>

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
          {/* Left Sidebar - Filters */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg text-gray-900 mb-4">Filtros</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">Instituição</label>
                  <Select value={filters.instituicao} onValueChange={(value) => setFilters({ ...filters, instituicao: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar instituição" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Faculdade Santa Marcelina (FASM)">Faculdade Santa Marcelina (FASM)</SelectItem>
                      <SelectItem value="Universidade de São Paulo (USP)">Universidade de São Paulo (USP)</SelectItem>
                      <SelectItem value="Universidade Estadual de Campinas (UNICAMP)">Universidade Estadual de Campinas (UNICAMP)</SelectItem>
                      <SelectItem value="Universidade Federal de São Paulo (UNIFESP)">Universidade Federal de São Paulo (UNIFESP)</SelectItem>
                      <SelectItem value="Pontifícia Universidade Católica de São Paulo (PUC-SP)">Pontifícia Universidade Católica de São Paulo (PUC-SP)</SelectItem>
                      <SelectItem value="Universidade Federal do Rio de Janeiro (UFRJ)">Universidade Federal do Rio de Janeiro (UFRJ)</SelectItem>
                      <SelectItem value="Universidade de Brasília (UnB)">Universidade de Brasília (UnB)</SelectItem>
                      <SelectItem value="Universidade Federal de Minas Gerais (UFMG)">Universidade Federal de Minas Gerais (UFMG)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-gray-700 mb-2 block">Área de Pesquisa</label>
                  <Select value={filters.area} onValueChange={(value) => setFilters({ ...filters, area: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar área" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cardiologia">Cardiologia</SelectItem>
                      <SelectItem value="Clínica Médica">Clínica Médica</SelectItem>
                      <SelectItem value="Dermatologia">Dermatologia</SelectItem>
                      <SelectItem value="Endocrinologia">Endocrinologia</SelectItem>
                      <SelectItem value="Gastroenterologia">Gastroenterologia</SelectItem>
                      <SelectItem value="Neurologia">Neurologia</SelectItem>
                      <SelectItem value="Psiquiatria">Psiquiatria</SelectItem>
                      <SelectItem value="Reumatologia">Reumatologia</SelectItem>
                      <SelectItem value="Cirurgia Geral">Cirurgia Geral</SelectItem>
                      <SelectItem value="Cirurgia Plástica">Cirurgia Plástica</SelectItem>
                      <SelectItem value="Neurocirurgia">Neurocirurgia</SelectItem>
                      <SelectItem value="Ortopedia e Traumatologia">Ortopedia e Traumatologia</SelectItem>
                      <SelectItem value="Ginecologia e Obstetrícia">Ginecologia e Obstetrícia</SelectItem>
                      <SelectItem value="Urologia">Urologia</SelectItem>
                      <SelectItem value="Patologia">Patologia</SelectItem>
                      <SelectItem value="Radiologia">Radiologia</SelectItem>
                      <SelectItem value="Medicina de Família e Comunidade">Medicina de Família e Comunidade</SelectItem>
                      <SelectItem value="Medicina Legal">Medicina Legal</SelectItem>
                      <SelectItem value="Geriatria">Geriatria</SelectItem>
                      <SelectItem value="Pediatria">Pediatria</SelectItem>
                      <SelectItem value="Otorrinolaringologia">Otorrinolaringologia</SelectItem>
                      <SelectItem value="Oftalmologia">Oftalmologia</SelectItem>
                      <SelectItem value="Farmacologia">Farmacologia</SelectItem>
                      <SelectItem value="Anatomia">Anatomia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-gray-700 mb-2 block">Modalidade</label>
                  <Select value={filters.modalidade} onValueChange={(value) => setFilters({ ...filters, modalidade: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar modalidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="presencial">Presencial</SelectItem>
                      <SelectItem value="remoto">Remoto</SelectItem>
                      <SelectItem value="hibrido">Híbrido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Projects */}
          <div className="col-span-6">
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onViewDetails={(projectId) => onNavigate('project', projectId)}
                  userType="student"
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar - Profile Widget */}
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
                <p className="text-sm text-gray-600">{userProfile.university}</p>
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
                  Editar Perfil
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
    </div>
  );
}