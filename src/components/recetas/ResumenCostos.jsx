import { formatearMoneda } from "../../utils/formato";

/**
 * Resultado final: cuánto cuesta, a cuánto vender y cuánto ganas.
 * Se actualiza al instante con cada cambio.
 * Props:
 *  - receta: la receta actual
 *  - resultado: números calculados por calcularReceta()
 */
export default function ResumenCostos({ receta, resultado }) {
  /** Abre el diálogo de impresión (también permite guardar como PDF). */
  function imprimir() {
    window.print();
  }

  // Porciones vendidas con un decimal como máximo (ej. 11.4)
  const vendidas = Number(resultado.porcionesVendidas.toFixed(1));

  // Qué parte del costo total se va en mermas (en %)
  const pctMermas =
    resultado.costoTotal > 0 ? (resultado.costoMermas / resultado.costoTotal) * 100 : 0;

  return (
    <aside className="panel resumen">
      <h2>{receta.nombre || "Receta"}</h2>

      <dl>
        <div><dt>Ingredientes</dt><dd>{formatearMoneda(resultado.costoIngredientes)}</dd></div>
        <div><dt>Merma de producción</dt><dd>{formatearMoneda(resultado.mermaProduccion)}</dd></div>
        <div><dt>Otros costos</dt><dd>{formatearMoneda(resultado.costoOtros)}</dd></div>
        <div><dt>Mano de obra</dt><dd>{formatearMoneda(resultado.costoManoObra)}</dd></div>
        <div className="subtotal"><dt>Costo total</dt><dd>{formatearMoneda(resultado.costoTotal)}</dd></div>
        <div><dt>Costo por porción</dt><dd>{formatearMoneda(resultado.costoPorcion)}</dd></div>
        <div className="suave-fila">
          <dt>Mermas incluidas en el costo</dt>
          <dd>{formatearMoneda(resultado.costoMermas)} ({pctMermas.toFixed(1)}%)</dd>
        </div>
      </dl>

      <div className="precio-destacado">
        <span>Vende cada porción a</span>
        <strong>{formatearMoneda(resultado.precioPorcionRedondeado)}</strong>
        <small>Cálculo exacto: {formatearMoneda(resultado.precioPorcion)}</small>
      </div>

      <dl>
        <div><dt>Venta total ({vendidas} porciones vendidas)</dt><dd>{formatearMoneda(resultado.precioVentaTotal)}</dd></div>
        <div><dt>Ganancia por porción</dt><dd>{formatearMoneda(resultado.gananciaPorcion)}</dd></div>
        <div><dt>Ganancia total</dt><dd>{formatearMoneda(resultado.gananciaTotal)}</dd></div>
      </dl>

      <button className="boton no-imprimir" onClick={imprimir}>Imprimir o guardar PDF</button>
    </aside>
  );
}
