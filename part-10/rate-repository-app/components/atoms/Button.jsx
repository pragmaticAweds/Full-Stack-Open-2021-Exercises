import { Pressable as NativePressable, StyleSheet } from "react-native";

import Text from "./Text";

import theme from "../../theme";

const styles = StyleSheet.create({
  btn: {
    backgroundColor: theme.colors.primary2,
    padding: 15,
  },
  text: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.subheading,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.bold,
    textAlign: "center",
  },
});

const Button = ({ title, onPress, style, ...props }) => {
  const textStyle = [styles.btn, style];
  return (
    <NativePressable onPress={onPress} style={textStyle} {...props}>
      <Text style={styles.text}>{title}</Text>
    </NativePressable>
  );
};

export default Button;
