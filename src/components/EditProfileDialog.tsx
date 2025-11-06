import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Upload } from 'lucide-react';

interface UserProfile {
  name: string;
  university: string;
  photo?: string;
  presentation?: string;
  academicHistory?: string;
  lattesUrl?: string;
  linkedinUrl?: string;
}

interface EditProfileDialogProps {
  open: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
}

export function EditProfileDialog({ open, onClose, profile, onSave }: EditProfileDialogProps) {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [photoPreview, setPhotoPreview] = useState(profile.photo || '');

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        setFormData({ ...formData, photo: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload */}
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24">
              {photoPreview ? (
                <AvatarImage src={photoPreview} alt="Profile" />
              ) : (
                <AvatarFallback className="bg-gray-300">
                  {formData.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              )}
            </Avatar>
            
            <Label htmlFor="photo-upload" className="cursor-pointer">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md">
                <Upload className="w-4 h-4" />
                <span>Carregar Foto</span>
              </div>
              <Input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </Label>
          </div>

          {/* Name */}
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* University */}
          <div>
            <Label htmlFor="university">Instituição</Label>
            <Input
              id="university"
              value={formData.university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
              required
            />
          </div>

          {/* Lattes URL */}
          <div>
            <Label htmlFor="lattes">Link do Lattes</Label>
            <Input
              id="lattes"
              type="url"
              placeholder="http://lattes.cnpq.br/..."
              value={formData.lattesUrl || ''}
              onChange={(e) => setFormData({ ...formData, lattesUrl: e.target.value })}
            />
          </div>

          {/* LinkedIn URL */}
          <div>
            <Label htmlFor="linkedin">Link do LinkedIn</Label>
            <Input
              id="linkedin"
              type="url"
              placeholder="https://linkedin.com/in/..."
              value={formData.linkedinUrl || ''}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
            />
          </div>

          {/* Presentation */}
          <div>
            <Label htmlFor="presentation">Apresentação</Label>
            <Textarea
              id="presentation"
              rows={4}
              placeholder="Conte um pouco sobre você, seus interesses e objetivos..."
              value={formData.presentation || ''}
              onChange={(e) => setFormData({ ...formData, presentation: e.target.value })}
            />
          </div>

          {/* Academic History */}
          <div>
            <Label htmlFor="academic-history">Histórico Acadêmico</Label>
            <Textarea
              id="academic-history"
              rows={6}
              placeholder="Descreva sua formação acadêmica, cursos, experiências..."
              value={formData.academicHistory || ''}
              onChange={(e) => setFormData({ ...formData, academicHistory: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
