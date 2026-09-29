---
title: "Solinftec Mobile Platform - Arquitetura & Ecossistema"
date: 2026-09-28
description: "Liderança e engenharia em plataforma mobile corporativa de missão crítica na Solinftec, utilizando Kotlin Multiplatform (KMP), Compose Multiplatform (CMP), arquitetura offline-first e integração com hardware IoT/BLE."
techStack: ["Kotlin Multiplatform", "Compose Multiplatform", "Android", "iOS", "Swift", "BLE", "Offline-First", "SQLDelight", "Coroutines Flow", "CI/CD"]
githubUrl: "https://github.com/alandvgarcia"
featured: true
---

A **Plataforma Mobile da Solinftec** é um ecossistema de soluções de alta criticidade e escala para a agricultura digital global, processando dados em tempo real de frotas agrícolas, robôs autônomos e estações meteorológicas em ambientes com conectividade restrita ou nula.

---

## 🎯 Desafios de Engenharia

1. **Ambientes Extremos e Sem Conectividade (Offline-First)**:
   - Maquinários e operadores trabalham em lavouras sem sinal celular por horas ou dias. A arquitetura exige persistência local atômica e protocolos robustos de sincronização em segundo plano assim que a conectividade for restabelecida.
2. **Duplicação de Código entre Android e iOS**:
   - Manter regras complexas de telemetria, cálculos agronômicos e protocolos proprietários duplicados entre Swift e Kotlin gerava inconsistências. A adoção de **Kotlin Multiplatform (KMP)** unificou o core em uma biblioteca compartilhada (*Commons*).
3. **Comunicação em Tempo Real com Hardware via Bluetooth Low Energy (BLE)**:
   - Conexão e telemetria contínua com computadores de bordo e sensores IoT móveis via BLE com reconexão resiliente e tratamento rigoroso de filas de pacotes.

---

## 🏗️ Pilares de Arquitetura

### 1. Módulos Compartilhados (*Commons* com KMP)
- As regras de validação de campo, parsing de telemetria, persistência local (SQLDelight) e clientes de sincronização de dados (Ktor) residem em módulos `commonMain`.
- Apenas as integrações de baixo nível com o rádio Bluetooth e drivers de periféricos utilizam implementações `expect/actual` específicas de cada plataforma.

### 2. Interface Declarativa com Compose Multiplatform (CMP)
- Telas operacionais e dashboards analíticos construídos com componentes de UI Compose compartilhados, garantindo paridade visual e aceleração do ciclo de entrega tanto no Android quanto no iOS.

### 3. Conectividade Bluetooth Low Energy (BLE)
- Máquinas de estado baseadas em **Kotlin Coroutines Flow** para gerenciar o ciclo de vida BLE:
  `Scanning` ➔ `Connecting` ➔ `Discovering Services` ➔ `Subscribing MTU/Notifications` ➔ `Data Streaming`.

---

## 🛡️ Cultura de Engenharia & Qualidade de Código

- **Revisão de Código em Dois Eixos**:
  - *Eixo de Especificação*: Validação estrita contra os critérios de aceite e regras de negócio da issue.
  - *Eixo de Padrões*: Análise de code smells (baseados no catálogo de Martin Fowler), coesão, acoplamento, vazamento de abstração e convenções da plataforma.
- **Automação de CI/CD**:
  - Pipelines de validação estática de código (detekt, ktlint, SwiftLint), testes unitários em matriz de targets e compilação automatizada.
