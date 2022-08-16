import { useMutation } from "@apollo/client";
import { AUTHENTICATE_USER } from "../graphql/mutations";
import AuthStorage from "../utils/authStorage";

import { useNavigate } from "react-router-native";
import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE_USER);

  const apolloClient = useApolloClient();
  const authStorage = new AuthStorage();
  const navigate = useNavigate();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    });

    if (data) {
      navigate("/");
    }

    authStorage.setAccessToken(data);
    apolloClient.resetStore();

    return { data };
  };

  return [signIn, result];
};

export default useSignIn;
