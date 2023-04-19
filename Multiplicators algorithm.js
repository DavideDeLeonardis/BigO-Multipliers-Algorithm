// Find multiplicators of multiplication with different complexity algorithms

// HELPERS
function checkIfNumberIsPrime(n) {
   let factor = 2;
   while (n % factor != 0) factor++;
   return factor == n;
}

function ifNumberIsPrimeReturn(n) {
   if (checkIfNumberIsPrime(n))
      return [
         { factor_1: 1, factor_2: n },
         { factor_1: n, factor_2: 1 },
      ];
}

// Time complexity func1: O(n^2)
function func1(n) {
   ifNumberIsPrimeReturn(n);

   let n1 = 1,
      n2 = 1,
      results = [];

   for (let i = 1; i <= n; i++) {
      n1 = i;

      for (let j = 1; j <= n; j++) {
         n2 = j;

         if (n1 * n2 == n)
            results = [...results, { factor_1: n1, factor_2: n2 }];
      }
   }

   return results;
}

// Time complexity func3: O(n)
function func2(n) {
   ifNumberIsPrimeReturn(n);

   let i = 1,
      results = [],
      j = n;

   while (i <= j) {
      if (n % i === 0) results.push({ factor_1: i, factor_2: n / i });
      i++;

      if (n % j === 0 && j !== i && j !== n / i)
         results.push({ factor_1: j, factor_2: n / j });

      j--;
   }

   return results;
}

// Time complexity func3: O(sqrt(n))
function func3(n) {
   ifNumberIsPrimeReturn(n);

   let results = [];

   for (let i = 1; i <= Math.floor(Math.sqrt(n)); i++)
      if (n % i === 0) results.push({ factor_1: i, factor_2: n / i });

   if (Math.floor(Math.sqrt(n)) ** 2 === n) results.pop();

   return results;
}

// TEST --------------------------------------------------------------------------

let numPrime = 79777,
   numNotPrime = 73_958_673_564_259_834;

// // // Number is prime
// console.time('Computational time');
// console.log(`FUNC-1:\n ${numPrime}: `, func1(numPrime));
// console.timeEnd('Computational time');

console.log(
   '----------------------------------------------------------------\n'
);

// // // FUNC 1: O(n^2) ------- Cazz se ce ne mette

// console.time('Computational time');
// console.log(`FUNC-1:\n ${numNotPrime}: `, func1(numNotPrime));
// console.timeEnd('Computational time');

console.log(
   '----------------------------------------------------------------\n'
);

// // // FUNC 2: O(n)

// console.time('Computational time');
// console.log(`FUNC-2:\n ${numNotPrime}: `, func2(numNotPrime));
// console.timeEnd('Computational time');

console.log(
   '----------------------------------------------------------------\n'
);

// // // FUNC 3: O(sqrt(n))

console.time('Computational time');
console.log(`FUNC-3:\n ${numNotPrime}: `, func3(numNotPrime));
console.timeEnd('Computational time');
