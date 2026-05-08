# 📋 Case Técnico — Desenvolvedor(a) de Software

> Aplicação fullstack de Lista de Tarefas (To-Do List) desenvolvida como case técnico, com frontend em React + TypeScript e backend em Node.js + Express + TypeScript.

🔗 **Demo em produção:** [eduardo-to-do.netlify.app](https://eduardo-to-do.netlify.app)  
🔗 **API em produção:** [todo-app-backend-b4m4.onrender.com](https://todo-app-backend-b4m4.onrender.com)

---

## 📖 Descrição

A aplicação permite ao usuário organizar suas atividades em **listas**, onde cada lista pode conter várias **tarefas**. O usuário pode criar, editar, remover e reordenar tanto listas quanto tarefas, além de alterar o status de cada tarefa individualmente.

O projeto foi desenvolvido com separação clara entre frontend e backend, comunicação via API REST, tipagem forte com TypeScript em ambas as camadas, e layout totalmente responsivo para desktop e mobile.

---

## 🛠️ Tecnologias utilizadas

### Backend
| Tecnologia | Versão | Finalidade |
|---|---|---|
| Node.js | 20+ | Runtime JavaScript no servidor |
| Express | 4.18 | Framework HTTP para criação da API REST |
| TypeScript | 5.3 | Tipagem estática |
| ts-node-dev | 2.0 | Hot reload em desenvolvimento |
| CORS | 2.8 | Controle de origens permitidas na API |

### Frontend
| Tecnologia | Versão | Finalidade |
|---|---|---|
| React | 18.2 | Biblioteca de UI baseada em componentes |
| TypeScript | 5.3 | Tipagem estática |
| Vite | 5.0 | Bundler e servidor de desenvolvimento |
| CSS Modules | — | Estilização com escopo por componente |

### Infraestrutura
| Serviço | Finalidade |
|---|---|
| Netlify | Hospedagem do frontend (build estático) |
| Render | Hospedagem do backend (Node.js) |
| GitHub | Controle de versão e integração com CI/CD |

---

## ✅ Funcionalidades implementadas

### Listas
- ✅ Criar nova lista
- ✅ Listar todas as listas na sidebar
- ✅ Buscar lista por ID (via API)
- ✅ Editar nome de uma lista existente
- ✅ Remover lista — com exclusão em cascata de todas as tarefas vinculadas
- ✅ Contador de tarefas exibido ao lado de cada lista

### Tarefas
- ✅ Criar nova tarefa vinculada à lista ativa
- ✅ Listar todas as tarefas da lista selecionada
- ✅ Buscar tarefa por ID (via API)
- ✅ Editar título, descrição e status de uma tarefa
- ✅ Remover tarefa com modal de confirmação
- ✅ Alterar status da tarefa inline (sem abrir modal)
- ✅ Visual de tarefa concluída com texto riscado

### Interface
- ✅ Layout responsivo (desktop e mobile)
- ✅ Sidebar com drawer deslizante no mobile
- ✅ Botão flutuante (FAB) para criar tarefa no mobile
- ✅ Modais animados para criação, edição e confirmação de exclusão
- ✅ Estado de loading ao carregar dados
- ✅ Tela de erro com botão de retry ao falhar conexão com a API
- ✅ Aviso visual ao tentar remover lista com tarefas vinculadas

---

## 🗂️ Estrutura do projeto

```
todo-app/
│
├── backend/
│   ├── src/
│   │   ├── server.ts                  # Entry point: configura Express, middlewares e rotas
│   │   ├── store.ts                   # Armazenamento em memória (dados e contadores de ID)
│   │   ├── types/
│   │   │   └── index.ts               # Interfaces e tipos: List, Task, DTOs, TaskStatus
│   │   ├── controllers/
│   │   │   ├── listsController.ts     # Lógica de negócio do CRUD de listas
│   │   │   └── tasksController.ts     # Lógica de negócio do CRUD de tarefas
│   │   └── routes/
│   │       ├── lists.ts               # Roteamento de /lists
│   │       └── tasks.ts               # Roteamento de /lists/:listId/tasks
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── public/
    │   └── _redirects                 # Redirecionamento SPA para o Netlify
    ├── src/
    │   ├── main.tsx                   # Entry point React: monta o app no DOM
    │   ├── App.tsx                    # Componente raiz: estado global, lógica e orquestração
    │   ├── App.module.css             # Estilos do layout principal e responsividade
    │   ├── vite-env.d.ts              # Declarações de tipos para CSS Modules e import.meta.env
    │   ├── types/
    │   │   └── index.ts               # Interfaces e tipos espelhados do backend
    │   ├── services/
    │   │   └── api.ts                 # Camada de serviço: todas as chamadas HTTP à API
    │   ├── styles/
    │   │   └── global.css             # Variáveis CSS, reset, tema escuro e estilos base
    │   └── components/
    │       ├── Sidebar.tsx            # Lista de listas + ações de editar/remover
    │       ├── Sidebar.module.css
    │       ├── TaskCard.tsx           # Card individual de tarefa com badge de status
    │       ├── TaskCard.module.css
    │       ├── Modal.tsx              # Modais reutilizáveis: ListModal, TaskModal, DeleteModal
    │       └── Modal.module.css
    ├── package.json
    ├── vite.config.ts                 # Configuração do Vite com proxy para a API local
    └── tsconfig.json
```

---

## 🚀 Como executar o projeto

### Pré-requisitos
- Node.js 18 ou superior
- npm

---

### 1. Clone o repositório

```bash
git clone https://github.com/Talduardo/todo-app-backend.git
cd todo-app
```

---

### 2. Execute o Backend

```bash
cd backend
npm install
npm run dev
```

O servidor estará disponível em:
```
http://localhost:3001
```

Para confirmar que está funcionando, acesse:
```
http://localhost:3001/health
# Resposta esperada: {"status":"ok","message":"API To-Do List funcionando."}
```

---

### 3. Execute o Frontend

Em um **novo terminal**:

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em:
```
http://localhost:5173
```

> O Vite está configurado com proxy: chamadas para `/lists` são redirecionadas automaticamente para `http://localhost:3001`, eliminando qualquer problema de CORS em desenvolvimento.

---

### 4. Build de produção

```bash
# Frontend
cd frontend
npm run build
# Gera a pasta dist/ com os arquivos estáticos prontos para deploy

# Backend
cd backend
npm run build        # Compila TypeScript para JavaScript em dist/
npm start            # Inicia o servidor compilado
```

---

## 📡 Referência da API

Base URL local: `http://localhost:3001`  
Base URL produção: `https://todo-app-backend-b4m4.onrender.com`

---

### Listas

#### `GET /lists`
Retorna todas as listas.

**Resposta 200:**
```json
[
  {
    "id": 1,
    "name": "Trabalho",
    "createdAt": "2026-05-07T00:00:00.000Z",
    "updatedAt": "2026-05-07T00:00:00.000Z"
  }
]
```

---

#### `GET /lists/:id`
Retorna uma lista pelo ID.

**Resposta 200:** objeto `List`  
**Resposta 404:** `{ "error": "Lista não encontrada." }`

---

#### `POST /lists`
Cria uma nova lista.

**Body:**
```json
{ "name": "Pessoal" }
```

**Resposta 201:** objeto `List` criado  
**Resposta 400:** `{ "error": "O campo \"name\" é obrigatório." }`

---

#### `PUT /lists/:id`
Atualiza o nome de uma lista existente.

**Body:**
```json
{ "name": "Novo nome" }
```

**Resposta 200:** objeto `List` atualizado  
**Resposta 404:** lista não encontrada

---

#### `DELETE /lists/:id`
Remove uma lista e **todas as suas tarefas vinculadas** (cascade delete).

**Resposta 200:**
```json
{
  "message": "Lista removida com sucesso. 3 tarefa(s) vinculada(s) também foram removidas."
}
```

---

### Tarefas

Todas as rotas de tarefas são aninhadas sob `/lists/:listId/tasks`.

#### `GET /lists/:listId/tasks`
Retorna todas as tarefas de uma lista.

**Resposta 200:** array de `Task`  
**Resposta 404:** lista não encontrada

---

#### `GET /lists/:listId/tasks/:id`
Retorna uma tarefa específica de uma lista.

**Resposta 200:** objeto `Task`  
**Resposta 404:** tarefa não encontrada

---

#### `POST /lists/:listId/tasks`
Cria uma nova tarefa vinculada à lista.

**Body:**
```json
{
  "title": "Revisar proposta",
  "description": "Verificar os requisitos do cliente.",
  "status": "pending"
}
```

> `description` e `status` são opcionais. O valor padrão de `status` é `"pending"`.

**Status válidos:** `pending` | `progress` | `done`

**Resposta 201:** objeto `Task` criado  
**Resposta 400:** título ausente ou status inválido  
**Resposta 404:** lista não encontrada

---

#### `PUT /lists/:listId/tasks/:id`
Atualiza parcialmente uma tarefa. Todos os campos são opcionais.

**Body:**
```json
{
  "title": "Novo título",
  "description": "Nova descrição",
  "status": "done"
}
```

**Resposta 200:** objeto `Task` atualizado  
**Resposta 404:** tarefa não encontrada

---

#### `DELETE /lists/:listId/tasks/:id`
Remove uma tarefa específica.

**Resposta 200:** `{ "message": "Tarefa removida com sucesso." }`  
**Resposta 404:** tarefa não encontrada

---

#### `GET /health`
Verifica se a API está no ar.

**Resposta 200:** `{ "status": "ok", "message": "API To-Do List funcionando." }`

---

## 🏗️ Arquitetura e fluxo de dados

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND (React)                  │
│                                                      │
│  App.tsx (estado global)                             │
│    │                                                 │
│    ├── services/api.ts ──── fetch() ──► API REST     │
│    │                                                 │
│    ├── Sidebar.tsx          (exibe listas)           │
│    ├── TaskCard.tsx         (exibe tarefas)          │
│    └── Modal.tsx            (criação/edição/delete)  │
└──────────────────────────────┬──────────────────────┘
                               │ HTTP (JSON)
                               ▼
┌─────────────────────────────────────────────────────┐
│                   BACKEND (Express)                  │
│                                                      │
│  server.ts                                           │
│    │                                                 │
│    ├── /lists ──────────── listsController.ts        │
│    └── /lists/:id/tasks ── tasksController.ts        │
│                                 │                    │
│                            store.ts                  │
│                        (arrays em memória)           │
└─────────────────────────────────────────────────────┘
```

---

## 🔧 Variáveis de ambiente

### Backend

| Variável | Padrão | Descrição |
|---|---|---|
| `PORT` | `3001` | Porta em que o servidor Express escuta |
| `FRONTEND_URL` | `http://localhost:5173` | Origem permitida pelo CORS |

### Frontend

| Variável | Padrão | Descrição |
|---|---|---|
| `VITE_API_URL` | `/lists` (proxy local) | URL base da API REST em produção |

> ⚠️ Variáveis `VITE_*` são embutidas no bundle no momento do `build`. Alterações exigem novo deploy.

---

## 🧠 Decisões tomadas

### Relacionamento entre listas e tarefas
Cada tarefa possui um campo `listId` que referencia a lista à qual pertence. A relação é **1 lista → N tarefas**. Nas rotas da API, as tarefas são acessadas de forma aninhada (`/lists/:listId/tasks`), garantindo que uma tarefa só possa ser acessada ou modificada dentro do contexto correto da sua lista.

### Remoção de lista com tarefas (cascade delete)
Ao remover uma lista, **todas as tarefas vinculadas a ela são removidas automaticamente**. Essa decisão foi tomada para manter a consistência dos dados e evitar tarefas órfãs sem lista associada. O backend informa na resposta quantas tarefas foram removidas. O frontend exibe um aviso visual no modal de confirmação antes de concluir a operação.

### Armazenamento em memória
Os dados são armazenados em arrays JavaScript no `store.ts`. Essa abordagem foi escolhida pela simplicidade e por não exigir configuração de banco de dados para rodar o projeto. **Os dados são perdidos ao reiniciar o servidor.** Para produção real, o `store.ts` deve ser substituído por um ORM (Prisma ou TypeORM) com PostgreSQL.

### Separação em camadas no backend
O backend segue uma arquitetura em 3 camadas:
- **Routes** — apenas mapeamento de verbo HTTP + path para controller
- **Controllers** — lógica de negócio, validações e manipulação do store
- **Store** — fonte de dados (substituível por um repositório de banco de dados)

### Proxy do Vite em desenvolvimento
Em desenvolvimento, o `vite.config.ts` configura um proxy que redireciona `/lists` para `http://localhost:3001`. Isso elimina problemas de CORS durante o desenvolvimento sem necessidade de alterar o código da aplicação.

### Responsividade mobile
Para telas menores que 640px, a sidebar é ocultada e transformada em um **drawer deslizante** ativado por um botão hamburguer (☰). O botão "Nova tarefa" do header é substituído por um **FAB (Floating Action Button)** fixo no canto inferior direito, seguindo padrões de UX mobile. O overlay escurecido ao abrir o drawer fecha automaticamente ao clicar fora.

### Tipagem compartilhada
As interfaces `List`, `Task`, `TaskStatus` e os DTOs são definidos em `types/index.ts` tanto no backend quanto no frontend, garantindo consistência de contrato entre as duas camadas sem necessidade de uma biblioteca de tipos compartilhada.

---

## 📋 Observações

### Dificuldades encontradas
- **Variáveis de ambiente no Vite:** o `VITE_API_URL` é embutido no bundle em tempo de build, não em tempo de execução. Isso causou confusão inicial pois adicionar a variável no Netlify sem um novo deploy não surtia efeito.
- **CORS em produção:** o backend precisou de ajuste para aceitar a origem do Netlify via variável de ambiente `FRONTEND_URL`.
- **Import paths no TypeScript:** o `store.ts` importava de `'../types'` (caminho incorreto), o que causou falha no build do Render. O correto é `'./types'` pois ambos estão dentro de `src/`.

### Melhorias futuras | Roadmap
- **Autenticação de usuários** com JWT — cada usuário teria suas próprias listas e tarefas
- **Persistência em banco de dados** com Prisma ORM + PostgreSQL (o `store.ts` foi projetado para ser facilmente substituível)
- **Filtro de tarefas por status** — exibir apenas pendentes, em andamento ou concluídas
- **Busca por título** — campo de pesquisa nas tarefas
- **Drag and drop** para reordenar tarefas dentro de uma lista
- **Testes automatizados** com Jest + React Testing Library no frontend e Supertest no backend
- **Documentação interativa da API** com Swagger/OpenAPI
- **GitHub Actions** para CI/CD com lint, testes e deploy automático
- **Datas de vencimento** para tarefas com alertas de prazo

---

## 🌐 Deploy

### Frontend — Netlify
| Campo | Valor |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Variável de ambiente | `VITE_API_URL=https://todo-app-backend-b4m4.onrender.com/lists` |

O arquivo `public/_redirects` garante que o React Router funcione corretamente:
```
/*    /index.html   200
```

### Backend — Render
| Campo | Valor |
|---|---|
| Build command | `npm install && npm run build` |
| Start command | `node dist/server.js` |
| Variável de ambiente | `FRONTEND_URL=https://eduardo-to-do.netlify.app` |

> ⚠️ No plano gratuito do Render, o serviço hiberna após 15 minutos de inatividade. A primeira requisição após o período de hibernação pode demorar até 30 segundos.
