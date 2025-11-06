import { useState } from 'react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { motion } from 'motion/react';

interface CandidateManagementMobileProps {
  onNavigate: (page: string) => void;
  projectId?: string;
}

const mockCandidates = [
  { 
    id: 1, 
    name: 'Ana Costa', 
    course: 'Medicine', 
    semester: '8th semester',
    status: 'pending',
    lattesUrl: 'http://lattes.cnpq.br/ana',
    linkedinUrl: 'https://linkedin.com/in/ana',
  },
  { 
    id: 2, 
    name: 'Pedro Santos', 
    course: 'Medicine', 
    semester: '9th semester',
    status: 'accepted',
    lattesUrl: 'http://lattes.cnpq.br/pedro',
    linkedinUrl: 'https://linkedin.com/in/pedro',
  },
  { 
    id: 3, 
    name: 'Maria Lima', 
    course: 'Medicine', 
    semester: '7th semester',
    status: 'pending',
    lattesUrl: 'http://lattes.cnpq.br/maria',
    linkedinUrl: 'https://linkedin.com/in/maria',
  },
  { 
    id: 4, 
    name: 'João Alves', 
    course: 'Medicine', 
    semester: '8th semester',
    status: 'rejected',
    lattesUrl: 'http://lattes.cnpq.br/joao',
    linkedinUrl: 'https://linkedin.com/in/joao',
  },
];

type CandidateStatus = 'pending' | 'accepted' | 'rejected';

export function CandidateManagementMobile({ onNavigate, projectId }: CandidateManagementMobileProps) {
  const [candidates, setCandidates] = useState(mockCandidates);

  const handleStatusChange = (id: number, newStatus: CandidateStatus) => {
    setCandidates(prev => 
      prev.map(c => c.id === id ? { ...c, status: newStatus } : c)
    );
  };

  const getStatusColor = (status: CandidateStatus) => {
    switch (status) {
      case 'accepted':
        return 'text-green-600 bg-green-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-orange-600 bg-orange-50';
    }
  };

  const getStatusLabel = (status: CandidateStatus) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="min-h-screen bg-white"
    >
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => onNavigate('professor-home')}
            className="p-2 hover:bg-gray-100 rounded-full -ml-2"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg text-gray-900">Project Candidates</h1>
        </div>
        <p className="text-sm text-gray-600 pl-1">
          {candidates.length} total candidates
        </p>
      </div>

      <div className="px-4 py-6 space-y-4 pb-8">
        {candidates.map((candidate, index) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="border border-gray-200 rounded-xl">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-[#7C3AED] text-white">
                      {candidate.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-gray-900">{candidate.name}</div>
                    <div className="text-sm text-gray-600">{candidate.course}</div>
                    <div className="text-sm text-gray-500">{candidate.semester}</div>
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-xs ${getStatusColor(candidate.status)}`}>
                    {getStatusLabel(candidate.status)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 rounded-lg"
                    onClick={() => window.open(candidate.lattesUrl, '_blank')}
                  >
                    <ExternalLink className="w-3 h-3 mr-1.5" />
                    View Lattes
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 rounded-lg"
                    onClick={() => window.open(candidate.linkedinUrl, '_blank')}
                  >
                    <ExternalLink className="w-3 h-3 mr-1.5" />
                    LinkedIn
                  </Button>
                </div>

                <div>
                  <label className="text-sm text-gray-700 mb-2 block">Status</label>
                  <Select 
                    value={candidate.status} 
                    onValueChange={(value: CandidateStatus) => handleStatusChange(candidate.id, value)}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
