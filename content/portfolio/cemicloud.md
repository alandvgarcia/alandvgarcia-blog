---
title: "CemiCloud — Plataforma Mobile Multiplataforma"
date: 2026-09-28
draft: false
description: "Aplicativo Flutter multiplataforma (Android & iOS) com arquitetura Offline-First, busca textual otimizada no SQLite, mapas interativos e gestão de estado reativa."
techStack: ["Flutter", "Dart", "Android & iOS", "Offline-First", "SQLite", "BLoC & Cubit", "MobX", "RxDart", "Google Maps", "OAuth2 / PKCE", "Dio"]
playStoreUrl: "https://play.google.com/store/apps/details?id=com.cemicloud.cemicloud.android"
package: "com.cemicloud.cemicloud.android"
featured: true
---

<div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
  <a href="https://play.google.com/store/apps/details?id=com.cemicloud.cemicloud.android" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #01875f; color: white; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 0.9rem;">
    <span>▶ Ver na Google Play Store</span>
  </a>
</div>

## 📌 Visão Geral Técnica

O **CemiCloud** é uma solução móvel multiplataforma (**Android & iOS**) desenvolvida com o framework **Flutter (Dart 3)**. O projeto foi concebido com foco em alta disponibilidade em campo, resiliência em locais com baixa conectividade e navegação fluida para consultas rápidas.

Minha atuação no projeto concentrou-se na **arquitetura de software**, estruturação de pipelines de dados **Offline-First**, gestão de estado reativa com **BLoC/Cubit** e **RxDart**, integração de mapas interativos e comunicação de rede resiliente com autenticação segura via OAuth2.

---

## 🏛️ Arquitetura & Padrões de Engenharia

### 1. Padrão Mediator & Arquitetura Offline-First (Cache-First)
Para garantir que a aplicação continue completamente funcional em locais com conectividade instável ou inexistente, foi adotado o padrão **Mediator** desacoplando a camada de rede e a persistência local:
- **Fluxo Reativo com Dart Streams:** A interface solicita a listagem e recebe imediatamente a emissão do cache local via SQLite (`yield cachePage`), proporcionando carregamento instantâneo (*zero loading percebido*).
- **Sincronização em Segundo Plano:** Em paralelo, o mediador realiza a requisição HTTP via **Dio** para atualizar dados remotos. Ao obter a resposta, persiste em lote (`Batch`) no banco local e emite os dados consolidados para a UI.
- **Tolerância a Falhas Silenciosa:** Caso ocorra timeout ou perda de conexão, o erro de rede é absorvido sem bloquear o usuário, garantindo navegação contínua sobre os dados locais já sincronizados.

### 2. Persistência Local Avançada com SQLite
- **Busca Textual Indexada:** Tabelas locais estruturadas com suporte a buscas rápidas insensíveis a acentos e caracteres especiais para respostas imediatas.
- **Versionamento & Migrações:** Gerenciamento estruturado de esquema com migrações de banco de dados para evolução contínua da base local.
- **Cache Local de Mídias:** Armazenamento local de arquivos e imagens para visualização offline segura sem dependência de requisições repetidas de rede.

### 3. Gestão de Estado Híbrida & Reativa
O projeto combina ferramentas de gestão de estado adequadas para cada nível de complexidade:
- **BLoC & Cubit (`flutter_bloc`):** Fluxos de telas, paginação infinita e ciclos de vida de listagens gerenciados com estados imutáveis bem delimitados.
- **Programação Reativa com RxDart:** Utilização de `BehaviorSubject`, `PublishSubject` e operadores como `debounceTime`, `distinct()` e `switchMap()` para controlar a cadência de buscas em tempo real e unificação de filtros.
- **MobX:** Stores observáveis para modelos de domínio que exigem reatividade granular e sincronização dinâmica em tela.
- **Injeção de Dependências:** Composição hierárquica e distribuição de stores no topo da árvore de componentes com `MultiProvider`.

### 4. Visualização Espacial & Mapas Interativos
- **Navegação Interativa:** Componentes visuais com suporte a gestos de exploração, pan e zoom para facilitar a localização e orientação espacial.
- **Integração com Mapas:** Suporte a visualização geográfica nativa via **Google Maps SDK** e acionamento de rotas e direções externas.

### 5. Networking Resiliente & Autenticação OAuth2 / PKCE
- **Cliente HTTP com Dio:** Interceptor customizado com injeção automática de `Bearer Token`, detecção de expiração e mecanismo de **retentativa transparente** (`_retry`) após renovação de token no recebimento de status `401 Unauthorized`.
- **OAuth2 / OpenID Connect com PKCE:** Implementação do fluxo de autorização segura via `flutter_appauth`, com armazenamento seguro de chaves e tokens criptografados no Android Keystore e iOS Keychain com `flutter_secure_storage`.

### 6. Recursos de Áudio, Voz e Usabilidade
- **Busca por Voz:** Integração com reconhecimento de fala para agilizar a pesquisa de registros.
- **Player de Áudio:** Gerenciamento e reprodução de fluxos de áudio in-app com controle de ciclo de vida.

---

## 🛠️ Stack Técnica Completa

| Camada | Tecnologia / Pacote | Finalidade Técnica |
| :--- | :--- | :--- |
| **Framework & Linguagem** | Flutter 3.x / Dart 3 | Desenvolvimento multiplataforma unificado (Android e iOS) |
| **Persistência Local** | SQLite (`sqflite`) | Banco de dados relacional com busca textual e migrações |
| **Arquitetura de Dados** | Mediator Pattern | Estratégia Cache-First com sincronização assíncrona em background |
| **Gestão de Estado** | BLoC / Cubit (`flutter_bloc`) | Controle previsível de estados de tela, paginação e eventos |
| **Reatividade** | RxDart (`rxdart`) | Operadores reativos (`debounceTime`, `switchMap`, `merge`) |
| **Domínio Observável** | MobX (`mobx`) | Stores reativas de alta granularidade |
| **Injeção de Dependência** | Provider (`provider`) | Distribuição desacoplada de dependências na árvore de widgets |
| **Networking & HTTP** | Dio (`dio`) | Interceptors com auto-refresh de tokens e retries transparentes |
| **Segurança & Auth** | `flutter_appauth` + `flutter_secure_storage` | Autenticação OAuth2 / PKCE e armazenamento criptografado |
| **Mapas & Localização** | Google Maps SDK & Mapas Nativos | Visualização espacial e rotas |
| **Recursos de Voz & Áudio** | `speech_to_text` + `just_audio` | Reconhecimento de fala e player de áudio |
| **Design System** | Material Design 3 | Suporte nativo a Temas Claro e Escuro dinâmicos |
| **CI/CD & Automação** | GitHub Actions + `flutter drive` | Pipelines automatizados de release e testes de integração |

---

## 📲 Download & Disponibilidade

- **Google Play Store:** [CemiCloud no Google Play](https://play.google.com/store/apps/details?id=com.cemicloud.cemicloud.android)
- **Pacote:** `com.cemicloud.cemicloud.android`
- **Desenvolvedor / Empresa:** CemiCloud Soluções Inovadoras
