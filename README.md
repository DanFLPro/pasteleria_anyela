# Calculadora de costos de pastelería

## Cómo ejecutarlo
1. Abre esta carpeta en VS Code (Archivo → Abrir carpeta).
2. En la terminal: `npm install` (solo la primera vez).
3. Luego: `npm run dev` y abre la dirección que aparece.

## Cómo se usa
1. **Ingredientes:** registra lo que compras (ej. harina, 1 kg, S/ 4.50).
2. **Recetas:** crea un postre, elige ingredientes y cantidades, agrega empaque, gas, tu tiempo y el % de ganancia.
3. Mira a la derecha el costo y el precio de venta por porción.

## Mermas
- **Por ingrediente** (pestaña Ingredientes): lo que pierdes al prepararlo. Con 15% de merma, 500 g útiles te cuestan como 588 g comprados.
- **De producción** (en la receta): % extra por masa que queda en el bowl, tortas que se caen, etc.
- **Porciones que no se venden** (en la receta): su costo se reparte entre las porciones que sí vendes.
- El resumen muestra cuánto del costo total se va en mermas.

Si cambia el precio de un ingrediente, todas las recetas se recalculan solas.

## Dónde cambiar cada cosa
| Quiero cambiar...                        | Archivo                         |
|------------------------------------------|---------------------------------|
| Nombre del negocio inicial, moneda, valores de recetas nuevas | `src/data/config.js` |
| Fórmulas (costo, ganancia, redondeo)     | `src/utils/costos.js`           |
| Unidades de medida (cucharadas, tazas…)  | `src/utils/unidades.js`         |
| Lógica y datos guardados                 | `src/hooks/useDatos.js`         |
| Colores                                  | `src/styles/estilos.css` (variables arriba) |
| Datos de ejemplo del inicio              | `src/data/ejemplo.js`           |

El nombre del negocio también se cambia escribiendo sobre el título en la app.
Todo se guarda solo en el navegador.

## Estructura
```
src/
├── App.jsx
├── main.jsx
├── components/
│   ├── Encabezado.jsx
│   ├── comunes/CampoNumero.jsx
│   ├── ingredientes/ (PanelIngredientes, FormIngrediente, FilaIngrediente)
│   └── recetas/ (PanelRecetas, SelectorReceta, LineasIngredientes,
│                 OtrosCostos, AjustesReceta, ResumenCostos)
├── hooks/useDatos.js
├── utils/ (costos, unidades, formato)
├── data/ (config, ejemplo)
└── styles/estilos.css
```
