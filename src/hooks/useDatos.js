import { useEffect, useMemo, useState } from "react";
import { CLAVE_ALMACENAMIENTO, NEGOCIO, RECETA_NUEVA } from "../data/config";
import { INGREDIENTES_EJEMPLO, RECETA_EJEMPLO } from "../data/ejemplo";
import { calcularReceta } from "../utils/costos";
import { crearId } from "../utils/formato";
import { UNIDADES } from "../utils/unidades";

// Datos con los que arranca la aplicación la primera vez
const ESTADO_INICIAL = {
  nombreNegocio: NEGOCIO.nombre,
  ingredientes: INGREDIENTES_EJEMPLO,
  recetas: [RECETA_EJEMPLO],
  recetaActivaId: RECETA_EJEMPLO.id,
};

/**
 * Lee los datos guardados en el navegador.
 * Si no hay nada (o está dañado), usa los datos de ejemplo.
 */
function cargarGuardado() {
  try {
    const texto = localStorage.getItem(CLAVE_ALMACENAMIENTO);
    return texto ? { ...ESTADO_INICIAL, ...JSON.parse(texto) } : ESTADO_INICIAL;
  } catch {
    return ESTADO_INICIAL;
  }
}

/**
 * Hook central de la aplicación.
 * Guarda todo (nombre, ingredientes y recetas) y expone las acciones
 * para modificarlo. Los componentes solo llaman a estas funciones.
 */
export function useDatos() {
  const [estado, setEstado] = useState(cargarGuardado);

  // Guarda automáticamente cada cambio en el navegador
  useEffect(() => {
    localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(estado));
  }, [estado]);

  // Receta que se está viendo (o null si no hay ninguna)
  const receta =
    estado.recetas.find((r) => r.id === estado.recetaActivaId) ||
    estado.recetas[0] ||
    null;

  // Resultados del cálculo; se recalculan solo cuando algo cambia
  const resultado = useMemo(
    () => (receta ? calcularReceta(receta, estado.ingredientes) : null),
    [receta, estado.ingredientes]
  );

  // ---------------- Negocio ----------------

  /** Cambia el nombre del negocio (se escribe sobre el título). */
  function cambiarNombreNegocio(nombre) {
    setEstado((prev) => ({ ...prev, nombreNegocio: nombre }));
  }

  // ---------------- Ingredientes ----------------

  /** Agrega un ingrediente nuevo a la lista de compras. */
  function agregarIngrediente(datos) {
    setEstado((prev) => ({
      ...prev,
      ingredientes: [...prev.ingredientes, { id: crearId(), ...datos }],
    }));
  }

  /**
   * Cambia un dato de un ingrediente (nombre, cantidad, unidad o precio).
   * Si cambia la unidad a otra familia (ej. de kg a litros), ajusta las
   * líneas de recetas que lo usan para que sigan siendo compatibles.
   */
  function actualizarIngrediente(id, campo, valor) {
    setEstado((prev) => ({
      ...prev,
      ingredientes: prev.ingredientes.map((i) =>
        i.id === id ? { ...i, [campo]: valor } : i
      ),
      recetas:
        campo === "unidad"
          ? prev.recetas.map((r) => ({
              ...r,
              lineas: r.lineas.map((l) =>
                l.ingredienteId === id &&
                UNIDADES[l.unidad].familia !== UNIDADES[valor].familia
                  ? { ...l, unidad: valor }
                  : l
              ),
            }))
          : prev.recetas,
    }));
  }

  /** Elimina un ingrediente. Las líneas que lo usaban quedan sin elegir. */
  function eliminarIngrediente(id) {
    setEstado((prev) => ({
      ...prev,
      ingredientes: prev.ingredientes.filter((i) => i.id !== id),
      recetas: prev.recetas.map((r) => ({
        ...r,
        lineas: r.lineas.map((l) =>
          l.ingredienteId === id ? { ...l, ingredienteId: "" } : l
        ),
      })),
    }));
  }

  // ---------------- Recetas ----------------

  /** Crea una receta vacía con los valores de config.js y la abre. */
  function crearReceta() {
    const nueva = {
      id: crearId(),
      nombre: "Nueva receta",
      porciones: RECETA_NUEVA.porciones,
      lineas: [],
      otrosCostos: RECETA_NUEVA.otrosCostos.map((o) => ({ ...o, id: crearId() })),
      horasTrabajo: RECETA_NUEVA.horasTrabajo,
      costoHora: RECETA_NUEVA.costoHora,
      gananciaPct: RECETA_NUEVA.gananciaPct,
      mermaProduccionPct: RECETA_NUEVA.mermaProduccionPct,
      mermaNoVendidaPct: RECETA_NUEVA.mermaNoVendidaPct,
    };
    setEstado((prev) => ({
      ...prev,
      recetas: [...prev.recetas, nueva],
      recetaActivaId: nueva.id,
    }));
  }

  /** Copia la receta actual (útil para hacer variaciones de un postre). */
  function duplicarReceta() {
    if (!receta) return;
    const copia = {
      ...receta,
      id: crearId(),
      nombre: `${receta.nombre} (copia)`,
      lineas: receta.lineas.map((l) => ({ ...l, id: crearId() })),
      otrosCostos: receta.otrosCostos.map((o) => ({ ...o, id: crearId() })),
    };
    setEstado((prev) => ({
      ...prev,
      recetas: [...prev.recetas, copia],
      recetaActivaId: copia.id,
    }));
  }

  /** Elimina la receta actual y abre otra si queda alguna. */
  function eliminarReceta() {
    if (!receta) return;
    setEstado((prev) => {
      const restantes = prev.recetas.filter((r) => r.id !== receta.id);
      return {
        ...prev,
        recetas: restantes,
        recetaActivaId: restantes[0] ? restantes[0].id : "",
      };
    });
  }

  /** Cambia cuál receta se está viendo. */
  function seleccionarReceta(id) {
    setEstado((prev) => ({ ...prev, recetaActivaId: id }));
  }

  /**
   * Ayuda interna: aplica un cambio SOLO a la receta que se está viendo.
   * "cambio" es una función que recibe la receta y devuelve la nueva.
   */
  function modificarReceta(cambio) {
    setEstado((prev) => {
      const activaId =
        prev.recetas.find((r) => r.id === prev.recetaActivaId)?.id ||
        prev.recetas[0]?.id;
      return {
        ...prev,
        recetas: prev.recetas.map((r) => (r.id === activaId ? cambio(r, prev) : r)),
      };
    });
  }

  /** Cambia un dato simple de la receta (nombre, porciones, horas, ganancia...). */
  function actualizarReceta(campo, valor) {
    modificarReceta((r) => ({ ...r, [campo]: valor }));
  }

  // ---------------- Líneas de ingredientes de la receta ----------------

  /** Agrega una línea vacía para elegir ingrediente y cantidad. */
  function agregarLinea() {
    modificarReceta((r) => ({
      ...r,
      lineas: [...r.lineas, { id: crearId(), ingredienteId: "", cantidad: 0, unidad: "g" }],
    }));
  }

  /**
   * Cambia un dato de una línea. Al elegir un ingrediente nuevo, la unidad
   * se pone automáticamente igual a la que usaste al comprarlo.
   */
  function actualizarLinea(lineaId, campo, valor) {
    modificarReceta((r, estadoActual) => ({
      ...r,
      lineas: r.lineas.map((l) => {
        if (l.id !== lineaId) return l;
        if (campo === "ingredienteId") {
          const ing = estadoActual.ingredientes.find((i) => i.id === valor);
          return { ...l, ingredienteId: valor, unidad: ing ? ing.unidad : l.unidad };
        }
        return { ...l, [campo]: valor };
      }),
    }));
  }

  /** Quita una línea de la receta. */
  function quitarLinea(lineaId) {
    modificarReceta((r) => ({ ...r, lineas: r.lineas.filter((l) => l.id !== lineaId) }));
  }

  // ---------------- Otros costos (empaque, gas, luz...) ----------------

  /** Agrega un costo extra vacío. */
  function agregarOtroCosto() {
    modificarReceta((r) => ({
      ...r,
      otrosCostos: [...r.otrosCostos, { id: crearId(), nombre: "", monto: 0 }],
    }));
  }

  /** Cambia el nombre o el monto de un costo extra. */
  function actualizarOtroCosto(id, campo, valor) {
    modificarReceta((r) => ({
      ...r,
      otrosCostos: r.otrosCostos.map((o) => (o.id === id ? { ...o, [campo]: valor } : o)),
    }));
  }

  /** Quita un costo extra. */
  function quitarOtroCosto(id) {
    modificarReceta((r) => ({ ...r, otrosCostos: r.otrosCostos.filter((o) => o.id !== id) }));
  }

  return {
    nombreNegocio: estado.nombreNegocio,
    ingredientes: estado.ingredientes,
    recetas: estado.recetas,
    receta,
    resultado,
    cambiarNombreNegocio,
    agregarIngrediente,
    actualizarIngrediente,
    eliminarIngrediente,
    crearReceta,
    duplicarReceta,
    eliminarReceta,
    seleccionarReceta,
    actualizarReceta,
    agregarLinea,
    actualizarLinea,
    quitarLinea,
    agregarOtroCosto,
    actualizarOtroCosto,
    quitarOtroCosto,
  };
}
