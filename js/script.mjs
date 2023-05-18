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

// Run main() on click and 'Enter' key press
buttonHTML.addEventListener('click', main);
inputHTML.addEventListener('keydown', (e) => {
   if (e.keyCode === 13) main();
});

async function main() {
   const inputValue = inputHTML.value;
   const findMultResponse = await runFindMultipliersAndCalcTime(inputValue);
   const { findMultOutput, executionTime } = findMultResponse;
   displayResultsOnPage(inputValue, findMultOutput, executionTime);
   setPreviousState(inputValue, executionTime);
}

function runFindMultipliersAndCalcTime(inputValue) {
   if (inputValue === '' || isNaN(inputValue)) return;
   else inputValue = Number(inputValue);

   resultsHTML.innerHTML = 'Loading...';

   return new Promise((resolve) => {
      setTimeout(() => {
         const startTime = performance.now();
         const findMultOutput = findMultipliers(inputValue);
         const endTime = performance.now();

         let executionTime = (endTime - startTime).toFixed(8);
         if (isNaN(Number(executionTime)) || executionTime == '0.00000000')
            executionTime = '0.00000001';

         resolve({ findMultOutput, executionTime });
      }, 1);
   });
}

function findMultipliers(inputValue) {
   let findMultOutput = [];

   if (complexity === 'O (n^2)') findMultOutput = func1(inputValue);
   else if (complexity === 'O (n)') findMultOutput = func2(inputValue);
   else if (complexity === 'O (√n)') findMultOutput = func3(inputValue);
   else if (complexity === 'O (√n) fastest') findMultOutput = func4(inputValue);

   return findMultOutput;
}

function setPreviousState(inputValue, executionTime) {
   previousState.previousInput = inputValue;
   previousState.previousComplexity = complexity;
   previousState.previousTimeValue = executionTime;
}

function displayResultsOnPage(inputValue, findMultOutput, executionTime) {
   let multipliers = '';

   for (let { factor_1, factor_2 } of findMultOutput)
      multipliers += `
			<li>
				<ul>
					<li>Factor 1: ${factor_1},</li>
					<li>Factor 2: ${factor_2}</li>
				</ul>
			</li>
		`;

   resultsHTML.innerHTML = multipliers;
   possibilitiesHTML.innerHTML = `${findMultOutput.length} multipliers couples available`;
   usedNowNumber.innerHTML = `
		Number used: <u>${inputValue}</u> &nbsp;&nbsp;&nbsp; ${
      findMultOutput.length === 2 ? '--> is prime' : ''
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
		took &nbsp;&nbsp;&nbsp;&nbsp; { ${executionTime} ms } &nbsp;&nbsp;&nbsp;&nbsp; to main.
	`;

   inputHTML.value = '';
}
