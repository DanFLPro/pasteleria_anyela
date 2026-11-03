import { LOCALE, MONEDA } from "../data/config";

/**
 * Convierte un número en dinero según la moneda configurada.
 * Ejemplo: 95 -> "S/ 95.00". El segundo parámetro cambia los decimales
 * (se usa 4 para mostrar precios muy pequeños, como el costo por gramo).
 */
export function formatearMoneda(valor, decimales = 2) {
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: MONEDA,
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  }).format(valor || 0);
}

/**
 * Convierte lo que se escribe en un campo en un número válido y no negativo.
 * Acepta coma o punto decimal ("2,5" y "2.5" valen igual).
 * Si el campo está vacío o es inválido, devuelve 0.
 */
export function aNumero(texto) {
  const numero = parseFloat(String(texto).replace(",", "."));
  return Number.isNaN(numero) || numero < 0 ? 0 : numero;
}

/**
 * Crea un identificador único para ingredientes, recetas y líneas.
 */
export function crearId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
