import { costoPorUnidadBase, costoRealPorUnidadBase } from "../../utils/costos";
import { formatearMoneda } from "../../utils/formato";
import { UNIDADES_COMPRA, medidaBase } from "../../utils/unidades";
import CampoNumero from "../comunes/CampoNumero";

/**
 * Una fila de la tabla de ingredientes; todos los campos se pueden editar.
 * Muestra cuánto cuesta cada gramo, ml o unidad, y si tiene merma,
 * también el costo real una vez descontada la merma.
 * Props:
 *  - ingrediente: { id, nombre, cantidad, unidad, precio, mermaPct }
 *  - onCambio: función (id, campo, valor)
 *  - onEliminar: función (id)
 */
export default function FilaIngrediente({ ingrediente, onCambio, onEliminar }) {
  const merma = ingrediente.mermaPct || 0; // datos antiguos pueden no tenerla
  const medida = medidaBase(ingrediente.unidad);

  return (
    <tr>
      <td>
        <input
          value={ingrediente.nombre}
          onChange={(e) => onCambio(ingrediente.id, "nombre", e.target.value)}
          aria-label="Nombre del ingrediente"
        />
      </td>
      <td>
        <div className="doble">
          <CampoNumero
            valor={ingrediente.cantidad}
            onCambio={(v) => onCambio(ingrediente.id, "cantidad", v)}
            aria-label={`Cantidad comprada de ${ingrediente.nombre}`}
          />
          <select
            value={ingrediente.unidad}
            onChange={(e) => onCambio(ingrediente.id, "unidad", e.target.value)}
            aria-label={`Unidad de ${ingrediente.nombre}`}
          >
            {UNIDADES_COMPRA.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
      </td>
      <td>
        <CampoNumero
          valor={ingrediente.precio}
          onCambio={(v) => onCambio(ingrediente.id, "precio", v)}
          aria-label={`Precio de ${ingrediente.nombre}`}
        />
      </td>
      <td>
        <CampoNumero
          valor={merma}
          onCambio={(v) => onCambio(ingrediente.id, "mermaPct", Math.min(v, 95))}
          aria-label={`Merma en porcentaje de ${ingrediente.nombre}`}
        />
      </td>
      <td className="suave">
        {formatearMoneda(costoPorUnidadBase(ingrediente), 4)} por {medida}
        {merma > 0 && (
          <small>Real con merma: {formatearMoneda(costoRealPorUnidadBase(ingrediente), 4)}</small>
        )}
      </td>
      <td>
        <button
          className="boton-quitar"
          onClick={() => onEliminar(ingrediente.id)}
          aria-label={`Eliminar ${ingrediente.nombre}`}
        >
          Quitar
        </button>
      </td>
    </tr>
  );
}
