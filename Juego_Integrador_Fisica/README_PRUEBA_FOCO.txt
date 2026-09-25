PRUEBA FUNCIONAL — JUEGO INTEGRADOR U1–U4
=========================================
Esta versión usa la estructura exacta de Juego(2).zip y conserva temporalmente
su banco actual para aislar y verificar primero la nueva regla de foco.

REGLA NUEVA
- 0 a 4,999 s continuos sin foco: se registra, sin penalización.
- 5 a 9,999 s: -0,5 energía.
- 10 a 14,999 s: -1,0 energía.
- 15 a 19,999 s: -1,5 energía.
- etc.
- El descuento se aplica durante la pérdida de foco, no recién al volver.
- Si vuelve antes de 5 s, no se descuenta energía.
- Los eventos quedan en session.events y el resumen en session.attention.

IMPORTANTE
El banco de esta prueba todavía es el de la estructura adjunta. Una vez
verificada la mecánica, la siguiente versión reemplazará el banco por el
integrador U1–U4 (aprox. 56 casillas, 7 preguntas por casilla, sin simulaciones).


AJUSTE V0.2
-----------
La penalización de foco se activa exclusivamente cuando el alumno ya recibió
una pregunta/checkpoint y ésta permanece abierta esperando respuesta.

- Tablero / casilleros / antes de conocer la pregunta: se registra la pérdida
  de foco, pero NO se descuenta energía.
- Pregunta abierta: cada bloque completo de 5 s fuera de foco descuenta 0,5.
- Pérdidas menores a 5 s durante la pregunta: se registran, sin descuento.
- El evento guarda questionActive=true/false para distinguir ambos contextos.
