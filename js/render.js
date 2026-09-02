function construirTablaBombos(liga, bombos) {
  const maxFilas = bombos.media.length;
  let filasHtml = "";
  for (let i = 0; i < maxFilas; i++) {
    const alta = i < bombos.alta.length ? bombos.alta[i] : "";
    const media = bombos.media[i];
    let baja = "";
    if (i < bombos.baja.length) {
      baja = bombos.baja[i];
      if (ASCENDIDOS.has(baja)) {
        baja += ' <span class="asc-badge" title="Recién ascendido">▲</span>';
      }
    }
    filasHtml += `<tr>
      <td class="celda-alta">${alta}</td>
      <td class="celda-media">${media}</td>
      <td class="celda-baja">${baja}</td>
    </tr>`;
  }

  return `
    <label class="liga-header">
      <input type="checkbox" class="liga-checkbox" value="${liga}" checked>
      <span class="liga-nombre">${liga}</span>
    </label>
    <table class="bombos-tabla">
      <thead>
        <tr>
          <th class="th-alta">ALTA</th>
          <th class="th-media">MEDIA</th>
          <th class="th-baja">BAJA</th>
        </tr>
      </thead>
      <tbody>${filasHtml}</tbody>
    </table>
  `;
}

function pintarLigas(idContenedor) {
  const contenedor = document.getElementById(idContenedor);
  contenedor.innerHTML = "";
  Object.entries(LIGAS).forEach(([liga, bombos]) => {
    const card = document.createElement("div");
    card.className = "card liga-card";
    card.innerHTML = construirTablaBombos(liga, bombos);
    contenedor.appendChild(card);
  });
}

function construirTablaResultado(filas, idTabla, incluirAscendidos) {
  let filasHtml = "";
  filas.forEach((fila) => {
    filasHtml += `<tr class="fila-${fila.bombo}">`;
    if (fila.primeraDeLiga) {
      filasHtml += `<td class="tabla-liga-cell" rowspan="${fila.filasLiga}">${fila.liga}</td>`;
    }
    filasHtml += `<td><span class="bombo-pill bombo-pill-${fila.bombo}">${NOMBRE_BOMBO[fila.bombo]}</span></td>`;
    let equipoHtml = fila.equipo;
    if (incluirAscendidos && ASCENDIDOS.has(fila.equipo)) {
      equipoHtml += ' <span class="asc-badge" title="Recién ascendido">▲</span>';
    }
    filasHtml += `<td class="tabla-equipo-cell">${equipoHtml}</td>`;
    filasHtml += "</tr>";
  });

  return `<table id="${idTabla}" class="resultado-tabla">
    <thead><tr><th>Liga</th><th>Bombo</th><th>Equipo</th></tr></thead>
    <tbody>${filasHtml}</tbody>
  </table>`;
}
