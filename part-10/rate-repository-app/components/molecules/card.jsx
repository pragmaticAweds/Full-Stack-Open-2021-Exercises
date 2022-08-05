import { StyleSheet, View, Image } from "react-native";
import Text from "../atoms/Text";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.primary,
  },
  head: {
    flexDirection: "row",
    flexGrow: 1,
  },
  avatarContainer: {
    flexGrow: 0,
    paddingRight: 15,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  info: {
    flexGrow: 0,
    maxWidth: 300,
  },
  rating: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  ratingWrapper: {
    alignItems: "center",
  },
  ratingValue: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    marginBottom: 5,
  },
});

const RepositoryItem = ({
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
  ownerAvatarUrl,
}) => (
  <View style={styles.container}>
    <View style={styles.head}>
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: ownerAvatarUrl,
          }}
          style={styles.avatar}
        />
      </View>
      <View style={styles.info}>
        <Text
          fontSize="subheading"
          fontWeight="bold"
          style={{ marginBottom: 10 }}
        >
          {fullName}
        </Text>
        <Text fontSize="subheading" style={{ marginBottom: 10 }}>
          {description}
        </Text>

        <Text
          fontSize="subheading"
          style={{
            backgroundColor: theme.colors.primary2,
            color: theme.colors.primary,
            alignSelf: "flex-start",
            padding: 5,
            marginBottom: 10,
          }}
        >
          {language}
        </Text>
      </View>
    </View>

    <View style={styles.rating}>
      <View style={styles.ratingWrapper}>
        <Text style={styles.ratingValue}>
          {(stargazersCount / 1000).toFixed(1)}k
        </Text>
        <Text>Stars</Text>
      </View>
      <View style={styles.ratingWrapper}>
        <Text style={styles.ratingValue}>
          {(forksCount / 1000).toFixed(1)}k
        </Text>
        <Text>Forks</Text>
      </View>
      <View style={styles.ratingWrapper}>
        <Text style={styles.ratingValue}>{reviewCount}</Text>
        <Text>Reviews</Text>
      </View>
      <View style={styles.ratingWrapper}>
        <Text style={styles.ratingValue}>{ratingAverage}</Text>
        <Text>Rating</Text>
      </View>
    </View>
  </View>
);

export default RepositoryItem;
