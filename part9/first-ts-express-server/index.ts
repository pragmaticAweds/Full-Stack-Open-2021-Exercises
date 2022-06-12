import express from "express";
import { calculateBmi } from "../first-steps/bmiCalculator";
import {
  parseArgvToNum,
  exerciseCalculator,
} from "../first-steps/exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/bmi", async (req, res) => {
  const { weight, height } = req.query;
  try {
    if (!isNaN(Number(weight)) && !isNaN(Number(height))) {
      res.send({
        weight,
        height,
        bmi: calculateBmi(Number(weight), Number(height)),
      });
    } else {
      throw new Error("malformatted parameters");
    }
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});

app.post("/exerciseCalculator", async (req, res) => {
  const { daily_exercises, target } = req.body;
  console.log(daily_exercises, target);

  const data = parseArgvToNum(daily_exercises);

  res.send({
    exercise: exerciseCalculator(Number(target), data),
  });
});

app.listen(3002, () => {
  console.log("connected successfully");
});
