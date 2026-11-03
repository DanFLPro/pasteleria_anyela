import FilaIngrediente from "./FilaIngrediente";
import FormIngrediente from "./FormIngrediente";

/**
 * Pestaña "Ingredientes": aquí registras lo que compras y a qué precio.
 * Si cambias un precio, todas las recetas se recalculan solas.
 * Props:
 *  - ingredientes: lista de ingredientes
 *  - onAgregar, onCambio, onEliminar: acciones del hook useDatos
 */
export default function PanelIngredientes({ ingredientes, onAgregar, onCambio, onEliminar }) {
  return (
    <div className="columna">
      <section className="panel">
        <h2>Agregar ingrediente</h2>
        <p className="ayuda">
          Merma es lo que pierdes al preparar el ingrediente (cáscaras, recortes, lo que
          queda pegado en el envase). Déjala en 0 si no aplica.
        </p>
        <FormIngrediente onAgregar={onAgregar} />
      </section>

      <section className="panel">
        <h2>Mis ingredientes</h2>
        {ingredientes.length === 0 ? (
          <p className="vacio">Aún no tienes ingredientes. Agrega el primero arriba.</p>
        ) : (
          <div className="scroll-tabla">
            <table>
              <thead>
                <tr>
                  <th>Ingrediente</th>
                  <th>Cantidad comprada</th>
                  <th>Precio pagado</th>
                  <th>Merma (%)</th>
                  <th>Costo unitario</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {ingredientes.map((ing) => (
                  <FilaIngrediente
                    key={ing.id}
                    ingrediente={ing}
                    onCambio={onCambio}
                    onEliminar={onEliminar}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
