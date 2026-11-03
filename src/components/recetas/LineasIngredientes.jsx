import { calcularCostoLinea } from "../../utils/costos";
import { formatearMoneda } from "../../utils/formato";
import { UNIDADES, unidadesCompatibles } from "../../utils/unidades";
import CampoNumero from "../comunes/CampoNumero";

/**
 * Lista de ingredientes que lleva la receta, con su cantidad y costo.
 * Props:
 *  - lineas: líneas de la receta { id, ingredienteId, cantidad, unidad }
 *  - ingredientes: todos los ingredientes registrados
 *  - onAgregar: agrega una línea vacía
 *  - onCambio: función (lineaId, campo, valor)
 *  - onQuitar: función (lineaId)
 */
export default function LineasIngredientes({ lineas, ingredientes, onAgregar, onCambio, onQuitar }) {
  return (
    <section className="panel">
      <h2>Ingredientes de la receta</h2>

      {ingredientes.length === 0 && (
        <p className="aviso">Primero registra tus ingredientes en la pestaña "Ingredientes".</p>
      )}

      {lineas.map((linea) => {
        const ing = ingredientes.find((i) => i.id === linea.ingredienteId);
        // Solo se ofrecen unidades compatibles con cómo se compró el ingrediente
        const opciones = ing ? unidadesCompatibles(ing.unidad) : ["g"];

        return (
          <div key={linea.id} className="linea">
            <select
              value={linea.ingredienteId}
              onChange={(e) => onCambio(linea.id, "ingredienteId", e.target.value)}
              aria-label="Ingrediente"
            >
              <option value="">Elige un ingrediente</option>
              {ingredientes.map((i) => (
                <option key={i.id} value={i.id}>{i.nombre}</option>
              ))}
            </select>

            <CampoNumero
              valor={linea.cantidad}
              onCambio={(v) => onCambio(linea.id, "cantidad", v)}
              aria-label="Cantidad usada"
            />

            <select
              value={linea.unidad}
              onChange={(e) => onCambio(linea.id, "unidad", e.target.value)}
              disabled={!ing}
              aria-label="Unidad usada"
            >
              {opciones.map((u) => (
                <option key={u} value={u}>{UNIDADES[u].etiqueta}</option>
              ))}
            </select>

            <span className="costo-linea">{formatearMoneda(calcularCostoLinea(linea, ingredientes))}</span>

            <button className="boton-quitar no-imprimir" onClick={() => onQuitar(linea.id)} aria-label="Quitar ingrediente">
              Quitar
            </button>
          </div>
        );
      })}

      <button className="boton-secundario no-imprimir" onClick={onAgregar} disabled={ingredientes.length === 0}>
        + Agregar ingrediente
      </button>
    </section>
  );
}
