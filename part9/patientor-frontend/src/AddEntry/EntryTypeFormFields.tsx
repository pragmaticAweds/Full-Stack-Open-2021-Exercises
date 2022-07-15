import { Form } from "formik";
import { useState, useCallback } from "react";
import yup from "yup";
import { CustomSelect } from "../AddPatientModal/FormField";
import { EntryType, NewEntryWithoutId } from "../types";
import AddEntry from "./AddEntry";

const options = [
  {
    label: EntryType.HealthCheck,
    value: EntryType.HealthCheck,
    text: "Health Check",
  },
  {
    label: EntryType.OccupationalHealthcare,
    value: EntryType.OccupationalHealthcare,
    text: "Occupational Health Care",
  },
  {
    label: EntryType.Hospital,
    value: EntryType.Hospital,
    text: "Hospital",
  },
];

const InitialEntryValues = {
  description: "",
  date: "",
  specialist: "",
};

const healthCheckInitialValues: NewEntryWithoutId = {
  ...InitialEntryValues,
  type: EntryType.HealthCheck,
  healthCheckRating: 0,
};

const occupationalHealthCareIntitialValues: NewEntryWithoutId = {
  ...InitialEntryValues,
  type: EntryType.OccupationalHealthcare,
  employerName: "",
  sickLeave: { startDate: "", endDate: "" },
};

const hospitalIntitialValues: NewEntryWithoutId = {
  ...InitialEntryValues,
  type: EntryType.Hospital,
  discharge: { date: "", criteria: "" },
};

const validateInitialEntryValues = yup.object().shape({
  description: yup.string().min(10).max(20).required(),
  date: yup
    .string()
    .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD")
    .required(),
  specialist: yup.string().min(5).max(10).required(),
  diagnosisCodes: yup.array().of(yup.string()),
});

const validateHealthCheckValue = validateInitialEntryValues.concat(
  yup.object().shape({
    healthCheckRating: yup
      .number()
      .typeError("health check rating must be a number")
      .min(0)
      .max(3)
      .required("Please enter a rating between 0 - 3"),
  })
);

const validateOccupationalHealthCareValues = validateInitialEntryValues.concat(
  yup.object().shape({
    employerName: yup.string().min(3).required(),
    sickLeave: yup.object().shape({
      startDate: yup
        .string()
        .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD"),
      endDate: yup
        .string()
        .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD"),
    }),
  })
);

const validateHospitalValues = validateInitialEntryValues.concat(
  yup.object().shape({
    discharge: yup
      .object({
        date: yup
          .string()
          .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD")
          .required("discharge date is a required field"),
        criteria: yup
          .string()
          .min(12)
          .required("discharge criteria is a required field"),
      })
      .required(),
  })
);

interface Props {
  onSubmit: (values: NewEntryWithoutId) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [entryType, setEntryType] = useState<EntryType>(EntryType.HealthCheck);

  // {event:React.ChangeEvent<{ value: unknown }>

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>): void => {
    const value = e.target.value;
    if (value) setEntryType(value as EntryType);
  };
  const entryForm = useCallback(() => {
    switch (entryType) {
      case EntryType.HealthCheck:
        return (
          <AddEntry
            initialValues={healthCheckInitialValues}
            validationSchema={validateHealthCheckValue}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
        );
      case EntryType.OccupationalHealthcare:
        return (
          <AddEntry
            initialValues={occupationalHealthCareIntitialValues}
            validationSchema={validateOccupationalHealthCareValues}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
        );
      case EntryType.Hospital:
        return (
          <AddEntry
            initialValues={hospitalIntitialValues}
            validationSchema={validateHospitalValues}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
        );
      default:
        return null;
    }
  }, [entryType, onSubmit, onCancel]);

  return (
    <>
      <Form>
        <label>EntryType</label>
        {/* <SelectField name="entry-type" label="entry-type" options={options} /> */}

        <CustomSelect
          label="EntryType"
          id="EntryType"
          options={options}
          value={entryType}
          onChange={handleChange}
        />
      </Form>
    </>
  );
};

export default AddEntryForm;
