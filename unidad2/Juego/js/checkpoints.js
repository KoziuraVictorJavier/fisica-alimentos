window.CINEMATICA_CHECKPOINTS = {
  9: {
    id:"CP_FUNDAMENTOS",
    title:"Checkpoint 1 · Fundamentos",
    subtitle:"Sistema de referencia, posición, desplazamiento, velocidad y aceleración",
    required:2,
    draw:3,
    questions:[
      {
        id:"CP_FUND_001",type:"mcq",difficulty:2,
        prompt:"Un móvil parte de $x=2\\,m$, llega a $x=8\\,m$ y luego vuelve a $x=5\\,m$. ¿Qué afirmación es correcta?",
        options:["La distancia recorrida es 9 m y el desplazamiento es +3 m.","La distancia y el desplazamiento valen 3 m.","La distancia es 3 m y el desplazamiento 9 m.","El desplazamiento es −3 m."],
        answer:"A",
        explanation:"Recorre 6 m hacia adelante y 3 m hacia atrás: distancia 9 m. El cambio neto es $5-2=+3\\,m$."
      },
      {
        id:"CP_FUND_002",type:"mcq",difficulty:2,
        prompt:"Una gráfica $x(t)$ tiene pendiente negativa y cada vez más pronunciada. ¿Qué interpretación es compatible?",
        options:["La velocidad es negativa y su módulo aumenta.","La velocidad es positiva y constante.","El móvil está en reposo.","La aceleración debe ser cero."],
        answer:"A",
        explanation:"La pendiente de x(t) es la velocidad. Una pendiente negativa cuyo módulo crece indica una velocidad cada vez más negativa."
      },
      {
        id:"CP_FUND_003",type:"mcq",difficulty:3,
        prompt:"Un móvil mantiene rapidez constante pero describe una curva. ¿Qué magnitudes pueden cambiar simultáneamente?",
        options:["La velocidad vectorial y la aceleración.","La rapidez y el tiempo necesariamente.","La masa y la distancia por definición.","Ninguna, porque la rapidez es constante."],
        answer:"A",
        explanation:"Cambiar la dirección de la velocidad implica cambiar el vector velocidad y, por tanto, puede existir aceleración."
      },
      {
        id:"CP_FUND_004",type:"mcq",difficulty:2,
        prompt:"Si se cambia el origen de coordenadas pero no se mueve físicamente el objeto, ¿qué puede cambiar?",
        options:["Su coordenada de posición, pero no su ubicación física.","Su velocidad física necesariamente.","Su masa.","La gravedad local."],
        answer:"A",
        explanation:"Las coordenadas dependen del sistema de referencia; el estado físico del objeto no cambia por redefinir el origen."
      },
      {
        id:"CP_FUND_005",type:"mcq",difficulty:3,
        prompt:"Un móvil recorre 100 m y regresa al punto de partida en 20 s. ¿Cuál de estas combinaciones es correcta?",
        options:["Rapidez media = 10 m/s; velocidad media = 0.","Rapidez media = 0; velocidad media = 10 m/s.","Ambas valen 10 m/s.","Ambas valen 0."],
        answer:"A",
        explanation:"La distancia total es 200 m, pero el desplazamiento neto es cero."
      }
    ]
  },

  17: {
    id:"CP_RECTILINEO",
    title:"Checkpoint 2 · Movimiento rectilíneo",
    subtitle:"MRU, MRUV, gráficas, Galileo y caída libre",
    required:2,
    draw:3,
    questions:[
      {
        id:"CP_RECT_001",type:"mcq",difficulty:2,
        prompt:"Una cinta parte del reposo y llega a $1.2\\,m/s$ en $4\\,s$ con aceleración constante. ¿Cuál es su aceleración?",
        options:["0.30 m/s²","4.8 m/s²","1.2 m/s²","0.075 m/s²"],
        answer:"A",
        explanation:"$a=\\Delta v/\\Delta t=1.2/4=0.30\\,m/s^2$."
      },
      {
        id:"CP_RECT_002",type:"mcq",difficulty:3,
        prompt:"Un móvil frena desde $10\\,m/s$ con $a=-2\\,m/s^2$. ¿Qué distancia necesita para detenerse?",
        options:["25 m","20 m","50 m","5 m"],
        answer:"A",
        explanation:"Con $v_f^2=v_0^2+2a\\Delta x$: $0=100-4\\Delta x$, por lo que $\\Delta x=25\\,m$."
      },
      {
        id:"CP_RECT_003",type:"mcq",difficulty:2,
        prompt:"En una gráfica $v$–$t$, ¿qué representan respectivamente la pendiente y el área algebraica?",
        options:["Aceleración y desplazamiento.","Posición y aceleración.","Desplazamiento y rapidez.","Tiempo y posición."],
        answer:"A",
        explanation:"La pendiente es $dv/dt=a$ y el área bajo v(t) es el desplazamiento."
      },
      {
        id:"CP_RECT_004",type:"mcq",difficulty:2,
        prompt:"En el punto más alto de un lanzamiento vertical hacia arriba...",
        options:["$v_y=0$ pero $a_y=-g$ si y es positivo hacia arriba.","$v_y=0$ y $a_y=0$.","$v_y=g$ y $a_y=0$.","la gravedad cambia de sentido."],
        answer:"A",
        explanation:"La velocidad se anula instantáneamente, pero la aceleración gravitatoria continúa actuando."
      },
      {
        id:"CP_RECT_005",type:"mcq",difficulty:3,
        prompt:"Si en intervalos iguales un movimiento desde el reposo recorre distancias proporcionales a $1,3,5,7,...$, ¿qué relación global es compatible?",
        options:["$x\\propto t^2$","$x\\propto t$","$v=0$","$a=0$"],
        answer:"A",
        explanation:"La suma de números impares genera cuadrados perfectos, consistente con una posición proporcional a $t^2$."
      }
    ]
  },

  22: {
    id:"CP_2D",
    title:"Checkpoint 3 · Movimiento en dos dimensiones",
    subtitle:"Independencia de componentes, velocidad relativa y proyectiles",
    required:2,
    draw:3,
    questions:[
      {
        id:"CP_2D_001",type:"mcq",difficulty:2,
        prompt:"Dos cuerpos parten simultáneamente desde la misma altura: uno se deja caer y otro sale horizontalmente. Sin aire, ¿cuál llega primero al suelo?",
        options:["Llegan al mismo tiempo.","El que sale horizontalmente.","El que se deja caer.","Depende de la masa."],
        answer:"A",
        explanation:"Ambos comparten el mismo movimiento vertical y el mismo tiempo de caída."
      },
      {
        id:"CP_2D_002",type:"mcq",difficulty:3,
        prompt:"Un producto sale horizontalmente de una cinta desde altura fija. Si se duplica $v_x$, ¿qué ocurre idealmente con el tiempo de caída y el alcance?",
        options:["El tiempo no cambia y el alcance se duplica.","Ambos se duplican.","El tiempo se reduce a la mitad y el alcance no cambia.","Ambos permanecen iguales."],
        answer:"A",
        explanation:"El tiempo depende sólo de la caída vertical; el alcance es $R=v_xt$."
      },
      {
        id:"CP_2D_003",type:"mcq",difficulty:2,
        prompt:"Un pasajero camina a $1\\,m/s$ hacia popa respecto de un barco que avanza a $4\\,m/s$ hacia proa. Su velocidad respecto de la costa es...",
        options:["3 m/s hacia proa","5 m/s hacia proa","3 m/s hacia popa","4 m/s hacia proa"],
        answer:"A",
        explanation:"Tomando proa positiva: $v_{P/C}=-1+4=3\\,m/s$."
      },
      {
        id:"CP_2D_004",type:"mcq",difficulty:3,
        prompt:"En el problema del mono y el cazador, el impacto se explica porque...",
        options:["mono y proyectil sufren la misma caída gravitatoria durante el mismo intervalo.","el proyectil no cae.","el mono permanece inmóvil.","la gravedad aumenta la velocidad horizontal."],
        answer:"A",
        explanation:"Ambos reciben el mismo término vertical $\\frac12gt^2$."
      },
      {
        id:"CP_2D_005",type:"mcq",difficulty:2,
        prompt:"Si $v_{0x}=8\\,m/s$ y $v_{0y}=10\\,m/s$, ¿qué componente permanece constante en el proyectil ideal?",
        options:["$v_x$","$v_y$","ambas","ninguna, porque g modifica ambas"],
        answer:"A",
        explanation:"En el modelo ideal $a_x=0$ y $a_y=-g$."
      }
    ]
  },

  28: {
    id:"CP_CIRCULAR",
    title:"Checkpoint 4 · Movimiento circular",
    subtitle:"Radián, T, f, ω, velocidad tangencial, transmisiones y aceleración centrípeta",
    required:2,
    draw:3,
    questions:[
      {
        id:"CP_CIRC_001",type:"mcq",difficulty:2,
        prompt:"Un disco gira con $T=0.50\\,s$. ¿Cuál es su frecuencia?",
        options:["2 Hz","0.5 Hz","$2\\pi$ Hz","4 Hz"],
        answer:"A",
        explanation:"$f=1/T=2\\,Hz$."
      },
      {
        id:"CP_CIRC_002",type:"mcq",difficulty:3,
        prompt:"Dos puntos del mismo disco están a radios $r$ y $2r$. ¿Cómo se comparan sus rapideces tangenciales?",
        options:["El punto a $2r$ tiene el doble de rapidez tangencial.","Ambos tienen la misma rapidez tangencial.","El punto a $r$ tiene el doble.","No puede saberse porque no comparten ω."],
        answer:"A",
        explanation:"En un disco rígido comparten $\\omega$ y $v_t=r\\omega$."
      },
      {
        id:"CP_CIRC_003",type:"mcq",difficulty:3,
        prompt:"En una transmisión por correa, $r_2=2r_1$. Sin deslizamiento, ¿cómo se relacionan $\\omega_2$ y $\\omega_1$?",
        options:["$\\omega_2=\\omega_1/2$","$\\omega_2=2\\omega_1$","$\\omega_2=\\omega_1$","$\\omega_2=0$"],
        answer:"A",
        explanation:"$\\omega_1r_1=\\omega_2r_2$, por lo que una polea conducida doble reduce a la mitad la velocidad angular."
      },
      {
        id:"CP_CIRC_004",type:"mcq",difficulty:2,
        prompt:"Si $\\alpha=0$ pero $\\omega\\neq0$, ¿qué aceleración puede seguir existiendo?",
        options:["La centrípeta.","La tangencial solamente.","Ninguna.","Una aceleración horizontal constante necesariamente."],
        answer:"A",
        explanation:"Con rapidez angular constante no hay aceleración tangencial, pero sí centrípeta."
      },
      {
        id:"CP_CIRC_005",type:"mcq",difficulty:3,
        prompt:"Si se duplica $\\omega$ manteniendo fijo r, $a_c$...",
        options:["se cuadruplica","se duplica","se reduce a la mitad","no cambia"],
        answer:"A",
        explanation:"$a_c=\\omega^2r$."
      }
    ]
  },

  35: {
    id:"CP_MAS",
    title:"Checkpoint 5 · Movimiento armónico simple",
    subtitle:"Amplitud, fase, x(t), v(t), a(t), MCU y péndulo",
    required:2,
    draw:3,
    questions:[
      {
        id:"CP_MAS_001",type:"mcq",difficulty:2,
        prompt:"En un MAS ideal, al atravesar la posición de equilibrio...",
        options:["la rapidez es máxima y la aceleración es cero.","la rapidez es cero y la aceleración máxima.","x=A.","la fase deja de cambiar."],
        answer:"A",
        explanation:"En x=0 se anula $a=-\\omega^2x$ y la rapidez alcanza su máximo."
      },
      {
        id:"CP_MAS_002",type:"mcq",difficulty:2,
        prompt:"Para $x(t)=A\\cos(\\omega t)$, ¿dónde se encuentra el móvil en $t=0$?",
        options:["En $x=+A$.","En $x=0$.","En $x=-A$.","No puede saberse."],
        answer:"A",
        explanation:"$\\cos0=1$, por lo que $x(0)=A$."
      },
      {
        id:"CP_MAS_003",type:"mcq",difficulty:3,
        prompt:"Dos MAS tienen igual A y distinto período. El de menor T tiene...",
        options:["mayor frecuencia y mayor $\\omega$.","menor frecuencia y menor $\\omega$.","igual frecuencia.","menor $\\omega$ pero mayor f."],
        answer:"A",
        explanation:"$f=1/T$ y $\\omega=2\\pi f$."
      },
      {
        id:"CP_MAS_004",type:"mcq",difficulty:3,
        prompt:"Si se duplica $\\omega$ manteniendo el mismo valor instantáneo de x, el módulo de la aceleración...",
        options:["se cuadruplica","se duplica","no cambia","se reduce a la mitad"],
        answer:"A",
        explanation:"$|a|=\\omega^2|x|$."
      },
      {
        id:"CP_MAS_005",type:"mcq",difficulty:2,
        prompt:"Si se cuadruplica la longitud de un péndulo simple ideal, su período aproximado...",
        options:["se duplica","se cuadruplica","no cambia","se reduce a la mitad"],
        answer:"A",
        explanation:"$T\\propto\\sqrt L$."
      }
    ]
  },

  46: {
    id:"CP_INTEGRACION",
    title:"Checkpoint 6 · Integración industrial",
    subtitle:"Selección del modelo, variables de proceso y predicción",
    required:2,
    draw:3,
    questions:[
      {
        id:"CP_INT_001",type:"mcq",difficulty:3,
        prompt:"En una llenadora, el sensor detecta un envase antes de la boquilla. ¿Qué combinación resulta necesaria para sincronizar el llenado?",
        options:["Distancia, velocidad de cinta y retardos del sistema.","Sólo la masa del envase.","Sólo la gravedad.","Radio y frecuencia angular exclusivamente."],
        answer:"A",
        explanation:"El tiempo cinemático debe combinarse con los retardos reales de sensores, comunicación y actuadores."
      },
      {
        id:"CP_INT_002",type:"mcq",difficulty:3,
        prompt:"Un producto abandona una cinta y debe caer en una bandeja. ¿Qué modelo combina correctamente el problema?",
        options:["MRU horizontal + caída vertical.","MRUV horizontal + MAS vertical.","MCU horizontal + MRU vertical.","Sólo caída libre sin componente horizontal."],
        answer:"A",
        explanation:"La componente horizontal es uniforme y la vertical está sometida a g."
      },
      {
        id:"CP_INT_003",type:"mcq",difficulty:3,
        prompt:"Para aumentar al doble el alcance de una descarga horizontal manteniendo fija la altura, conviene...",
        options:["duplicar la velocidad horizontal.","cuadruplicar la velocidad horizontal.","duplicar la altura solamente.","reducir la velocidad a la mitad."],
        answer:"A",
        explanation:"Con h fija, el tiempo de caída es constante y $R\\propto v_x$."
      },
      {
        id:"CP_INT_004",type:"mcq",difficulty:3,
        prompt:"Una centrífuga incrementa 20 % sus rpm con radio constante. La aceleración centrípeta cambia aproximadamente por un factor...",
        options:["$1.20^2=1.44$","1.20","0.80","2.00"],
        answer:"A",
        explanation:"Como $a_c\\propto\\omega^2$, el incremento es cuadrático."
      },
      {
        id:"CP_INT_005",type:"mcq",difficulty:3,
        prompt:"¿Qué estrategia resume mejor el uso pedagógico de los simuladores del juego?",
        options:["Predecir, elegir parámetros, evaluar y explicar la diferencia entre hipótesis y resultado.","Mover sliders hasta encontrar coincidencia visual.","Memorizar los valores finales.","Evitar utilizar ecuaciones antes de simular."],
        answer:"A",
        explanation:"La simulación se utiliza para contrastar una predicción razonada con el comportamiento del modelo."
      }
    ]
  }
};