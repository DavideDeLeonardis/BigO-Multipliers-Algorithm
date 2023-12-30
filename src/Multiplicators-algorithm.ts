// Find multipliers of multiplication with different complexity algorithms

// Helpers functions
import { ifNumberIsPrimeReturn, sortArr } from './helpers.js';

import { result } from './types';

// --------------------------------------------------------------------------------

// Time complexity func1: O(n^2)     - SLOWEST
/**
 *
 * @param {number} n
 * @returns results[]
 */
export function func1(n: number): result {
   ifNumberIsPrimeReturn(n);

   let n1 = 1,
      n2 = 1,
      results: result = [];

   for (let i = 1; i <= n; i++) {
      n1 = i;
      for (let j = 1; j <= n; j++) {
         n2 = j;
         if (n1 * n2 == n)
            results = [...results, { factor_1: n1, factor_2: n2 }];
      }
   }

   return sortArr(results);
}





// --------------------------------------------------------------------------------

// Time complexity func2: O(n)     - MEDIUM
/**
 *
 * @param {number} n
 * @returns results[]
 */
export function func2(n: number): result {
   ifNumberIsPrimeReturn(n);

   let i = 1,
      results: result = [],
      j: number = n;

   while (i <= j) {
      if (n % i === 0) results = [...results, { factor_1: i, factor_2: n / i }];
      i++;

      if (n % j === 0 && j !== i && j !== n / i)
         results = [...results, { factor_1: j, factor_2: n / j }];

      j--;
   }

   return sortArr(results);
}





// --------------------------------------------------------------------------------

// Time complexity func3: O(sqrt(n))     - FAST / SLOWER THAN func4
/**
 *
 * @param {number} n
 * @returns results[]
 */
export function func3(n: number): result {
   ifNumberIsPrimeReturn(n);

   let results: result = [];

   for (let i = 1; i <= Math.floor(Math.sqrt(n)); i++)
      if (n % i === 0)
         results = [
            ...results,
            { factor_1: i, factor_2: n / i },
            { factor_1: n / i, factor_2: i },
         ];

   return sortArr(results);
}





// --------------------------------------------------------------------------------

// Time complexity func4: O(sqrt(n))      - FASTEST
/**
 *
 * @param {number} n
 * @returns results[]
 */
export function func4(n: number): result {
   ifNumberIsPrimeReturn(n);

   let results: result = [];

   for (let i = 1; i <= Math.floor(Math.sqrt(n)); i++)
      if (n % i === 0) {
         const factor: number = n / i;
         if (i !== factor) results.push({ factor_1: i, factor_2: factor });
         results.push({ factor_1: factor, factor_2: i });
      }

   return sortArr(results);
}

// --------------------------------------------------------------------------------













// TEST with NODE.JS --------------------------------------------------------------------------

let numPrime = 79777,
   numNotPrime = 2222457346134;

// //  Number is prime
// console.time('Computational time');
// console.log(`FUNC-1:\n ${numPrime}: `, func1(numPrime));
// console.timeEnd('Computational time');

//
//
//
//

// // // FUNC 1: O(n^2) ------- Cazz se ce ne mette

// console.time('Computational time');
// console.log(`FUNC-1:\n ${numNotPrime}: `, func1(numNotPrime));
// console.timeEnd('Computational time');
// console.log('');

//
//
//
//

// // // FUNC 2: O(n) ------- Anche questa ce ne mette un bel po'

// console.time('Computational time');
// console.log(`FUNC-2:\n ${numNotPrime}: `, func2(numNotPrime));
// console.timeEnd('Computational time');
// console.log('');

//
//
//
//

// // // FUNC 3: O(sqrt(n)) ------- Veloce

// console.time('Computational time');
// console.log(`FUNC-3:\n ${numNotPrime}: `, func3(numNotPrime));
// console.timeEnd('Computational time');
// console.log('');

//
//
//
//

// // // FUNC 4: O(sqrt(n)) ------- Più veloce
// console.time('Computational time');
// console.log(`FUNC-4:\n ${numNotPrime}: `, func4(numNotPrime));
// console.timeEnd('Computational time');
