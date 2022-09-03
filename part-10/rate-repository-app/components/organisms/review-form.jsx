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
const ReviewForm = ({ onSubmit, initialValues, validateSchema }) => {
  return (
    <ScreenView>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validateSchema}
      >
        {({ handleSubmit }) => (
          <View style={styles.container}>
            <FormikTextInput
              name="repoOwnerName"
              placeholder="Repository owner name"
              style={{ marginTop: 10 }}
            />
            <FormikTextInput
              name="repoName"
              placeholder="Repository name"
              style={{ marginTop: 10 }}
            />
            <FormikTextInput
              name="rating"
              placeholder="Rating between 0 and 100"
              style={{ marginTop: 10 }}
            />
            <FormikTextInput
              name="review"
              placeholder="Review"
              style={{ marginTop: 10 }}
            />
            <Button
              onPress={handleSubmit}
              title="Create a review"
              style={{ marginTop: 10 }}
            />
          </View>
        )}
      </Formik>
    </ScreenView>
  );
};

export default ReviewForm;
