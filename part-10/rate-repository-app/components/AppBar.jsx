import { View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    alignSelf: "stretch",
    backgroundColor: theme.colors.textPrimary,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Text
          color="primary"
          fontSize="subheading"
          fontWeight="bold"
          style={{ paddingBottom: 20 }}
        >
          Repositories
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
