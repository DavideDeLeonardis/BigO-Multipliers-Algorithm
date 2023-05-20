export type result = { factor_1: number; factor_2: number }[];

export type resultFromRun = {
   findMultOutput: result;
   executionTime: number;
};

export type previousState = {
   previousInput: number;
   previousComplexity: string;
   previousExecutionTime: number;
};
