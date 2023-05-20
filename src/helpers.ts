// HELPERS
import { result } from './types/types';

export function ifNumberIsPrimeReturn(n: number): result {
   const checkIfNumberIsPrime = (n: number) => {
      let factor: number = 2;
      while (n % factor != 0) factor++;
      return factor == n;
   };

   if (checkIfNumberIsPrime(n))
      return [
         { factor_1: 1, factor_2: n },
         { factor_1: n, factor_2: 1 },
      ];
}

export function sortArr(arr: result): result {
   return arr.sort((a, b) => {
      if (a.factor_1 > b.factor_1) return 1;
      if (a.factor_1 < b.factor_1) return -1;
   });
}
