import { useEffect, useState } from "react";
import { aNumero } from "../../utils/formato";

/**
 * Campo para escribir números cómodamente (acepta "2,5" o "2.5").
 * Guarda lo que escribes como texto para que puedas teclear "2." sin
 * que se borre, y avisa al resto de la app con un número ya limpio.
 * Props:
 *  - valor: número actual
 *  - onCambio: función (número) llamada al escribir
 *  - ...resto: cualquier otra propiedad de <input> (placeholder, aria-label...)
 */
export default function CampoNumero({ valor, onCambio, ...resto }) {
  const [texto, setTexto] = useState(String(valor));

  // Si el valor cambia desde afuera (ej. otra receta), actualiza el texto
  useEffect(() => {
    if (aNumero(texto) !== valor) setTexto(String(valor));
  }, [valor]); // eslint-disable-line react-hooks/exhaustive-deps

  /** Guarda el texto escrito y envía el número limpio. */
  function manejarCambio(e) {
    setTexto(e.target.value);
    onCambio(aNumero(e.target.value));
  }

  return (
    <input
      type="text"
      inputMode="decimal"
      value={texto}
      onChange={manejarCambio}
      onFocus={(e) => e.target.select()} // al entrar, selecciona todo para reemplazar rápido
      {...resto}
    />
  );
}
