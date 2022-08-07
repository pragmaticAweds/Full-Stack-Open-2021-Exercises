import { View, StyleSheet, ScrollView } from "react-native";
import { Link } from "react-router-native";

import Text from "../atoms/Text";
import Constants from "expo-constants";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    padding: 10,
    backgroundColor: theme.colors.bg,
  },
  spaceRight: {
    marginRight: 5,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/profile">
          <Text
            color="primaryColor"
            fontSize="subheading"
            fontWeight="bold"
            style={styles.spaceRight}
          >
            Repositories
          </Text>
        </Link>
        <Link to="/signIn">
          <Text
            color="primaryColor"
            fontSize="subheading"
            fontWeight="bold"
            style={styles.spaceRight}
          >
            Sign In
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
