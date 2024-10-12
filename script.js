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
        // parseInt() convierte un string en un número entero
        const tamano = parseInt($tamanoArreglo.value, 10); // El 10 indica que el valor es base 10

        // Verificar que el valor de 'tamano' sea un número
        if (isNaN(tamano) || tamano < 0) { // isNaN() verifica si el valor no es un número
            console.error('El valor ingresado no es un número válido.');
            return;
        }

        const $casillasMain = $('.casillasMain');
        // Limpiar el contenido del div casillasMain
        $casillasMain.innerHTML = '';

        // Generar las casillas
        for (let i = 0; i < tamano; i++) {
            const casilla = document.createElement('input');
            casilla.type = 'text';
            casilla.className = 'casilla';
            $casillasMain.appendChild(casilla);
        }
    });
});