UNIDAD 2 — PRESENTACIÓN V0.6.25

CORRECCIÓN IMPORTANTE
=====================
Esta versión vuelve a ser un paquete COMPLETO.

Incluye:
- index.html
- guiones.js
- lib/mathjax/tex-svg.js
- assets/images/
- assets/videos/

La ausencia de lib/mathjax/tex-svg.js en algunas versiones intermedias era la causa
de que las fórmulas no se representaran correctamente.

CÓMO EDITAR LOS GUIONES
=======================
1. Abra guiones.js con VS Code, Notepad++ o cualquier editor de texto.
2. Busque la página o el título que desea modificar.
3. Edite solamente el texto que está entre los signos ` ... `.
4. Guarde el archivo en UTF-8.
5. Vuelva al navegador y actualice la presentación (Ctrl+F5 si fuera necesario).

Ejemplo:

  // Página 25 — 16. Movimiento circular
  s25: `
  Aquí puede escribir el nuevo guion con sus propias palabras.
  Puede ocupar varias líneas.
  `,

No necesita modificar data-narration dentro de index.html: guiones.js lo reemplaza
automáticamente al abrir la presentación.

IMPORTANTE
==========
Mantenga index.html, guiones.js, assets/ y lib/ dentro de la misma carpeta.
