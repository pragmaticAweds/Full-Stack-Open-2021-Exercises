import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Form from "../../components/organisms/form";
// ...

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn();
      const initialValues = {
        username: "",
        password: "",
      };
      const { getByPlaceholderText, getByText } = render(
        <Form onSubmit={onSubmit} initialValues={initialValues} />
      );
      fireEvent.changeText(getByPlaceholderText("username"), "kalle");
      fireEvent.changeText(getByPlaceholderText("password"), "password");
      fireEvent.press(getByText("Submit"));

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument

        expect(onSubmit).toHaveBeenCalledTimes(1);
        // onSubmit.mock.calls[0][0] contains the first argument of the first call
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
