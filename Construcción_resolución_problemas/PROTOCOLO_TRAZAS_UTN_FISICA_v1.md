# Protocolo común de trazas — UTN Física

**Versión congelada:** `UTN_FISICA_TRACE_1.0`  
**Esquema de salida:** `FISICA_UTN_EVIDENCE` / `schemaVersion 3.0`

Este protocolo normaliza la captura temporal y de foco de los tres instrumentos:

1. Juego gamificado.
2. Análisis interactivo de video.
3. Modelización / conexiones.

## 1. Principio de interpretación

Una pérdida de foco es una **traza de interacción**. El sistema registra que la ventana o pestaña dejó de estar en foco, pero no puede conocer qué hizo el estudiante durante ese intervalo.

Por lo tanto:

- no equivale a consulta externa;
- no equivale a fraude;
- no equivale a aprendizaje ni falta de aprendizaje;
- puede combinarse posteriormente con la secuencia, duración, tipo de tarea, revisiones y resultados para estudiar patrones.

## 2. Eventos comunes de foco

### `focus_lost`

Registra:

- identificador del episodio;
- fuente técnica (`visibilitychange` o `window_blur`);
- instante de sesión;
- contexto exacto al perder el foco;
- tarea activa;
- concepto;
- exposición de pregunta, cuando corresponda;
- tiempo del video, cuando corresponda.

### `focus_restored`

Agrega:

- duración total fuera de foco;
- contexto al regresar;
- indicación de si ocurrió durante una respuesta activa.

## 3. Tiempos de respuesta comunes

Cada respuesta medible debe producir:

- `responseWallMs`: tiempo total calendario;
- `responseFocusedMs`: tiempo efectivo con la aplicación enfocada;
- `awayDuringResponseMs`: tiempo fuera de foco durante esa respuesta;
- `awayEpisodesDuringResponse`: cantidad de salidas de foco;
- `timeSincePreviousResponseMs`: intervalo entre dos respuestas consecutivas;
- `awaySincePreviousResponseMs`: cuánto de ese intervalo ocurrió fuera de foco;
- `focusedTimeSincePreviousResponseMs`: intervalo con foco entre respuestas.

Esto permite diferenciar, por ejemplo, una respuesta de 60 s realizada completamente en la actividad de una respuesta de 60 s con 45 s fuera de foco.

## 4. Contexto por instrumento

### Juego

Fases sugeridas:

- `board`
- `question`
- `confidence`
- `feedback`
- `checkpoint`

Campos específicos:

- `itemId`
- `questionExposure`

La regla de penalización energética del juego es **específica del juego**, no del protocolo transversal. El foco se registra siempre; la penalización sólo puede aplicarse cuando una pregunta está visible y en proceso de respuesta.

### Video

Fases sugeridas:

- `playback`
- `free_detection`
- `guided_question`
- `classification`
- `comment`

Campo específico:

- `videoTimeSec`

La pérdida de foco debe quedar asociada al instante del video y al tipo de actividad que estaba realizando.

### Modelización

Fases iniciales implementadas:

- `workspace`
- `responding`
- `simulation`
- `help`
- `model_test`
- `navigation`

Tareas temporizadas:

- `foundation`
- `formula_selection`
- `prediction`
- `numeric_answer`
- `conceptual_answer`

## 5. Salida común V3

```text
FISICA_UTN_EVIDENCE
├── participant
├── academicContext
├── instrument
├── session
├── learningEvidence
│   └── events
├── interactionTraces
│   ├── events
│   ├── focusEpisodes
│   └── timingSummary
├── instrumentSpecific
└── validation
```

Los datos crudos se conservan. Los indicadores interpretativos se calculan posteriormente en el Analizador Docente.

## 6. Regla metodológica

El analizador podrá describir patrones como:

> salida de foco de 42 s durante una fundamentación, seguida de revisión y respuesta correcta

pero no deberá convertir automáticamente ese patrón en:

> “consultó una fuente externa”

o:

> “copió la respuesta”.

La inferencia deberá apoyarse siempre en múltiples evidencias.
