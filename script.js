document.addEventListener('DOMContentLoaded', function() {
    // Constante para traer elementos del DOM
    const $ = el => document.querySelector(el);

    // Inicializar variables
    let arregloNumeros = [];
    let pasos = 0;
    let maximoDigitos = 0;

    // Verifica que el elemento con id 'tamanoArreglo' existe
    const $tamanoArreglo = $('#tamanoArreglo');
    const $analizarBtn = $('#analizarBtn');

    // Agrega un listener para el evento 'input' en el tamaño del arreglo
    $tamanoArreglo.addEventListener('input', function() {
        const tamano = parseInt($tamanoArreglo.value, 10);

        // Verificar que el valor de 'tamano' sea un número
        if (isNaN(tamano) || tamano <= 0) {
            console.error('El valor ingresado no es un número válido.');
            return;
        }

        const $casillasMain = $('.casillasMain');
        $casillasMain.innerHTML = '';  // Limpiar casillas anteriores

        // Generar casillas
        for (let i = 0; i < tamano; i++) {
            const casilla = document.createElement('input');
            casilla.type = 'text';
            casilla.className = 'casilla';
            $casillasMain.appendChild(casilla);
        }

        // Mostrar botón "Analizar"
        const $boton = $('.boton');
        $boton.style.display = 'block';
    });

    // Agrega un listener para el botón "Analizar"
    $analizarBtn.addEventListener('click', function() {
        const $casillasMain = $('.casillasMain');
        const casillas = Array.from($casillasMain.querySelectorAll('.casilla'));

        // Verificar que todas las casillas estén llenas
        arregloNumeros = casillas.map(casilla => parseInt(casilla.value, 10));
        if (arregloNumeros.includes(NaN)) {
            alert("Es necesario llenar todas las casillas con números válidos.");
            return;
        }

        // Obtener el número más grande y determinar cuántos dígitos tiene
        const maximo = Math.max(...arregloNumeros);
        maximoDigitos = maximo.toString().length;
        pasos = maximoDigitos;  // Definir cuántos pasos se van a ejecutar

        // Mostrar información del análisis
        mostrarPaso(1);
    });

    // Función para mostrar cada paso de ordenamiento
    function mostrarPaso(paso) {
        if (paso > maximoDigitos) {
            mostrarFinProceso();
            return;
        }

        // Mostrar tabla de ordenamiento para el paso actual
        const $tablaOrdenamiento = $('.tablaOrdenamiento');
        $tablaOrdenamiento.innerHTML = '';  // Limpiar tabla anterior

        const lugar = Math.pow(10, paso - 1);  // Unidades, decenas, centenas...
        const buckets = Array.from({ length: 10 }, () => []);

        // Clasificar los números en "buckets" según el dígito actual
        arregloNumeros.forEach(num => {
            const digito = Math.floor(num / lugar) % 10;
            buckets[digito].push(num);
        });

        // Crear tabla visual
        const tabla = document.createElement('table');
        const encabezado = tabla.insertRow();
        ['Dígito', 'Números'].forEach(text => {
            const th = document.createElement('th');
            th.innerText = text;
            encabezado.appendChild(th);
        });

        buckets.forEach((bucket, i) => {
            const fila = tabla.insertRow();
            fila.insertCell().innerText = i;
            fila.insertCell().innerText = bucket.join(', ');
        });

        $tablaOrdenamiento.appendChild(tabla);

        // Actualizar arreglo según el orden de los buckets
        arregloNumeros = [].concat(...buckets);

        // Crear botón para siguiente paso
        const botonSiguiente = document.createElement('button');
        botonSiguiente.innerText = `Ejecutar paso ${paso + 1}`;
        botonSiguiente.addEventListener('click', () => mostrarPaso(paso + 1));
        $tablaOrdenamiento.appendChild(botonSiguiente);
    }

    // Función para mostrar la finalización del proceso
    function mostrarFinProceso() {
        const $tablaOrdenamiento = $('.tablaOrdenamiento');
        $tablaOrdenamiento.innerHTML = `
            <h2>FIN DEL PROCESO</h2>
            <button id="reiniciarBtn">Reiniciar</button>
        `;

        // Listener para reiniciar el proceso
        const $reiniciarBtn = $('#reiniciarBtn');
        $reiniciarBtn.addEventListener('click', () => location.reload());
    }
});