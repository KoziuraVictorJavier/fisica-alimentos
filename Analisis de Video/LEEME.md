# Actividad interactiva de análisis de video — V0.2

## Novedades principales

La V0.2 reemplaza la exportación simple de la V0.1 por un protocolo compatible con el utilizado en el juego de Física:

- resultado `FISICA_UTN_VIDEO_RESULT_V2`;
- autosalvado periódico y por evento en `localStorage`;
- recuperación automática de una sesión incompleta;
- `previousRuns` al iniciar nuevas corridas;
- código de participante independiente de nombre/legajo;
- confianza 1–4 en observaciones y respuestas;
- trazas detalladas de reproducción, pausa y búsqueda temporal;
- métricas de retroceso y adelanto;
- registro de pérdida/recuperación de foco;
- asociación detallada entre observaciones y truth set;
- separación entre detección temporal y clasificación conceptual;
- conservación de observaciones inesperadas/no previstas;
- validación SHA-256 con `recursive-key-sort-json`, igual al protocolo del juego;
- código corto de validación de 12 caracteres hexadecimales.

## Uso rápido

1. Abra `index.html` en un navegador moderno.
2. Cargue el JSON de actividad y el MP4, o use una ruta relativa en GitHub Pages.
3. Complete nombre. Para investigación, ingrese el `participantCode` provisto por el docente. Si se deja vacío, se genera uno local.
4. Pulse **Iniciar / recuperar actividad**.
5. La sesión se autosalva. Si el navegador se cierra, vuelva a cargar los mismos datos y pulse nuevamente **Iniciar / recuperar actividad**.
6. Use **Nueva corrida** para repetir la actividad conservando un resumen de la corrida anterior en `previousRuns`.
7. Al finalizar, descargue el resultado. El JSON incluirá el bloque `validation` SHA-256.

## Archivos incluidos

- `index.html`: aplicación V0.2;
- `actividad_ejemplo.json`: ejemplo con esquema 2.0;
- `papas_truthset_v2.json`: truth set del video de papas adaptado al esquema 2.0;
- `PROTOCOLO_JSON_V2.md`: definición del resultado y datos de investigación.

## Integridad vs. cifrado

El SHA-256 implementado detecta modificaciones posteriores del archivo, pero **no oculta el contenido**. Es el mismo criterio de integridad empleado en el protocolo del juego. Un cifrado de confidencialidad (por ejemplo AES-GCM) puede añadirse como capa independiente en una versión posterior sin cambiar este hash de integridad.

## GitHub Pages

```text
ActividadVideo/
├── index.html
├── actividad_ejemplo.json
├── papas_truthset_v2.json
├── videos/
│   └── papas.mp4
└── assets/
    └── logo_utn.png
```

En el JSON:

```json
"video": { "src": "videos/papas.mp4", "id": "papas" }
```

## Datos para investigación

El resultado conserva datos crudos y derivados en `researchData`: observaciones, respuestas, matches contra el truth set, traza de interacción, atención, métricas de reproducción, confianza y resumen conceptual. La interfaz del alumno muestra un informe simple; el JSON mantiene el detalle para el Analizador Docente.
