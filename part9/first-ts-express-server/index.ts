import express from "express";
import { calculateBmi } from "../first-steps/bmiCalculator";

const app = express();

app.get("/bmi", async (req, res) => {
  const { weight, height } = req.query;

  if (!isNaN(Number(weight)) && !isNaN(Number(height))) {
    res.send({
      weight,
      height,
      bmi: calculateBmi(Number(weight), Number(height)),
    });
  } else {
    res.send({
      error: "malformatted parameters",
    });
  }
});

app.listen(3002, () => {
  console.log("connected successfully");
});
