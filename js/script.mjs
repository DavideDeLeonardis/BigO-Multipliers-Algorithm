import {
   func1 as funcSlowest,
   func2 as funcSlow,
   func3 as funcFast,
   func4 as funcFastest,
} from './Multiplicators-algorithm.mjs';

const selectHTML = document.querySelector('.select');
const inputHTML = document.querySelector('.input');
const buttonHTML = document.querySelector('.button');
const usedNowNumber = document.querySelector('.usedNowNumber');
const previousResearches = document.querySelector('.previousResearches');
const possibilitiesHTML = document.querySelector('.possibilities');
const timeHTML = document.querySelector('.time');
const resultsHTML = document.querySelector('.results');
let previousState = null;
let complexity = 'O (√n) fastest';

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

   try {
      const { findMultOutput, executionTime } =
         await runFindMultipliersAndCalcTime(inputValue);
      displayResultsOnPage(inputValue, findMultOutput, executionTime);
      setPreviousState(inputValue, executionTime);
   } catch (e) {
      console.error(e);
   }
}

function runFindMultipliersAndCalcTime(inputValue) {
   if (inputValue === '' || isNaN(inputValue))
      throw new Error('Invalid input.');

   inputValue = Number(inputValue);

   resultsHTML.innerHTML = 'Loading...';

   return new Promise((resolve, reject) => {
      setTimeout(() => {
         try {
            const startTime = performance.now();
            const findMultOutput = findMultipliers(inputValue);
            const endTime = performance.now();

            let executionTime = (endTime - startTime).toFixed(8);
            if (isNaN(Number(executionTime)) || executionTime == '0.00000000')
               executionTime = '0.00000001';

            resolve({ findMultOutput, executionTime });
         } catch (error) {
            reject(error);
         }
      }, 1);
   });
}

function findMultipliers(inputValue) {
   switch (complexity) {
      case 'O (n^2)':
         return funcSlowest(inputValue);
      case 'O (n)':
         return funcSlow(inputValue);
      case 'O (√n)':
         return funcFast(inputValue);
      case 'O (√n) fastest':
         return funcFastest(inputValue);
      default:
         return [];
   }
}

function setPreviousState(inputValue, executionTime) {
   previousState = {
      previousInput: inputValue,
      previousComplexity: complexity,
      previousExecutionTime: executionTime,
   };
}

function displayResultsOnPage(inputValue, findMultOutput, executionTime) {
   const multipliers = findMultOutput
      .map(
         ({ factor_1, factor_2 }) => `
    			<li>
    			  	<ul>
    			   	<li>Factor 1: ${factor_1}</li>
    			    	<li>Factor 2: ${factor_2}</li>
    			 	</ul>
    			</li>
  			`
      )
      .join('');

   resultsHTML.innerHTML = multipliers;
   possibilitiesHTML.textContent = `${findMultOutput.length} multiplier couples available`;
   usedNowNumber.innerHTML = `
		Number used: <u>${inputValue}</u> ${
      findMultOutput.length === 2 ? '--> is prime' : ''
   }
	`;

   if (previousState) {
      const { previousInput, previousComplexity, previousExecutionTime } =
         previousState;

      previousResearches.innerHTML = `
      	Previous research: <br />
      	&nbsp; &nbsp; - input: ${previousInput}, <br />
      	&nbsp; &nbsp; - complexity: ${previousComplexity}, <br />
      	&nbsp; &nbsp; - execution time: ${previousExecutionTime} ms
    	`;
   }

   timeHTML.innerHTML = `
    	Algorithm time: <br />
    	- Function with complexity <u>${complexity}</u> 
    	took &nbsp;&nbsp;&nbsp;&nbsp; { ${executionTime} ms } &nbsp;&nbsp;&nbsp;&nbsp; to complete.
  	`;

   inputHTML.value = '';
}
