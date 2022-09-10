import { Alert, StyleSheet, View } from "react-native";
import Text from "../atoms/Text";
import theme from "../../theme";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../../graphql/mutations";
import useDeleteReview from "../../hooks/useDelete";

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: theme.colors.primary,
    marginTop: 10,
  },

  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  btn: {
    marginTop: 9,
    flexDirection: "row",
  },
});

export const ReviewItem = ({ review, btn }) => {
  const [deleteReview] = useDeleteReview();
  if (!review || review === undefined) {
    return null;
  }

  const { rating, text, createdAt, username, repositoryId, id } = review;
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/repo/${repositoryId}`);
  };
  const handleDelete = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteReview(id) },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
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
      {btn && (
        <View style={styles.btn}>
          <Button
            title="View repository"
            style={{ flex: 1 }}
            onPress={handleNavigate}
          />
          <Button
            title="Delete Review"
            style={{ flex: 1, backgroundColor: "red", marginLeft: 16 }}
            onPress={handleDelete}
          />
        </View>
      )}
    </View>
  );
};
