import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import logoNora from 'figma:asset/68f3d69a803926650811221098a38d09fd1c2dc0.png';

interface LoginPageProps {
  onLogin: (type: 'student' | 'professor') => void;
  onNavigate: (page: 'signup' | 'home') => void;
}

export function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login logic - in real app, this would validate credentials
    if (email && password) {
      toast.success('Login realizado com sucesso!');
      // For demo, redirect to student dashboard
      // In real app, this would be based on user type from backend
      onLogin('student');
    } else {
      toast.error('Por favor, preencha todos os campos');
    }
  };

  const handlePasswordRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (recoveryEmail) {
      toast.success(`Instruções de recuperação enviadas para ${recoveryEmail}`);
      setForgotPasswordOpen(false);
      setRecoveryEmail('');
    } else {
      toast.error('Por favor, insira seu e-mail');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <img 
            src={logoNora}
            alt="Nora"
            className="h-16 mx-auto mb-4 cursor-pointer"
            onClick={() => onNavigate('home')}
          />
          <p className="text-[18px] text-gray-600" style={{ fontFamily: 'Inter', fontWeight: 400 }}>
            Conectando estudantes e professores através de oportunidades de pesquisa
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                required
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => setForgotPasswordOpen(true)}
                className="text-sm text-[#7C3AED] hover:text-[#6D28D9] hover:underline"
              >
                Esqueci minha senha
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white h-12"
          >
            Entrar
          </Button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <button
              onClick={() => onNavigate('signup')}
              className="text-[#7C3AED] hover:text-[#6D28D9] hover:underline"
            >
              Criar conta
            </button>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 mt-8">
          © 2025 Nora – Empowering Academic Connections
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Recuperar Senha</DialogTitle>
            <DialogDescription>
              Digite seu e-mail cadastrado. Enviaremos instruções para redefinir sua senha.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handlePasswordRecovery}>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="recovery-email">E-mail</Label>
                <Input
                  id="recovery-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setForgotPasswordOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-[#7C3AED] hover:bg-[#6D28D9]">
                Enviar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}