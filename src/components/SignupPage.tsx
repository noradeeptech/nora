import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardHeader, CardContent } from "./ui/card";
import { motion } from "motion/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import logoNora from 'figma:asset/68f3d69a803926650811221098a38d09fd1c2dc0.png';

interface SignupPageProps {
  onNavigate: (page: 'landing' | 'student' | 'professor') => void;
}

export function SignupPage({ onNavigate }: SignupPageProps) {
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    institution: '',
    course: 'Medicina',
    semester: '',
    researchArea: '',
    department: '',
    lattesUrl: '',
    linkedinUrl: '',
  });

  // Listas de opções para os dropdowns
  const faculdades = [
    "Faculdade Santa Marcelina (FASM)",
    "Universidade de São Paulo (USP)",
    "Universidade Estadual de Campinas (UNICAMP)",
    "Universidade Federal de São Paulo (UNIFESP)",
    "Pontifícia Universidade Católica de São Paulo (PUC-SP)",
    "Universidade Federal do Rio de Janeiro (UFRJ)",
    "Universidade de Brasília (UnB)",
    "Universidade Federal de Minas Gerais (UFMG)",
  ];

  const areasPesquisa = [
    "Cardiologia",
    "Clínica Médica",
    "Dermatologia",
    "Endocrinologia",
    "Gastroenterologia",
    "Neurologia",
    "Psiquiatria",
    "Reumatologia",
    "Cirurgia Geral",
    "Cirurgia Plástica",
    "Neurocirurgia",
    "Ortopedia e Traumatologia",
    "Ginecologia e Obstetrícia",
    "Urologia",
    "Patologia",
    "Radiologia",
    "Medicina de Família e Comunidade",
    "Medicina Legal",
    "Geriatria",
    "Pediatria",
    "Otorrinolaringologia",
    "Oftalmologia",
    "Farmacologia",
    "Anatomia",
  ];

  const semestres = Array.from({ length: 12 }, (_, i) => `${i + 1}º semestre`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate account creation
    console.log('Account created:', { role, ...formData });
    // Navigate to appropriate dashboard
    onNavigate(role === 'student' ? 'student' : 'professor');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-[420px] shadow-xl rounded-2xl border border-purple-200">
          <CardHeader className="text-center space-y-2">
            <img 
              src={logoNora}
              alt="Nora"
              className="h-16 mx-auto"
            />
            <p className="text-gray-600">Crie sua conta para começar</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* Escolher tipo de conta */}
              <div className="flex justify-center mb-6 space-x-3">
                <Button
                  type="button"
                  variant={role === "student" ? "default" : "outline"}
                  onClick={() => setRole("student")}
                  className={role === "student" ? "bg-[#7C3AED] hover:bg-[#6D28D9]" : ""}
                >
                  Sou Aluno
                </Button>
                <Button
                  type="button"
                  variant={role === "teacher" ? "default" : "outline"}
                  onClick={() => setRole("teacher")}
                  className={role === "teacher" ? "bg-[#7C3AED] hover:bg-[#6D28D9]" : ""}
                >
                  Sou Professor
                </Button>
              </div>

              {/* Campos de cadastro */}
              <div className="space-y-3">
                <Input
                  placeholder="Nome completo"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
                <Input
                  placeholder="E-mail institucional"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Input
                  placeholder="Senha"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <Select value={formData.institution} onValueChange={(value) => setFormData({ ...formData, institution: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione sua faculdade" />
                  </SelectTrigger>
                  <SelectContent>
                    {faculdades.map((faculdade) => (
                      <SelectItem key={faculdade} value={faculdade}>
                        {faculdade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {role === "student" && (
                  <>
                    <div className="relative">
                      <Input
                        placeholder="Curso"
                        value="Medicina"
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                    <Select value={formData.semester} onValueChange={(value) => setFormData({ ...formData, semester: value })}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione seu semestre" />
                      </SelectTrigger>
                      <SelectContent>
                        {semestres.map((semestre) => (
                          <SelectItem key={semestre} value={semestre}>
                            {semestre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </>
                )}

                {role === "teacher" && (
                  <>
                    <Select value={formData.researchArea} onValueChange={(value) => setFormData({ ...formData, researchArea: value })}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione sua área de pesquisa" />
                      </SelectTrigger>
                      <SelectContent>
                        {areasPesquisa.map((area) => (
                          <SelectItem key={area} value={area}>
                            {area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Departamento"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      required
                    />
                  </>
                )}

                <Input
                  placeholder="Link do Lattes (opcional)"
                  value={formData.lattesUrl}
                  onChange={(e) => setFormData({ ...formData, lattesUrl: e.target.value })}
                />
                <Input
                  placeholder="Link do LinkedIn (opcional)"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                />

                <Button
                  type="submit"
                  className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl mt-4"
                >
                  Criar Conta
                </Button>
              </div>
            </form>

            <p className="text-sm text-center text-gray-600 mt-4">
              Já tem uma conta?{" "}
              <button
                onClick={() => onNavigate('landing')}
                className="text-[#7C3AED] hover:underline"
              >
                Entrar
              </button>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
