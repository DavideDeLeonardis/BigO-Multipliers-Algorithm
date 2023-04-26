// HELPERS
export function ifNumberIsPrimeReturn(n) {
   const checkIfNumberIsPrime = (n) => {
      let factor = 2;
      while (n % factor != 0) factor++;
      return factor == n;
   };

   if (checkIfNumberIsPrime(n))
      return [
         { factor_1: 1, factor_2: n },
         { factor_1: n, factor_2: 1 },
      ];
}

export function sortArr(arr) {
   return arr.sort((a, b) => {
      if (a.factor_1 > b.factor_1) return 1;
      if (a.factor_1 < b.factor_1) return -1;
   });
}
