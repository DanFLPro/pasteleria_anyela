// ============================================================
// CONFIGURACIÓN GENERAL
// Cambia aquí el nombre inicial del negocio y los valores que
// se usan al crear una receta nueva.
// (El nombre también se puede cambiar escribiendo sobre el
//  título dentro de la aplicación.)
// ============================================================

export const NEGOCIO = {
  nombre: "Pastelería Anyela",
};

// Moneda: PEN = soles, USD = dólares, MXN = pesos mexicanos, etc.
export const MONEDA = "PEN";
export const LOCALE = "es-PE";

// Clave con la que se guardan los datos en el navegador
export const CLAVE_ALMACENAMIENTO = "pasteleria-anyela-datos";

// Valores con los que empieza cada receta nueva
export const RECETA_NUEVA = {
  porciones: 10,
  horasTrabajo: 1,     // horas que te toma hacerla
  costoHora: 8,        // cuánto vale tu hora de trabajo
  gananciaPct: 40,     // ganancia sobre el costo
  mermaProduccionPct: 5, // % de masa/insumos que se pierde al preparar
  mermaNoVendidaPct: 0,  // % de porciones que no logras vender
  // Costos extra que aparecen listos para llenar. Agrega o quita a tu gusto.
  otrosCostos: [
    { nombre: "Empaque", monto: 0 },
    { nombre: "Gas / luz", monto: 0 },
  ],
};
