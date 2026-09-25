# Integración pendiente del protocolo común en Juego y Video

La versión `UTN_FISICA_TRACE_1.0` queda congelada como núcleo común.

## Juego

La versión actual deberá mapear sus eventos existentes a:

- `focus_lost`
- `focus_restored`
- `response_started`
- respuesta confirmada con `responseTiming`
- `help_requested`
- `feedback_shown`
- `session_start`
- `session_finished`

Contexto mínimo durante pregunta:

```json
{
  "phase": "question",
  "taskType": "question",
  "taskId": "<questionId>",
  "itemId": "<questionId>",
  "conceptId": "<conceptId>",
  "questionExposure": 2,
  "videoTimeSec": null
}
```

La penalización por foco sigue siendo una regla del juego:

- sólo mientras la pregunta está visible y activa;
- bloques completos de 5 s fuera de foco;
- -0,5 de energía por bloque;
- nunca durante tablero o feedback.

El protocolo común **registra** el episodio; la lógica del juego decide si corresponde penalización.

## Video

Contexto mínimo durante una pregunta temporal:

```json
{
  "phase": "guided_question",
  "taskType": "guided_question",
  "taskId": "<questionId>",
  "itemId": "<eventId>",
  "conceptId": "<conceptId>",
  "questionExposure": 1,
  "videoTimeSec": 23.45
}
```

Durante detección libre:

```json
{
  "phase": "free_detection",
  "taskType": "video_detection",
  "taskId": "<detectionAttemptId>",
  "itemId": null,
  "conceptId": null,
  "questionExposure": null,
  "videoTimeSec": 23.45
}
```

Debe registrarse además play/pause/seek como eventos específicos del instrumento, manteniendo el mismo sobre común.

## Estado

DIN-001 v1.7 ya utiliza el protocolo.

Para modificar físicamente las últimas versiones del Juego y Video hace falta aplicar este adaptador sobre sus archivos HTML/JS finales exactos. El protocolo ya no debería cambiar al hacerlo, salvo versionado posterior deliberado.
