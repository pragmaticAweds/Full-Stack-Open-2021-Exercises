import { useMutation } from "@apollo/client";

const useSignIn = () => {
  const [mutate, result] = useMutation();

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
  };

  return [signIn, result];
};

export default useSignIn;
