# Alan Garcia | Blog Pessoal, Portfólio & Roadmap

Website pessoal e técnico construído com [Hugo Extended](https://gohugo.io/) e o tema [Hextra](https://imfing.github.io/hextra/), integrando um quadro Kanban de planejamento dinâmico conectado diretamente às [GitHub Issues](https://github.com/alandvgarcia/alandvgarcia-blog/issues).

## 🚀 Estrutura

- **Início (`/`)**: Apresentação profissional com bio, stacks principais (Kotlin, Compose Multiplatform, Android, iOS) e atalhos.
- **Portfólio (`/portfolio/`)**: Projetos em destaque e bibliotecas open-source em formato de cards.
- **Blog (`/blog/`)**: Artigos e tutoriais técnicos escritos em Markdown com suporte a Table of Contents e destaque de sintaxe.
- **Roadmap (`/roadmap/`)**: Quadro Kanban interativo que consome a API do GitHub em tempo real para exibir o backlog, tarefas em andamento e itens concluídos.

## 🛠️ Como Executar Localmente

### Pré-requisitos
- [Hugo Extended](https://gohugo.io/installation/) (v0.120.0+)
- Git

### Passos
```bash
# 1. Clonar o repositório com submódulos
git clone --recursive https://github.com/alandvgarcia/alandvgarcia-blog.git
cd alandvgarcia-blog

# 2. Iniciar o servidor local com rascunhos habilitados
hugo server -D
```
Acesse `http://localhost:1313/alandvgarcia-blog/` no seu navegador.

## ✍️ Como Criar Conteúdo

- **Novo Artigo no Blog**:
  ```bash
  hugo new blog/meu-novo-artigo.md
  ```
- **Novo Projeto no Portfólio**:
  ```bash
  hugo new portfolio/meu-projeto.md
  ```

## 🔄 Como Funciona o Roadmap de Issues

O quadro de planejamento na página `/roadmap/` busca dinamicamente as issues deste repositório e organiza automaticamente:
- **📋 Backlog / A Fazer**: Issues com label `status:todo` ou abertas.
- **⚡ Em Andamento**: Issues com label `status:in-progress` ou `doing`.
- **✅ Concluído**: Issues fechadas ou com label `status:done`.

As requisições contam com cache local (`sessionStorage`, 5 minutos) para proteger o limite da API pública do GitHub.

## 🚢 Deploy Automatizado

A cada push na branch principal (`master` ou `main`), o GitHub Actions compila o site e publica automaticamente no GitHub Pages.
