interface bmiValues {
  h: number;
  w: number;
}

const parseArgs = (args: Array<string>): bmiValues => {
  if (args.length < 4) throw new Error("Not enough args");
  if (args.length > 4) throw new Error("Too much args");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      h: Number(args[2]),
      w: Number(args[3]),
    };
  } else {
    throw new Error("Provided values are not numbers!");
  }
};

export const calculateBmi = (w: number, h: number): string | undefined => {
  let bmi = (w / (h * h)) * 10000;
  let result;
  if (bmi < 18.5) {
    result = `Underweight (unhealthy weight)`;
  } else if (18.5 <= bmi && bmi <= 24.9) {
    result = `Normal (healthy weight)`;
  } else if (25 <= bmi && bmi <= 29.9) {
    result = `Overweight (over weight)`;
  } else if (bmi >= 30) {
    result = `Obese (obese weight)`;
  }
  return result;
};

try {
  const { h, w } = parseArgs(process.argv);
  console.log(calculateBmi(h, w));
} catch (error) {
  let errorMessage = "Something bad happened";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
