# Protocolo de resultados V2 — Actividad interactiva de video

## Formato

`FISICA_UTN_VIDEO_RESULT_V2`

El archivo mantiene la misma lógica general del juego `FISICA_UTN_GAME_RESULT_V2`: datos de instrumento, estudiante, corrida, resultado agregado, `researchData` y un bloque final `validation`.

## Autoguardado y recuperación

La ejecución activa se guarda en `localStorage` cada 2 s y también después de cada acción relevante. Se conserva:

- segundo actual del video;
- observaciones;
- respuestas;
- preguntas ya mostradas;
- traza de reproducción;
- métricas de reproducción;
- pérdidas de foco;
- código de participante;
- estado de finalización.

Al volver a abrir la actividad y usar **Iniciar / recuperar actividad**, se recupera la corrida correspondiente al mismo `activityId` e identidad local.

**Nueva corrida** conserva un resumen de la corrida anterior en `previousRuns` y crea una ejecución nueva. **Borrar sesión local** elimina la ejecución y el historial local de esa identidad para la actividad.

## Estructura del resultado

```text
FISICA_UTN_VIDEO_RESULT_V2
├── format
├── schemaVersion
├── activity
├── student
├── study
├── run
├── result
├── researchData
│   ├── observations[]
│   ├── questionAnswers[]
│   ├── eventMatches[]
│   ├── playbackTrace[]
│   ├── attention
│   ├── playbackMetrics
│   ├── confidence
│   ├── conceptSummary[]
│   └── previousRuns[]
└── validation
```

### `study.participantCode`

Se mantiene separado del nombre/legajo. Si el docente provee un código, el alumno puede ingresarlo. Si queda vacío, la aplicación genera un código local aleatorio; ese código generado sirve para la actividad pero no garantiza vinculación longitudinal con otros instrumentos.

### `researchData.observations[]`

Por cada observación se registra, entre otros:

- `observationId`;
- fecha/hora;
- `videoTime`;
- concepto seleccionado;
- comentario;
- confianza 1–4;
- evento patrón asociado;
- error temporal;
- detección temporal;
- clasificación conceptual;
- observación no prevista por el truth set.

### `researchData.questionAnswers[]`

Incluye:

- `questionId`;
- tema, unidad, competencia y dificultad cuando existen;
- tiempo disparador y tiempo real del video;
- índice original y mostrado de la opción;
- respuesta correcta;
- acierto/error;
- tiempo de respuesta;
- confianza 1–4.

### `researchData.playbackTrace[]`

Registra eventos como:

- `video_play`;
- `video_pause`;
- `seek_backward`;
- `seek_forward`;
- apertura/guardado de observaciones;
- aparición/respuesta de preguntas;
- pérdida/recuperación de foco;
- recuperación de sesión;
- finalización.

Cada evento contiene tiempo real de actividad y `videoTime`.

## Validación SHA-256

Se conserva el protocolo del juego:

```json
"validation": {
  "algorithm": "SHA-256",
  "canonicalization": "recursive-key-sort-json",
  "scope": "all top-level fields except validation",
  "digest": "...",
  "shortCode": "..."
}
```

El hash se calcula sobre todos los campos de nivel superior excepto `validation`, luego de ordenar recursivamente las claves de cada objeto. Los arrays conservan su orden.

Este mecanismo es **sellado de integridad**, no cifrado de confidencialidad: permite detectar cambios del JSON, pero el contenido sigue siendo legible.

## Uso para investigación

Para análisis estadístico se recomienda usar `study.participantCode` como clave pseudonimizada y mantener nombre/legajo sólo en el circuito académico de Moodle. El Analizador Docente puede derivar tablas separadas de eventos, observaciones, preguntas, trazas de reproducción, confianza, atención y corridas.
