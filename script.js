const positionNames = [
    'unidades', 'decenas', 'centenas', 'UM', 'DM', 'CM', 'UMILLON',
    'DMILLON', 'CMILLON', 'MILES MILLONES'
];

let arraySize = 0;
let numbers = [];
let inputValues = [];
let maxNumber = 0;
let steps = 0;
let currentStep = 0;
let sortedArrays = [];
let allBuckets = [];
let error = '';

function updateUI() {
    const inputSection = document.getElementById('inputSection');
    const visualizationSection = document.getElementById('visualizationSection');

    if (arraySize === 0) {
        inputSection.innerHTML = `
            <div class="mb-4">
                <input type="number" id="arraySizeInput" placeholder="Ingrese el tamaño del arreglo" class="mb-2">
                <button onclick="createArray()">Crear arreglo</button>
            </div>
        `;
        visualizationSection.innerHTML = '';
    } else if (numbers.length === 0) {
        let inputsHTML = '';
        for (let i = 0; i < arraySize; i++) {
            inputsHTML += `<input type="number" id="input${i}" value="${inputValues[i] || ''}" onchange="updateInputValue(${i})">`;
        }
        inputSection.innerHTML = `
            <div class="mb-4">
                <div class="grid grid-cols-5 gap-2 mb-2">
                    ${inputsHTML}
                </div>
                <button onclick="handleAnalyze()">Analizar</button>
                ${error ? `<p class="text-red-500 mt-2">${error}</p>` : ''}
            </div>
        `;
        visualizationSection.innerHTML = '';
    } else {
        inputSection.innerHTML = '';
        let visualizationHTML = `
            <div class="card mb-4">
                <h2 class="font-bold mb-2">Lista Original</h2>
                <div class="grid grid-cols-5 gap-2">
                    ${numbers.map(num => `<div class="border p-2 text-center">${num}</div>`).join('')}
                </div>
            </div>
            <p class="mb-2">Número más grande: ${maxNumber}</p>
            <p class="mb-2">Cantidad de pasos: ${steps}</p>
        `;

        if (currentStep < steps) {
            visualizationHTML += `
                <button onclick="handleStep()" class="mb-4">
                    Ejecutar paso ${currentStep + 1}: ${positionNames[currentStep]}
                </button>
            `;
        } else {
            visualizationHTML += `<p class="mb-4 font-bold">FIN DEL PROCESO</p>`;
        }

        if (allBuckets.length > 0) {
            visualizationHTML += `
                <div class="card mb-4">
                    <h2 class="font-bold mb-2">Tabla de Ordenamiento</h2>
                    <table class="radix-table">
                        <thead>
                            <tr>
                                <th></th>
                                ${allBuckets.map((_, index) => `<th>${positionNames[index]}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(digit => `
                                <tr>
                                    <td>${digit}</td>
                                    ${allBuckets.map(buckets => `<td>${buckets[digit].join(', ')}</td>`).join('')}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

        sortedArrays.forEach((sortedArray, index) => {
            visualizationHTML += `
                <div class="card mb-4">
                    <h2 class="font-bold mb-2">
                        ${index === 0 ? 'Lista Original' : `Paso ${index}: Ordenado por ${positionNames[index - 1]}`}
                    </h2>
                    <div class="grid grid-cols-5 gap-2">
                        ${sortedArray.map(num => `<div class="border p-2 text-center">${num}</div>`).join('')}
                    </div>
                </div>
            `;
        });

        if (currentStep >= steps) {
            visualizationHTML += `<button onclick="handleReset()">Reiniciar</button>`;
        }

        visualizationSection.innerHTML = visualizationHTML;
    }
}

function createArray() {
    arraySize = parseInt(document.getElementById('arraySizeInput').value);
    inputValues = new Array(arraySize).fill('');
    updateUI();
}

function updateInputValue(index) {
    inputValues[index] = document.getElementById(`input${index}`).value;
}

function handleAnalyze() {
    if (inputValues.some(val => val === '')) {
        error = 'Es necesario llenar todos los campos';
        updateUI();
        return;
    }

    numbers = inputValues.map(Number);
    maxNumber = Math.max(...numbers);
    steps = maxNumber.toString().length;
    sortedArrays = [numbers];
    allBuckets = [];
    error = '';
    updateUI();
}

function getDigit(num, place) {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

function handleStep() {
    if (currentStep >= steps) return;

    const currentArray = sortedArrays[sortedArrays.length - 1];
    const newBuckets = Array.from({ length: 10 }, () => []);

    currentArray.forEach((num) => {
        const digit = getDigit(num, currentStep);
        newBuckets[digit].push(num);
    });

    allBuckets.push(newBuckets);

    const newSortedArray = newBuckets.flat();
    sortedArrays.push(newSortedArray);
    currentStep++;
    updateUI();
}

function handleReset() {
    arraySize = 0;
    numbers = [];
    inputValues = [];
    maxNumber = 0;
    steps = 0;
    currentStep = 0;
    sortedArrays = [];
    allBuckets = [];
    error = '';
    updateUI();
}

// Initial UI update
updateUI();