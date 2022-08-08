import { TextInput as NativeTextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    borderColor: "#aaaaaa",
    borderWidth: 1,
    padding: 20,
    fontSize: 18,
  },
  err: {
    borderColor: "#d73a4a",
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.container, style, error && styles.err];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
