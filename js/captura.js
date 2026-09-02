function capturarComoImagen(idElemento, nombreArchivo, boton) {
  var el = document.getElementById(idElemento);
  if (!el || typeof html2canvas === "undefined") {
    return;
  }

  var textoOriginal = boton ? boton.textContent : null;
  if (boton) {
    boton.disabled = true;
    boton.textContent = "⏳";
  }

  html2canvas(el, {
    backgroundColor: "#1e2028",
    scale: 2,
  }).then(function (canvas) {
    var enlace = document.createElement("a");
    enlace.download = (nombreArchivo || "tabla") + ".png";
    enlace.href = canvas.toDataURL("image/png");
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
  }).finally(function () {
    if (boton) {
      boton.disabled = false;
      boton.textContent = textoOriginal;
    }
  });
}
