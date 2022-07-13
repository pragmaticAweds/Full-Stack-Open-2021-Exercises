import { Entry } from "../types";

import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { SelectField, HealthCheckRatingOption } from "./FormField";
import { HealthCheckRating } from "../types";

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property

export type NewEntryWithoutId = UnionOmit<Entry, "id">;

interface EntryFormProps {
  onSubmit: (values: NewEntryWithoutId) => void;
  onCancel: () => void;
}

const healthCheckRatingOption: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "LowRisk" },
  { value: HealthCheckRating.HighRisk, label: "HighRisk" },
  { value: HealthCheckRating.CriticalRisk, label: "CriticalRisk" },
];

export const AddPatientForm = ({ onSubmit, onCancel }: EntryFormProps) => {
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        employerName: "",
        specialist: "",
      }}
    ></Formik>
  );
};
