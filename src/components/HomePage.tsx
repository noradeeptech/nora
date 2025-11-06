import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { Info } from "lucide-react";
import logoNora from 'figma:asset/68f3d69a803926650811221098a38d09fd1c2dc0.png';

interface HomePageProps {
  onNavigate: (page: 'login' | 'signup' | 'home') => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full flex justify-end items-center p-6 max-w-6xl">
        <Button
          variant="outline"
          className="border-[#7C3AED] text-[#7C3AED] hover:bg-purple-100"
          onClick={() => onNavigate('login')}
        >
          Entrar
        </Button>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center mt-12 px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <img 
            src={logoNora}
            alt="Nora"
            className="h-24 mx-auto cursor-pointer"
            onClick={() => onNavigate('home')}
            style={{ mixBlendMode: 'multiply' }}
          />
        </motion.div>

        {/* Beta Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Badge className="bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20 px-4 py-1.5 hover:bg-[#7C3AED]/20">
            <Info className="w-3.5 h-3.5 mr-1.5" />
            Versão Beta
          </Badge>
        </motion.div>

        {/* Beta Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 max-w-2xl"
        >
          <Card className="bg-purple-50/50 border-purple-200">
            <CardContent className="p-4">
              <p className="text-sm text-gray-700">
                O Nora está atualmente em <span className="text-[#7C3AED]">versão beta</span>, disponível para estudantes e professores de Medicina em certas faculdades. Em breve, a plataforma será expandida para outras áreas e instituições!
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.h2
          className="text-gray-800 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Conectando alunos e professores para fortalecer a Iniciação Científica no Brasil
        </motion.h2>

        <p className="text-gray-600 leading-relaxed mb-10">
          O <span className="text-[#7C3AED]">Nora</span> nasceu para resolver um dos maiores desafios da pesquisa acadêmica: 
          a dificuldade de conexão entre estudantes e orientadores. Através de uma plataforma intuitiva e colaborativa, 
          o Nora aproxima talentos e oportunidades dentro das universidades.
        </p>
      </main>

      {/* New Informational Section */}
      <section className="w-full max-w-4xl px-6 mb-12">
        <Card className="shadow-lg bg-white/80 backdrop-blur-sm border border-purple-100">
          <CardContent className="p-8 text-center">
            <h3 className="text-gray-800 mb-4">
              Transformando a Iniciação Científica no Brasil
            </h3>
            <p className="text-[#7C3AED] mb-4">
              O Nora conecta estudantes e professores de todo o país, promovendo colaboração e oportunidades em pesquisa.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              A plataforma facilita o contato direto entre alunos e docentes de diferentes instituições, tornando o acesso à iniciação científica mais inclusivo, dinâmico e colaborativo.
            </p>
            <Button 
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 py-3 rounded-xl"
              onClick={() => onNavigate('signup')}
            >
              Começar Agora
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Problemas da IC no Brasil */}
      <section className="mt-8 max-w-6xl px-6 text-center">
        <h3 className="text-gray-800 mb-6">
          Desafios da Iniciação Científica no Brasil
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-md">
            <CardContent className="p-6">
              <h4 className="text-[#7C3AED] mb-3">
                Falta de Visibilidade
              </h4>
              <p className="text-gray-600">
                Muitos alunos não sabem quais linhas de pesquisa estão disponíveis e como participar de projetos científicos.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-6">
              <h4 className="text-[#7C3AED] mb-3">
                Comunicação Limitada
              </h4>
              <p className="text-gray-600">
                Professores e alunos têm dificuldade em se conectar fora dos canais institucionais tradicionais.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-6">
              <h4 className="text-[#7C3AED] mb-3">
                Baixa Taxa de Engajamento
              </h4>
              <p className="text-gray-600">
                Falta de incentivo e acompanhamento reduz o interesse dos alunos na pesquisa acadêmica.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Solução Nora */}
      <section className="mt-20 max-w-6xl px-6 text-center">
        <h3 className="text-gray-800 mb-6">
          Nossa Solução: O Nora
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-md">
            <CardContent className="p-6">
              <h4 className="text-[#7C3AED] mb-3">
                Plataforma Unificada
              </h4>
              <p className="text-gray-600">
                Reúne professores e alunos em um só ambiente, facilitando o encontro entre projetos e talentos.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-6">
              <h4 className="text-[#7C3AED] mb-3">
                Perfis Científicos
              </h4>
              <p className="text-gray-600">
                Cada usuário tem um perfil acadêmico, com projetos, áreas de interesse e conquistas científicas.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-6">
              <h4 className="text-[#7C3AED] mb-3">
                Conexões Inteligentes
              </h4>
              <p className="text-gray-600">
                O Nora sugere conexões entre professores e alunos com base nas afinidades de pesquisa e interesses.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 mb-10 text-gray-500 text-sm">
        © 2025 Nora - Inovando a Iniciação Científica Brasileira
      </footer>
    </div>
  );
}
