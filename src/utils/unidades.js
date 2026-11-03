// ============================================================
// UNIDADES DE MEDIDA
// Cada unidad pertenece a una "familia" (peso, volumen o unidad)
// y tiene un factor para convertirla a la medida base:
//   peso -> gramos, volumen -> mililitros, unidad -> unidad
// Para agregar una unidad nueva, añade una línea aquí.
// ============================================================

export const UNIDADES = {
  g: { etiqueta: "g (gramos)", familia: "peso", factor: 1 },
  kg: { etiqueta: "kg (kilos)", familia: "peso", factor: 1000 },
  ml: { etiqueta: "ml", familia: "volumen", factor: 1 },
  l: { etiqueta: "l (litros)", familia: "volumen", factor: 1000 },
  cdta: { etiqueta: "cdta (cucharadita)", familia: "volumen", factor: 5 },
  cda: { etiqueta: "cda (cucharada)", familia: "volumen", factor: 15 },
  taza: { etiqueta: "taza", familia: "volumen", factor: 240 },
  unidad: { etiqueta: "unidad", familia: "unidad", factor: 1 },
};

// Unidades que se pueden elegir al COMPRAR un ingrediente
export const UNIDADES_COMPRA = ["g", "kg", "ml", "l", "unidad"];

/**
 * Devuelve las unidades que se pueden usar con un ingrediente.
 * Si el ingrediente se compró en kg, solo se ofrecen g y kg.
 */
export function unidadesCompatibles(unidad) {
  const familia = UNIDADES[unidad].familia;
  return Object.keys(UNIDADES).filter((u) => UNIDADES[u].familia === familia);
}

/**
 * Nombre de la medida base de una unidad, para mostrar
 * textos como "S/ 0.0045 por g".
 */
export function medidaBase(unidad) {
  const familia = UNIDADES[unidad].familia;
  if (familia === "peso") return "g";
  if (familia === "volumen") return "ml";
  return "unidad";
}
