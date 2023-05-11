import { func1, func2, func3, func4 } from './Multiplicators algorithm.mjs';

const select = document.querySelector('.select'),
   input = document.querySelector('.input'),
   button = document.querySelector('.button'),
   previousNumber = document.querySelector('.previousNumber'),
   previousTime = document.querySelector('.previousTime'),
   possibilities = document.querySelector('.possibilities'),
   time = document.querySelector('.time'),
   results = document.querySelector('.results');

let complexity = 'O (√n) fastest',
   previousTimeValue;

window.onload = () => input.focus();

// Choose complexity
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
      previousTimeValue = (endTime - startTime).toFixed(5);

      time.innerHTML = `
			Algorithm time: <br />
			- Function with complexity <u>${complexity}</u> 
			took &nbsp;&nbsp;&nbsp;&nbsp; { ${finalTime} milliseconds } &nbsp;&nbsp;&nbsp;&nbsp; to execute.
		`;
   }, 1);
}

function findMultipliers() {
   let multipliers = '',
      output = [];

   // Find multipliers
   if (complexity === 'O (n^2)') output = func1(input.value);
   else if (complexity === 'O (n)') output = func2(input.value);
   else if (complexity === 'O (√n)') output = func3(input.value);
   else if (complexity === 'O (√n) fastest') output = func4(input.value);

   for (let i = 0; i < output.length; i++)
      multipliers += `Factor 1: &nbsp; ${output[i].factor_1}, &nbsp; Factor 2:&nbsp;&nbsp; ${output[i].factor_2}<br>`;

   displayResultsOnPage(multipliers, output);

   // Clear input
   input.value = '';
}

function displayResultsOnPage(multipliers, output) {
   results.innerHTML = multipliers;
   results.style.border = '1px solid lightgray';
   possibilities.innerHTML = `${output.length} multipliers couples available`;
   previousNumber.innerHTML = `
		Number used${output.length === 2 ? ' is prime' : ''}: 
		<u>${input.value}</u>
	`;
   if (previousTimeValue)
      previousTime.innerHTML = `Previous execution time: <u>${previousTimeValue}</u>`;
}
