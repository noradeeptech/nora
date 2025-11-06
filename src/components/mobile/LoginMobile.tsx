import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import logoNora from 'figma:asset/68f3d69a803926650811221098a38d09fd1c2dc0.png';

interface LoginMobileProps {
  onLogin: (type: 'student' | 'professor') => void;
  onNavigate: (page: 'signup' | 'home') => void;
}

export function LoginMobile({ onLogin, onNavigate }: LoginMobileProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password) {
      toast.success('Login realizado com sucesso!');
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
    <div className="min-h-screen flex items-center justify-center p-6 bg-white">
      <div className="w-full max-w-md space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <img 
            src={logoNora}
            alt="Nora"
            className="h-12 mx-auto mb-4 cursor-pointer"
            onClick={() => onNavigate('home')}
          />
          <p className="text-[16px] text-gray-600 px-4" style={{ fontFamily: 'Inter', fontWeight: 400 }}>
            Conectando estudantes e professores através de oportunidades de pesquisa
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 h-12"
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
                className="mt-1 h-12"
                required
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => setForgotPasswordOpen(true)}
                className="text-sm text-[#7C3AED] hover:text-[#6D28D9]"
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
        </motion.form>

        {/* Sign Up Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <button
              onClick={() => onNavigate('signup')}
              className="text-[#7C3AED] hover:text-[#6D28D9]"
            >
              Criar conta
            </button>
          </p>
        </motion.div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 mt-8">
          © 2025 Nora – Empowering Academic Connections
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
        <DialogContent className="max-w-[90vw]">
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