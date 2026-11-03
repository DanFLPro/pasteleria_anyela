import AjustesReceta from "./AjustesReceta";
import LineasIngredientes from "./LineasIngredientes";
import OtrosCostos from "./OtrosCostos";
import ResumenCostos from "./ResumenCostos";
import SelectorReceta from "./SelectorReceta";

/**
 * Pestaña "Recetas": arma un postre y mira su costo y precio de venta.
 * Recibe el objeto "datos" completo que devuelve el hook useDatos
 * y reparte cada parte a su componente.
 */
export default function PanelRecetas({ datos }) {
  const { recetas, receta, resultado, ingredientes } = datos;

  return (
    <div className="columna">
      <SelectorReceta
        recetas={recetas}
        recetaId={receta ? receta.id : ""}
        onSeleccionar={datos.seleccionarReceta}
        onCrear={datos.crearReceta}
        onDuplicar={datos.duplicarReceta}
        onEliminar={datos.eliminarReceta}
      />

      {!receta ? (
        <section className="panel">
          <p className="vacio">No hay recetas. Pulsa "Nueva receta" para empezar.</p>
        </section>
      ) : (
        <div className="disposicion">
          <div className="columna">
            <section className="panel">
              <label>
                Nombre del postre
                <input
                  value={receta.nombre}
                  onChange={(e) => datos.actualizarReceta("nombre", e.target.value)}
                  placeholder="Ej. Torta de chocolate"
                />
              </label>
            </section>

            <LineasIngredientes
              lineas={receta.lineas}
              ingredientes={ingredientes}
              onAgregar={datos.agregarLinea}
              onCambio={datos.actualizarLinea}
              onQuitar={datos.quitarLinea}
            />
            <OtrosCostos
              costos={receta.otrosCostos}
              onAgregar={datos.agregarOtroCosto}
              onCambio={datos.actualizarOtroCosto}
              onQuitar={datos.quitarOtroCosto}
            />
            <AjustesReceta receta={receta} onCambio={datos.actualizarReceta} />
          </div>

          <ResumenCostos receta={receta} resultado={resultado} />
        </div>
      )}
    </div>
  );
}
