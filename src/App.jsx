import { useEffect, useState } from "react";
import Encabezado from "./components/Encabezado";
import PanelIngredientes from "./components/ingredientes/PanelIngredientes";
import PanelRecetas from "./components/recetas/PanelRecetas";
import { useDatos } from "./hooks/useDatos";
import "./styles/estilos.css";

/**
 * Componente principal. Solo ARMA la pantalla:
 * toma los datos del hook y muestra la pestaña elegida.
 */
export default function App() {
  const datos = useDatos();
  const [pestana, setPestana] = useState("recetas");

  // Pone el nombre del negocio en el título de la pestaña del navegador
  useEffect(() => {
    document.title = datos.nombreNegocio || "Calculadora de costos";
  }, [datos.nombreNegocio]);

  return (
    <div className="contenedor">
      <Encabezado
        nombre={datos.nombreNegocio}
        onCambiarNombre={datos.cambiarNombreNegocio}
        pestana={pestana}
        onCambiarPestana={setPestana}
      />

      {pestana === "recetas" ? (
        <PanelRecetas datos={datos} />
      ) : (
        <PanelIngredientes
          ingredientes={datos.ingredientes}
          onAgregar={datos.agregarIngrediente}
          onCambio={datos.actualizarIngrediente}
          onEliminar={datos.eliminarIngrediente}
        />
      )}
    </div>
  );
}
