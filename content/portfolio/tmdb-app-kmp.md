---
title: "TMDBApp - Kotlin Multiplatform (KMP)"
date: 2026-09-28
description: "Aplicação móvel multiplataforma explorando Kotlin Multiplatform (KMP/KMM) para compartilhamento de regras de negócio, dados e consumo da TMDB API entre Android e iOS."
techStack: ["Kotlin Multiplatform", "KMM", "Android", "iOS", "Kotlin Coroutines", "Ktor", "kotlinx.serialization", "Clean Architecture"]
githubUrl: "https://github.com/alandvgarcia/TMDBApp"
featured: true
---

O **TMDBApp** é um projeto de exploração e consolidação de arquitetura móvel moderna utilizando **Kotlin Multiplatform (KMP / KMM)**, desenvolvido para testar na prática a viabilidade de compartilhamento de código de produção entre as plataformas **Android** e **iOS**.

---

## 🎯 Objetivo e Motivação

O objetivo central foi desacoplar as regras de negócio, contratos de dados, chamadas de rede e persistência das particularidades de cada sistema operacional, mantendo a camada de visualização (UI) nativa em cada plataforma:

- **Android**: Interface nativa consumindo estados reativos emitidos pelo módulo compartilhado.
- **iOS**: Consumo do framework compilado em Kotlin via Objective-C/Swift interop nativo.

---

## 🏗️ Arquitetura do Projeto

O projeto adota os princípios de **Clean Architecture** com isolamento estrito de responsabilidades:

```text
TMDBApp/
├── shared/                     # Módulo Kotlin Multiplatform compartilhado
│   ├── commonMain/             # Regras de negócio, Use Cases, Repositories e Ktor Client
│   ├── androidMain/            # Implementações específicas de Android (ex: driver de banco, Dispatchers)
│   └── iosMain/                # Implementações específicas de iOS
├── androidApp/                 # Aplicação nativa Android (Gradle, Android SDK)
└── iosApp/                     # Aplicação nativa iOS (Xcode Workspace, SwiftUI/UIKit)
```

### Tecnologias e Bibliotecas Utilizadas
- **Kotlin Multiplatform Core**: Kotlin 1.9+ com compilação multi-target.
- **Networking**: [Ktor Client](https://ktor.io/) com suporte a engines nativas (`OkHttp` no Android e `Darwin` no iOS).
- **Serialização**: `kotlinx.serialization` para parsing JSON de alto desempenho sem reflection.
- **Assincronia e Reatividade**: Kotlin Coroutines e `Flow` para fluxos de dados unidirecionais.
- **Gestão de Dependências**: `buildSrc` com Kotlin DSL centralizando versões e dependências.

---

## 💡 Destaques de Implementação

### 1. Chamada de API Compartilhada no `commonMain`
A comunicação com a API do The Movie Database (TMDB) é inteiramente implementada no código compartilhado:

```kotlin
class MovieRepository(private val apiClient: TmdbApiClient) {
    suspend fun getPopularMovies(page: Int): Result<List<Movie>> {
        return try {
            val response = apiClient.fetchPopularMovies(page)
            Result.success(response.results.map { it.toDomain() })
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
```

### 2. Consumo Fluido no iOS
O framework gerado pelo Kotlin Multiplatform expõe classes e fluxos que são consumidos diretamente em Swift:

```swift
import shared

class MoviesViewModel: ObservableObject {
    private let repository: MovieRepository = RepositoryHelper().getMovieRepository()
    @Published var movies: [Movie] = []

    func loadMovies() {
        repository.getPopularMovies(page: 1) { result, error in
            if let movies = result {
                DispatchQueue.main.async {
                    self.movies = movies
                }
            }
        }
    }
}
```

---

## 🔗 Links e Recursos
- **Repositório no GitHub**: [github.com/alandvgarcia/TMDBApp](https://github.com/alandvgarcia/TMDBApp)
- **Demonstração em Vídeo**: Disponível no README do repositório demonstrando a sincronização entre emuladores.
