// Find multiplicators of multiplication

// Time complexity: O(n^2)

function numberIsPrime(n) {
   let factor = 2;
   while (n % factor != 0) factor++;
   return factor == n;
}

function f1(n) {
   let n1 = 1,
      n2 = 1,
      results = [];

   if (numberIsPrime(n))
      return [
         { factor_1: 1, factor_2: n },
         { factor_1: n, factor_2: 1 },
      ];

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

console.time('Computational time');
console.log('79777:', f1(79777)); // number is prime
console.timeEnd('Computational time');
console.log('\n');
console.time('Computational time');
console.log('250:', f1(250));
console.timeEnd('Computational time');
