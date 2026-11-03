/**
 * Parte superior: nombre del negocio (editable) y las dos pestañas.
 * Props:
 *  - nombre: nombre actual del negocio
 *  - onCambiarNombre: función (texto) al escribir un nombre nuevo
 *  - pestana: "recetas" o "ingredientes"
 *  - onCambiarPestana: función (pestana) al hacer clic en una pestaña
 */
export default function Encabezado({ nombre, onCambiarNombre, pestana, onCambiarPestana }) {
  return (
    <header className="encabezado no-imprimir">
      <input
        className="nombre-negocio"
        value={nombre}
        onChange={(e) => onCambiarNombre(e.target.value)}
        aria-label="Nombre del negocio"
        title="Haz clic para cambiar el nombre"
      />
      <p>Calculadora de costos y precios</p>

      <nav className="pestanas">
        <button
          className={pestana === "recetas" ? "activa" : ""}
          onClick={() => onCambiarPestana("recetas")}
        >
          Recetas
        </button>
        <button
          className={pestana === "ingredientes" ? "activa" : ""}
          onClick={() => onCambiarPestana("ingredientes")}
        >
          Ingredientes
        </button>
      </nav>
    </header>
  );
}
