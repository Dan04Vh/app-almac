// Página puente de la invitación del vendedor.
//
// El enlace es https://dan04vh.github.io/app-almac/#t=TOKEN&tienda=CODIGO.
// Lo que va después del # nunca sale del celular: ni GitHub ni la vista previa
// de WhatsApp lo reciben, así que no queda en registros. Esta página no llama a
// ningún servidor, de modo que abrirla no gasta la invitación: solo se gasta
// cuando la persona entra en la app.
(function () {
  'use strict';

  var datos = new URLSearchParams(window.location.hash.slice(1));
  var token = datos.get('t') || '';
  var tienda = (datos.get('tienda') || '').toUpperCase();

  // Quita el código de la barra de direcciones y del historial.
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname);
  }

  // Mismo formato que crea el servidor: 24 bytes en base64url y el código de
  // tienda de 8 caracteres sin letras ni números confusos.
  var valido =
    /^[A-Za-z0-9_-]{32}$/.test(token) && /^[A-HJ-NP-Z2-9]{8}$/.test(tienda);

  if (!valido) {
    document.getElementById('valida').hidden = true;
    document.getElementById('invalida').hidden = false;
    return;
  }

  // El único destino posible es la app.
  var destino = 'boxtorycorp://cliente/' + token + '?tienda=' + tienda;
  document.getElementById('abrir').addEventListener('click', function () {
    window.location.href = destino;
  });
})();
