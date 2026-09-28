---
title: "Bem-vindo ao meu novo Blog e Portfólio!"
date: 2026-09-28
description: "Apresentação da nova plataforma, decisões de arquitetura e como o roadmap de issues é integrado em tempo real."
tags: ["Apresentação", "Hugo", "GitHub", "Engenharia"]
categories: ["Geral"]
---

Seja muito bem-vindo ao meu novo espaço digital!

Este site foi projetado com três objetivos fundamentais:
1. **Velocidade e Estética**: Renderizado de forma estática com **Hugo** e o tema **Hextra**, garantindo carregamento instantâneo e excelente tipografia.
2. **Portfólio e Conhecimento**: Centralizar projetos e tutoriais práticos sobre desenvolvimento mobile com Kotlin Multiplatform, Compose e Swift.
3. **Planejamento Aberto**: Um quadro de **Roadmap & Issues** integrado diretamente ao GitHub para que você possa acompanhar o que estou desenvolvendo no momento.

## Exemplo de Código com Destaque de Sintaxe

Como exemplo de suporte a blocos de código no Hextra, veja esta função declarativa em Kotlin:

```kotlin
data class Developer(
    val name: String,
    val focus: List<String>,
    val openForCollaborations: Boolean = true
)

fun getAlanProfile() = Developer(
    name = "Alan Garcia",
    focus = listOf("Kotlin Multiplatform", "Jetpack Compose", "Android", "iOS")
)
```

{{< callout type="tip" >}}
Fique à vontade para conferir o [Roadmap interativo](/roadmap/) e sugerir ideias de artigos criando uma issue!
{{< /callout >}}
