// ============================================================
// CÁLCULOS DE COSTOS
// Aquí vive toda la matemática. Si quieres cambiar cómo se
// calcula algo (por ejemplo, la ganancia o las mermas),
// hazlo en este archivo.
// ============================================================

import { UNIDADES } from "./unidades";

/**
 * Limita un porcentaje de merma entre 0 y 95.
 * (Una merma de 100% haría imposible el cálculo.)
 * Si el dato no existe (datos antiguos), devuelve 0.
 */
function limitarPct(porcentaje) {
  return Math.min(Math.max(porcentaje || 0, 0), 95);
}

/**
 * Cuánto cuesta UNA unidad base (1 g, 1 ml o 1 unidad) de un ingrediente,
 * SIN contar la merma.
 * Ejemplo: harina, 1 kg a S/ 4.50 -> 4.50 / 1000 = S/ 0.0045 por gramo.
 */
export function costoPorUnidadBase(ingrediente) {
  const totalComprado = ingrediente.cantidad * UNIDADES[ingrediente.unidad].factor;
  return totalComprado > 0 ? ingrediente.precio / totalComprado : 0;
}

/**
 * Costo REAL de una unidad base, contando la merma del ingrediente.
 * Con 15% de merma, de cada 100 g comprados solo aprovechas 85 g,
 * así que cada gramo útil cuesta más.
 */
export function costoRealPorUnidadBase(ingrediente) {
  const aprovechable = 1 - limitarPct(ingrediente.mermaPct) / 100;
  return costoPorUnidadBase(ingrediente) / aprovechable;
}

/**
 * Calcula una línea de la receta y devuelve:
 *  - costo: lo que cuesta contando la merma del ingrediente
 *  - merma: la parte de ese costo que corresponde a la merma
 * Devuelve ceros si no se eligió ingrediente o la unidad no es compatible.
 */
function detalleLinea(linea, ingredientes) {
  const ingrediente = ingredientes.find((i) => i.id === linea.ingredienteId);
  if (!ingrediente) return { costo: 0, merma: 0 };

  const mismaFamilia =
    UNIDADES[linea.unidad].familia === UNIDADES[ingrediente.unidad].familia;
  if (!mismaFamilia) return { costo: 0, merma: 0 };

  const cantidadBase = linea.cantidad * UNIDADES[linea.unidad].factor;
  const costo = cantidadBase * costoRealPorUnidadBase(ingrediente);
  const sinMerma = cantidadBase * costoPorUnidadBase(ingrediente);
  return { costo, merma: costo - sinMerma };
}

/**
 * Costo de una línea de la receta (ya incluye la merma del ingrediente).
 */
export function calcularCostoLinea(linea, ingredientes) {
  return detalleLinea(linea, ingredientes).costo;
}

/**
 * Redondea un precio HACIA ARRIBA al siguiente múltiplo de "paso".
 * Ejemplo con paso 0.5: 7.13 -> 7.50, 7.60 -> 8.00
 */
export function redondearArriba(valor, paso = 0.5) {
  return Math.ceil(valor / paso - 1e-9) * paso;
}

/**
 * Calcula TODOS los números de una receta:
 * costos por grupo, mermas, costo total, costo por porción,
 * precio de venta y ganancia.
 *
 * Mermas que considera:
 *  1. De ingrediente: ya incluida en el costo de cada línea.
 *  2. De producción: % extra sobre el costo de ingredientes
 *     (masa que queda en el bowl, tortas que se caen, etc.).
 *  3. De productos no vendidos: % de porciones que no se venden.
 *     Se reparte el costo entre las porciones que sí se venden.
 */
export function calcularReceta(receta, ingredientes) {
  // Suma de ingredientes y de la parte que corresponde a su merma
  let costoIngredientes = 0;
  let mermaIngredientes = 0;
  receta.lineas.forEach((linea) => {
    const detalle = detalleLinea(linea, ingredientes);
    costoIngredientes += detalle.costo;
    mermaIngredientes += detalle.merma;
  });

  const mermaProduccion =
    costoIngredientes * (limitarPct(receta.mermaProduccionPct) / 100);
  const costoOtros = receta.otrosCostos.reduce((suma, o) => suma + o.monto, 0);
  const costoManoObra = receta.horasTrabajo * receta.costoHora;

  const costoTotal = costoIngredientes + mermaProduccion + costoOtros + costoManoObra;

  // Porciones que realmente se venden (descontando las que sobran)
  const porciones = Math.max(receta.porciones, 1); // evita dividir entre 0
  const porcionesVendidas = porciones * (1 - limitarPct(receta.mermaNoVendidaPct) / 100);

  // La ganancia se calcula sobre el costo (ej. 40% más que lo que te cuesta)
  const precioVentaTotal = costoTotal * (1 + receta.gananciaPct / 100);
  const precioPorcion = precioVentaTotal / porcionesVendidas;

  return {
    costoIngredientes,
    mermaIngredientes,
    mermaProduccion,
    costoMermas: mermaIngredientes + mermaProduccion,
    costoOtros,
    costoManoObra,
    costoTotal,
    porcionesVendidas,
    costoPorcion: costoTotal / porcionesVendidas,
    precioVentaTotal,
    precioPorcion,
    precioPorcionRedondeado: redondearArriba(precioPorcion),
    gananciaTotal: precioVentaTotal - costoTotal,
    gananciaPorcion: (precioVentaTotal - costoTotal) / porcionesVendidas,
  };
}
