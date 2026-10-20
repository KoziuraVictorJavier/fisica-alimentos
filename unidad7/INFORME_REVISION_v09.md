# Unidad 7 — Informe de revisión integral v0.9

**Base revisada:** apunte HTML v0.8, guiones v0.8 y simulador independiente de Gauss.

## Controles y correcciones efectuadas

| Área | Revisión y resultado |
|---|---|
| Secuencia temática | Confirmados 17 apartados de contenido (1–16 más 5 bis) y bibliografía; se mantiene Gauss entre campo y potencial. |
| Estructura de guiones | Se comprobaron 17 claves JSON y 17 editores de narración correspondientes. |
| Fórmulas | Se contabilizaron 42 expresiones MathML en el apunte. Sin dependencias matemáticas externas en el documento principal. |
| Numeración | Corregidas repeticiones en subtítulos de las secciones 2 y 3. |
| Lectura automática | Mejorada la separación de segmentos para no cortar la narración cada vez que aparece un punto decimal. Actualizado el nombre del archivo exportado a v09. |
| Potencia eléctrica | La representación del crecimiento de energía sigue siendo una recta, como corresponde a potencia constante; se hizo explícita la escala final de tiempo y energía al variar los controles. |
| Circuitos | Revisadas las expresiones de serie, paralelo, mixto y ecuaciones de dos mallas. La comprobación se construye a partir de las mismas fórmulas; no es una medición independiente. |
| Campo y potencial de la esfera | Las expresiones y valores de ejemplo corresponden a una esfera **aislante uniformemente cargada**; se conservó íntegro su simulador independiente. |
| Inducción | El modelo usa B(t)=B₀ sen(2πft), por lo que la fem inducida tiene dependencia −cos(2πft). Se mantienen los signos en la gráfica. |
| Instrumentación | Comprobadas las relaciones de 4–20 mA, Pt100 lineal aproximada, conversión sobre 250 Ω y consumo del calefactor; no representan especificaciones metrológicas ni diseño eléctrico real. |
| JavaScript | Todos los scripts ejecutables del documento principal pasan el análisis sintáctico de Node.js. |
| Archivos | Se verifica integridad estructural del ZIP. |

## Comprobaciones numéricas de referencia

- Gauss: Q=5 nC, R=0,10 m; a r=0,06 m, Qenc=1,08 nC, E≈2696 N/C, V≈593 V; a r=0,20 m, E≈1123 N/C, V≈225 V.
- Kirchhoff: R1=4 Ω, R2=6 Ω, R3=2 Ω, E1=12 V, E2=6 V: I1=27/11 A, I2=15/11 A, I3=12/11 A.
- 4–20 mA: 75 °C en un rango de 0–150 °C produce 12 mA y 3 V sobre 250 Ω.
- Calentamiento: 230 V y 46 Ω implican 5 A, 1150 W y 0,575 kWh en 30 minutos.

## Limitaciones y comprobaciones pendientes

1. **No se ejecutó una prueba visual ni auditiva real en Firefox**, por lo que todavía hay que comprobar tamaño de ecuaciones, reflujo en pantallas estrechas, rotación 3D, voces disponibles y continuidad de lectura.
2. El simulador 3D de Gauss depende de Three.js y MathJax desde una CDN. Funcionar como archivo HTML local puede depender de la conectividad y las restricciones de módulos del navegador; abrir con un servidor local es la alternativa recomendada si falla.
3. La exactitud física de las simulaciones se revisó por ecuaciones y ejemplos representativos, **no se certificaron exhaustivamente todos los parámetros extremos ni la representación gráfica pixel a pixel**.
4. Se recomienda añadir controles de aprendizaje en la sección 15 para distinguir señales de 4–20 mA de las resistencias de una Pt100 y explicar que el lazo y el calefactor constituyen sistemas eléctricos distintos.
5. Los recursos gráficos se revisaron conceptualmente. Para su validación pedagógica final es necesario observar el apunte con estudiantes o en una sesión docente sobre navegador real.

## Próximas mejoras sugeridas

- Prueba manual en Firefox con computadora y celular, con captura de posibles problemas visuales.
- Archivo local de bibliotecas de la simulación 3D si se requiere uso desconectado.
- Revisión especializada de símbolos y topología de cada esquema de Kirchhoff conforme a normas IEC.
- Incorporación de objetivos, preguntas conceptuales y autoevaluación por bloque.
