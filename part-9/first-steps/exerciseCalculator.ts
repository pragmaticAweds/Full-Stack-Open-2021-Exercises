interface Iarr {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const parseArgvToNum = (arr: Array<string>) => {
  if (arr.length < 2) throw new Error("the Argument is small");

  return arr.map((no) => {
    if (!isNaN(Number(no))) {
      return Number(no);
    } else throw new Error("Argv is not a type of no");
  });
};

export const exerciseCalculator = (
  target: number,
  arr: Array<number>
): Iarr => {
  const average = arr.reduce((acc, cur) => acc + cur, 0) / arr.length;
  let trainingDays = arr.filter((no) => no !== 0).length;
  return {
    periodLength: arr.length,
    trainingDays,
    success: average >= target ? true : false,
    rating:
      average <= 1.5 ? 1 : average >= 1.5 && average <= target ? 2 : target,
    ratingDescription:
      average <= 1.5
        ? "bad"
        : average >= 1.5 && average <= target
        ? "not too bad but could be better"
        : "good",
    target,
    average,
  };
};

try {
  const no = parseArgvToNum(process.argv.slice(2));
  console.log(exerciseCalculator(no[0], no.slice(1)));
} catch (error) {
  console.log(error);
}
