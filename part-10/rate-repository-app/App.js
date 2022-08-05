import { StyleSheet, View } from "react-native";
import RepositoryList from "./components/RepositoryList";
import AppBarTab from "./components/AppBarTab";
import theme from "./theme";

export default function App() {
  return (
    <View style={styles.container}>
      <AppBarTab />
      <View style={styles.container}>
        <RepositoryList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBg,
  },
});
