---
title: "CemiCloud — Plataforma Mobile Multiplataforma"
date: 2026-09-28
draft: false
description: "Aplicativo Flutter multiplataforma (Android & iOS) com arquitetura Offline-First, busca FTS4 no SQLite, mapeamento vetorial customizado no Canvas com Ray-Casting e gestão de estado reativa."
techStack: ["Flutter", "Dart", "Android & iOS", "Offline-First", "SQLite FTS4", "BLoC & Cubit", "MobX", "RxDart", "CustomPainter", "OAuth2 / PKCE", "Dio"]
playStoreUrl: "https://play.google.com/store/apps/details?id=com.cemicloud.cemicloud.android"
githubUrl: "https://github.com/Cemicloud/cemicloud_app"
package: "com.cemicloud.cemicloud.android"
featured: true
---

<div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
  <a href="https://play.google.com/store/apps/details?id=com.cemicloud.cemicloud.android" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #01875f; color: white; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 0.9rem;">
    <span>▶ Ver na Google Play Store</span>
  </a>
  <a href="https://github.com/Cemicloud/cemicloud_app" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #24292f; color: white; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 0.9rem; border: 1px solid #444;">
    <span>🔒 Repositório no GitHub</span>
  </a>
</div>

## 📌 Visão Geral Técnica

O **CemiCloud** é uma solução móvel multiplataforma (**Android & iOS**) desenvolvida com o framework **Flutter (Dart 3)**. O projeto foi projetado com foco em alta disponibilidade em campo, resiliência de rede e processamento gráfico vetorial para visualização espacial e consultas rápidas.

Minha atuação no projeto concentrou-se na **arquitetura de software**, estruturação de pipelines de dados **Offline-First**, gestão de estado reativa com **BLoC/Cubit** e **RxDart**, desenho vetorial customizado de alta performance no **Canvas** e comunicação de rede resiliente com renovação transparente de sessão via tokens OAuth2.

---

## 🏛️ Arquitetura & Padrões de Engenharia

### 1. Padrão Mediator & Arquitetura Offline-First (Cache-First)
Para garantir que a aplicação continue completamente funcional em locais com conectividade instável ou inexistente, foi adotado o padrão **Mediator** desacoplando a camada de rede e a persistência local:
- **Fluxo Reativo com Dart Streams:** A interface solicita a listagem e recebe imediatamente a emissão do cache local via SQLite (`yield cachePage`), proporcionando carregamento instantâneo (*zero loading percebido*).
- **Sincronização em Segundo Plano:** Em paralelo, o mediador realiza a requisição HTTP via **Dio** para atualizar dados remotos. Ao obter a resposta, persiste em lote (`Batch`) no banco local e emite os dados consolidados para a UI.
- **Tolerância a Falhas Silenciosa:** Caso ocorra timeout ou perda de conexão, o erro de rede é absorvido sem bloquear o usuário, garantindo navegação contínua sobre os dados locais já sincronizados.

### 2. Persistência Local Avançada com SQLite & FTS4
- **Full-Text Search (FTS4):** Criação de tabelas virtuais SQLite FTS4 com o tokenizador `unicode61 "remove_diacritics=1"`, permitindo buscas textuais instantâneas locais insensíveis a acentos e cedilhas.
- **Versionamento & Migrações:** Gerenciamento estruturado de esquema com migrações de banco de dados (V1 a V7) com integridade referencial ativa (`PRAGMA foreign_keys = ON`).
- **Cache de Mídias em BLOB:** Armazenamento local de arquivos e imagens para visualização offline segura sem dependência de requisições repetidas de rede.

### 3. Gestão de Estado Híbrida & Reativa
O projeto combina ferramentas de gestão de estado adequadas para cada nível de complexidade:
- **BLoC & Cubit (`flutter_bloc`):** Fluxos de telas, paginação infinita e ciclos de vida de listagens gerenciados com estados imutáveis bem delimitados.
- **Programação Reativa com RxDart:** Utilização de `BehaviorSubject`, `PublishSubject` e operadores como `debounceTime(500ms)`, `distinct()` e `switchMap()` para controlar a cadência de buscas em tempo real e unificação de filtros.
- **MobX (`mobx` + `mobx_codegen`):** Stores observáveis para modelos de domínio que exigem reatividade granular e alta frequência de mutação em tela.
- **Injeção de Dependências:** Composição hierárquica e distribuição de stores no topo da árvore de componentes com `MultiProvider`.

### 4. Mapeamento Vetorial Customizado & Algoritmos Geométricos
- **Renderização em Canvas com `CustomPainter`:** Mapeamento espacial vetorial desenhando polígonos e polylines sobre mapas e plantas interativas com suporte a pan, rotação e pinça de zoom via `InteractiveViewer` e `TransformationController`.
- **Algoritmo de Ray-Casting (Point-in-Polygon):** Implementação algorítmica em Dart para detecção precisa de toque do usuário em polígonos com geometria irregular no Canvas, identificando elementos espaciais selecionados em tempo real.
- **Google Maps SDK:** Integração com mapas nativos via `google_maps_flutter` para visualização e direções externas com `maps_launcher`.

### 5. Networking Resiliente & Autenticação OAuth2 / PKCE
- **Cliente HTTP com Dio:** Interceptor customizado com injeção automática de `Bearer Token`, detecção de expiração e mecanismo de **retentativa transparente** (`_retry`) após renovação de token no recebimento de status `401 Unauthorized`.
- **OAuth2 / OpenID Connect com PKCE:** Implementação do fluxo de autorização segura via `flutter_appauth`, com armazenamento seguro de chaves e tokens criptografados no Android Keystore e iOS Keychain com `flutter_secure_storage`.

### 6. Áudio, Voz e Acessibilidade
- **Busca por Voz:** Integração com reconhecimento de fala contínuo via `speech_to_text`.
- **Player de Áudio:** Gerenciamento e reprodução de fluxos de áudio in-app com `just_audio`.

---

## 🛠️ Stack Técnica Completa

| Camada | Tecnologia / Pacote | Finalidade Técnica |
| :--- | :--- | :--- |
| **Framework & Linguagem** | Flutter 3.x / Dart 3 | Desenvolvimento multiplataforma unificado (Android e iOS) |
| **Persistência Local** | `sqflite` (SQLite + FTS4) | Banco de dados relacional com busca textual avançada e migrações |
| **Arquitetura de Dados** | Mediator Pattern | Estratégia Cache-First com sincronização assíncrona em background |
| **Gestão de Estado** | BLoC / Cubit (`flutter_bloc`) | Controle previsível de estados de tela, paginação e eventos |
| **Reatividade** | RxDart (`rxdart`) | Operadores reativos (`debounceTime`, `switchMap`, `merge`) |
| **Domínio Observável** | MobX (`mobx`, `mobx_codegen`) | Stores reativas de alta granularidade |
| **Injeção de Dependência** | Provider (`provider`) | Distribuição desacoplada de dependências na árvore de widgets |
| **Networking & HTTP** | Dio (`dio`) | Interceptors com auto-refresh de tokens e retries transparentes |
| **Segurança & Auth** | `flutter_appauth` + `flutter_secure_storage` | Autenticação OAuth2 / PKCE e armazenamento criptografado |
| **Computação Gráfica** | `CustomPainter` + Ray-Casting | Renderização vetorial e detecção geométrica de toques em polígonos |
| **Geolocalização & Mapas** | `google_maps_flutter` | Integração com SDK do Google Maps nativo |
| **Recursos de Voz & Áudio** | `speech_to_text` + `just_audio` | Reconhecimento de fala e player de áudio |
| **Design System** | Material Design 3 | Suporte nativo a Temas Claro e Escuro dinâmicos |
| **CI/CD & Automação** | GitHub Actions + `flutter drive` | Pipelines automatizados de release e testes de integração |

---

## 📲 Download & Disponibilidade

- **Google Play Store:** [CemiCloud no Google Play](https://play.google.com/store/apps/details?id=com.cemicloud.cemicloud.android)
- **Pacote:** `com.cemicloud.cemicloud.android`
- **Desenvolvedor / Empresa:** CemiCloud Soluções Inovadoras
- **Repositório:** [Cemicloud/cemicloud_app](https://github.com/Cemicloud/cemicloud_app) *(privado)*
