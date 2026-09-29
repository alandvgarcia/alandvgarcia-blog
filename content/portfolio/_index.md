---
title: "Portfólio & Atuação Profissional"
description: "Aplicativos em produção na Google Play Store, atuação corporativa na Solinftec e visão técnica das tecnologias e práticas do dia a dia."
---

Aqui apresento meus aplicativos publicados na **Google Play Store**, minha **trajetória corporativa de mais de 8 anos na Solinftec** atuando em projetos privados de grande escala, bem como os principais pilares técnicos e arquiteturais que fazem parte da minha rotina diária como engenheiro especialista móvel e multiplataforma.

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

## 🏢 Atuação Corporativa & Projetos Privados (Solinftec • 8+ anos)

Atuo há mais de **8 anos e 5 meses** na **Solinftec** (Araçatuba, SP), evoluindo continuamente na engenharia e liderança de soluções móveis corporativas de missão crítica:

### 📈 Trajetória Profissional

- 🌟 **Especialista Desenvolvedor Mobile** *(abr. de 2023 – o momento · Remoto)*
  - Liderança técnica no desenho, desenvolvimento, testes e sustentação de ecossistemas móveis utilizando **Kotlin Multiplatform Mobile (KMM / KMP)** e **Compose Multiplatform (CMP)** para unificar regras de negócio e interfaces compartilhadas entre iOS e Android.
  - Definição de padrões de arquitetura corporativa, orientação técnica a desenvolvedores da equipe e garantia de paridade de recursos entre as plataformas.
  - *Competências principais:* Kotlin, Kotlin Multiplatform (KMM), iOS (Swift), Android, Compose Multiplatform, Arquitetura Reativa.

- 🚀 **Analista de Desenvolvimento Mobile Sênior** *(out. de 2021 – set. de 2023 · Híbrido)*
  - Desenvolvimento avançado de aplicações nativas para Android e iOS.
  - Implementação e estruturação da camada de dados compartilhada com **KMM (Kotlin Multiplatform Mobile)**, integrando repositórios unificados, bancos locais e comunicação com serviços corporativos.
  - *Competências principais:* Coroutines & Flow, Integração Contínua (CI/CD), KMM, Swift, Kotlin.

- 🛠️ **Analista de Desenvolvimento Mobile Pleno** *(mai. de 2018 – out. de 2021)*
  - Desenvolvimento e manutenção contínua de aplicações nativas Android e iOS.
  - Implementação de fluxos assíncronos, refatorações de código legado e construção de rotinas de automação de compilação e testes (CI).
  - *Competências principais:* Android SDK, iOS, CI, Kotlin Coroutines, Git.

---

### ⚙️ O que toco no dia a dia em projetos privados corporativos

Mantendo a confidencialidade das regras de negócio proprietárias, os projetos privados corporativos que desenvolvo e sustento envolvem desafios técnicos de alto impacto:

1. **Unificação Multiplataforma com Módulos *Commons* (KMP & CMP):**
   - Criação de bibliotecas internas compartilhadas que encapsulam contratos de API, serialização, persistência local, algoritmos de domínio e validações de dados.
   - Construção de fluxos e telas em **Compose Multiplatform**, permitindo que a mesma interface declarativa seja executada com fluidez nativa tanto no Android quanto no iOS.

2. **Sistemas de Missão Crítica com Arquitetura Offline-First:**
   - Aplicações projetadas para operação industrial ininterrupta em campo e ambientes remotos com conectividade intermitente ou inexistente.
   - Persistência local atômica e confiável como fonte única da verdade, com estratégias de enfileiramento, resolução de conflitos e sincronização assíncrona em background.

3. **Conectividade Local & Integração com Periféricos:**
   - Comunicação e troca de dados em tempo real com hardware e periféricos externos através de conexões locais, tratando desconexões inesperadas com reconexão automática e telemetria resiliente.

4. **Concorrência Segura & Programação Reativa:**
   - Uso intensivo de **Kotlin Coroutines** e **StateFlow / SharedFlow** para orquestração de fluxos complexos de dados sem bloquear a thread principal (UI).

5. **Engenharia de Release & Automação CI/CD:**
   - Configuração de esteiras no **GitHub Actions** para compilação multiplataforma, análise estática de código (detekt, ktlint, SwiftLint), execução de suítes de testes unitários e geração automatizada de artefatos para distribuição.

---

## 🚀 Pilares Técnicos Detalhados

Abaixo estão detalhadas as tecnologias e práticas que consolidam minha atuação diária:

### 🧩 Desenvolvimento Multiplataforma (KMP & CMP)
- **Módulos Compartilhados (*Commons*)**: Criação e manutenção de bibliotecas internas em **Kotlin Multiplatform (KMP)** contendo regras de negócio, contratos de dados, persistência e comunicação de rede.
- **Compose Multiplatform (CMP)**: Construção de componentes de interface declarativa e fluxos visuais compartilhados, mantendo consistência e reduzindo retrabalho entre plataformas.
- **Interoperabilidade**: Integração fluida entre o código compartilhado em Kotlin e o ambiente nativo de cada plataforma (Android/Kotlin e iOS/Swift).

### 📱 Android Nativo & Arquitetura Reativa
- **UI Declarativa**: Criação de interfaces modernas, reutilizáveis e acessíveis com **Jetpack Compose**.
- **Assincronia e Fluxo de Dados**: Programação reativa com **Kotlin Coroutines** e **StateFlow / SharedFlow** para gerenciamento de estado previsível.
- **Padrões de Arquitetura**: Aplicação de **Clean Architecture**, **MVI (Model-View-Intent)** e **MVVM**, garantindo isolamento entre camadas de apresentação, domínio e dados.
- **Componentes do Jetpack**: Utilização de Lifecycle, Navigation, Paging 3, WorkManager e Room/SQLDelight para persistência local estruturada.

### ⚡ Conectividade & Sistemas Offline-First
- **Arquitetura Offline-First**: Persistência local atômica e confiável como fonte primária da verdade, permitindo uso integral da aplicação sem dependência de conexão imediata.
- **Sincronização em Segundo Plano**: Estratégias inteligentes de sincronização, resolução de conflitos e envio resiliente de dados acumulados assim que a rede estiver disponível.
- **Integração com Periféricos & Conectividade Local**: Comunicação resiliente com dispositivos e hardware externo através de protocolos de conexão local, garantindo troca de dados estável e tolerância a desconexões.

### 🍎 iOS & Integração com Swift
- **Linguagens e Frameworks**: Desenvolvimento utilizando **Swift**, **SwiftUI** e UIKit quando necessário.
- **Consumo de KMP**: Integração dos frameworks gerados pelo Kotlin Multiplatform no ciclo de vida das aplicações iOS.
- **Gerenciamento de Dependências**: Configuração e publicação via Swift Package Manager (SPM) e CocoaPods.

### 🛡️ Cultura de Engenharia, Qualidade & CI/CD
- **Revisão de Código Estruturada**: Análise focada em dois eixos complementares — conformidade estrita com a especificação funcional e aderência aos padrões de código, identificação de code smells e design limpo.
- **Testes & Confiabilidade**: Desenvolvimento orientado a testes (TDD), testes unitários e de integração em camadas compartilhadas e nativas.
- **Pipelines de CI/CD**: Automação de compilação, análise estática (detekt, ktlint, SwiftLint) e publicação contínua com **GitHub Actions** para lojas e ambientes corporativos.
