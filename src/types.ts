export type result = { factor_1: number; factor_2: number }[];

export type execTime = number | string;

export type resultFromRun = {
   findMultOutput: result;
   executionTime: execTime;
};

export type previousState = {
   previousInput: number;
   previousComplexity: string;
   previousExecutionTime: execTime;
};
