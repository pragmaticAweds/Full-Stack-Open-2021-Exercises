import { Formik } from "formik";
import ScreenView from "../atoms/View";
import FormikTextInput from "../atoms/FormikTextInput";
import Button from "../atoms/Button";
import { StyleSheet, View } from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.primary,
  },
});
const Form = ({ onSubmit, initialValues, validateSchema }) => {
  return (
    <ScreenView>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validateSchema}
      >
        {({ handleSubmit }) => (
          <View style={styles.container}>
            <FormikTextInput name="username" placeholder="username" />
            <FormikTextInput
              name="password"
              placeholder="password"
              style={{ marginTop: 10 }}
            />
            <Button
              onPress={handleSubmit}
              title="Submit"
              style={{ marginTop: 10 }}
            />
          </View>
        )}
      </Formik>
    </ScreenView>
  );
};

export default Form;
