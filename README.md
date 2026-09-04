# Arthur Leite — Portfólio

Site pessoal / portfólio de desenvolvedor, com uma seção de projetos que busca os
repositórios públicos direto da [API do GitHub](https://docs.github.com/en/rest/repos/repos)
em tempo real e um formulário de contato funcional que envia email sem backend próprio.

## Stack

- [TanStack Start](https://tanstack.com/start) — framework full-stack em cima do React (SSR + roteamento)
- [React 19](https://react.dev) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [Motion](https://motion.dev) (Framer Motion) para as animações
- API pública do GitHub para listar projetos automaticamente
- [FormSubmit](https://formsubmit.co) para o envio do formulário de contato por email (sem servidor próprio nem chave de API)

## Rodando localmente

Pré-requisito: [Node.js](https://nodejs.org) 20 ou superior.

```sh
npm install
npm run dev
```

Acesse `http://localhost:3000` (a porta exata aparece no terminal).

Outros comandos:

```sh
npm run build    # build de produção em /dist
npm run preview  # serve o build de produção localmente
npm run lint     # checagem de lint
npm run format   # formata o código com prettier
```