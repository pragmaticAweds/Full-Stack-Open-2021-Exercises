import { Field } from "formik";
import { NumberField, TextField } from "../AddPatientModal/FormField";
import { EntryType } from "../types";

interface Props {
  entryType: EntryType;
}

const EntryTypeFormField = ({ entryType }: Props) => {
  switch (entryType) {
    case EntryType.HealthCheck:
      return (
        <Field
          label="Health Check Rating"
          name="health-check-rating"
          component={NumberField}
          min={0}
          max={3}
        />
      );
    case EntryType.Hospital:
      return (
        <div>
          <h4>Discharge</h4>
          <Field
            label="Date"
            placeholder="YYYY-MM-DD"
            name="discharge-date"
            component={TextField}
          />
          <Field
            label="Criteria"
            placeholder="Criteria"
            name="discharge-criteria"
            component={TextField}
          />
        </div>
      );
    case EntryType.OccupationalHealthcare:
      return (
        <div>
          <h4>Sick Leave</h4>
          <Field
            label="Start-Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave-startDate"
            component={TextField}
          />
          <Field
            label="End-Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave-endDate"
            component={TextField}
          />
        </div>
      );
    default:
      return null;
  }
};

export default EntryTypeFormField;
