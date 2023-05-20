import {
   func1 as funcSlowest,
   func2 as funcSlow,
   func3 as funcFast,
   func4 as funcFastest,
} from './Multiplicators-algorithm.js';

import {
   result,
   resultFromRun,
   previousState as previousStateType,
} from './types/types';

const selectHTML: HTMLSelectElement = document.querySelector('.select');
const inputHTML: HTMLInputElement = document.querySelector('.input');
const buttonHTML: HTMLButtonElement = document.querySelector('.button');
const usedNowNumber: HTMLDivElement = document.querySelector('.usedNowNumber');
const previousResearches: HTMLDivElement = document.querySelector('.previousResearches');
const possibilitiesHTML: HTMLDivElement =document.querySelector('.possibilities');
const timeHTML: HTMLDivElement = document.querySelector('.time');
const resultsHTML: HTMLUListElement = document.querySelector('.results');
let previousState: previousStateType = null;
let complexity: string = 'O (√n) fastest';

window.onload = (): void => inputHTML.focus();

// Select complexity
selectHTML.addEventListener(
   'change',
   (e: Event & { target: HTMLSelectElement }): void => {
      complexity = e.target.value;
      inputHTML.focus();
   }
);

// Run main() on click and 'Enter' key press
buttonHTML.addEventListener('click', main);
inputHTML.addEventListener('keydown', (e: KeyboardEvent): void => {
   if (e.keyCode === 13) main();
});

async function main(): Promise<void> {
   let inputValue: unknown = inputHTML.value;

   try {
      const { findMultOutput, executionTime }: resultFromRun =
         await runFindMultipliersAndCalcTime(inputValue);
      displayResultsOnPage(inputValue as number, findMultOutput, executionTime);
      setPreviousState(inputValue as number, executionTime);
   } catch (e) {
      console.error(e);
   }
}

function runFindMultipliersAndCalcTime(
   inputValue: any
): Promise<resultFromRun> {
   if (inputValue === '' || isNaN(inputValue))
      throw new Error('Invalid input.');

   inputValue = Number(inputValue);

   resultsHTML.innerHTML = 'Loading...';

   return new Promise((resolve, reject) => {
      setTimeout(() => {
         try {
            const startTime: number = performance.now();
            const findMultOutput: result = findMultipliers(inputValue);
            const endTime: number = performance.now();

            let executionTime: string | number | any = (
               endTime - startTime
            ).toFixed(8);

            if (isNaN(executionTime) || executionTime == '0.00000000')
               executionTime = '0.00000001';

            resolve({ findMultOutput, executionTime });
         } catch (error) {
            reject(error);
         }
      }, 1);
   });
}

function findMultipliers(inputValue: number): result {
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

function setPreviousState(inputValue: number, executionTime: number): void {
   previousState = {
      previousInput: inputValue,
      previousComplexity: complexity,
      previousExecutionTime: executionTime,
   };
}

function displayResultsOnPage(
   inputValue: number,
   findMultOutput: result,
   executionTime: number
) {
   const multipliers: string = findMultOutput
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
