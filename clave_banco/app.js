window.onload = init;

function init(){
  const teclado = document.getElementById('teclado');
  const teclas = Array.from(teclado.querySelectorAll('.tecla:not(.borrar)'));
  const values = teclas.map(tecla => tecla.value);
  const input = document.querySelector("#display_clave");
  const borrar = document.querySelector("#boton_borrar");

  const initialValuesHolder = new Map();

  // Organizar los valores random.
  function randomize(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const valoresRandomizados = randomize([...values]);
  teclas.forEach((tecla, i) => {
    tecla.value = valoresRandomizados[i];
    initialValuesHolder.set(tecla, valoresRandomizados[i]);
  });

  // Mostrar * en todos los botones numéricos al hacer hover en el teclado (excepto si el hover es sobre borrar)
  teclado.addEventListener('mouseenter', function(e) {
    teclas.forEach((tecla) => {
      tecla.value = '*';
    });
  });

  // Restaurar los valores originales al salir el mouse del teclado
  teclado.addEventListener('mouseleave', function(e) {
    teclas.forEach((tecla) => {
      tecla.value = initialValuesHolder.get(tecla);
    });
  });

  // Adición de caracteres al input.
  teclas.forEach((tecla) => {
    tecla.addEventListener("click", function() {
      if (input.value.length < 4) {
        input.value += initialValuesHolder.get(tecla);
      }
      else {
        setTimeout(() => {
          alert("Verificando clave...");
        }, 50);

        setTimeout(() => {
          location.reload();
        }, 500);
      }
    });
  });

  // Borrar el último caracter del input.
  borrar.addEventListener("click", function() {
    input.value = input.value.slice(0, -1);
  });

}