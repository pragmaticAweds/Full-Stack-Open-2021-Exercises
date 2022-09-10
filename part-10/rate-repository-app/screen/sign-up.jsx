import * as yup from "yup";
import SignupForm from "../components/organisms/sign-up-form";
import useSignUp from "../hooks/useSignUp";

const SignUp = () => {
  const [signUp] = useSignUp();
  const onSubmit = async (
    { username, password, confirmPassword },
    { resetForm }
  ) => {
    try {
      const { data } = await signUp({ username, password });
    } catch (e) {
      console.log(e);
    }
    resetForm({ username: "", password: "", confirmPassword: "" });
  };

  const validateSchema = yup.object().shape({
    username: yup
      .string()
      .min(1, "Username is too short")
      .max(30, "Username is too long")
      .required("Username is required"),
    password: yup
      .string()
      .min(5, "Password is too short")
      .max(50, "Password is too long")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  });

  return (
    <SignupForm
      initialValues={{ username: "", password: "", confirmPassword: "" }}
      validateSchema={validateSchema}
      onSubmit={onSubmit}
    />
  );
};

export default SignUp;
