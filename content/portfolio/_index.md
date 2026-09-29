---
title: "Portfólio & Atuação Profissional"
description: "Aplicativos em produção na Google Play Store, tecnologias, arquiteturas e práticas de engenharia de software com as quais atuo no dia a dia."
---

Aqui apresento meus aplicativos publicados na **Google Play Store**, bem como os principais pilares técnicos, linguagens e padrões arquiteturais que fazem parte da minha rotina diária como engenheiro de software especialista em ecossistemas móveis e multiplataforma.

---

## 📱 Aplicativos em Produção (Google Play Store)

Aplicativos móveis nativos e multiplataforma desenvolvidos com foco em performance, experiência do usuário e arquitetura limpa, disponíveis publicamente para download:

{{< cards >}}
  {{< card link="/portfolio/minha-biblia/" title="📖 Minha Bíblia — Devocional & Áudio TTS" subtitle="App Android 100% Jetpack Compose, arquitetura MVI pura, banco SQLite pré-populado com Room, sincronização de áudio Text-to-Speech (TTS) em tempo real e 100% offline." tag="Jetpack Compose • MVI • Room" >}}
  {{< card link="/portfolio/marca-tento/" title="🃏 Marca Tento — Contador & Placar de Truco" subtitle="App Android nativo em Jetpack Compose e Material 3 para controle ágil do placar de Truco, com feedback tátil, customização de regras e operação 100% offline." tag="Android Nativo • Compose • Offline" >}}
  {{< card link="/portfolio/cemicloud/" title="☁️ CemiCloud — Soluções Mobile" subtitle="Aplicativo Flutter multiplataforma (Android & iOS) com arquitetura Offline-First (Mediator), busca FTS4 no SQLite, mapeamento vetorial no Canvas e autenticação OAuth2 / PKCE." tag="Flutter • Dart • Offline-First • Canvas" >}}
{{< /cards >}}

> [!TIP]
> Clique nos cards acima para conferir o **estudo de caso completo**, detalhes de arquitetura, decisões técnicas e links diretos para download na **Google Play Store**.

---

## 🚀 Desenvolvimento Multiplataforma (KMP & CMP)

Foco contínuo na unificação de lógica de negócio e aceleração de entrega entre Android e iOS através de código compartilhado:

- **Módulos Compartilhados (*Commons*)**: Criação e manutenção de bibliotecas internas em **Kotlin Multiplatform (KMP)** contendo regras de negócio, contratos de dados, persistência e comunicação de rede.
- **Compose Multiplatform (CMP)**: Construção de componentes de interface declarativa e fluxos visuais compartilhados, mantendo consistência e reduzindo retrabalho entre plataformas.
- **Interoperabilidade**: Integração fluida entre o código compartilhado em Kotlin e o ambiente nativo de cada plataforma (Android/Kotlin e iOS/Swift).

---

## 📱 Android Nativo & Arquitetura Reativa

Experiência consolidada no desenvolvimento nativo para a plataforma Android com foco em performance e manutenibilidade:

- **UI Declarativa**: Criação de interfaces modernas, reutilizáveis e acessíveis com **Jetpack Compose**.
- **Assincronia e Fluxo de Dados**: Programação reativa com **Kotlin Coroutines** e **StateFlow / SharedFlow** para gerenciamento de estado previsível.
- **Padrões de Arquitetura**: Aplicação de **Clean Architecture**, **MVI (Model-View-Intent)** e **MVVM**, garantindo isolamento entre camadas de apresentação, domínio e dados.
- **Componentes do Jetpack**: Utilização de Lifecycle, Navigation, Paging 3, WorkManager e Room/SQLDelight para persistência local estruturada.

---

## ⚡ Conectividade & Sistemas Offline-First

Desenvolvimento de aplicações projetadas para operar de forma contínua em cenários de alta criticidade e conectividade variável:

- **Arquitetura Offline-First**: Persistência local atômica e confiável como fonte primária da verdade, permitindo uso integral da aplicação sem dependência de conexão imediata.
- **Sincronização em Segundo Plano**: Estratégias inteligentes de sincronização, resolução de conflitos e envio resiliente de dados acumulados assim que a rede estiver disponível.
- **Integração com Periféricos & Conectividade Local**: Comunicação resiliente com dispositivos e hardware externo através de protocolos de conexão local, garantindo troca de dados estável e tolerância a desconexões.

---

## 🍎 iOS & Integração com Swift

Atuação no ecossistema Apple com foco em interoperabilidade e suporte completo a produtos multiplataforma:

- **Linguagens e Frameworks**: Desenvolvimento utilizando **Swift**, **SwiftUI** e UIKit quando necessário.
- **Consumo de KMP**: Integração dos frameworks gerados pelo Kotlin Multiplatform no ciclo de vida das aplicações iOS.
- **Gerenciamento de Dependências**: Configuração e publicação via Swift Package Manager (SPM) e CocoaPods.

---

## 🛡️ Cultura de Engenharia, Qualidade & CI/CD

Compromisso com o rigor técnico, boas práticas de código e automação de processos:

- **Revisão de Código Estruturada**: Análise focada em dois eixos complementares — conformidade estrita com a especificação funcional e aderência aos padrões de código, identificação de code smells e design limpo.
- **Testes & Confiabilidade**: Desenvolvimento orientado a testes (TDD), testes unitários e de integração em camadas compartilhadas e nativas.
- **Pipelines de CI/CD**: Automação de compilação, análise estática (detekt, ktlint, SwiftLint) e publicação contínua com **GitHub Actions** para lojas de aplicativos.
