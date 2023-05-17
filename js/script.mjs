import { func1, func2, func3, func4 } from './Multiplicators algorithm.mjs';

const selectHTML = document.querySelector('.select'),
   inputHTML = document.querySelector('.input'),
   buttonHTML = document.querySelector('.button'),
   usedNowNumber = document.querySelector('.usedNowNumber'),
   previousResearches = document.querySelector('.previousResearches'),
   possibilitiesHTML = document.querySelector('.possibilities'),
   timeHTML = document.querySelector('.time'),
   resultsHTML = document.querySelector('.results');

let complexity = 'O (√n) fastest',
   previousState = {
      previousInput: '',
      previousComplexity: '',
      previousTimeValue: '',
   };

window.onload = () => inputHTML.focus();

// Select complexity
selectHTML.addEventListener('change', (e) => {
   complexity = e.target.value;
   inputHTML.focus();
});

// execute() on events with accessibility ('Enter' key)
buttonHTML.addEventListener('click', () => execute());
inputHTML.addEventListener('keydown', (e) => {
   if (e.keyCode === 13) execute();
});

async function execute() {
   const inputValue = inputHTML.value;
   const { multipliers, output, finalTime } = await runAndCalculateTime(
      inputValue
   );
   displayResultsOnPage(inputValue, multipliers, output, finalTime);
   setPreviousState(inputValue, finalTime);
}

function runAndCalculateTime(inputValue) {
   if (inputValue === '' || isNaN(inputValue)) return;

   resultsHTML.innerHTML = 'Loading...';

   // Run findMultipliers(), calculate execution time
   return new Promise((resolve) => {
      setTimeout(() => {
         const startTime = performance.now();
         const { multipliers, output } = findMultipliers(inputValue);
         const endTime = performance.now();

         let finalTime = (endTime - startTime).toFixed(8);
         if (isNaN(Number(finalTime)) || finalTime == '0.00000000')
            finalTime = '0.00000001';

         resolve({ multipliers, output, finalTime });
      }, 1);
   });
}

function findMultipliers(inputValue) {
   let multipliers = '',
      output = [];

   // Find multipliers
   if (complexity === 'O (n^2)') output = func1(inputValue);
   else if (complexity === 'O (n)') output = func2(inputValue);
   else if (complexity === 'O (√n)') output = func3(inputValue);
   else if (complexity === 'O (√n) fastest') output = func4(inputValue);

   for (let i = 0; i < output.length; i++)
      multipliers += `Factor 1: &nbsp; ${output[i].factor_1}, &nbsp; Factor 2:&nbsp;&nbsp; ${output[i].factor_2}<br>`;

   return { multipliers, output };
}

function setPreviousState(inputValue, finalTime) {
   previousState.previousInput = inputValue;
   previousState.previousComplexity = complexity;
   previousState.previousTimeValue = finalTime;
}

function displayResultsOnPage(inputValue, multipliers, output, finalTime) {
   resultsHTML.innerHTML = multipliers;
   possibilitiesHTML.innerHTML = `${output.length} multipliers couples available`;
   usedNowNumber.innerHTML = `
		Number used: <u>${inputValue}</u> &nbsp;&nbsp;&nbsp; ${
      output.length === 2 ? '--> is prime' : ''
   }
	`;

   if (previousState.previousTimeValue !== '')
      previousResearches.innerHTML = `Previous research: <br />
			&nbsp; &nbsp; - input: ${previousState.previousInput}, <br />
			&nbsp; &nbsp; - complexity: ${previousState.previousComplexity}, <br />
			&nbsp; &nbsp; - execution time: ${previousState.previousTimeValue} ms
		`;

   timeHTML.innerHTML = `
		Algorithm time: <br />
		- Function with complexity <u>${complexity}</u> 
		took &nbsp;&nbsp;&nbsp;&nbsp; { ${finalTime} ms } &nbsp;&nbsp;&nbsp;&nbsp; to execute.
	`;

   inputHTML.value = '';
}
