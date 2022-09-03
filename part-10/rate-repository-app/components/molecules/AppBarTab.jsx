import { View, StyleSheet, ScrollView } from "react-native";
import { Link, useLocation, useMatch, useParams } from "react-router-native";

import { useQuery } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import { ME } from "../../graphql/queries";
import Constants from "expo-constants";

import AuthStorage from "../../utils/authStorage";

import Text from "../atoms/Text";
import theme from "../../theme";
import Button from "../atoms/Button";

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
  const { data } = useQuery(ME);
  const apolloClient = useApolloClient();
  const match = useMatch("/repo/:id");
  const clearTokenFromStorage = new AuthStorage();
  const handleLogout = () => {
    clearTokenFromStorage.removeAccessToken();
    apolloClient.resetStore();
  };

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
        {data?.me !== null && match !== null && (
          <Link to={`/create-review/${match.params.id}`}>
            <Text
              color="primaryColor"
              fontSize="subheading"
              fontWeight="bold"
              style={styles.spaceRight}
            >
              Create Review
            </Text>
          </Link>
        )}
        {data?.me === null ? (
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
        ) : (
          <Button
            onPress={handleLogout}
            title="Sign Out"
            style={{ backgroundColor: "transparent", padding: 0 }}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
