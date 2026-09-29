---
title: "Compose Multiplatform Study (CMP)"
date: 2026-09-28
description: "Estudo prático de Compose Multiplatform compartilhando 100% da interface do usuário (UI declarativa) e lógica entre Android e iOS."
techStack: ["Compose Multiplatform", "CMP", "Kotlin", "Android", "iOS", "Material 3", "Declarative UI"]
githubUrl: "https://github.com/alandvgarcia/compose-mpp-study"
featured: true
---

O **compose-mpp-study** é um projeto laboratório focado nas capacidades do **Compose Multiplatform (CMP)** da JetBrains, permitindo que a mesma interface declarativa escrita em Kotlin seja renderizada de forma nativa e fluida tanto no **Android** quanto no **iOS** (via Skiko/Metal).

---

## 🎯 Objetivo do Projeto

Com a evolução do ecossistema multiplataforma, o compartilhamento de código foi além da camada lógica e alcançou a camada de apresentação. O projeto explora:
1. **Unificação de Telas**: Renderização dos mesmos componentes `@Composable` em ambas as plataformas.
2. **Sistema de Temas Compartilhado**: `MaterialTheme` unificado com paleta de cores, tipografia e suporte a Dark/Light mode.
3. **Animações e Efeitos Visuais**: Utilização de `AnimatedVisibility` e transições de estado sincronizadas.
4. **Gerenciamento de Recursos Multiplataforma**: Imagens vetoriais, strings e fontes acessadas de forma agnóstica de plataforma (`ExperimentalResourceApi`).

---

## 🏗️ Estrutura do Código Compartilhado

A tela principal e seus componentes residem em `shared/src/commonMain/kotlin/App.kt`:

```kotlin
@OptIn(ExperimentalResourceApi::class)
@Composable
fun App() {
    MaterialTheme {
        var greetingText by remember { mutableStateOf("Hello, World!") }
        var showImage by remember { mutableStateOf(false) }

        Column(
            modifier = Modifier.fillMaxWidth().padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Button(onClick = {
                greetingText = "Hello, ${getPlatformName()}"
                showImage = !showImage
            }) {
                Text(greetingText)
            }

            AnimatedVisibility(visible = showImage) {
                Image(
                    painter = painterResource("compose-multiplatform.xml"),
                    contentDescription = "Compose Multiplatform Logo"
                )
            }
        }
    }
}
```

---

## 📱 Execução no Android e iOS

- **No Android**: O `MainActivity` simplesmente delega o desenho da tela chamando `App()` dentro de `setContent {}`.
- **No iOS**: O framework Kotlin expõe um `ComposeUIViewController` que é instanciado e embutido diretamente na hierarquia do UIKit / SwiftUI no Xcode:

```swift
import UIKit
import shared

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        window = UIWindow(frame: UIScreen.main.bounds)
        window?.rootViewController = Main_iosKt.MainViewController()
        window?.makeKeyAndVisible()
        return true
    }
}
```

---

## 🔗 Links e Recursos
- **Repositório no GitHub**: [github.com/alandvgarcia/compose-mpp-study](https://github.com/alandvgarcia/compose-mpp-study)
