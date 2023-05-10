import { func1, func2, func3 } from './Multiplicators algorithm.mjs';

const select = document.querySelector('.select'),
   input = document.querySelector('.input'),
   button = document.querySelector('.button'),
   results = document.querySelector('.results'),
   possibilities = document.querySelector('.possibilities'),
   time = document.querySelector('.time');

window.onload = () => input.focus();

// Choose complexity
let complexity = 'radice-n';
select.addEventListener('change', (e) => {
   complexity = e.target.value;
   input.focus();
});

// Init and accessibility (with 'Enter' key)
button.addEventListener('click', runFunctionAndCalculateTime);
input.addEventListener(
   'keydown',
   (e) => e.keyCode === 13 && runFunctionAndCalculateTime()
);

function runFunctionAndCalculateTime() {
   // Check if value is number
   if (input.value === '' || isNaN(input.value)) return;

   // Init HTML fields
   results.innerHTML = 'Loading...';
   possibilities.innerHTML = '';
   time.innerHTML = '';

   // Run findMultipliers() and calculate execution time
   setTimeout(() => {
      const startTime = performance.now();
      findMultipliers();
      const endTime = performance.now();
      const finalTime = (endTime - startTime).toFixed(5);

      time.innerHTML = `Algorithm time: <br /> - Function took &nbsp;&nbsp;&nbsp;&nbsp; { ${finalTime} milliseconds } &nbsp;&nbsp;&nbsp;&nbsp; to execute.`;
   }, 1);
}

function findMultipliers() {
   let multipliers = '',
      output = [];

   // Find multipliers
   if (complexity === 'n-quadro') output = func1(input.value);
   else if (complexity === 'n') output = func2(input.value);
   else if (complexity === 'radice-n') output = func3(input.value);

   for (let i = 0; i < output.length; i++)
      multipliers += `Factor 1: ${output[i].factor_1}, &nbsp;&nbsp; Factor 2: ${output[i].factor_2}<br>`;

   // Insert in HTML
   results.innerHTML = multipliers;
   results.style.border = '1px solid lightgray';
   possibilities.innerHTML = `${output.length} multipliers available`;

   // Clear input
   input.value = '';
}
