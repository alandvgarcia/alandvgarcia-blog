---
title: "MapLibre GL Android Integration"
date: 2026-09-28
description: "Renderização de mapas vetoriais de alto desempenho, marcações personalizadas e cálculos geoespaciais em Android nativo com MapLibre GL SDK e Turf."
techStack: ["Kotlin", "Android", "MapLibre GL SDK", "Turf.js/Turf Java", "Vector Tiles", "GIS", "Annotations"]
githubUrl: "https://github.com/alandvgarcia/MapLibreTest"
featured: true
---

O **MapLibreTest** é um projeto de experimentação e integração em engenharia mobile focado em sistemas de informação geográfica (**GIS**) no Android, utilizando o SDK open-source **MapLibre GL Native** em conjunto com a biblioteca de computação espacial **Turf**.

---

## 🎯 Contexto e Aplicação

Aplicações para áreas como agricultura de precisão, logística, frotas e telemetria exigem a renderização fluida de mapas vetoriais complexos contendo milhares de pontos georreferenciados, talhões, trajetórias de maquinários e zonas de interesse, muitas vezes sem depender de serviços proprietários ou com restrições de conectividade.

O projeto demonstra:
1. **Renderização de Mapas Vetoriais**: Uso de fontes de tiles vetoriais abertas e customizadas com renderização acelerada por GPU (OpenGL/Vulkan).
2. **Gerenciamento Dinâmico de Marcadores**: Utilização dos plugins de anotação (`annotation-plugin` e `markerview-plugin`) para desenhar marcadores interativos com alto frame rate.
3. **Cálculos Geoespaciais com Turf**:
   - Medição de distâncias geodésicas e áreas de polígonos.
   - Algoritmos de ponto em polígono (*Point-in-Polygon*) para detecção de limites e cercas eletrônicas (*geofencing*).
   - Simplificação de trajetórias de linhas para otimizar a renderização.

---

## 💡 Trecho de Código

```kotlin
class MapActivity : AppCompatActivity() {

    private lateinit var mapView: MapView
    private var mapLibreMap: MapLibreMap? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        MapLibre.getInstance(this)
        setContentView(R.layout.activity_map)

        mapView = findViewById(R.id.mapView)
        mapView.onCreate(savedInstanceState)
        mapView.getMapAsync { map ->
            mapLibreMap = map
            map.setStyle(Style.Builder().fromUri("https://demotiles.maplibre.org/style.json")) { style ->
                setupGeoJsonLayer(style)
            }
        }
    }

    private fun setupGeoJsonLayer(style: Style) {
        // Integração com Turf para cálculos espaciais e renderização vetorial
    }
}
```

---

## 🔗 Links e Recursos
- **Repositório no GitHub**: [github.com/alandvgarcia/MapLibreTest](https://github.com/alandvgarcia/MapLibreTest)
