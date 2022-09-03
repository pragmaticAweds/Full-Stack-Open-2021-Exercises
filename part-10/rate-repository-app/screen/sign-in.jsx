import * as yup from "yup";

import useSignIn from "../hooks/useSignIn";
import Form from "../components/organisms/form";

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async ({ username, password }, { resetForm }) => {
    try {
      const { data } = await signIn({ username, password });
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
    <Form
      initialValues={{ username: "", password: "" }}
      validateSchema={validateSchema}
      onSubmit={onSubmit}
    />
  );
};

export default SignIn;
