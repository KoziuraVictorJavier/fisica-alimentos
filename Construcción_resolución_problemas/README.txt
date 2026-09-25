DIN-001 v1.7
================

Esta versión incorpora el protocolo transversal:

UTN_FISICA_TRACE_1.0
FISICA_UTN_EVIDENCE / schemaVersion 3.0

Novedades principales
---------------------
- focus_lost y focus_restored.
- Detección por visibilitychange + blur/focus con deduplicación.
- Duración de cada episodio fuera de foco.
- Contexto exacto de la pérdida de foco.
- Tiempo total fuera de foco.
- Tiempos de respuesta:
  * wall clock,
  * tiempo con foco,
  * tiempo fuera de foco,
  * episodios fuera de foco durante respuesta,
  * tiempo desde respuesta anterior,
  * tiempo enfocado desde respuesta anterior.
- Separación learningEvidence / interactionTraces.
- Exportación V3 común.
- Protocolo JSON y documentación incluidos en el ZIP.

Importante
----------
La pérdida de foco se registra como traza de interacción y no se interpreta
automáticamente como consulta externa, fraude o falta de aprendizaje.
