import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import FormikTextInput from "../components/atoms/FormikTextInput";
import Button from "../components/atoms/Button";
import ScreenView from "../components/atoms/View";

import theme from "../theme";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.primary,
  },
});

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = ({ username, password }, { resetForm }) => {
    console.log(username, password);

      try {
      const { data } = await signIn({ username, password });
      console.log({data});
    } catch (e) {
      console.log(e);
    }




    resetForm({ username: "", password: "" });
  };

  const validateSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, "username is too short")
      .max(10, "username is too long")
      .required("Username is required"),
    password: yup
      .string()
      .min(6, "password is too short")
      .required("Password is required"),
  });

  return (
    <ScreenView>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validateSchema}
      >
        {({ handleSubmit }) => (
          <View style={styles.container}>
            <FormikTextInput
              name="username"
              placeholder="Enter Your Username"
            />
            <FormikTextInput
              name="password"
              placeholder="Enter your password"
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

export default SignIn;
