/**
 * Barra para elegir receta y crear, duplicar o eliminar.
 * Props:
 *  - recetas: lista de recetas
 *  - recetaId: id de la receta que se está viendo
 *  - onSeleccionar: función (id)
 *  - onCrear, onDuplicar, onEliminar: acciones
 */
export default function SelectorReceta({
  recetas, recetaId, onSeleccionar, onCrear, onDuplicar, onEliminar,
}) {
  /** Pide confirmación antes de borrar la receta. */
  function confirmarEliminar() {
    if (window.confirm("¿Eliminar esta receta?")) onEliminar();
  }

  return (
    <section className="panel barra-recetas no-imprimir">
      <select
        value={recetaId}
        onChange={(e) => onSeleccionar(e.target.value)}
        aria-label="Elegir receta"
        disabled={recetas.length === 0}
      >
        {recetas.length === 0 && <option>Sin recetas</option>}
        {recetas.map((r) => (
          <option key={r.id} value={r.id}>{r.nombre || "Sin nombre"}</option>
        ))}
      </select>
      <button className="boton" onClick={onCrear}>Nueva receta</button>
      <button className="boton-secundario" onClick={onDuplicar} disabled={!recetaId}>Duplicar</button>
      <button className="boton-secundario" onClick={confirmarEliminar} disabled={!recetaId}>Eliminar</button>
    </section>
  );
}
