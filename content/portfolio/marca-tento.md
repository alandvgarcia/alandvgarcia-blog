---
title: "Marca Tento — Contador & Placar de Truco"
date: 2026-09-28
draft: false
description: "Aplicativo Android nativo construído com Jetpack Compose para controle ágil do placar e tento de partidas de Truco, com feedback tátil, customização de pontuação e operação 100% offline."
techStack: ["Jetpack Compose", "Kotlin", "Android SDK Nativo", "Material Design 3", "Jetpack ViewModel", "StateFlow", "Offline-First", "Haptic Feedback"]
playStoreUrl: "https://play.google.com/store/apps/details?id=com.alandvgarcia.marcatento&hl=pt_BR"
package: "com.alandvgarcia.marcatento"
featured: true
---

<div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
  <a href="https://play.google.com/store/apps/details?id=com.alandvgarcia.marcatento&hl=pt_BR" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #01875f; color: white; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 0.9rem;">
    <span>▶ Ver na Google Play Store</span>
  </a>
</div>

## 📌 Visão Geral do Produto

O **Marca Tento** é um aplicativo Android desenvolvido em **Kotlin** e **Jetpack Compose** para solucionar um problema clássico das rodadas de Truco entre amigos: a necessidade de improvisar marcações com feijão, milho, fósforos ou tampas de garrafa.

O objetivo do projeto foi entregar uma experiência visual limpa, extremamente rápida e responsiva, que permita a qualquer jogador controlar o placar em frações de segundo, sem perder a concentração na mesa de jogo.

---

## 🏗️ Arquitetura & Decisões de Engenharia

O aplicativo foi projetado seguindo as diretrizes modernas recomendadas pela equipe do Android para utilitários de alta performance:

### 1. UI Declarativa Moderna com Jetpack Compose
- **100% Compose:** Toda a interface foi implementada com Jetpack Compose e Material Design 3, eliminando completamente layouts XML legados.
- **Ergonomia & Usabilidade:** Botões e áreas de interação desenhados com espaçamento generoso para permitir que o usuário opere o contador usando apenas o polegar com uma mão.
- **Suporte a Temas:** Suporte nativo a temas Claro e Escuro (*Dark Mode*), com alto contraste para visibilidade em diferentes ambientes (churrascos ao ar livre, bares ou iluminação noturna).

### 2. Arquitetura Reativa & Gerenciamento de Estado
- **MVVM / Clean Architecture:** Separação estrita de responsabilidades entre a camada de visualização (Composables), modelos de visão e lógica de pontuação.
- **ViewModel & StateFlow:** O estado do jogo (pontuação atual da rodada, contagem de tentos, vitórias de quedas anteriores e nomes das equipes) é emitido de forma reativa e imutável via `StateFlow`.
- **Resiliência a Mudanças de Configuração:** Blindagem total contra perda de dados em rotações de tela ou mudanças de contexto no dispositivo (*configuration changes*).

### 3. Persistência Local & Resiliência (100% Offline-First)
- **Zero Dependência de Rede:** O aplicativo funciona de maneira completamente autônoma, sem necessidade de internet e sem requisição de permissões invasivas do sistema operacional.
- **Preferências Customizáveis:** Limite de pontos da queda configurável (12 ou 24 pontos), personalização dos nomes das duplas e retenção automática do estado caso o app seja minimizado.

### 4. Feedback Multissensorial & Acessibilidade
- **Haptic Feedback Integrado:** Resposta tátil calibrada para cada tipo de incremento (tento individual, truco valendo 3, seis, nove, doze e vitória da rodada), garantindo que o usuário sinta a confirmação do toque sem precisar desviar a atenção visual das cartas.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
| :--- | :--- |
| **Kotlin** | Linguagem principal do projeto, usufruindo de concorrência segura e tipagem estática. |
| **Android SDK Nativo** | Integração direta com os recursos do sistema operacional Android. |
| **Jetpack Compose** | Toolkit moderno de interface declarativa nativa para Android. |
| **Material Design 3** | Componentes visuais com suporte a temas e tipografia consistente. |
| **Jetpack ViewModel & Lifecycle** | Gerenciamento do ciclo de vida e estado reativo da tela. |
| **Kotlin Coroutines & StateFlow** | Fluxos de dados assíncronos e estados imutáveis previsíveis. |
| **Haptic Feedback & Vibrator API** | Confirmação sensorial tátil imediata para jogadas e pontuação. |
| **Offline-First Local Storage** | Armazenamento de preferências e configurações locais. |

---

## 📲 Download & Disponibilidade

- **Google Play Store:** [Marca Tento no Google Play](https://play.google.com/store/apps/details?id=com.alandvgarcia.marcatento&hl=pt_BR)
- **Pacote:** `com.alandvgarcia.marcatento`
- **Categoria:** Jogos de Cartas / Entretenimento
