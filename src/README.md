# 🔬 Nora - Plataforma de Iniciação Científica

Conectando alunos e professores para fortalecer a Iniciação Científica no Brasil.

## 📋 Sobre o Projeto

O **Nora** é uma plataforma desenvolvida para resolver um dos maiores desafios da pesquisa acadêmica: a dificuldade de conexão entre estudantes e orientadores. Através de uma plataforma intuitiva e colaborativa, o Nora aproxima talentos e oportunidades dentro das universidades.

### 🎯 Versão Atual
**Beta** - Disponível para estudantes e professores de Medicina em certas faculdades. Em breve será expandido para outras áreas e instituições.

## ✨ Funcionalidades

### Para Estudantes
- 🔍 Buscar vagas de pesquisa por área, instituição e modalidade
- 📝 Candidatar-se a projetos de iniciação científica
- 👤 Criar perfil acadêmico com currículo Lattes e LinkedIn
- 📊 Acompanhar status de candidaturas

### Para Professores
- ➕ Criar e publicar vagas de pesquisa
- 🎓 Gerenciar candidatos e candidaturas
- 🏫 Definir disponibilidade (apenas instituição ou aberto)
- 👥 Visualizar perfis de alunos interessados

## 🏥 Áreas de Pesquisa Médica

A plataforma contempla 24 especialidades médicas:
- Cardiologia
- Clínica Médica
- Dermatologia
- Endocrinologia
- Gastroenterologia
- Neurologia
- Psiquiatria
- Reumatologia
- Cirurgia Geral
- E mais...

## 🏛️ Instituições Participantes

- Faculdade Santa Marcelina (FASM)
- Universidade de São Paulo (USP)
- Universidade Estadual de Campinas (UNICAMP)
- Universidade Federal de São Paulo (UNIFESP)
- Pontifícia Universidade Católica de São Paulo (PUC-SP)
- Universidade Federal do Rio de Janeiro (UFRJ)
- Universidade de Brasília (UnB)
- Universidade Federal de Minas Gerais (UFMG)

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Framework de estilização
- **Vite** - Build tool e dev server
- **Shadcn/ui** - Componentes de interface
- **Lucide React** - Ícones
- **Motion (Framer Motion)** - Animações

## 📦 Instalação Local

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/nora.git

# Entre na pasta
cd nora

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 🌐 Deploy

Este projeto está configurado para deploy no **Vercel**.

Para fazer o deploy:
1. Crie uma conta no [Vercel](https://vercel.com)
2. Conecte seu repositório GitHub
3. O Vercel detectará automaticamente as configurações
4. Clique em Deploy

Ou use a CLI:
```bash
npm install -g vercel
vercel
```

## 📁 Estrutura do Projeto

```
nora/
├── components/          # Componentes React
│   ├── ui/             # Componentes shadcn/ui
│   ├── mobile/         # Versões mobile dos componentes
│   └── figma/          # Componentes do Figma
├── styles/             # Estilos globais
├── App.tsx             # Componente principal
├── main.tsx            # Entrada da aplicação
└── index.html          # HTML base
```

## 🎨 Design System

- **Cor Principal:** `#7C3AED` (Roxo)
- **Tipografia:** Inter
- **Componentes:** Shadcn/ui
- **Responsivo:** Mobile-first

## 🔐 Funcionalidades de Segurança

- Autenticação de usuários
- Perfis separados (Aluno/Professor)
- Sistema de permissões
- Validação de formulários

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é privado e proprietário.

## 📞 Contato

Para dúvidas ou sugestões sobre a plataforma Nora, entre em contato.

---

**Desenvolvido com ❤️ para fortalecer a pesquisa científica no Brasil**
