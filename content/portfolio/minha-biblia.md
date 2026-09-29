---
title: "Minha Bíblia — Leitura, Devocional & Áudio TTS"
date: 2026-09-28
draft: false
description: "Aplicativo Android moderno 100% em Jetpack Compose, arquitetura MVI, banco SQLite pré-populado com Room, Text-to-Speech com sincronização em tempo real e operação offline."
techStack: ["Jetpack Compose", "Kotlin", "Material 3", "MVI Architecture", "Room Database", "Coroutines & Flow", "Text-to-Speech (TTS)", "DataStore", "WorkManager", "Offline-First"]
playStoreUrl: "https://play.google.com/store/apps/details?id=com.advg.minhabibilia"
githubUrl: "https://github.com/alandvgarcia/MinhaBibilia"
package: "com.advg.minhabibilia"
featured: true
---

<div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
  <a href="https://play.google.com/store/apps/details?id=com.advg.minhabibilia" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #01875f; color: white; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 0.9rem;">
    <span>▶ Ver na Google Play Store</span>
  </a>
  <a href="https://github.com/alandvgarcia/MinhaBibilia" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #24292f; color: white; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 0.9rem; border: 1px solid #444;">
    <span>🔒 Repositório Privado no GitHub</span>
  </a>
</div>

## 📌 Visão Geral do Produto

O **Minha Bíblia** nasceu como um refúgio pessoal de meditação e estudo bíblico. Em um ecossistema com aplicativos sobrecarregados de menus complexos e anúncios intrusivos, o projeto foi concebido para oferecer uma experiência de leitura contínua, elegante, rápida e **100% offline**.

Publicado sob a assinatura **ADVG Software**, o aplicativo une o que há de mais moderno no desenvolvimento Android nativo: **100% Jetpack Compose**, arquitetura reativa **MVI (Model-View-Intent)** com fluxo unidirecional de dados (UDF), banco de dados local **Room** pré-populado, sincronização de voz com a engine nativa de **Text-to-Speech (TTS)** e respeitoso compromisso com a privacidade do usuário (*Privacy by Design*).

---

## 🏛️ Arquitetura & Decisões de Engenharia

O projeto foi estruturado seguindo rigorosos padrões de engenharia de software para garantir facilidade de manutenção, testes e altíssima performance em dispositivos de qualquer categoria:

### 1. Padrão MVI Puro (Model-View-Intent) & UDF
A interface reage exclusivamente a um fluxo unidirecional de dados imutável:
- **`UiState` (`BibleState`):** Modelo de estado único e imutável que centraliza a listagem de livros (Antigo e Novo Testamento), capítulos, versículos carregados, estado do player de áudio TTS, tamanho de fonte, tema ativo, favoritos e status de busca.
- **`UiIntent` (`BibleIntent`):** Intenções de ação emitidas pela UI de forma tipada (`LoadBooks`, `LoadChapter`, `PlayVerse`, `ToggleBookmark`, `SearchQuery`, `UpdateSettings`), processadas pelo `BibleViewModel`.
- **`UiEffect` (`BibleEffect`):** Canal de efeitos colaterais únicos (`Channel.BUFFERED`) consumidos como `Flow` para exibir toasts, feedbacks hápticos e eventos de navegação.

### 2. Injeção de Dependências Manual & Determinística
Ao invés de introduzir a sobrecarga de tempo de compilação e complexidade de anotações de bibliotecas como Hilt ou Dagger, o projeto utiliza **Injeção Manual / Service Locator** através de `BibleApp` e `BibleViewModelFactory`. Essa decisão arquitetural resulta em:
- Tempos de compilação expressivamente menores no Gradle.
- Dependências determinísticas e explícitas.
- Inicialização ultra-rápida no cold start da aplicação.

### 3. Persistência Local Reativa & Offline-First (Room + SQLite)
- **Banco Pré-populado:** Utilização do `Room.databaseBuilder(...).createFromAsset("database/bible.sqlite")`, garantindo acesso imediato a todos os 66 livros e mais de 31.000 versículos sem necessidade de download pós-instalação.
- **Consultas Reativas com Flow:** O `BibleDao` expõe fluxos reativos (`Flow<List<VerseEntity>>`) consumidos pelo repositório e pelo ViewModel, atualizando a UI instantaneamente conforme filtros ou bookmarks são acionados.
- **Migrações Controladas:** Histórico de migrações (`MIGRATION_1_2`) para adição de tabelas relacionais de marcações sem perda de dados do usuário.
- **DataStore Preferences:** Configurações de preferências visuais (tamanho da fonte, família tipográfica Serif/Sans, tema de fundo Claro/Escuro/Sépia) e parâmetros de áudio salvos via `SettingsManager`.

### 4. Player Global & Engine Text-to-Speech (TTS) com Auto-Scroll
- **Engine `TTSManager`:** Encapsula o `android.speech.tts.TextToSpeech` nativo com suporte a vozes em português (pt-BR), controle dinâmico de tom (*pitch*) e velocidade (*speech rate*).
- **Sincronização em Tempo Real:** Escuta eventos via `UtteranceProgressListener` e `onRangeStart`, mapeando a posição exata da fala com o versículo em exibição na tela.
- **Auto-Scroll Suave:** A tela realiza a rolagem automática sincronizada enquanto a leitura em áudio progride.
- **Player Desacoplado no Scaffold:** O player de áudio reside no nível superior do layout da `MainActivity`, permitindo que o usuário escute a Bíblia enquanto navega entre diferentes livros, capítulos ou busca.
- **UI Customizada:** Barra de progresso ondulada (`SquigglySlider`) personalizada para o player de áudio.

### 5. Agendamento em Segundo Plano & Notificações (WorkManager)
- **Devocional Diário:** Utilização de `PeriodicWorkRequestBuilder` do **WorkManager** (`ReminderWorker`) para disparar notificações diárias no horário escolhido pelo usuário.
- **Resiliência pós-reinicialização:** `BootReceiver` escuta a reinicialização do dispositivo para reagendar alarmes de forma transparente.

### 6. Qualidade, Otimização & Google Play APIs
- **R8 & Minificação:** Compilado com `isMinifyEnabled = true`, `isShrinkResources = true` e Proguard configurado para geração de APKs e App Bundles enxutos.
- **In-App Review API:** Integração com `com.google.android.play:review-ktx` via `InAppReviewManager` para solicitar feedback do usuário em momentos contextuais favoráveis.
- **Anúncios Nativos Integrados:** Integração de anúncios nativos elegantes com a paleta do app (`AdBanner`), sem pop-ups invasivos.

---

## 🗂️ Estrutura de Código

```
com.advg.minhabibilia/
├── BibleApp.kt                     # Application Class & Singletons
├── MainActivity.kt                # Host Activity & Scaffold Global
├── mvi/
│   └── MviBase.kt                 # Contratos genéricos: UiState, UiIntent, UiEffect, BaseViewModel
├── data/
│   ├── BootReceiver.kt            # Reagendamento automático de alarmes pós-boot
│   ├── NotificationHelper.kt      # Canais e builders de notificações
│   ├── ReminderWorker.kt          # WorkManager CoroutineWorker para lembretes diários
│   ├── SettingsManager.kt         # Jetpack DataStore Preferences
│   ├── TTSManager.kt              # Engine Text-to-Speech com rastreio de progresso
│   ├── dao/
│   │   └── BibleDao.kt            # Room DAO (Consultas reativas Flow e buscas textuais)
│   ├── database/
│   │   └── BibleDatabase.kt       # Room Database com migrações e createFromAsset
│   ├── entity/                    # Entidades relacionais (Book, Verse, Bookmark, Testament)
│   └── repository/                # Camada de Repositório (BibleRepository e BibleRepositoryImpl)
├── ui/
│   ├── bible/
│   │   ├── BibleContract.kt       # Definição de BibleState, BibleIntent e BibleEffect
│   │   ├── BibleViewModel.kt      # Processamento MVI central de dados e eventos
│   │   ├── BibleViewModelFactory.kt
│   │   ├── BooksScreen.kt         # Catálogo de livros, divisão testamentária e drawer
│   │   ├── ChaptersScreen.kt      # Seletor de capítulos em grade responsiva
│   │   ├── ReadingScreen.kt       # Leitura imersiva, gestos horizontais e áudio sincronizado
│   │   ├── SearchScreen.kt        # Mecanismo de busca textual em tempo real
│   │   ├── BookmarksScreen.kt     # Gestão de versículos favoritados
│   │   └── components/            # Componentes reutilizáveis (VerseItem, AudioPlayer, SquigglySlider)
│   ├── navigation/
│   │   └── BibleNavigation.kt     # NavHost Compose com animações personalizadas de transição
│   └── theme/                     # Paleta de cores, tipografia Serif/Sans e tema dinâmico
└── util/
    └── InAppReviewManager.kt      # Gerenciador da API de avaliações do Google Play
```

---

## 🛠️ Stack Técnica Completa

| Camada | Tecnologia / Biblioteca | Versão / Detalhes |
| :--- | :--- | :--- |
| **Linguagem & Compilador** | Kotlin + Kotlin Compose Compiler Plugin | `Kotlin 2.2.10` / Java 11 |
| **Build Tooling & KSP** | AGP 9.1.1 + KSP | `KSP 2.3.5` para Room e geração de código |
| **Android SDK Target** | Target / Compile SDK | `API 36` (Android 16) / Min SDK `24` |
| **UI Toolkit** | Jetpack Compose (Compose BOM) | `BOM 2024.09.00` |
| **Design System** | Material Design 3 (Material3) | Temas Claro, Escuro e Sépia com Dynamic Color |
| **Navegação** | Navigation Compose | `v2.8.9` com animações horizontais e fade |
| **Padrão de Arquitetura** | MVI (Model-View-Intent) | UDF com `StateFlow`, `SharedFlow` e `Channel` |
| **Banco de Dados Local** | Room Database | `v2.7.0` pré-populado com SQLite |
| **Preferências** | Jetpack DataStore Preferences | `v1.1.7` (`SettingsManager`) |
| **Background Processing** | Jetpack WorkManager | `v2.10.0` com `PeriodicWorkRequest` |
| **Áudio & Voz** | Android Text-to-Speech (TTS) API | Sincronização de utterance e auto-scroll |
| **Imagens** | Coil Compose | `v2.7.0` |
| **Otimização & Release** | R8 + Proguard | `isMinifyEnabled = true`, `isShrinkResources = true` |
| **Google Play Services** | In-App Review + Google Mobile Ads | `review-ktx:2.0.2` & `play-services-ads:23.6.0` |

---

## 📲 Download & Disponibilidade

- **Google Play Store:** [Minha Bíblia no Google Play](https://play.google.com/store/apps/details?id=com.advg.minhabibilia)
- **Pacote:** `com.advg.minhabibilia`
- **Desenvolvedor:** ADVG Software
- **Repositório:** [alandvgarcia/MinhaBibilia](https://github.com/alandvgarcia/MinhaBibilia) *(privado)*
