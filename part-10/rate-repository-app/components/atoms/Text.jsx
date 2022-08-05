import { Text as NativeText, StyleSheet } from "react-native";

import theme from "../../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.black,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  secondaryColor: {
    color: theme.colors.textSecondary,
  },
  primaryColor: {
    color: theme.colors.primary,
  },
  subheading: {
    fontSize: theme.fontSizes.subheading,
  },
  bold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color && styles[color],
    fontSize && styles[fontSize],
    fontWeight && styles[fontWeight],
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
