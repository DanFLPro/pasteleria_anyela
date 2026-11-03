// ============================================================
// DATOS DE EJEMPLO
// Se muestran la primera vez para que veas cómo funciona.
// Puedes borrarlos o cambiarlos desde la aplicación.
// ============================================================

export const INGREDIENTES_EJEMPLO = [
  { id: "ing-harina", nombre: "Harina", cantidad: 1, unidad: "kg", precio: 4.5 },
  { id: "ing-azucar", nombre: "Azúcar", cantidad: 1, unidad: "kg", precio: 4.2 },
  { id: "ing-huevos", nombre: "Huevos", cantidad: 12, unidad: "unidad", precio: 10 },
  { id: "ing-mantequilla", nombre: "Mantequilla", cantidad: 200, unidad: "g", precio: 8, mermaPct: 5 },
  { id: "ing-leche", nombre: "Leche", cantidad: 1, unidad: "l", precio: 4.8 },
  { id: "ing-vainilla", nombre: "Esencia de vainilla", cantidad: 60, unidad: "ml", precio: 6 },
];

export const RECETA_EJEMPLO = {
  id: "rec-ejemplo",
  nombre: "Torta de vainilla (ejemplo)",
  porciones: 12,
  lineas: [
    { id: "l1", ingredienteId: "ing-harina", cantidad: 300, unidad: "g" },
    { id: "l2", ingredienteId: "ing-azucar", cantidad: 250, unidad: "g" },
    { id: "l3", ingredienteId: "ing-huevos", cantidad: 4, unidad: "unidad" },
    { id: "l4", ingredienteId: "ing-mantequilla", cantidad: 200, unidad: "g" },
    { id: "l5", ingredienteId: "ing-leche", cantidad: 240, unidad: "ml" },
    { id: "l6", ingredienteId: "ing-vainilla", cantidad: 1, unidad: "cdta" },
  ],
  otrosCostos: [
    { id: "o1", nombre: "Caja y base", monto: 4 },
    { id: "o2", nombre: "Gas / luz", monto: 3 },
  ],
  horasTrabajo: 2,
  costoHora: 8,
  gananciaPct: 40,
  mermaProduccionPct: 5,
  mermaNoVendidaPct: 0,
};
