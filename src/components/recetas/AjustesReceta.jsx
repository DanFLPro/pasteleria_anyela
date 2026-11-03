import CampoNumero from "../comunes/CampoNumero";

/**
 * Datos de producción, mermas y ganancia de la receta.
 * Props:
 *  - receta: la receta actual
 *  - onCambio: función (campo, valor)
 */
export default function AjustesReceta({ receta, onCambio }) {
  /** Guarda un porcentaje de merma sin dejar que pase de 95. */
  function cambiarMerma(campo, valor) {
    onCambio(campo, Math.min(valor, 95));
  }

  return (
    <section className="panel">
      <h2>Producción, mermas y ganancia</h2>
      <div className="rejilla-2">
        <label>
          Porciones o unidades que salen
          <CampoNumero valor={receta.porciones} onCambio={(v) => onCambio("porciones", v)} />
        </label>
        <label>
          Ganancia sobre el costo (%)
          <CampoNumero valor={receta.gananciaPct} onCambio={(v) => onCambio("gananciaPct", v)} />
        </label>
        <label>
          Horas de trabajo
          <CampoNumero valor={receta.horasTrabajo} onCambio={(v) => onCambio("horasTrabajo", v)} />
        </label>
        <label>
          Valor de tu hora
          <CampoNumero valor={receta.costoHora} onCambio={(v) => onCambio("costoHora", v)} />
        </label>
        <label>
          Merma de producción (%)
          <CampoNumero
            valor={receta.mermaProduccionPct || 0}
            onCambio={(v) => cambiarMerma("mermaProduccionPct", v)}
          />
        </label>
        <label>
          Porciones que no se venden (%)
          <CampoNumero
            valor={receta.mermaNoVendidaPct || 0}
            onCambio={(v) => cambiarMerma("mermaNoVendidaPct", v)}
          />
        </label>
      </div>
      <p className="ayuda" style={{ margin: "0.75rem 0 0" }}>
        Merma de producción: masa que queda en el bowl, bordes recortados, tortas que se caen.
        Porciones que no se venden: lo que sobra y se echa a perder; su costo se reparte en el precio.
      </p>
    </section>
  );
}
