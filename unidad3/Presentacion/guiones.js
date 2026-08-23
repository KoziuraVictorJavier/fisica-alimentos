/*
  GUIONES EDITABLES — Unidad 3
  =============================
  Este archivo replica el criterio utilizado en la presentación de la Unidad 2.

  Edite únicamente el texto situado entre los signos ` ... `.
  El botón GUION muestra este texto y el botón LEER utiliza exactamente el mismo guion.
  Guarde el archivo en UTF-8 y recargue index.html después de editarlo.
*/
window.GUIONES_U3 = {
  // Página 1
  s1: `
Presentamos la Unidad 3, Dinámica. En la unidad anterior describimos cómo se mueve un cuerpo. Ahora vamos
a analizar por qué cambia o no cambia su movimiento, qué fuerzas actúan, cómo se equilibran y cómo
aparecen los torques en sistemas reales de la industria alimentaria.
`,

  // Página 2
  s2: `
El recorrido se organiza desde lo más básico, la fuerza como interacción, hasta aplicaciones de
equilibrio y rotación. La idea metodológica será siempre la misma: primero definir el sistema, luego
dibujar las fuerzas externas, plantear ecuaciones y finalmente interpretar el resultado en el contexto
técnico.
`,

  // Página 3
  s3: `
En una planta alimentaria, la dinámica aparece cuando una cinta arranca, cuando un envase debe
desplazarse sin caer, cuando una rampa debe evacuar producto, cuando una tapa debe mantenerse abierta o
cuando un motor debe entregar torque. No es sólo una unidad teórica: es una herramienta para leer
condiciones de operación.
`,

  // Página 4
  s4: `
Los objetivos se resumen en cinco acciones: comprender fuerzas, aplicar las leyes de Newton, construir
diagramas de cuerpo libre, analizar rozamiento y calcular torque. Cada una de estas acciones tiene una
aplicación directa en equipos, procesos y situaciones de seguridad.
`,

  // Página 5
  s5: `
La importancia técnica se ve en variables que se miden o controlan: velocidad, carga, corriente de motor,
torque y vibraciones. Estas mediciones ayudan a anticipar fallas, ajustar el proceso y evitar problemas
de calidad o seguridad.
`,

  // Página 6
  s6: `
El mapa conceptual conecta fuerza, leyes de Newton, diagramas de cuerpo libre, rozamiento, torque y
equilibrio. El orden no es casual: si el diagrama de cuerpo libre está mal, las ecuaciones posteriores
también estarán mal.
`,

  // Página 7
  s7: `
Una fuerza no se dibuja en abstracto. Debe interpretarse como una interacción concreta: fuerza de la
cinta sobre el envase, fuerza del cable sobre la tapa, fuerza de la Tierra sobre el cuerpo. Esta forma de
nombrar evita confundir fuerzas que actúan sobre cuerpos diferentes.
`,

  // Página 8
  s8: `
Para dibujar un diagrama de cuerpo libre conviene distinguir fuerzas de contacto y fuerzas a distancia.
Contacto significa superficie, cable, banda, fluido o cuerpo que toca al sistema. A distancia significa
interacción sin contacto directo, como la gravitatoria.
`,

  // Página 9
  s9: `
La fuerza gravitatoria general se modela con la ley universal, pero en una planta o laboratorio usamos el
modelo local: gravedad uniforme, vertical y de módulo aproximadamente 9,8 metros por segundo cuadrado. El
peso queda entonces como P igual a m por g.
`,

  // Página 10
  s10: `
Antes de usar las leyes de Newton hay que elegir el sistema. Después se identifican las fuerzas externas.
Si el sistema elegido no está claro, es muy fácil mezclar fuerzas que actúan sobre cuerpos distintos.
`,

  // Página 11
  s11: `
La primera ley establece la condición de inercia. Si la fuerza neta es cero, la aceleración es cero. Pero
esta afirmación sólo se aplica directamente en sistemas de referencia inerciales, como una mesa o el piso
de una planta considerados aproximadamente en reposo.
`,

  // Página 12
  s12: `
Un marco no inercial no invalida la física, pero exige cuidado. Desde un vehículo acelerado o una
plataforma giratoria, un cuerpo puede parecer acelerado sin que exista una fuerza real adicional actuando
sobre él en el marco del suelo.
`,

  // Página 13
  s13: `
La segunda ley conecta fuerza neta y aceleración. La ecuación vectorial se transforma en ecuaciones por
componentes. En una línea de transporte, esto permite estimar si una fuerza de arrastre puede acelerar la
carga sin exceder límites operativos.
`,

  // Página 14
  s14: `
La tercera ley es una de las fuentes más comunes de error. Acción y reacción tienen igual módulo y
sentido opuesto, pero actúan sobre cuerpos distintos. Por eso no deben dibujarse como dos fuerzas que se
cancelan dentro del mismo cuerpo libre.
`,

  // Página 15
  s15: `
Un modelo físico no pretende copiar toda la realidad. Selecciona lo esencial para responder una pregunta.
Una caja sobre una cinta puede ser una partícula si sólo interesa su aceleración, o un cuerpo rígido si
interesa si vuelca o gira.
`,

  // Página 16
  s16: `
El diagrama de cuerpo libre es el puente entre la situación física y las ecuaciones. Si el diagrama
incluye fuerzas que actúan sobre otro cuerpo, o si omite una fuerza externa relevante, el cálculo será
incorrecto aunque el álgebra esté bien hecha.
`,

  // Página 17
  s17: `
Resolver dinámica casi siempre significa proyectar fuerzas en ejes. En equilibrio traslacional las sumas
por componentes son cero. Si hay aceleración, cada suma por componente debe igualarse a masa por
aceleración en ese eje.
`,

  // Página 18
  s18: `
El rozamiento es útil cuando permite que la cinta arrastre al producto sin deslizamiento. También puede
ser perjudicial porque produce desgaste, calentamiento o pérdida de eficiencia. Es fundamental distinguir
rozamiento estático y cinético.
`,

  // Página 19
  s19: `
Esta simulación muestra una idea importante: el rozamiento estático no tiene siempre el valor máximo.
Sólo alcanza ese máximo justo antes de deslizar. Por eso no debe escribirse automáticamente f sub s igual
a mu sub s por N.
`,

  // Página 20
  s20: `
En un plano inclinado conviene girar los ejes: uno paralelo al plano y otro normal al plano. Así el peso
se descompone en una componente que tiende a deslizar y otra que determina la normal.
`,

  // Página 21
  s21: `
El plano inclinado permite combinar componentes y rozamiento. La aceleración depende del ángulo y del
coeficiente de rozamiento. La lectura técnica es inmediata: modificar el ángulo de una rampa modifica el
flujo y el riesgo de atasco o deslizamiento.
`,

  // Página 22
  s22: `
En movimiento circular, la aceleración centrípeta exige una fuerza neta radial. Es importante no inventar
una fuerza centrípeta como fuerza adicional: la fuerza centrípeta es el papel que cumple la resultante
radial de fuerzas reales.
`,

  // Página 23
  s23: `
La unidad presenta tres casos: curva peraltada, péndulo cónico y movimiento circular vertical. Aunque las
figuras sean distintas, la metodología es común: construir el DCL, elegir el eje radial y escribir la
suma de fuerzas hacia el centro.
`,

  // Página 24
  s24: `
Esta simulación conecta dinámica circular con rozamiento. Si el rozamiento estático máximo no alcanza
para entregar la fuerza radial necesaria, el envase pierde adherencia y se desplaza respecto de la mesa.
`,

  // Página 25
  s25: `
La ley de Hooke introduce la idea de fuerza elástica. Dentro del rango lineal, al duplicar la deformación
se duplica la fuerza recuperadora. Esto se usa en soportes, balanzas, celdas de carga y sistemas
vibratorios.
`,

  // Página 26
  s26: `
La elasticidad no aparece sólo en resortes de laboratorio. También está en soportes antivibratorios,
celdas de carga, alimentadores vibratorios y envases sometidos a compresión. El límite del modelo es el
rango elástico lineal.
`,

  // Página 27
  s27: `
En la unidad 2 vimos el MAS de manera cinemática. Ahora se interpreta dinámicamente: si la fuerza neta es
proporcional a la elongación y apunta hacia el equilibrio, aparece una aceleración de la forma menos
omega cuadrado por x.
`,

  // Página 28
  s28: `
Para un resorte ideal, la frecuencia angular natural depende de k sobre m. Esto es clave en vibraciones:
aumentar rigidez eleva la frecuencia natural y aumentar masa la reduce.
`,

  // Página 29
  s29: `
El péndulo simple es aproximadamente armónico sólo para ángulos pequeños, expresados en radianes. El
amortiguamiento introduce pérdida de amplitud, mientras que la resonancia explica por qué ciertas
frecuencias de excitación pueden generar vibraciones peligrosas.
`,

  // Página 30
  s30: `
La cantidad de movimiento lineal introduce otra forma de leer el movimiento: masa por velocidad. El
impulso permite relacionar una fuerza aplicada durante cierto tiempo con el cambio de cantidad de
movimiento.
`,

  // Página 31
  s31: `
Cuando el sistema no es una sola partícula, el centro de masa permite describir su movimiento global. En
equipos reales, esta idea ayuda a interpretar cargas distribuidas y cuerpos extendidos.
`,

  // Página 32
  s32: `
Un objeto real puede modelarse como partícula si sólo importa la traslación, o como cuerpo rígido si
importan dimensiones, ejes y puntos de aplicación de fuerzas. El modelo debe estar alineado con la
pregunta que se quiere responder.
`,

  // Página 33
  s33: `
El torque mide la tendencia de una fuerza a producir rotación. Depende de la fuerza, de la distancia al
eje y del ángulo. Por eso una llave más larga permite generar mayor momento de torsión con la misma
fuerza.
`,

  // Página 34
  s34: `
La simulación muestra cómo cambia el torque al modificar fuerza, distancia o ángulo. En mezcladores y
agitadores, este análisis se vincula con selección de motor, viscosidad del producto y seguridad
mecánica.
`,

  // Página 35
  s35: `
El momento de inercia expresa la resistencia a cambiar el estado de rotación. El momento angular combina
posición y cantidad de movimiento. Si no hay torque externo neto, el momento angular se conserva.
`,

  // Página 36
  s36: `
Las magnitudes rotacionales no son decorativas: aparecen en mezcladores, centrífugas, rodillos y
tambores. Permiten relacionar esfuerzo del motor, aceleración angular, carga y riesgo de vibraciones.
`,

  // Página 37
  s37: `
El equilibrio completo exige dos condiciones: equilibrio traslacional y equilibrio rotacional. No alcanza
con que la suma de fuerzas sea cero; también debe anularse la suma de torques respecto del eje elegido.
`,

  // Página 38
  s38: `
Esta simulación permite analizar una tapa o barra en equilibrio. Si se aumenta el brazo de sostén, la
fuerza necesaria disminuye. Esta idea es muy útil en diseño de tapas, compuertas y sistemas de apertura.
`,

  // Página 39
  s39: `
Esta tabla resume la traducción técnica de la unidad. Cada equipo puede analizarse mediante fuerzas,
torques y variables medidas o controladas. El objetivo es interpretar cómo esas variables afectan la
operación y la seguridad.
`,

  // Página 40
  s40: `
Los ejemplos de traslación muestran tres situaciones básicas: equilibrio vertical en cinta, aceleración
con rozamiento estático suficiente y movimiento en una rampa. En todos los casos el diagrama de cuerpo
libre es el punto de partida.
`,

  // Página 41
  s41: `
Los ejemplos de tensión y torque permiten pasar de fuerza neta a equilibrio rotacional. La tapa ilustra
una idea importante: una fuerza menor puede equilibrar un peso mayor si actúa con mayor brazo de palanca.
`,

  // Página 42
  s42: `
Interpretar diagramas no es sólo mirar flechas. Hay que saber qué cuerpo se aisló, qué fuerzas son
externas, qué eje conviene elegir y qué ecuaciones se desprenden del dibujo.
`,

  // Página 43
  s43: `
Estos errores son muy frecuentes en evaluaciones y en el análisis técnico. Conviene usarlos como lista de
control antes de cerrar un problema.
`,

  // Página 44
  s44: `
Estas preguntas no buscan cálculo inmediato. Buscan lenguaje físico: identificar fuerzas, distinguir
conceptos y justificar con claridad antes de escribir ecuaciones.
`,

  // Página 45
  s45: `
Los ejercicios propuestos cubren peso, fuerza neta, equilibrio, rozamiento, plano inclinado, tensión y
torque. No deben resolverse como recetas: en cada caso se debe identificar primero el modelo físico.
`,

  // Página 46
  s46: `
Los simuladores no reemplazan el planteo. Funcionan mejor si el estudiante primero predice qué va a
pasar, luego modifica parámetros y finalmente interpreta si el resultado coincide con su hipótesis.
`,

  // Página 47
  s47: `
La actividad práctica integra transporte y mezclado. El objetivo no es sólo obtener números, sino
relacionar fuerzas, rozamiento y torque con seguridad, calidad del proceso y eficiencia.
`,

  // Página 48
  s48: `
La actividad integradora propone una línea completa con cinta, rampa, tolva, mezclador, tapa y descarga.
Permite mostrar que la dinámica no aparece en problemas aislados, sino conectada dentro de un proceso.
`,

  // Página 49
  s49: `
La primera infografía resume la fuerza como interacción, su carácter vectorial, los tipos de fuerzas y su
papel en procesos como cinta transportadora, tolva y línea de envasado.
`,

  // Página 50
  s50: `
La segunda infografía sintetiza las leyes de Newton y el rol de la fuerza neta. Es útil como cierre
visual antes de resolver problemas con aceleración o equilibrio.
`,

  // Página 51
  s51: `
La tercera infografía se centra en diagramas de cuerpo libre, componentes de fuerzas y ejes convenientes.
Es una buena herramienta de repaso para evitar errores en el planteo.
`,

  // Página 52
  s52: `
La cuarta infografía resume el rozamiento estático y cinético, su utilidad y sus riesgos. Puede usarse
para discutir adherencia en cintas y pérdida de contacto entre producto y superficie.
`,

  // Página 53
  s53: `
La quinta infografía trabaja torque y equilibrio rotacional. Permite visualizar brazo de palanca, sentido
de giro y condiciones de equilibrio.
`,

  // Página 54
  s54: `
La sexta infografía conecta ley de Hooke, movimiento armónico simple y aplicaciones de vibración. Es útil
para el cierre del bloque de elasticidad y dinámica del MAS.
`,

  // Página 55
  s55: `
El resumen final debe dejar una idea integrada: fuerzas, rozamiento, elasticidad, cantidad de movimiento
y torque son herramientas para leer movimiento, equilibrio y rotación en sistemas técnicos.
`,

  // Página 56
  s56: `
El glosario ayuda a fijar vocabulario. En esta unidad es especialmente importante no confundir masa con
peso, normal con peso, rozamiento estático con su máximo y fuerza con torque.
`,

  // Página 57
  s57: `
Esta presentación acompaña el apunte y no lo reemplaza. Su función es servir como guion visual para la
exposición oral, con fórmulas, gráficos, simuladores e infografías alineados al contenido de la unidad.
`,

};

for (const [id, texto] of Object.entries(window.GUIONES_U3)) {
  const slide = document.getElementById(id);
  if (slide) slide.dataset.narration = texto.replace(/\s+/g, ' ').trim();
}
