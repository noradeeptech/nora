# 🚀 Instruções para Deploy no Vercel - Plataforma Nora

## Passo 1: Baixar o Código
1. No Figma Make, clique no botão de **Export/Download** no canto superior direito
2. Baixe o projeto completo como ZIP
3. Extraia o arquivo ZIP em uma pasta no seu computador

## Passo 2: Preparar o Projeto

### 2.1 Criar arquivo `package.json`
Na raiz do projeto, crie um arquivo chamado `package.json` com este conteúdo:

```json
{
  "name": "nora-plataforma",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "latest",
    "motion": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest",
    "@radix-ui/react-accordion": "latest",
    "@radix-ui/react-alert-dialog": "latest",
    "@radix-ui/react-avatar": "latest",
    "@radix-ui/react-checkbox": "latest",
    "@radix-ui/react-collapsible": "latest",
    "@radix-ui/react-dialog": "latest",
    "@radix-ui/react-dropdown-menu": "latest",
    "@radix-ui/react-label": "latest",
    "@radix-ui/react-popover": "latest",
    "@radix-ui/react-radio-group": "latest",
    "@radix-ui/react-select": "latest",
    "@radix-ui/react-separator": "latest",
    "@radix-ui/react-slider": "latest",
    "@radix-ui/react-switch": "latest",
    "@radix-ui/react-tabs": "latest",
    "@radix-ui/react-toast": "latest",
    "@radix-ui/react-tooltip": "latest",
    "sonner": "^2.0.3",
    "react-hook-form": "^7.55.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.3.1",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.5.3"
  }
}
```

### 2.2 Criar arquivo `vite.config.ts`
Na raiz do projeto, crie um arquivo `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
```

### 2.3 Criar arquivo `index.html`
Na raiz do projeto, crie um arquivo `index.html`:

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nora - Plataforma de Iniciação Científica</title>
    <meta name="description" content="Conectando alunos e professores para fortalecer a Iniciação Científica no Brasil" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>
```

### 2.4 Criar arquivo `main.tsx`
Na raiz do projeto, crie um arquivo `main.tsx`:

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### 2.5 Criar arquivo `tsconfig.json`
Na raiz do projeto, crie um arquivo `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 2.6 Criar arquivo `tsconfig.node.json`
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

### 2.7 Criar arquivo `.gitignore`
```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

## Passo 3: Deploy no Vercel

### Opção A: Via Interface Web (Mais Fácil)

1. Acesse [vercel.com](https://vercel.com) e crie uma conta (gratuita)
2. Clique em **"Add New..."** → **"Project"**
3. Clique em **"Deploy"** ou arraste a pasta do projeto
4. O Vercel vai detectar automaticamente que é um projeto Vite + React
5. Clique em **"Deploy"**
6. Aguarde 2-3 minutos
7. Pronto! Sua plataforma estará online! 🎉

### Opção B: Via GitHub (Recomendado para atualizações futuras)

1. Crie um repositório no [GitHub](https://github.com)
2. Faça upload dos arquivos ou use Git:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Plataforma Nora"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/nora.git
   git push -u origin main
   ```
3. No Vercel, clique em **"Import Project"**
4. Conecte sua conta do GitHub
5. Selecione o repositório do Nora
6. Clique em **"Deploy"**
7. Pronto! Agora cada vez que você atualizar o GitHub, o Vercel atualiza automaticamente! 🚀

### Opção C: Via CLI do Vercel

1. Instale o Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. No terminal, navegue até a pasta do projeto:
   ```bash
   cd caminho/para/nora
   ```
3. Execute:
   ```bash
   vercel
   ```
4. Siga as instruções no terminal
5. Pronto! 🎉

## Passo 4: Configurar Domínio Personalizado (Opcional)

1. No dashboard do Vercel, vá em **"Settings"** → **"Domains"**
2. Adicione seu domínio personalizado (ex: nora.com.br)
3. Configure os DNS conforme as instruções
4. Aguarde propagação (pode levar até 48h)

## 🎨 Customizações Adicionais

### Adicionar Favicon
Substitua o arquivo `vite.svg` na pasta `public` por seu próprio ícone.

### Adicionar Meta Tags para SEO
Edite o arquivo `index.html` e adicione mais meta tags conforme necessário.

### Configurar Analytics
Adicione Google Analytics ou outra ferramenta de analytics no `index.html`.

## 📞 Suporte

Se tiver algum problema:
- Verifique os logs no dashboard do Vercel
- Consulte a documentação: [vercel.com/docs](https://vercel.com/docs)
- O Vercel tem suporte gratuito via chat

## ✅ Checklist Final

- [ ] Todos os arquivos de configuração criados
- [ ] package.json configurado
- [ ] Projeto testado localmente (`npm install` + `npm run dev`)
- [ ] Deploy feito no Vercel
- [ ] Site acessível e funcionando
- [ ] Domínio configurado (se aplicável)

---

**Parabéns! 🎉 A Plataforma Nora está no ar!**
