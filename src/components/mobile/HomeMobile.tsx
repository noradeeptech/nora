import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { motion } from "motion/react";
import { Info } from "lucide-react";
import logoNora from 'figma:asset/68f3d69a803926650811221098a38d09fd1c2dc0.png';

interface HomeMobileProps {
  onNavigate: (page: 'login' | 'signup' | 'home') => void;
}

export function HomeMobile({ onNavigate }: HomeMobileProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="w-full flex justify-end items-center p-4 sticky top-0 bg-white/80 backdrop-blur-sm z-10 border-b border-purple-100">
        <Button
          variant="outline"
          size="sm"
          className="border-[#7C3AED] text-[#7C3AED] hover:bg-purple-100 rounded-xl"
          onClick={() => onNavigate('login')}
        >
          Entrar
        </Button>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center mt-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <img 
            src={logoNora}
            alt="Nora"
            className="h-16 mx-auto cursor-pointer"
            onClick={() => onNavigate('home')}
            style={{ mixBlendMode: 'multiply' }}
          />
        </motion.div>

        {/* Beta Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <Badge className="bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20 px-3 py-1 text-xs hover:bg-[#7C3AED]/20">
            <Info className="w-3 h-3 mr-1" />
            Versão Beta
          </Badge>
        </motion.div>

        {/* Beta Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 px-2"
        >
          <Card className="bg-purple-50/50 border-purple-200">
            <CardContent className="p-3">
              <p className="text-xs text-gray-700">
                O Nora está atualmente em <span className="text-[#7C3AED]">versão beta</span>, disponível para estudantes e professores de Medicina em certas faculdades. Em breve, a plataforma será expandida para outras áreas e instituições!
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.h2
          className="text-gray-800 mb-4 text-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Conectando alunos e professores para fortalecer a Iniciação Científica no Brasil
        </motion.h2>

        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          O <span className="text-[#7C3AED]">Nora</span> nasceu para resolver um dos maiores desafios da pesquisa acadêmica: 
          a dificuldade de conexão entre estudantes e orientadores. Através de uma plataforma intuitiva e colaborativa, 
          o Nora aproxima talentos e oportunidades dentro das universidades.
        </p>
      </main>

      {/* New Informational Section */}
      <section className="px-4 mb-8">
        <Card className="shadow-lg bg-white/80 backdrop-blur-sm border border-purple-100">
          <CardContent className="p-6 text-center">
            <h3 className="text-gray-800 mb-3 text-lg">
              Transformando a Iniciação Científica no Brasil
            </h3>
            <p className="text-[#7C3AED] text-sm mb-3">
              O Nora conecta estudantes e professores de todo o país, promovendo colaboração e oportunidades em pesquisa.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              A plataforma facilita o contato direto entre alunos e docentes de diferentes instituições, tornando o acesso à iniciação científica mais inclusivo, dinâmico e colaborativo.
            </p>
            <Button 
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 py-3 rounded-xl w-full"
              onClick={() => onNavigate('signup')}
            >
              Começar Agora
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Problemas da IC no Brasil */}
      <section className="mt-8 px-4">
        <h3 className="text-gray-800 mb-4 text-center text-xl">
          Desafios da Iniciação Científica no Brasil
        </h3>

        <div className="space-y-4">
          <Card className="shadow-md">
            <CardContent className="p-4">
              <h4 className="text-[#7C3AED] mb-2">
                Falta de Visibilidade
              </h4>
              <p className="text-gray-600 text-sm">
                Muitos alunos não sabem quais linhas de pesquisa estão disponíveis e como participar de projetos científicos.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-4">
              <h4 className="text-[#7C3AED] mb-2">
                Comunicação Limitada
              </h4>
              <p className="text-gray-600 text-sm">
                Professores e alunos têm dificuldade em se conectar fora dos canais institucionais tradicionais.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-4">
              <h4 className="text-[#7C3AED] mb-2">
                Baixa Taxa de Engajamento
              </h4>
              <p className="text-gray-600 text-sm">
                Falta de incentivo e acompanhamento reduz o interesse dos alunos na pesquisa acadêmica.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Solução Nora */}
      <section className="mt-12 px-4 mb-8">
        <h3 className="text-gray-800 mb-4 text-center text-xl">
          Nossa Solução: O Nora
        </h3>

        <div className="space-y-4">
          <Card className="shadow-md">
            <CardContent className="p-4">
              <h4 className="text-[#7C3AED] mb-2">
                Plataforma Unificada
              </h4>
              <p className="text-gray-600 text-sm">
                Reúne professores e alunos em um só ambiente, facilitando o encontro entre projetos e talentos.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-4">
              <h4 className="text-[#7C3AED] mb-2">
                Perfis Científicos
              </h4>
              <p className="text-gray-600 text-sm">
                Cada usuário tem um perfil acadêmico, com projetos, áreas de interesse e conquistas científicas.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-4">
              <h4 className="text-[#7C3AED] mb-2">
                Conexões Inteligentes
              </h4>
              <p className="text-gray-600 text-sm">
                O Nora sugere conexões entre professores e alunos com base nas afinidades de pesquisa e interesses.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-xs">
        © 2025 Nora - Inovando a Iniciação Científica Brasileira
      </footer>
    </div>
  );
}
