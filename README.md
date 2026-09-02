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

## Projetos (GitHub API)

A seção "Selected work" busca automaticamente os repositórios públicos de
[github.com/ArthurLeite-Dev](https://github.com/ArthurLeite-Dev) (excluindo forks e o
repositório de perfil), ordenados por atividade recente, com o projeto **Co-Up**
sempre fixado em primeiro. A lógica fica em `src/lib/github.ts`. Não é necessário
nenhum token — a API pública do GitHub permite essa consulta sem autenticação
(limite de 60 requisições/hora por IP).

## Formulário de contato

O formulário em "Let's build something" envia a mensagem por email via
[FormSubmit](https://formsubmit.co), sem precisar de servidor, backend ou chave de
API. **Na primeira mensagem enviada**, o FormSubmit manda um email de confirmação
para o endereço configurado (`arthur.sl.work@gmail.com`) — é preciso clicar em
"Activate Form" nesse email para que as próximas mensagens comecem a chegar.

Para trocar o email de destino, edite `profile.email` em `src/lib/portfolio-data.ts`.
