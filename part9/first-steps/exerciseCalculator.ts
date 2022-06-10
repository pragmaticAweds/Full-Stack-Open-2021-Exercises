interface Iarr {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgvToNum = (arr: Array<string>) => {
  if (arr.length < 2) throw new Error("the Argument is small");

  return arr.map((no) => {
    if (!isNaN(Number(no))) {
      return Number(no);
    } else throw new Error("Argv is not a type of no");
  });
};

const exerciseCalculator = (target: number, arr: Array<number>): Iarr => {
  const average = arr.reduce((acc, cur) => acc + cur, 0) / arr.length;
  let trainingDays = arr.filter((no) => no !== 0).length;
  return {
    periodLength: arr.length,
    trainingDays,
    success: average >= target ? true : false,
    rating: 2,
    ratingDescription: "not too bad but could be better",
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
