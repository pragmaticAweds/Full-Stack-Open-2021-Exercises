import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

import { useNavigate } from "react-router-native";

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const navigate = useNavigate();

  const signUp = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { user: { username, password } },
    });

    if (data) {
      navigate("/");
    }

    return { data };
  };

  return [signUp, result];
};

export default useSignUp;
