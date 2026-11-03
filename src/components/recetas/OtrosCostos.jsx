import CampoNumero from "../comunes/CampoNumero";

/**
 * Costos que no son ingredientes: empaque, gas, luz, decoración...
 * Props:
 *  - costos: lista { id, nombre, monto }
 *  - onAgregar: agrega un costo vacío
 *  - onCambio: función (id, campo, valor)
 *  - onQuitar: función (id)
 */
export default function OtrosCostos({ costos, onAgregar, onCambio, onQuitar }) {
  return (
    <section className="panel">
      <h2>Otros costos</h2>

      {costos.map((c) => (
        <div key={c.id} className="linea-corta">
          <input
            value={c.nombre}
            onChange={(e) => onCambio(c.id, "nombre", e.target.value)}
            placeholder="Ej. Caja, gas, decoración"
            aria-label="Nombre del costo"
          />
          <CampoNumero
            valor={c.monto}
            onCambio={(v) => onCambio(c.id, "monto", v)}
            aria-label="Monto"
          />
          <button className="boton-quitar no-imprimir" onClick={() => onQuitar(c.id)} aria-label="Quitar costo">
            Quitar
          </button>
        </div>
      ))}

      <button className="boton-secundario no-imprimir" onClick={onAgregar}>+ Agregar costo</button>
    </section>
  );
}
