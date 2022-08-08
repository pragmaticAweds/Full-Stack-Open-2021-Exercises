import { Platform } from "react-native";

const theme = {
  colors: {
    bg: "#24292e",
    textSecondary: "#586069",
    primary2: "#0366d6",
    black: "#000",
    primary: "#fff",
    mainBg: "#e3e5e6",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
