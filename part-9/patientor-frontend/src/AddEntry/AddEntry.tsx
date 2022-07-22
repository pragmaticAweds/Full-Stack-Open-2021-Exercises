import { NewEntryWithoutId } from "../types";
import EntryField from "./FormField";

import * as yup from "yup";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

interface EntryFormProps {
  onSubmit: (values: NewEntryWithoutId) => void;
  onCancel: () => void;
  validationSchema: yup.ObjectSchema<any>;
  initialValues: NewEntryWithoutId;
}

const AddPatientEntryForm = ({
  onSubmit,
  onCancel,
  initialValues,
  validationSchema,
}: EntryFormProps) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <EntryField entryType={values.type} />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddPatientEntryForm;
