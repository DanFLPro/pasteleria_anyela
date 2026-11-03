import { useState } from "react";
import { aNumero } from "../../utils/formato";
import { UNIDADES, UNIDADES_COMPRA } from "../../utils/unidades";

/**
 * Formulario para registrar un ingrediente nuevo, tal como lo compras.
 * Ejemplo: "Harina", compré 1 kg, pagué S/ 4.50, merma 0%.
 * Props:
 *  - onAgregar: función ({ nombre, cantidad, unidad, precio, mermaPct })
 */
export default function FormIngrediente({ onAgregar }) {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [unidad, setUnidad] = useState("kg");
  const [precio, setPrecio] = useState("");
  const [mermaPct, setMermaPct] = useState("");

  /** Valida los datos, los envía y deja el formulario listo para otro. */
  function manejarAgregar(e) {
    e.preventDefault();
    if (!nombre.trim() || aNumero(cantidad) <= 0) return;
    onAgregar({
      nombre: nombre.trim(),
      cantidad: aNumero(cantidad),
      unidad,
      precio: aNumero(precio),
      mermaPct: Math.min(aNumero(mermaPct), 95),
    });
    setNombre("");
    setCantidad("");
    setPrecio("");
    setMermaPct("");
  }

  return (
    <form className="form-ingrediente" onSubmit={manejarAgregar}>
      <label>
        Ingrediente
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej. Fresas" />
      </label>
      <label>
        Cantidad que compré
        <input
          inputMode="decimal"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          placeholder="Ej. 500"
        />
      </label>
      <label>
        Unidad
        <select value={unidad} onChange={(e) => setUnidad(e.target.value)}>
          {UNIDADES_COMPRA.map((u) => (
            <option key={u} value={u}>{UNIDADES[u].etiqueta}</option>
          ))}
        </select>
      </label>
      <label>
        Precio que pagué
        <input
          inputMode="decimal"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          placeholder="Ej. 18.50"
        />
      </label>
      <label>
        Merma (%)
        <input
          inputMode="decimal"
          value={mermaPct}
          onChange={(e) => setMermaPct(e.target.value)}
          placeholder="Ej. 10"
        />
      </label>
      <button className="boton" type="submit">Agregar</button>
    </form>
  );
}
