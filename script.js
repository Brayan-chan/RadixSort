document.addEventListener('DOMContentLoaded', function() {
    // Constante para traer elementos del DOM
    const $ = el => document.querySelector(el);

    // Verifica que el elemento con id 'tamanoArreglo' existe
    const $tamanoArreglo = $('#tamanoArreglo');
    if (!$tamanoArreglo) {
        console.error('Elemento con id "tamanoArreglo" no encontrado.');
        return;
    }

    // Agrega un listener para el evento 'input'
    $tamanoArreglo.addEventListener('input', function() { 
        const tamano = parseInt($tamanoArreglo.value, 10); // Convertir el valor de 'tamanoArreglo' a un número

        // Verificar que el valor de 'tamano' sea un número
        if (isNaN(tamano) || tamano < 0) { // isNaN() verifica si el valor es un número
            console.error('El valor ingresado no es un número válido.');
            return;
        }

        const $casillasMain = $('.casillasMain');
        // Limpiar el contenido del div casillasMain
        $casillasMain.innerHTML = ''; // Limpiar el contenido del div casillasMain

        // Generar las casillas si el valor no es vacío
        if ($tamanoArreglo.value !== '') { // Verificar que el valor de 'tamano' no sea vacío
            for (let i = 0; i < tamano; i++) { // Crear tantas casillas como el valor de 'tamano'
                const casilla = document.createElement('input'); // Crear una nueva casilla
                casilla.type = 'text'; // Agregar el atributo 'type'
                casilla.className = 'casilla';  // Agregar la clase 'casilla'
                $casillasMain.appendChild(casilla); // Agregar la casilla al div casillasMain
            }
            const $boton = $('.boton');
            const $ordenar = $('.ordenar');
            $boton.style.display = 'block'; // Mostrar el botón 'Ordenar'
            $ordenar.style.margin = '0.5rem'; // Ajustar el margen del botón 'Ordenar'
            $ordenar.style.background = '#fff'; // Cambiar el color del botón 'Ordenar'
            $ordenar.style.color = '#000'; // Cambiar el color del texto del botón 'Ordenar'
            $ordenar.style.padding = '0.5rem'; // Ajustar el padding del botón 'Ordenar'
            $ordenar.style.border = '2px solid #fff'; // Quitar el borde del botón 'Ordenar'
            $ordenar.style.borderRadius = '10px'; // Ajustar el borde redondeado del botón 'Ordenar'
        }
    });
});