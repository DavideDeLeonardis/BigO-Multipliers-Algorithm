import { func1, func2, func3 } from './Multiplicators algorithm.mjs';

const container = document.querySelector('.container'),
   input = document.querySelector('.input');

function search() {
   let result = '';

   container.textContent = 'Loading...';

   setTimeout(() => {
      // Search multiplicators
      const output = func3(input.value);
      for (let i = 0; i < output.length; i++)
         result += `Factor 1: ${output[i].factor_1}, Factor 2: ${output[i].factor_2}<br>`;

      // Insert in HTML
      container.innerHTML = result;
      document.querySelector('.possibilities').innerHTML = `
			${output.length} multiplicators available
		`;

      // Clear
      input.value = '';
      result = '';
   }, 50);
}

function runFunctionAndCalculateTime() {
   // Check if number inserted
   if (isNaN(input.value)) return;

   // Calculate search() execution time
   const start = performance.now();
   search();
   const end = performance.now();
   const elapsed = (end - start).toFixed(8);

   document.getElementById(
      'output'
   ).innerHTML = `- Function took ${elapsed} milliseconds to execute.`;
}

// Init and accessibility
input.addEventListener('keydown', (e) => {
   if (e.keyCode === 13) runFunctionAndCalculateTime();
});
document
   .querySelector('.button')
   .addEventListener('click', runFunctionAndCalculateTime);
