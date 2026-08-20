RECORRIDO DE DESAFÍOS DE CINEMÁTICA — PROTOTIPO V0.7

OBJETIVO
========
Prototipo de 10 casillas para validar la mecánica antes de construir el tablero
completo de la Unidad 2.

Cada casilla corresponde, en este prototipo, a una filmina de la presentación:
s2 a s11.

INCLUYE
=======
- tablero responsive;
- dado de 1 a 3 posiciones;
- preguntas aleatorias;
- retroalimentación inmediata;
- un desafío interactivo con sliders;
- puntaje;
- registro de respuestas, tiempos y simulaciones;
- guardado automático mediante localStorage;
- panel de progreso;
- MathJax local: funciona sin Internet.

EJECUCIÓN
=========
Abrir index.html.

También puede subirse toda esta carpeta a GitHub Pages sin cambios.

ESTRUCTURA
==========
index.html
css/juego.css
js/motor.js
js/banco_preguntas.js
js/simuladores.js
lib/mathjax/tex-svg.js
README.txt
SESSION_SCHEMA.txt

PRÓXIMA ETAPA SUGERIDA
======================
1. Validar comodidad de juego y tamaños en notebook/proyector.
2. Ajustar la mecánica del dado y penalizaciones.
3. Ampliar de 10 a las ~53 casillas de la Unidad 2.
4. Agregar preguntas gráficas y más simuladores con objetivo.
5. Incorporar checkpoints por zona.
6. En una fase posterior, exportar un comprobante estructurado para Moodle.


NOVEDADES V0.2
==============
- 15 casillas, hasta MRUV.
- barra de energía: 20/30 inicial, +0.5 correcta, -1 incorrecta.
- reinicio obligatorio al llegar a 0.
- preguntas de interpretación gráfica.
- simulador MRU con objetivo.
- simulador MRUV con objetivo.
- MathJax dinámico reforzado con String.raw y typesetPromise.
- banco de preguntas documentado y editable.
- soporte sencillo para matemática con $ ... $.


NOVEDADES V0.3
==============
- Los sliders de las simulaciones YA NO revelan el resultado en tiempo real.
- La posición, velocidad final, aceleración calculada y gráficas se actualizan
  solamente después de presionar "Evaluar configuración".
- El alumno puede modificar los parámetros sin recibir retroalimentación
  automática hasta decidir evaluar su propuesta.
- Las opciones de todos los multiple choice se presentan en orden aleatorio.
- La respuesta correcta continúa vinculada al contenido, no a una letra fija.
- El registro de sesión conserva tanto el orden original como el orden visual
  de las opciones para futura analítica.


NOVEDADES V0.4
==============
- El recorrido se amplía de 15 a 23 casillas.
- Se incorporan contenidos de:
    ecuación de MRUV sin tiempo;
    interpretación de gráficas;
    caída libre;
    independencia de movimientos;
    mono y cazador;
    velocidad relativa;
    movimiento en dos dimensiones;
    descarga horizontal desde una cinta.
- Nuevas preguntas gráficas:
    pendiente de v(t);
    área bajo a(t);
    curvatura de x(t).
- Nuevo desafío de caída libre:
    ajustar h para lograr un tiempo de caída objetivo.
- Nuevo desafío de cinta transportadora:
    ajustar v0x para que el producto caiga dentro de la bandeja.
- En ambos desafíos, el resultado y la gráfica permanecen ocultos hasta
  presionar "Evaluar configuración".
- El tablero distingue visualmente tres zonas pedagógicas.


NOVEDADES V0.5
==============
- Se amplía el banco a 115 actividades:
    23 casillas × 5 actividades por casilla.
- Puntaje ponderado por dificultad:
    nivel 1 = 100 pts
    nivel 2 = 150 pts
    nivel 3 = 200 pts
- La energía permanece independiente del puntaje.
- Cada respuesta registra dificultad, puntos posibles y puntos logrados.
- El panel de progreso incorpora una tabla específica de desempeño por dificultad.
- Se añadieron 46 nuevas preguntas, manteniendo la terminología y contenidos
  de las filminas s2 a s24 de la Unidad 2.


NOVEDADES V0.6
==============
- El tablero se amplía a 36 casillas.
- El banco llega a 180 actividades: 5 por casilla.
- Se incorporan todas las filminas del bloque:
    movimiento circular;
    posición angular y radián;
    período, frecuencia y velocidad angular;
    velocidad tangencial;
    poleas/correas/cadenas;
    aceleración centrípeta y tangencial;
    movimiento armónico simple;
    parámetros del MAS;
    x(t), v(t), a(t);
    relación MAS–MCU;
    péndulo simple;
    aplicaciones de vibraciones.

NUEVOS DESAFÍOS
================
- período ↔ frecuencia angular;
- radio ↔ velocidad tangencial;
- transmisión por poleas;
- aceleración centrípeta;
- período ↔ frecuencia en MAS;
- fase inicial del MAS;
- longitud ↔ período del péndulo.

Todos mantienen la regla pedagógica:
el resultado y la representación se revelan sólo al presionar Evaluar.


NOVEDADES V0.7
==============
- Energía inicial reducida de 20 a 10.
- Energía máxima: 30.
- Nuevo botón "Comprar energía (+3)".
- La compra genera una pregunta aleatoria de nivel 3 tomada de cualquier tema.
- Para la compra se utilizan preguntas de tipo multiple choice o pregunta gráfica.
- Compra correcta: +3 de energía.
- Compra incorrecta: -1 de energía.
- La compra NO suma puntaje y NO mueve la ficha.
- Las compras de energía quedan registradas por separado para futura analítica.
- Incorporación de los logos institucionales suministrados.
- Nuevo editor local: editor_banco.html.

EDITOR LOCAL
============
Abrir:
  editor_banco.html

Permite:
- elegir casilla;
- elegir actividad;
- editar enunciado;
- editar las cuatro opciones;
- definir respuesta correcta;
- editar dificultad;
- editar retroalimentación;
- agregar / duplicar / eliminar preguntas;
- validar el banco;
- descargar un nuevo banco_preguntas.js.

La forma más portátil de trabajo es:
1. editar;
2. pulsar "Descargar banco actualizado";
3. reemplazar js/banco_preguntas.js.

El botón "Guardar como..." intenta usar el selector de archivos del navegador
cuando está disponible; si no, el editor puede seguir exportando por descarga.


CORRECCIÓN V0.7.1
=================
Se corrigió el selector "Casilla / filmina" del editor local.

Problema:
- al seleccionar otra casilla, el editor repoblaba el selector durante el
  mismo evento de cambio;
- esto restauraba visualmente la casilla anterior antes de leer la nueva
  selección;
- como consecuencia, siempre terminaba cargándose la primera casilla.

Corrección:
- el editor captura primero la nueva casilla elegida;
- guarda los cambios de la casilla anterior;
- actualiza currentCellId;
- recién entonces carga las preguntas de la nueva casilla;
- applyForm() ya no reconstruye todo el selector.


NOVEDADES V0.8
==============
- Tablero completo de la Unidad 2.
- 52 casillas de contenido, correspondientes a las filminas s2–s52.
- 260 actividades: 5 por casilla.
- Se incorporan aplicaciones industriales, ejemplos resueltos, errores frecuentes,
  preguntas conceptuales, ejercicios, resumen, infografías, glosario y fuentes.
- Nuevo simulador centrifugeRpmTarget:
  rpm → f → omega → vt → ac.
- Nuevas zonas visuales de integración y síntesis.
- El editor local carga automáticamente las 52 casillas.

Con V0.8 queda cerrado el recorrido casilla–filmina.
El próximo paso recomendado es convertir los checkpoints visuales en
checkpoints funcionales con desafíos integradores encadenados.


AJUSTE V0.8.1
=============
- Se elimina la casilla original 2:
    s3 · Objetivos de aprendizaje.
- Se elimina la casilla original 52:
    s52 · Fuentes y criterio de uso.
- Las casillas restantes se renumeran de 1 a 50.
- El banco queda en:
    50 casillas × 5 actividades = 250 actividades.
- Se elimina de la pantalla principal:
    "Banco editable";
    botón "Abrir editor del banco";
    texto "Arquitectura preparada para crecer".
- editor_banco.html continúa dentro del paquete para uso local directo,
  pero ya no aparece como opción dentro del juego.


V0.8.2 — CHECKPOINTS FUNCIONALES
================================
Se convierten en puertas reales de avance los checkpoints ubicados después de:
- casilla 9  · Fundamentos
- casilla 17 · Movimiento rectilíneo
- casilla 22 · Movimiento en 2D
- casilla 28 · Movimiento circular
- casilla 35 · MAS
- casilla 46 · Integración industrial

Mecánica:
- al llegar a una casilla de checkpoint, no puede avanzarse a la zona siguiente;
- el botón "Tirar dado" cambia a "Superar checkpoint";
- cada intento presenta 3 preguntas integradoras elegidas al azar de un banco de 5;
- se requieren 2 respuestas correctas de 3;
- si se falla, el alumno permanece en la casilla y puede reintentar;
- el dado no puede saltar una puerta de checkpoint;
- las respuestas correctas/incorrectas conservan la regla de energía (+0.5 / -1);
- el puntaje sigue ponderado por dificultad;
- los resultados de checkpoint se registran por separado.

Se incorpora:
  js/checkpoints.js

con 30 preguntas integradoras específicas.
