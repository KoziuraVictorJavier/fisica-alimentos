/*
  GUIONES EDITABLES — Unidad 3 · V0.3
  =====================================
  Guiones ampliados para exposición oral.

  Criterios de esta revisión:
  - desarrollo conceptual más completo;
  - mayor vínculo entre ecuaciones y significado físico;
  - conexión explícita con aplicaciones de tecnología de alimentos;
  - lenguaje pensado para lectura por voz, evitando leer código LaTeX;
  - simulaciones presentadas como predicción + contraste, no sólo como cálculo;
  - mantenimiento de la correspondencia s1 ... s57 de la presentación actual.

  Edite únicamente el texto situado entre los signos ` ... `.
  El botón GUION muestra este texto y el botón LEER utiliza exactamente el mismo guion.
  Guarde el archivo en UTF-8 y recargue index.html después de editarlo.
*/
window.GUIONES_U3 = {
  // Página 1
  s1: `
En esta Unidad 3 vamos a pasar de describir el movimiento a explicar sus causas. En cinemática nos
preguntábamos dónde está un cuerpo, con qué velocidad se mueve o cómo cambia esa velocidad. Ahora la
pregunta central es otra: ¿qué interacciones producen esos cambios? Para responderla vamos a trabajar con
fuerzas, leyes de Newton, rozamiento, movimiento circular, elasticidad, cantidad de movimiento y torque. La
idea es mantener siempre un vínculo con situaciones reales de tecnología de alimentos: cintas
transportadoras, rampas, tolvas, mezcladores, tapas, ejes y sistemas vibratorios. Por eso no conviene
estudiar cada ecuación como una fórmula aislada. Lo importante es reconocer qué sistema estamos analizando,
qué fuerzas actúan sobre él, qué modelo es válido y qué significado técnico tiene el resultado.
`,
  // Página 2
  s2: `
El recorrido de la unidad tiene una lógica progresiva. Primero vamos a definir fuerza como una interacción
entre cuerpos y a reconocer las fuerzas más habituales. Después utilizaremos las leyes de Newton y los
diagramas de cuerpo libre para relacionar esas fuerzas con el movimiento. A partir de allí aparecerán
situaciones específicas: rozamiento, planos inclinados y movimiento circular. Luego incorporaremos fuerzas
elásticas y veremos cómo conducen al movimiento armónico simple. Finalmente pasaremos de la traslación a la
rotación, introduciendo cantidad de movimiento, torque, momento de inercia y condiciones de equilibrio. La
metodología será siempre la misma: identificar el sistema, elegir un modelo, representar las fuerzas
externas, plantear las ecuaciones y, recién al final, interpretar si el resultado es físicamente razonable y
técnicamente útil.
`,
  // Página 3
  s3: `
La dinámica aparece de manera permanente en una planta alimentaria. Cuando una cinta arranca, el producto
necesita una fuerza para adquirir aceleración. Cuando un envase se mueve sobre esa cinta, el rozamiento
puede ser el mecanismo que lo arrastra sin deslizamiento. En una rampa, la componente del peso paralela al
plano puede favorecer o dificultar el desplazamiento. En un mezclador, el motor debe aportar un torque capaz
de vencer las resistencias del producto. Y en una tapa o compuerta, la posición de las fuerzas determina si
el sistema permanece en equilibrio. Por eso la dinámica conecta directamente la física con decisiones de
operación, seguridad, mantenimiento y calidad. No alcanza con saber calcular una fuerza: hay que comprender
qué representa, sobre qué cuerpo actúa y qué consecuencia produce.
`,
  // Página 4
  s4: `
Los objetivos de esta unidad pueden resumirse en cinco capacidades. La primera es reconocer fuerzas y
describirlas correctamente como vectores, con módulo, dirección, sentido y punto de aplicación. La segunda
es aplicar las leyes de Newton para distinguir entre equilibrio, movimiento uniforme y movimiento acelerado.
La tercera es construir diagramas de cuerpo libre, porque ese dibujo es el puente entre la situación real y
las ecuaciones. La cuarta es analizar el rozamiento, diferenciando su comportamiento estático y cinético y
entendiendo que puede ser útil o perjudicial según el proceso. Y la quinta es incorporar el torque para
estudiar sistemas que pueden rotar. Estas capacidades no son independientes: se combinan en casi todos los
problemas reales de la unidad.
`,
  // Página 5
  s5: `
Desde el punto de vista técnico, la dinámica permite interpretar variables que muchas veces se miden
directamente en una instalación. La velocidad y la aceleración de una cinta indican cómo se transporta el
producto. La corriente de un motor puede dar información indirecta sobre el esfuerzo que está realizando. El
torque permite analizar ejes, mezcladores o compuertas. Las vibraciones pueden revelar problemas de
balanceo, resonancia o rigidez insuficiente. La carga y el rozamiento condicionan la estabilidad de envases
y materiales. Lo importante es vincular estas mediciones con un modelo físico. Una lectura de corriente
elevada, por ejemplo, no es sólo un dato eléctrico: puede estar indicando un aumento del torque resistente o
una condición mecánica anormal. Esa conexión entre variables es parte central del enfoque aplicado de la
materia.
`,
  // Página 6
  s6: `
Este mapa conceptual muestra la estructura lógica de la unidad. Todo comienza con la fuerza entendida como
interacción. Las leyes de Newton nos indican cómo la suma de esas fuerzas se relaciona con la aceleración.
Para aplicar correctamente esas leyes necesitamos un diagrama de cuerpo libre, donde sólo aparezcan las
fuerzas externas que actúan sobre el sistema elegido. El rozamiento es una de esas fuerzas de contacto y
tiene un papel especial porque puede adaptarse hasta un valor máximo antes del deslizamiento. Cuando las
fuerzas actúan a cierta distancia de un eje aparece además el torque. Finalmente, un sistema estará en
equilibrio completo cuando no exista ni aceleración traslacional ni aceleración angular. Si alguno de estos
pasos conceptuales está mal planteado, las ecuaciones posteriores también lo estarán.
`,
  // Página 7
  s7: `
Una fuerza no debe pensarse como una entidad aislada, sino como una interacción entre dos cuerpos o entre
un cuerpo y su entorno. Por eso conviene nombrarla indicando quién la ejerce y sobre qué cuerpo actúa.
Podemos hablar, por ejemplo, de la fuerza de la cinta sobre el envase, de la fuerza del cable sobre una
tapa o de la fuerza gravitatoria de la Tierra sobre una caja. Esa forma de nombrar las fuerzas ayuda a
evitar confusiones, especialmente cuando aparecen pares de acción y reacción. Además, una fuerza es una
magnitud vectorial: no alcanza con conocer su valor numérico. También importan su dirección, su sentido
y, cuando analizamos un cuerpo rígido, su punto de aplicación. En un sistema de ejes cartesianos, esa
misma fuerza puede escribirse como suma de componentes: F vector igual a F equis por el versor i, más F
ye por el versor j. Los valores F equis y F ye son escalares con signo, expresados en newton, que indican
cuánto aporta la fuerza sobre cada eje. Los versores i y j no agregan módulo ni unidad: solamente indican
dirección y sentido. Un versor es, precisamente, un vector de módulo uno. El versor i apunta en la
dirección positiva del eje x y el versor j en la dirección positiva del eje y. Esta notación será muy
útil cuando más adelante tengamos que sumar fuerzas, proyectarlas sobre ejes o escribir la segunda ley de
Newton por componentes.
`,
  // Página 8
  s8: `
Para construir un buen diagrama de cuerpo libre es útil distinguir dos grandes grupos de fuerzas: las fuerzas de contacto y las fuerzas a distancia. Las fuerzas de contacto aparecen cuando el sistema interactúa directamente con otro cuerpo o con una superficie. Una fuerza aplicada, por ejemplo, puede ser la que ejerce un actuador neumático sobre una compuerta. La tensión aparece en cables, cadenas o eslingas que sostienen tapas, cargas o tolvas. La fuerza normal es la reacción perpendicular de una superficie de apoyo, como la que ejerce una cinta transportadora o una mesa sobre un envase. El rozamiento actúa tangencialmente en la zona de contacto y puede ser indispensable para que una cinta acelere un envase sin que éste deslice. Por otra parte, las fuerzas a distancia no requieren contacto mecánico directo. La fuerza gravitatoria se manifiesta como el peso de los productos, envases y equipos. Las interacciones eléctricas pueden aparecer por acumulación de carga electrostática, especialmente en polvos y partículas finas. Las interacciones magnéticas se aprovechan, por ejemplo, en separadores magnéticos destinados a retirar contaminantes ferromagnéticos. Las fuerzas nucleares no suelen intervenir directamente en los balances mecánicos cotidianos de una planta, pero están en la base de algunas técnicas de medición que utilizan radiación. Esta clasificación debe funcionar como una lista de control: una vez aislado el cuerpo, conviene preguntarse qué elementos lo tocan y qué campos externos actúan sobre él. Así disminuye el riesgo de olvidar una fuerza real o de agregar una fuerza que no pertenece al sistema analizado.
`,
  // Página 9
  s9: `
La gravedad puede describirse de manera general mediante la interacción gravitatoria entre masas, pero en
problemas de laboratorio o de planta usamos un modelo local mucho más simple. La letra G mayúscula
representa la constante de gravitación universal. En cambio, la letra g minúscula, la que usamos como
nueve coma ocho metros por segundo cuadrado, representa la intensidad local del campo gravitatorio
terrestre o aceleración de caída libre. Cerca de la superficie, esa g minúscula surge de agrupar tres
magnitudes: G mayúscula, la masa de la Tierra y el radio terrestre. En forma simbólica: g sub cero es
igual a G por masa de la Tierra dividido radio de la Tierra al cuadrado. Si el cuerpo está a cierta
altura h, la distancia al centro de la Tierra ya no es sólo el radio terrestre, sino radio terrestre más
h, y por eso g disminuye con la altura según una ley inversa al cuadrado. En una planta alimentaria, esta
variación es despreciable porque las alturas son muy pequeñas comparadas con el radio terrestre. Pero
conceptualmente es importante: permite entender por qué g no es una constante universal, sino un valor
local. También recordemos la convención de unidades: estamos trabajando en el Sistema Internacional. La
masa se expresa en kilogramos, mientras que el peso es una fuerza y se expresa en newtons. Por eso, decir
que un cuerpo pesa diez kilogramos es una forma cotidiana de hablar; en física diremos que tiene una masa
de diez kilogramos y, cerca de la Tierra, un peso aproximado de noventa y ocho newtons.
`,
  // Página 10
  s10: `
Antes de aplicar cualquier ley de Newton hay una decisión que condiciona todo el problema: elegir el sistema
que vamos a estudiar. Puede ser una caja, una tapa, una tolva, un conjunto formado por varios cuerpos o
incluso una porción de un mecanismo. Una vez elegido el sistema, sólo deben considerarse las fuerzas
externas que actúan sobre él. Las fuerzas internas entre partes del sistema pueden desaparecer del balance
global si se estudia el conjunto. Por eso dos elecciones distintas de sistema pueden producir diagramas
diferentes, aunque describan la misma situación física. La recomendación es explicitar siempre qué cuerpo se
aísla antes de dibujar una sola flecha. Ese paso, que parece sencillo, evita buena parte de los errores
posteriores.
`,
  // Página 11
  s11: `
La primera ley de Newton establece la condición de inercia. Si la suma vectorial de las fuerzas externas
sobre un cuerpo es cero, su aceleración es cero. Eso significa que el cuerpo puede permanecer en reposo o
continuar moviéndose con velocidad constante en línea recta. Un error frecuente es asociar fuerza neta cero
con reposo necesariamente. No es así: también puede existir movimiento rectilíneo uniforme. En una cinta que
se desplaza a velocidad constante, por ejemplo, un envase puede moverse sin aceleración aunque existan
varias fuerzas sobre él; lo importante es que se equilibren. Esta ley también permite definir los sistemas
de referencia inerciales, es decir, aquellos en los que un cuerpo sin fuerza neta conserva su estado de
movimiento.
`,
  // Página 12
  s12: `
Los sistemas de referencia merecen atención porque la descripción del movimiento depende del observador. Un
marco aproximadamente en reposo respecto del piso puede tratarse como inercial para muchos problemas de
planta. En cambio, un vehículo que acelera o una plataforma que gira son marcos no inerciales. Desde esos
marcos puede parecer que un cuerpo se desplaza o se desvía sin una fuerza real adicional que explique ese
efecto desde el marco del suelo. Para trabajar dentro de un sistema no inercial pueden introducirse fuerzas
ficticias, pero hay que dejar claro que no representan una nueva interacción física entre cuerpos. El punto
didáctico es distinguir qué parte del efecto proviene de fuerzas reales y qué parte surge por estar
observando desde un marco acelerado o rotante.
`,
  // Página 13
  s13: `
La segunda ley de Newton cuantifica la relación entre fuerza neta y aceleración. La suma vectorial de las
fuerzas externas es igual a la masa por la aceleración. Como se trata de una ecuación vectorial, normalmente
la usamos por componentes: suma de fuerzas en x igual a masa por aceleración en x, y lo mismo para y. La
dirección de la aceleración coincide con la dirección de la fuerza neta, no necesariamente con la dirección
de la velocidad. Esta distinción es muy importante. Un cuerpo puede moverse hacia la derecha y estar
acelerando hacia la izquierda si se está frenando. En una línea de transporte, esta ley permite estimar qué
fuerza neta se necesita para lograr una aceleración dada o, inversamente, qué aceleración producirá un
conjunto de fuerzas conocidas.
`,
  // Página 14
  s14: `
La tercera ley de Newton describe las fuerzas como pares de interacción. Si un cuerpo A ejerce una fuerza
sobre un cuerpo B, entonces B ejerce simultáneamente sobre A una fuerza de igual módulo y sentido opuesto.
La dificultad aparece cuando se intenta cancelar estas dos fuerzas en un mismo diagrama. Eso es incorrecto
porque cada una actúa sobre un cuerpo distinto. Si dibujamos el diagrama de un envase sobre una cinta, debe
aparecer la fuerza de la cinta sobre el envase. La reacción correspondiente, es decir, la fuerza del envase
sobre la cinta, pertenece al diagrama de la cinta. Esta idea es fundamental para interpretar contactos,
tensiones, apoyos y empujes sin mezclar fuerzas internas y externas.
`,
  // Página 15
  s15: `
En dinámica trabajamos con modelos simplificados. Modelar no significa ignorar la realidad, sino seleccionar
los efectos que son relevantes para la pregunta que queremos responder. Podemos tratar una caja como
partícula si sólo nos interesa su traslación y no su rotación. Podemos considerarla cuerpo rígido si
interesa analizar vuelco o torque. También podemos suponer una cuerda sin masa, una polea ideal o una
gravedad uniforme si esos detalles no afectan de manera significativa el resultado buscado. Cada hipótesis
tiene un dominio de validez. Por eso conviene declarar qué estamos despreciando. Un buen modelo es lo
bastante simple para poder resolverse, pero conserva los mecanismos físicos esenciales del fenómeno que
estamos estudiando.
`,
  // Página 16
  s16: `
El diagrama de cuerpo libre es una herramienta central de toda la unidad. El procedimiento recomendable es:
primero aislar el cuerpo; segundo, reemplazar cada interacción con el entorno por la fuerza correspondiente;
tercero, elegir ejes convenientes; y cuarto, recién entonces plantear ecuaciones. En el diagrama no se
dibuja el movimiento, se dibujan fuerzas. Tampoco se agregan fuerzas de reacción que actúan sobre otros
cuerpos. Si una fuerza está inclinada, puede ser útil descomponerla en componentes según los ejes elegidos.
Cuando el cuerpo está sobre un plano inclinado, por ejemplo, suele simplificar mucho elegir un eje paralelo
al plano y otro perpendicular. Un DCL correcto suele contener casi toda la física necesaria para resolver el
problema.
`,
  // Página 17
  s17: `
La fuerza neta es la suma vectorial de todas las fuerzas externas que actúan sobre el sistema. Para operar
con ella conviene trabajar por componentes. Si una fuerza forma un ángulo con el eje x, sus componentes
pueden expresarse mediante seno y coseno según la geometría elegida. En equilibrio traslacional, la suma de
fuerzas en cada eje debe ser cero. Si el sistema acelera, esa misma suma debe igualarse a masa por
aceleración en la dirección correspondiente. Esto permite separar un problema bidimensional en ecuaciones
escalares. La selección de ejes no cambia la física, pero puede simplificar mucho el cálculo. La mejor
elección suele ser aquella que alinea los ejes con el movimiento esperado o con las superficies de contacto.
`,
  // Página 18
  s18: `
El rozamiento es una fuerza de contacto tangencial que aparece entre superficies. En tecnología de alimentos
puede ser beneficioso, por ejemplo, cuando permite que una cinta acelere un envase sin que éste deslice.
También puede ser indeseable si produce desgaste, calentamiento, daño superficial o pérdidas de energía. Hay
que distinguir dos modelos. El rozamiento estático actúa mientras no existe deslizamiento relativo y toma el
valor necesario hasta un máximo igual a mu estático por la normal. El rozamiento cinético aparece una vez
iniciado el deslizamiento y se modela aproximadamente como mu cinético por la normal. El punto clave es que
el rozamiento estático no vale siempre su máximo: sólo alcanza ese límite en la condición de deslizamiento
inminente.
`,
  // Página 19
  s19: `
En esta simulación conviene observar cómo responde el rozamiento estático a medida que aumenta la fuerza
aplicada. Mientras el bloque permanece en reposo relativo, el rozamiento se ajusta y compensa la fuerza
aplicada. Por eso, si la fuerza aplicada vale diez newtons, el rozamiento estático puede valer diez newtons
aunque su valor máximo sea mucho mayor. Recién cuando la fuerza requerida supera el límite mu estático por N
se pierde la adherencia. A partir de ese instante cambia el modelo y pasa a actuar rozamiento cinético.
Antes de mover los controles, conviene predecir qué ocurrirá al aumentar la masa, la normal o el coeficiente
de rozamiento. La simulación sirve para contrastar esa predicción con el comportamiento del modelo.
`,
  // Página 20
  s20: `
En un plano inclinado el peso sigue apuntando verticalmente hacia abajo, pero resulta más cómodo elegir ejes
paralelos y perpendiculares al plano. Con esa elección, el peso se descompone en una componente paralela,
que tiende a hacer deslizar el cuerpo, y una componente perpendicular, que contribuye a determinar la fuerza
normal. La componente paralela vale masa por gravedad por seno del ángulo, mientras que la perpendicular
vale masa por gravedad por coseno del ángulo. Si no existen otras fuerzas normales al plano, la normal toma
el valor de esa componente perpendicular. Esta elección de ejes muestra que la normal no es necesariamente
igual al peso: depende de la geometría y de las demás fuerzas que actúan sobre el cuerpo.
`,
  // Página 21
  s21: `
Esta simulación combina plano inclinado y rozamiento. El ángulo controla cuánto del peso queda proyectado en
la dirección del plano, mientras que el coeficiente de rozamiento determina la resistencia al deslizamiento.
A medida que aumenta el ángulo, crece la componente del peso que impulsa el movimiento y disminuye la
componente normal. Por eso una rampa más inclinada puede favorecer el desplazamiento del producto. Pero en
una instalación real eso también puede aumentar velocidad de descarga, impactos o inestabilidad. Antes de
usar el control, conviene preguntar: ¿qué ocurre si aumentamos el ángulo manteniendo el mismo rozamiento? ¿Y
si aumentamos el coeficiente de rozamiento con el mismo ángulo? La respuesta debe justificarse primero desde
las fuerzas.
`,
  // Página 22
  s22: `
En la unidad anterior describimos el movimiento circular desde la cinemática. Ahora lo analizamos
dinámicamente. Incluso si la rapidez permanece constante, el vector velocidad cambia de dirección de manera
continua. Ese cambio requiere una aceleración centrípeta dirigida hacia el centro. Por la segunda ley de
Newton, entonces debe existir una fuerza neta radial que también apunte hacia el centro. Es importante no
interpretar la fuerza centrípeta como una fuerza adicional de una nueva naturaleza. Puede estar producida
por tensión, rozamiento, normal, gravedad o una combinación de fuerzas reales. La expresión masa por
velocidad al cuadrado dividido por radio indica cuánto debe valer la resultante radial necesaria para
mantener la trayectoria circular.
`,
  // Página 23
  s23: `
Los distintos ejemplos de movimiento circular cambian de aspecto, pero comparten la misma estructura física.
En una curva peraltada intervienen normal, peso y eventualmente rozamiento. En un péndulo cónico, la
componente horizontal de la tensión aporta la resultante radial. En un movimiento circular vertical, la
gravedad modifica la fuerza radial necesaria según la posición. La estrategia no cambia: dibujar el diagrama
de cuerpo libre, identificar la dirección hacia el centro, proyectar todas las fuerzas sobre esa dirección y
escribir la suma radial igual a masa por aceleración centrípeta. Esta idea ayuda a evitar memorizar fórmulas
específicas para cada dibujo. Lo esencial es reconocer qué fuerzas reales están suministrando la resultante
hacia el centro.
`,
  // Página 24
  s24: `
Esta simulación representa un envase sobre una mesa giratoria. Para que el envase acompañe la rotación sin
deslizar, el rozamiento estático debe proporcionar la fuerza centrípeta necesaria. Esa fuerza requerida
crece con la masa, aumenta con el cuadrado de la velocidad y disminuye cuando aumenta el radio para una
misma velocidad lineal. Por otro lado, el máximo rozamiento estático depende de la normal y del coeficiente
de adherencia. Si la fuerza radial requerida supera ese máximo, el envase pierde adherencia. Antes de mover
los controles, conviene prever qué variable resulta más crítica. Duplicar la velocidad, por ejemplo, no
duplica la fuerza centrípeta: la multiplica por cuatro. Esa dependencia cuadrática es especialmente
importante en equipos rotativos.
`,
  // Página 25
  s25: `
La ley de Hooke describe el comportamiento de un resorte ideal o de un sistema elástico dentro de un rango
aproximadamente lineal. La fuerza elástica es proporcional a la deformación y apunta en sentido contrario al
desplazamiento respecto de la posición de equilibrio. El signo negativo de la ecuación no significa que la
fuerza sea siempre negativa; indica que es restauradora. La constante k mide la rigidez: cuanto mayor es k,
mayor fuerza hace falta para producir la misma deformación. Esta relación sólo es válida mientras el
elemento trabaje dentro de su rango elástico. Si la deformación es demasiado grande, el material puede dejar
de responder linealmente o incluso sufrir deformación permanente. Por eso toda aplicación real debe
considerar el dominio de validez del modelo.
`,
  // Página 26
  s26: `
La elasticidad aparece en muchos sistemas industriales aunque no veamos un resorte convencional. Los
soportes antivibratorios se deforman para aislar vibraciones. Las celdas de carga convierten pequeñas
deformaciones en señales que permiten estimar fuerzas o pesos. Los alimentadores vibratorios combinan
rigidez y masa para producir oscilaciones controladas. También un envase, una estructura o un soporte puede
deformarse elásticamente bajo carga. La ley de Hooke sirve como primera aproximación cuando la relación
entre fuerza y deformación es lineal. Desde el punto de vista técnico interesa reconocer tanto la rigidez
como el límite del comportamiento elástico, porque una deformación excesiva puede alterar alineación,
precisión de medición o integridad mecánica.
`,
  // Página 27
  s27: `
En la unidad 2 estudiamos el movimiento armónico simple desde la cinemática: posición, velocidad,
aceleración, amplitud, período y frecuencia. Ahora queremos explicar por qué aparece ese movimiento. Si la
fuerza neta es proporcional al desplazamiento y apunta hacia la posición de equilibrio, la segunda ley
conduce a una aceleración igual a menos omega cuadrado por x. En un sistema masa-resorte, esa condición
surge directamente de combinar fuerza elástica igual a menos k por x con masa por aceleración. El resultado
es una ecuación diferencial de segundo orden. La idea física es muy clara: cuanto más se aleja el cuerpo del
equilibrio, mayor es la fuerza restauradora; cuando pasa por el equilibrio, la fuerza y la aceleración se
anulan instantáneamente, pero la velocidad es máxima.
`,
  // Página 28
  s28: `
Para el sistema masa-resorte ideal, la frecuencia natural no es arbitraria. Está determinada por la rigidez
del resorte y por la masa: omega cero es la raíz cuadrada de k dividido por m. Esto permite interpretar
tendencias sin hacer un cálculo completo. Si aumentamos k, el sistema se vuelve más rígido y oscila más
rápido. Si aumentamos la masa, la inercia es mayor y la oscilación se vuelve más lenta. El período resulta
proporcional a la raíz cuadrada de m sobre k. Esta relación tiene gran importancia en vibraciones mecánicas,
porque toda estructura o conjunto masa-rigidez posee frecuencias naturales. Conocerlas permite evaluar si
una excitación periódica de una máquina puede acercarse a una condición de resonancia.
`,
  // Página 29
  s29: `
El péndulo simple también puede aproximarse a un movimiento armónico simple, pero sólo cuando el ángulo es
pequeño y está expresado en radianes, de modo que seno de theta pueda aproximarse por theta. Bajo esa
condición, la frecuencia natural depende de la gravedad y de la longitud del péndulo. A este comportamiento
ideal debemos agregar dos fenómenos reales. El amortiguamiento hace que la amplitud disminuya porque se
disipa energía. La excitación externa periódica puede, en cambio, aportar energía al sistema. Si la
frecuencia de excitación se aproxima a la frecuencia natural, la amplitud puede crecer de manera importante:
aparece la resonancia. En máquinas y estructuras, esta condición puede ser indeseable y debe detectarse o
evitarse.
`,
  // Página 30
  s30: `
La cantidad de movimiento lineal, o momento lineal, se define como masa por velocidad y es una magnitud
vectorial. Resulta especialmente útil en situaciones donde las fuerzas actúan durante intervalos breves,
como golpes, choques, impactos o transferencias rápidas. El impulso de una fuerza corresponde a la integral
de la fuerza en el tiempo y es igual al cambio de cantidad de movimiento. Esta relación permite analizar
procesos sin conocer en detalle la fuerza instantánea en cada momento. Si el impulso externo neto sobre un
sistema es despreciable, la cantidad de movimiento total se conserva. Esto no significa que no existan
fuerzas internas durante un choque; significa que esas fuerzas internas aparecen en pares y no modifican el
momento lineal total del sistema aislado.
`,
  // Página 31
  s31: `
Cuando trabajamos con un conjunto de partículas o con un cuerpo extendido, el centro de masa permite
describir el movimiento global del sistema. Su posición es un promedio ponderado por las masas y su
velocidad se obtiene de la misma manera a partir de las velocidades de las partículas. Desde el punto de
vista dinámico, el centro de masa se mueve como si toda la masa del sistema estuviera concentrada allí y
actuara sobre ella la fuerza externa neta. Esta idea simplifica muchos problemas. En una carga distribuida,
una tolva parcialmente llena o un conjunto de piezas, podemos separar el movimiento global del sistema de
los movimientos internos. Más adelante, cuando estudiamos equilibrio y torque, una idea relacionada es el
centro de gravedad, punto donde podemos considerar aplicado el peso resultante.
`,
  // Página 32
  s32: `
Hasta aquí muchas veces representamos los cuerpos como partículas, pero un objeto real puede tener extensión
y puede rotar. Un sistema de partículas está formado por varios elementos que pueden moverse entre sí; un
cuerpo rígido es un modelo ideal en el que las distancias entre sus puntos permanecen constantes. Esta
diferencia determina qué magnitudes necesitamos. Si sólo interesa la traslación, puede bastar con masa,
posición del centro de masa y fuerza neta. Si interesa la rotación, aparecen además el torque, el momento de
inercia y las variables angulares. Elegir el modelo correcto es parte de la resolución del problema. Una
caja sobre una cinta puede tratarse como partícula si sólo calculamos su aceleración, pero debe tratarse
como cuerpo rígido si queremos analizar si puede volcar.
`,
  // Página 33
  s33: `
El torque, o momento de una fuerza, mide la tendencia de esa fuerza a producir rotación respecto de un eje o
punto. Su magnitud depende de tres factores: el valor de la fuerza, la distancia al eje y el ángulo entre el
vector posición y la fuerza. De manera equivalente, puede calcularse como fuerza por brazo de palanca, donde
el brazo es la distancia perpendicular desde el eje hasta la línea de acción de la fuerza. Este detalle
geométrico es fundamental. Si la línea de acción pasa por el eje, el brazo vale cero y no hay torque, aunque
la fuerza sea grande. Por eso una misma fuerza puede ser muy eficaz para girar una tapa si se aplica lejos
de la bisagra y casi inútil si se aplica cerca del eje.
`,
  // Página 34
  s34: `
En esta simulación podemos explorar cómo cambia el torque al modificar fuerza, distancia y ángulo. Si la
fuerza es perpendicular al brazo, el seno del ángulo vale uno y el torque es máximo para esos valores de
fuerza y distancia. Si la fuerza apunta directamente hacia el eje o se aleja de él sobre la misma línea, el
torque se hace cero. Esto muestra por qué no basta con aumentar la fuerza: también importa dónde y cómo se
aplica. En un mezclador, el torque requerido depende de la resistencia que ofrece el producto y de la
geometría de las paletas. En una compuerta, una mayor distancia al eje puede reducir la fuerza necesaria
para abrirla. La simulación debe usarse para verificar estas relaciones, no sólo para obtener un número.
`,
  // Página 35
  s35: `
El momento de inercia cumple en rotación un papel análogo al de la masa en traslación: mide la resistencia
del cuerpo a cambiar su velocidad angular. Pero, a diferencia de la masa, depende de cómo está distribuida
la materia respecto del eje. Alejar masa del eje aumenta el momento de inercia. El momento angular, por su
parte, es una magnitud asociada al estado de rotación y puede expresarse para una partícula mediante el
producto vectorial entre posición y momento lineal. Para un cuerpo rígido que gira alrededor de un eje fijo,
se relaciona con el momento de inercia y la velocidad angular. Si el torque externo neto es cero, el momento
angular total del sistema se conserva. Estas ideas son relevantes en elementos rotativos, balanceo y cambios
de velocidad.
`,
  // Página 36
  s36: `
En equipos alimentarios aparecen continuamente magnitudes rotacionales. En un mezclador interesa el torque
motor necesario para vencer la resistencia del producto. En una centrífuga, la distribución de masa y la
velocidad angular influyen fuertemente en las cargas mecánicas y en las vibraciones. En rodillos y tambores,
el momento de inercia condiciona cuánto torque hace falta para acelerar o frenar el sistema. En ejes y
transmisiones, un desequilibrio puede producir esfuerzos periódicos y vibraciones no deseadas. Por eso
conviene relacionar las ecuaciones con variables observables: corriente de motor, tiempo de arranque,
velocidad angular, vibración y temperatura. La física permite interpretar esas señales como consecuencias de
fuerzas y torques actuando sobre un sistema real.
`,
  // Página 37
  s37: `
Para que un cuerpo rígido permanezca en equilibrio completo deben cumplirse dos condiciones independientes.
La primera es equilibrio traslacional: la suma de fuerzas externas debe ser cero, de modo que el centro de
masa no tenga aceleración. La segunda es equilibrio rotacional: la suma algebraica de los torques respecto
de un eje debe ser cero, de modo que no exista aceleración angular. Una suma de fuerzas igual a cero no
garantiza por sí sola que el cuerpo no gire. Dos fuerzas iguales y opuestas separadas pueden formar un par
que produce rotación sin fuerza neta. En problemas de equilibrio conviene elegir el eje de cálculo de
torques de manera estratégica, por ejemplo pasando por el punto de aplicación de una fuerza desconocida para
eliminar su contribución al momento.
`,
  // Página 38
  s38: `
Esta simulación representa una barra o tapa en equilibrio rotacional. Una carga produce un torque que debe
ser compensado por la fuerza de sostén. La condición básica es que los torques horarios y antihorarios
tengan igual magnitud. Si aumentamos la distancia de aplicación de la fuerza de sostén respecto del eje, la
fuerza necesaria disminuye. Éste es el principio detrás de una palanca larga o de una manija ubicada lejos
de la bisagra. También conviene observar que elegir como eje la bisagra simplifica el cálculo porque las
fuerzas de reacción aplicadas allí tienen brazo de palanca cero. Antes de modificar los controles, intenten
anticipar cómo cambiará la fuerza requerida si duplicamos el brazo de sostén o si acercamos la carga al eje.
`,
  // Página 39
  s39: `
La tabla reúne varias aplicaciones y permite ver que los mismos principios aparecen en equipos muy
distintos. En una cinta transportadora dominan peso, normal, rozamiento y fuerza motriz. En una rampa
importan las componentes del peso y el rozamiento. En un mezclador, el torque motor debe equilibrar o
superar los torques resistentes. En una tapa o compuerta, las fuerzas y sus brazos determinan el esfuerzo de
apertura. En soportes elásticos, rigidez, deformación, amplitud y frecuencia condicionan las vibraciones. La
utilidad del modelo físico está en relacionar esas magnitudes con variables que realmente se miden o
controlan. Así, una ecuación deja de ser un ejercicio abstracto y se convierte en una herramienta para
interpretar el estado del proceso.
`,
  // Página 40
  s40: `
En estos ejemplos de traslación conviene fijarse más en el procedimiento que en el resultado numérico. En el
producto que se mueve con velocidad constante, la aceleración es cero y las fuerzas se equilibran;
verticalmente, normal y peso tienen igual módulo porque no hay otras fuerzas en esa dirección. En el
arranque con rozamiento, primero calculamos la fuerza necesaria para producir la aceleración y luego la
comparamos con el máximo rozamiento estático disponible. Esa comparación decide si el producto acompaña a la
cinta o desliza. En la rampa sin rozamiento, la aceleración surge de la componente del peso paralela al
plano. Los tres casos muestran que una misma ley, suma de fuerzas igual a masa por aceleración, adopta
formas distintas según el diagrama de cuerpo libre.
`,
  // Página 41
  s41: `
Los ejemplos de tensión y torque amplían el análisis. Una tolva suspendida y en reposo tiene tensión igual
al peso sólo bajo una configuración vertical simple y sin aceleración. En la paleta de mezclador, el torque
se obtiene multiplicando fuerza por el brazo perpendicular cuando la fuerza es perpendicular al radio. En la
tapa en equilibrio aparece una idea especialmente útil: no es necesario aplicar una fuerza tan grande como
el peso si se dispone de un brazo de palanca mayor. La condición es equilibrar los torques respecto de la
bisagra. Conviene observar que en todos los casos la elección del sistema y del eje de rotación simplifica
el planteo. El cálculo debe acompañarse siempre con una interpretación física del resultado.
`,
  // Página 42
  s42: `
Interpretar un diagrama de cuerpo libre significa poder reconstruir la situación física a partir de las
flechas. Primero debemos saber qué cuerpo está aislado. Luego, para cada fuerza, identificar quién la
ejerce. Después elegimos ejes y signos, y recién entonces proyectamos las fuerzas. Si existe una fuerza
inclinada, sus componentes no son fuerzas nuevas: son una forma matemática de representar el mismo vector.
Si estudiamos rotación, además debemos identificar las líneas de acción y los brazos de palanca. Un buen
ejercicio es mirar un DCL y preguntarse qué ecuaciones se pueden escribir sin hacer todavía ningún cálculo.
Esa lectura conceptual permite detectar errores antes de que se propaguen al desarrollo algebraico.
`,
  // Página 43
  s43: `
Esta diapositiva reúne errores que conviene convertir en una lista de control. Masa y peso no son lo mismo:
kilogramos y newtons representan magnitudes distintas. La normal no es siempre igual al peso; depende de la
geometría y de otras fuerzas. El rozamiento estático no se reemplaza automáticamente por mu estático por N,
porque ése es sólo su valor máximo. En torque no debemos usar simplemente fuerza por distancia si la
distancia no es perpendicular a la línea de acción. Y en equilibrio completo no alcanza con que la suma de
fuerzas sea cero: también debe anularse la suma de torques. La mejor forma de evitar estos errores es volver
al modelo físico y al diagrama antes de manipular ecuaciones.
`,
  // Página 44
  s44: `
Las preguntas conceptuales están pensadas para justificar antes de calcular. Por ejemplo, un cuerpo puede
moverse con velocidad constante aunque actúen varias fuerzas, siempre que su resultante sea cero. Acción y
reacción no se cancelan porque actúan sobre cuerpos distintos. El rozamiento puede ser útil si transmite
movimiento sin deslizamiento y perjudicial si produce desgaste o pérdida de energía. La diferencia entre
fuerza y torque radica en que una fuerza tiende a modificar la traslación, mientras que el torque mide su
tendencia a modificar la rotación respecto de un eje. Al discutir estas preguntas conviene evitar respuestas
de una sola palabra. La meta es construir una explicación breve que nombre el principio físico y lo
relacione con la situación.
`,
  // Página 45
  s45: `
Los ejercicios numéricos propuestos cubren los modelos principales de la unidad: peso, fuerza neta,
equilibrio, rozamiento, plano inclinado, tensión y torque. La recomendación es no comenzar buscando una
fórmula que contenga todos los datos. Primero se identifica el sistema, luego se dibuja el diagrama de
cuerpo libre y se eligen ejes. Después se escribe la ecuación general correspondiente y sólo al final se
reemplazan valores. En los problemas de rozamiento hay que decidir si el cuerpo está adherido o desliza. En
los de torque hay que definir el eje y la convención de signos. Y al obtener el resultado, siempre debe
verificarse la unidad y preguntarse si el valor y el sentido son físicamente razonables.
`,
  // Página 46
  s46: `
Los simuladores deben utilizarse como herramientas de exploración y contraste, no como máquinas de dar
respuestas. Una secuencia útil es: primero predecir qué ocurrirá al cambiar una variable; después modificar
el control; finalmente comparar el resultado con la predicción y explicarlo con una ecuación. En la segunda
ley podemos estudiar cómo cambia la aceleración al variar masa o fuerza neta. En rozamiento, cuándo se
pierde adherencia. En el plano inclinado, el efecto del ángulo. En torque, la influencia del brazo y del
ángulo. En equilibrio rotacional, la relación entre fuerza y distancia al eje. Si el simulador produce algo
inesperado, ése es justamente el momento de volver al modelo físico y revisar la hipótesis.
`,
  // Página 47
  s47: `
La actividad práctica integra transporte y mezclado para obligarnos a combinar varios conceptos. Primero se
define el sistema y el marco de referencia. Después se construye el diagrama de cuerpo libre del producto
transportado. Con ese diagrama se calculan peso, normal, rozamiento máximo y fuerza neta durante el
arranque. Luego se analiza si el producto acompaña la cinta o desliza. En la parte rotacional se estima el
torque sobre una paleta del mezclador y se relaciona con el esfuerzo del motor. El objetivo final no es
obtener una lista de números, sino interpretar qué condiciones podrían generar derrames, deslizamientos,
sobrecargas o vibraciones. La física se usa así como herramienta de diagnóstico y de decisión técnica.
`,
  // Página 48
  s48: `
La actividad integradora propone mirar una línea completa y no fenómenos aislados. Una cinta entrega
producto a una rampa; la rampa alimenta una tolva; la tolva descarga hacia un mezclador; luego intervienen
tapas o compuertas. Cada etapa puede analizarse con los conceptos de la unidad. En la cinta dominan
aceleración y rozamiento. En la rampa, componentes del peso. En la tolva, cargas y soportes. En el
mezclador, torque y rotación. En una tapa, equilibrio de fuerzas y momentos. El desafío es identificar qué
modelo conviene en cada punto y cómo una modificación en una parte puede afectar el resto del proceso. Esa
mirada integrada es la que más se aproxima a una situación industrial real.
`,
  // Página 49
  s49: `
Esta infografía resume el concepto de fuerza como interacción. Al observarla, conviene distinguir fuerzas de
contacto y fuerzas a distancia y recordar que cada flecha debe responder a dos preguntas: quién ejerce la
fuerza y sobre qué cuerpo actúa. También es importante identificar el carácter vectorial de la fuerza y
separar módulo, dirección y sentido. En las aplicaciones industriales que aparecen en la imagen, la misma
lógica se repite: cinta sobre producto, superficie sobre envase, gravedad sobre la carga. La infografía
puede utilizarse como síntesis del primer bloque de la unidad y como guía para construir diagramas de cuerpo
libre sin agregar fuerzas que no pertenecen al sistema.
`,
  // Página 50
  s50: `
Esta segunda infografía reúne las leyes de Newton y la idea de fuerza neta. Conviene leerla comparando tres
situaciones: fuerza neta cero, fuerza neta distinta de cero y pares de interacción. Con fuerza neta cero la
aceleración es cero, aunque el cuerpo puede estar moviéndose con velocidad constante. Con fuerza neta no
nula aparece aceleración en la dirección de la resultante. Y en la tercera ley las fuerzas del par actúan
sobre cuerpos diferentes. El objetivo de esta síntesis visual es que las leyes no queden como tres frases
memorizadas, sino como herramientas para decidir qué ecuación corresponde a cada situación y qué
interpretación física tiene el resultado.
`,
  // Página 51
  s51: `
La tercera infografía se concentra en diagramas de cuerpo libre y componentes. El punto central es que un
DCL no reproduce el dibujo real del equipo: aísla un cuerpo y reemplaza cada interacción por una fuerza. A
partir de allí podemos elegir ejes convenientes y descomponer las fuerzas inclinadas. En un plano inclinado,
por ejemplo, los ejes paralelo y perpendicular simplifican el peso en dos componentes con significados
físicos claros. Esta infografía funciona bien como lista de verificación: sistema definido, fuerzas externas
identificadas, ejes elegidos, componentes correctas y ecuaciones coherentes. Si esos pasos están claros, la
resolución matemática suele ser mucho más segura.
`,
  // Página 52
  s52: `
La infografía de rozamiento permite repasar la diferencia entre estático y cinético. El rozamiento estático
se adapta al valor necesario mientras no exista deslizamiento, pero no puede superar mu estático por la
normal. Una vez que el cuerpo desliza, se utiliza el modelo de rozamiento cinético. En aplicaciones con
cintas transportadoras, el rozamiento estático puede ser precisamente el mecanismo que acelera el producto.
Esto ayuda a superar la idea intuitiva de que el rozamiento siempre se opone al movimiento del cuerpo
respecto del suelo. En realidad, se opone al deslizamiento relativo en la superficie de contacto. La imagen
puede usarse para discutir adherencia, arranque, frenado y desgaste.
`,
  // Página 53
  s53: `
Esta infografía resume torque y equilibrio rotacional. Conviene fijarse en la diferencia entre distancia al
eje y brazo de palanca: lo que entra directamente en el torque es la distancia perpendicular a la línea de
acción de la fuerza. También debemos definir un sentido positivo para los torques, por ejemplo antihorario
positivo y horario negativo. Un cuerpo en equilibrio rotacional tiene suma de torques igual a cero, pero
para equilibrio completo además necesita suma de fuerzas igual a cero. La imagen permite relacionar estas
ideas con tapas, palancas, ejes y mezcladores. Una buena pregunta de repaso es: ¿cómo puede una fuerza
pequeña equilibrar una fuerza grande? La respuesta está en los distintos brazos de palanca.
`,
  // Página 54
  s54: `
La última infografía conecta ley de Hooke y movimiento armónico simple. La fuerza elástica crece
proporcionalmente con la deformación dentro del rango lineal y apunta hacia la posición de equilibrio. Al
combinar esa fuerza con la segunda ley de Newton surge la condición dinámica del MAS. La frecuencia natural
del sistema depende de la relación entre rigidez y masa. La misma lógica permite entender por qué un soporte
más rígido o una carga más grande modifican la frecuencia de vibración. También conviene recordar que los
sistemas reales presentan amortiguamiento y pueden ser excitados externamente, por lo que aparece el
fenómeno de resonancia. Esta síntesis visual integra elasticidad, oscilación y aplicación técnica.
`,
  // Página 55
  s55: `
Como síntesis, la dinámica nos permite pasar de describir el movimiento a explicar sus causas. Las fuerzas
son interacciones vectoriales y su suma determina la aceleración traslacional. El rozamiento puede
transmitir movimiento o generar pérdidas. En trayectorias circulares, una resultante radial mantiene la
aceleración centrípeta. La fuerza elástica conduce al movimiento armónico simple cuando es proporcional y
opuesta al desplazamiento. La cantidad de movimiento y el impulso son herramientas útiles para interacciones
rápidas. En cuerpos extendidos, el torque y el momento de inercia permiten estudiar rotación. Y para
equilibrio completo deben anularse tanto la fuerza neta como el torque neto. La clave metodológica de toda
la unidad sigue siendo la misma: sistema, diagrama, ecuaciones e interpretación.
`,
  // Página 56
  s56: `
El glosario no debe leerse sólo como una lista de definiciones, sino como un conjunto de distinciones que
necesitamos manejar con precisión. Masa no es peso; la masa mide inercia y el peso es una fuerza
gravitatoria. La normal es una fuerza de contacto perpendicular a la superficie y no tiene por qué valer
siempre lo mismo que el peso. El rozamiento actúa tangencialmente en el contacto. La ley de Hooke relaciona
fuerza elástica y deformación dentro del rango lineal. El momento lineal combina masa y velocidad; el
impulso mide el efecto acumulado de una fuerza en el tiempo. El torque mide tendencia al giro. Utilizar
correctamente estos términos mejora tanto el planteo físico como la comunicación técnica de los resultados.
`,
  // Página 57
  s57: `
Esta presentación funciona como apoyo visual y oral del apunte de la Unidad 3. Las diapositivas resumen
conceptos, ecuaciones, diagramas, simulaciones e infografías, pero el desarrollo completo y las actividades
quedan en el apunte y en la bibliografía de la cátedra. La recomendación para estudiar es no memorizar
fórmulas de manera aislada. Conviene reconstruir cada ecuación desde el sistema físico y el diagrama de
cuerpo libre, identificar qué hipótesis se están utilizando y verificar las unidades y el sentido del
resultado. Si esa metodología se mantiene, los mismos principios pueden transferirse a situaciones nuevas.
Ése es el objetivo final de la unidad: disponer de herramientas de dinámica que permitan interpretar y
resolver problemas técnicos con criterio físico.
`,
 };

for (const [id, texto] of Object.entries(window.GUIONES_U3)) {
  const slide = document.getElementById(id);
  if (slide) slide.dataset.narration = texto.replace(/\s+/g, ' ').trim();
}
