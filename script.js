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
        const $tamano = $tamanoArreglo.value;
        console.log($tamano);
    });
});