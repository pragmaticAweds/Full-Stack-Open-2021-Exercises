import { StyleSheet, View } from "react-native";
import Text from "../atoms/Text";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  rating: {
    marginRight: 10,
    width: 45,
    height: 45,
    borderColor: theme.colors.primary2,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 45 / 2,
  },
  info: {
    flex: 1,
  },
});

export const ReviewItem = ({ review }) => {
  if (!review || review === undefined) {
    return null;
  }

  const { rating, text, createdAt, username } = review;

  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text style={{ color: theme.colors.primary2 }} fontSize="subheading">
          {rating}
        </Text>
      </View>
      <View style={styles.info}>
        <Text fontSize="subheading" fontWeight="bold">
          {username}
        </Text>
        <Text
          fontSize="subheading"
          style={{
            marginTop: 5,
            marginBottom: 5,
            color: theme.colors.textSecondary,
          }}
        >
          {new Date(createdAt).toLocaleDateString()}
        </Text>
        <Text fontSize="subheading">{text}</Text>
      </View>
    </View>
  );
};
