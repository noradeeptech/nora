import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface CreateProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (project: {
    title: string;
    description: string;
    requirements: string;
    duration: string;
    availability: 'institution-only' | 'all-students';
  }) => void;
  userInstitution: string;
}

export function CreateProjectDialog({ open, onClose, onSave, userInstitution }: CreateProjectDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    duration: '',
    availability: 'institution-only' as 'institution-only' | 'all-students',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    // Reset form
    setFormData({
      title: '',
      description: '',
      requirements: '',
      duration: '',
      availability: 'institution-only',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Novo Projeto</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title">Título do Projeto</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Pesquisa em Cardiologia Preventiva"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva o objetivo e escopo do projeto..."
              required
            />
          </div>

          {/* Requirements */}
          <div>
            <Label htmlFor="requirements">Requisitos</Label>
            <Textarea
              id="requirements"
              rows={3}
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              placeholder="Liste os requisitos necessários para participar..."
              required
            />
          </div>

          {/* Duration */}
          <div>
            <Label htmlFor="duration">Duração Estimada</Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="Ex: 6 meses, 1 ano"
              required
            />
          </div>

          {/* Availability Section */}
          <div className="border-t border-gray-200 pt-6">
            <Label className="mb-4 block">Disponibilidade do Projeto</Label>
            <p className="text-sm text-gray-500 mb-4">Institution Filter</p>
            <RadioGroup
              value={formData.availability}
              onValueChange={(value: 'institution-only' | 'all-students') =>
                setFormData({ ...formData, availability: value })
              }
            >
              <div className="flex items-start space-x-3 mb-4">
                <RadioGroupItem value="institution-only" id="institution-only" />
                <div className="flex-1">
                  <Label htmlFor="institution-only" className="cursor-pointer">
                    Apenas para alunos da minha instituição
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Este projeto será visível apenas para estudantes de {userInstitution}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <RadioGroupItem value="all-students" id="all-students" />
                <div className="flex-1">
                  <Label htmlFor="all-students" className="cursor-pointer">
                    Aberto para alunos de outras instituições
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Este projeto estará disponível no feed geral para todos os estudantes
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#7C3AED] hover:bg-[#6D28D9]">
              Criar Projeto
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}