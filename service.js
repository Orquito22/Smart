document
  .getElementById('miFormulario')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

    var formulario = event.target;
    var datosFormulario = new FormData(formulario);

    fetch(formulario.action, {
      method: formulario.method,
      body: datosFormulario,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Hubo un problema con la petición. Código de error');
        }
        return response.text();
      })
      .then((data) => {
        // Manejar la respuesta exitosa aquí
        console.log(data);
        mostrarAlerta('Formulario enviado con éxito!', 'success');
        formulario.reset(); // Limpiar el formulario después de enviarlo
      })
      .catch((error) => {
        // Manejar errores de la petición aquí
        console.error('Error:', error);
        mostrarAlerta(
          'Hubo un problema al enviar el formulario. Por favor, inténtalo de nuevo.',
          'error'
        );
      });
  });

function mostrarAlerta(mensaje, tipo) {
  // Crear el elemento de toast
  var toastContainer = document.createElement('div');
  toastContainer.classList.add(
    'toast-container',
    'position-fixed',
    'top-0',
    'end-0',
    'p-3'
  );

  var toast = document.createElement('div');
  toast.id = 'liveToast';
  toast.classList.add('toast');
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');

  var toastBody = document.createElement('div');
  toastBody.classList.add('toast-body');
  toastBody.textContent = mensaje; // El mensaje del toast

  // Añadir clase de color dependiendo del tipo de toast
  if (tipo === 'success') {
    toast.classList.add('bg-success', 'text-white');
  } else if (tipo === 'error') {
    toast.classList.add('bg-danger', 'text-white');
  }

  // Construir la estructura del toast
  toast.appendChild(toastBody);
  toastContainer.appendChild(toast);

  // Agregar el toast al DOM
  document.body.appendChild(toastContainer);

  // Mostrar el toast
  var liveToast = new bootstrap.Toast(toast);
  liveToast.show();
}
