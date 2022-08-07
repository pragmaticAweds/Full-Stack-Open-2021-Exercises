import { View as NativeView, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1 },
});

const ScreenView = ({ style, ...props }) => {
  const viewStyle = [styles.container, style];

  return <NativeView style={viewStyle} {...props} />;
};

export default ScreenView;
