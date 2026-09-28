# Design Doc: Blog Pessoal, Portfólio e Roadmap de Issues com Hugo e Hextra

**Autor:** Alan Garcia  
**Data:** 2026-09-28  
**Repositório Alvo:** `alandvgarcia/alandvgarcia-blog`  
**Status:** Aprovado  

---

## 1. Visão Geral e Objetivos

O projeto tem como objetivo transformar o repositório `alandvgarcia/alandvgarcia-blog` em uma plataforma integrada para presença digital profissional de Alan Garcia, combinando:
1. **Página Pessoal e Apresentação (Home)**: Apresentação profissional com foco em desenvolvimento Mobile & Multiplatform (Kotlin, Compose Multiplatform, Android, iOS), biografia, stack técnica e links sociais.
2. **Portfólio de Projetos**: Vitrine interativa de projetos em destaque, bibliotecas de código aberto e aplicativos, com descrição, tags e links.
3. **Blog Técnico**: Espaço para artigos, tutoriais e decisões de engenharia, com navegação estruturada, busca instantânea e suporte a blocos de código com destaque de sintaxe.
4. **Roadmap & Planejamento de Issues Dinâmico**: Visualização interativa no formato Kanban consumindo a API REST pública do repositório GitHub para acompanhar o backlog, tarefas em andamento e marcos concluídos em tempo real.

---

## 2. Escolha Tecnológica

- **Gerador de Sites Estáticos (SSG)**: [Hugo](https://gohugo.io/) (versão Extended mais recente).
- **Tema Base**: [Hextra](https://imfing.github.io/hextra/) (tema moderno inspirado no Nextra, com Tailwind CSS integrado, tipografia apurada, cards, abas e suporte nativo a Dark/Light mode).
- **Mecanismo de Busca**: FlexSearch nativo do Hextra (busca estática client-side indexada no build).
- **Camada Dinâmica de Issues**: JavaScript Vanilla modular integrado via Hugo Shortcode (`github-issues-board`), consumindo a GitHub REST API v3 com cache local em `sessionStorage`.
- **Hospedagem & CI/CD**: GitHub Actions com deploy automatizado no GitHub Pages.

---

## 3. Arquitetura da Informação e Estrutura de Diretórios

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml              # Pipeline de build Hugo e deploy no GitHub Pages
├── archetypes/
│   ├── blog.md                     # Archetype para criação de artigos
│   └── portfolio.md                # Archetype para criação de projetos
├── assets/
│   ├── css/
│   │   └── issues-board.css        # Estilos customizados do Kanban integrados ao Hextra
│   └── js/
│       └── issues-board.js         # Lógica client-side para consumo e renderização das issues
├── content/
│   ├── _index.md                   # Home Page (Hero, bio, stacks, cards de destaque)
│   ├── blog/                       # Artigos do blog
│   │   ├── _index.md               # Listagem e introdução do blog
│   │   └── bem-vindo.md            # Post inicial de apresentação
│   ├── portfolio/                  # Portfólio de projetos
│   │   ├── _index.md               # Grid de projetos usando shortcodes de cards
│   │   └── open-source-project.md  # Detalhes de projeto de exemplo
│   └── roadmap/                    # Planejamento interativo
│       └── _index.md               # Página do quadro de issues
├── layouts/
│   └── shortcodes/
│       └── github-issues-board.html # Shortcode do quadro interativo
├── static/
│   ├── images/                     # Screenshots, avatares e mídias
│   └── favicon.svg                 # Ícone do site
├── themes/
│   └── hextra/                     # Submódulo do tema Hextra
└── hugo.toml                       # Arquivo de configuração central do site
```

---

## 4. Especificação dos Módulos

### 4.1 Home (`content/_index.md`)
- **Hero Section**: Nome, título profissional ("Mobile & Multiplatform Engineer"), resumo de especialidades e links de contato (GitHub, LinkedIn, Email).
- **Seção de Especialidades**: Badges e tags visuais das principais tecnologias (Kotlin Multiplatform, Jetpack Compose, Compose Multiplatform, Swift, Coroutines, Ktor, CI/CD).
- **Grid de Acesso Rápido**: Cards do Hextra com links para:
  - *Ver Projetos*: Redireciona para `/portfolio/`.
  - *Ler o Blog*: Redireciona para `/blog/`.
  - *Acompanhar Roadmap*: Redireciona para `/roadmap/`.

### 4.2 Portfólio (`content/portfolio/`)
- Utilização dos componentes de grid e cards do Hextra:
  ```markdown
  {{< cards >}}
    {{< card link="https://github.com/..." title="Nome do Projeto" image="/images/projeto.png" subtitle="Descrição do projeto..." tag="Kotlin Multiplatform" >}}
  {{< /cards >}}
  ```
- Cada projeto destaca:
  - Título e objetivo da solução.
  - Stack técnica utilizada.
  - Links diretos para código-fonte no GitHub e demonstração ao vivo ou loja de apps.

### 4.3 Blog Técnico (`content/blog/`)
- Posts redigidos em Markdown padrão com frontmatter:
  ```yaml
  ---
  title: "Construindo Aplicações Multiplataforma com CMP"
  date: 2026-09-28
  description: "Explorando as novidades do Compose Multiplatform na prática."
  tags: ["Kotlin", "Compose", "KMP", "Android", "iOS"]
  categories: ["Engenharia"]
  ---
  ```
- Recursos habilitados:
  - Sumário lateral flutuante (Table of Contents).
  - Destaque de sintaxe para Kotlin, Swift, YAML, JSON, Bash, etc.
  - Callouts informativos (`note`, `tip`, `warning`).

### 4.4 Quadro Dinâmico de Issues & Roadmap (`content/roadmap/`)
- **Shortcode**: `{{< github-issues-board repo="alandvgarcia/alandvgarcia-blog" >}}`
- **Fluxo de Dados**:
  1. O script `issues-board.js` faz uma requisição `GET` para:
     `https://api.github.com/repos/alandvgarcia/alandvgarcia-blog/issues?state=all&per_page=100`
  2. Verifica primeiro o cache em `sessionStorage` (chave `gh_issues_cache` com TTL de 5 minutos).
  3. Divide as issues em 3 colunas Kanban:
     - **📋 Backlog / A Fazer**: Issues com label `status:todo`, `backlog` ou abertas sem atribuição de status.
     - **⚡ Em Andamento**: Issues com label `status:in-progress` ou `doing`.
     - **✅ Concluído**: Issues com estado `closed` ou label `status:done`.
  4. Exibe em cada card: título, número (#12), autor, tags coloridas com as cores originais da label do GitHub, contador de comentários e link direto para a issue.
  5. Controles interativos:
     - Barra de pesquisa/filtro por texto e por tag.
     - Botão "Recarregar" para forçar limpeza de cache e nova busca.
     - Botão "Nova Issue / Sugestão" abrindo a URL de criação do repositório no GitHub.
  6. Tratamento de limites de requisição (Rate Limit):
     - Caso atinja HTTP 403 (limite da API anônima), exibe banner informativo amigável com link direto para o quadro de issues no GitHub e opção de fornecer um GitHub Token temporário opcional para desbloqueio local.

---

## 5. Configuração do Hugo (`hugo.toml`)

- **Tema**: `hextra`
- **BaseURL**: `https://alandvgarcia.github.io/alandvgarcia-blog/`
- **Title**: `Alan Garcia | Blog & Portfólio`
- **Navegação Principal**:
  - `Home`: `/`
  - `Portfólio`: `/portfolio/`
  - `Blog`: `/blog/`
  - `Roadmap`: `/roadmap/`
- **Parâmetros do Hextra**:
  - `navbar`: Logo textual com suporte a Dark/Light toggle e botão de busca FlexSearch.
  - `footer`: Copyright, links sociais e menção de Hugo + Hextra.
  - `search.flexsearch`: Habilitado para indexação automática de páginas e posts.

---

## 6. Pipeline de Integração Contínua (CI/CD)

Arquivo: `.github/workflows/deploy.yml`

```yaml
name: Deploy Hugo site to Pages

on:
  push:
    branches: ["master", "main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
          fetch-depth: 0

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: 'latest'
          extended: true

      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5

      - name: Build with Hugo
        env:
          HUGO_CACHEDIR: ${{ runner.temp }}/hugo_cache
          HUGO_ENVIRONMENT: production
        run: |
          hugo \
            --gc \
            --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 7. Critérios de Aceite e Verificação

1. **Compilação**: `hugo --gc --minify` executa sem erros ou warnings críticos.
2. **Navegação & SEO**: Todas as quatro rotas principais (`/`, `/portfolio/`, `/blog/`, `/roadmap/`) carregam corretamente com títulos e metadados adequados.
3. **Busca Local**: O mecanismo de busca FlexSearch retorna resultados instantâneos ao digitar palavras-chave de posts e projetos.
4. **Modo Escuro / Claro**: O alternador de temas funciona sem flashes de estilo e respeita a preferência do sistema.
5. **Kanban de Issues**:
   - Carrega as issues do repositório `alandvgarcia/alandvgarcia-blog`.
   - Organiza visualmente nas colunas de Backlog, Em Andamento e Concluído.
   - Aplica cache em `sessionStorage` para navegação rápida e economia de requisições.
   - Possui fallback claro caso o limite de requisições do GitHub seja atingido.
6. **Automação GitHub Pages**: O workflow de deploy executa com sucesso no GitHub Actions e entrega o site publicado.
