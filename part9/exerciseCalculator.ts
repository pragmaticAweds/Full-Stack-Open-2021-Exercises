interface Iarr {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const exerciseCalculator = (
  target: number,
  arr: Array<number | string>
): Iarr => {
  const values = process.argv.slice(3).map((no) => +no);
  const average = values.reduce((acc, cur) => acc + cur, 0) / arr.length;
  let trainingDays = values.filter((no) => no !== 0).length;
  return {
    periodLength: values.length,
    trainingDays,
    success: average >= target ? true : false,
    rating: 2,
    ratingDescription: "not too bad but could be better",
    target,
    average,
  };
};

console.log(process.argv.slice(3));

console.log(exerciseCalculator(+process.argv[2], process.argv.slice(3)));
