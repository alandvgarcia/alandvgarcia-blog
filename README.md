# Alan Garcia | Blog Pessoal & Portfólio

Website pessoal e profissional construído com [Hugo Extended](https://gohugo.io/) e o tema moderno [Hextra](https://imfing.github.io/hextra/), focado no ecossistema **Kotlin Multiplatform (KMP), Compose Multiplatform (CMP), Android e iOS**.

## 🚀 Estrutura do Site

- **Início (`/`)**: Apresentação profissional, experiência na Solinftec, especialidades e no que mexo no dia a dia.
- **Portfólio (`/portfolio/`)**: Projetos em destaque, bibliotecas open-source e estudos de caso arquiteturais detalhados (KMP, CMP, Android MVVM, MapLibre GL).
- **Blog (`/blog/`)**: Artigos técnicos e tutoriais escritos em Markdown com suporte a Table of Contents e destaque de sintaxe para Kotlin, Swift, YAML, etc.

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

## 🚢 Deploy Automatizado

A cada push na branch principal (`master`), o GitHub Actions compila o site e publica automaticamente no GitHub Pages.
