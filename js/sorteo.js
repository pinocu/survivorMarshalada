const CLAVE_HISTORIAL = "sorteos_marshalada_historial";

function obtenerHistorial() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE_HISTORIAL) || "[]");
    return Array.isArray(datos) ? datos : [];
  } catch (e) {
    return [];
  }
}

function guardarHistorial(lista) {
  localStorage.setItem(CLAVE_HISTORIAL, JSON.stringify(lista));
}

function borrarSorteo(id) {
  const nuevo = obtenerHistorial().filter((entrada) => entrada.id !== id);
  guardarHistorial(nuevo);
}

function obtenerExcluidos() {
  const historial = obtenerHistorial();
  if (historial.length === 0) return new Set();
  const ultimo = historial[historial.length - 1];
  const excluidos = new Set();
  ultimo.filas.forEach((fila) => excluidos.add(fila.equipo));
  return excluidos;
}

function elegirAlAzar(lista, cantidad) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia.slice(0, cantidad);
}

function calcularDisponibles(equiposBombo, excluidosSemana, excluidosExtra, cantidad) {
  // 1. Aplicar ambas exclusiones (semana anterior + jornada 1 si aplica)
  let disponibles = equiposBombo.filter((e) => !excluidosSemana.has(e) && !excluidosExtra.has(e));
  if (disponibles.length >= cantidad) return disponibles;

  // 2. Si no alcanza, se relaja solo la exclusión de la semana anterior,
  //    manteniendo firme la de "omitir jornada 1" (es una elección explícita).
  disponibles = equiposBombo.filter((e) => !excluidosExtra.has(e));
  if (disponibles.length >= cantidad) return disponibles;

  // 3. Última salvaguarda: usar el bombo completo para que el sorteo no falle.
  return equiposBombo;
}

function hacerSorteo(ligasIncluidas, excluidosExtra) {
  const excluidosSemana = obtenerExcluidos();
  const extra = excluidosExtra || new Set();
  const resultado = {};
  ligasIncluidas.forEach((liga) => {
    const bombosLiga = LIGAS[liga];
    resultado[liga] = {};
    ORDEN_BOMBOS.forEach((bombo) => {
      const cantidad = CANTIDAD_POR_BOMBO[bombo];
      const equiposBombo = bombosLiga[bombo];
      const disponibles = calcularDisponibles(equiposBombo, excluidosSemana, extra, cantidad);
      resultado[liga][bombo] = elegirAlAzar(disponibles, cantidad);
    });
  });
  return resultado;
}

function aplanarResultado(resultado) {
  const filas = [];
  Object.entries(resultado).forEach(([liga, bombos]) => {
    const equiposLiga = [];
    ORDEN_BOMBOS.forEach((bombo) => {
      bombos[bombo].forEach((equipo) => equiposLiga.push([bombo, equipo]));
    });
    equiposLiga.forEach(([bombo, equipo], i) => {
      filas.push({
        liga,
        bombo,
        equipo,
        primeraDeLiga: i === 0,
        filasLiga: equiposLiga.length,
      });
    });
  });
  return filas;
}

function slugArchivo(texto) {
  const sinAcentos = (texto || "sorteo").normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  const slug = sinAcentos.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
  return slug || "sorteo";
}

function guardarNuevoSorteo(titulo, ligasIncluidas, excluidosExtra) {
  const resultado = hacerSorteo(ligasIncluidas, excluidosExtra);
  const filas = aplanarResultado(resultado);
  const historial = obtenerHistorial();
  const id = historial.length ? historial[historial.length - 1].id + 1 : 1;
  const fecha = new Date().toLocaleString("es-ES", {
    day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
  const entrada = { id, fecha, titulo: titulo || "Sorteo sin título", filas };
  historial.push(entrada);
  guardarHistorial(historial);
  return entrada;
}
