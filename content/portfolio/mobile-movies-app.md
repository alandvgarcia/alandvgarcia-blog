---
title: "Mobile Movies App - Android Nativo"
date: 2026-09-28
description: "Aplicação nativa Android em Kotlin com arquitetura MVVM, Jetpack Paging Library, Coroutines e Lifecycle para exibição paginada de filmes via TMDB API."
techStack: ["Kotlin", "Android SDK", "MVVM", "Jetpack Paging", "Coroutines", "Lifecycle", "Retrofit", "Glide"]
githubUrl: "https://github.com/alandvgarcia/mobile-movies-app"
featured: true
---

O **mobile-movies-app** é uma aplicação nativa Android desenvolvida em Kotlin focada nas melhores práticas de engenharia móvel recomendadas pelo Google, demonstrando domínio de arquitetura reativa, separação de camadas e paginação eficiente de dados em larga escala.

---

## 🎯 Desafios e Soluções

1. **Paginação Eficiente com Baixo Consumo de Memória**:
   - Integração com a **Android Jetpack Paging Library** para carregar lotes de dados sob demanda à medida que o usuário rola a lista, evitando travamentos na UI thread e reduzindo o consumo de memória.
2. **Reatividade e Ciclo de Vida**:
   - Uso de `ViewModel` e `LiveData`/`StateFlow` em conjunto com **Kotlin Coroutines** para garantir que requisições assíncronas sejam canceladas automaticamente quando o usuário sai da tela, prevenindo memory leaks.
3. **Imagens e Caching**:
   - Carregamento assíncrono e cache local de pôsteres em alta resolução com **Glide**, com transições suaves e estados de carregamento (placeholders).

---

## 🏗️ Arquitetura do Sistema

```text
mobile-movies-app/
├── data/
│   ├── api/                    # Contratos Retrofit e interceptors
│   ├── model/                  # DTOs da TMDB API
│   └── repository/             # Implementação do padrão Repository e DataSource paginado
├── domain/                     # Modelos de domínio desacoplados da API
└── ui/
    ├── adapter/                # PagedListAdapter com DiffUtil para atualizações cirúrgicas
    ├── viewmodel/              # ViewModel gerenciando estados de Loading, Sucesso e Erro
    └── view/                   # Activities e Fragments
```

---

## 📸 Demonstração e Telas

O projeto conta com interface fluida com grade de filmes, detalhes com sinopse e trailer, além de suporte a busca:

- **Listagem Principal**: Grid com scroll infinito e suporte a pull-to-refresh.
- **Tela de Detalhes**: Backdrop em alta definição, avaliação, gêneros e elenco.

---

## 🔗 Links e Recursos
- **Repositório no GitHub**: [github.com/alandvgarcia/mobile-movies-app](https://github.com/alandvgarcia/mobile-movies-app)
