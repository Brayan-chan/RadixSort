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
        const tamano = parseInt($tamanoArreglo.value, 10);

        // Verificar que el valor de 'tamano' sea un número
        if (isNaN(tamano) || tamano < 0) {
            console.error('El valor ingresado no es un número válido.');
            return;
        }

        const $casillasMain = $('.casillasMain');
        // Limpiar el contenido del div casillasMain
        $casillasMain.innerHTML = '';

        // Generar las casillas si el valor no es vacío
        if ($tamanoArreglo.value !== '') {
            for (let i = 0; i < tamano; i++) {
                const casilla = document.createElement('input');
                casilla.type = 'text';
                casilla.className = 'casilla';
                $casillasMain.appendChild(casilla);
            }
            const $boton = $('.boton');
            const $ordenar = $('.ordenar');
            $boton.style.display = 'block';
            $ordenar.style.margin = '1rem';
            $ordenar.style.background = '#fff';
            $ordenar.style.color = '#000';
            $ordenar.style.padding = '0.5rem';
            $ordenar.style.border = '2px solid #fff';
            $ordenar.style.borderRadius = '10px';
        }
    });

    // Agrega un listener para el botón 'Ordenar'
    const $ordenar = $('.ordenar');
    $ordenar.addEventListener('click', function() {
        const $casillasMain = $('.casillasMain');
        const casillas = Array.from($casillasMain.querySelectorAll('.casilla'));
        const valores = casillas.map(casilla => parseInt(casilla.value, 10));
        console.log(valores);
    });
});