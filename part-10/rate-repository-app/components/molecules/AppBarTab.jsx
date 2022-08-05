import { View, StyleSheet, Pressable } from "react-native";
import Text from "../atoms/Text";
import Constants from "expo-constants";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    alignSelf: "stretch",
    backgroundColor: theme.colors.bg,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Text
          color="primaryColor"
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
