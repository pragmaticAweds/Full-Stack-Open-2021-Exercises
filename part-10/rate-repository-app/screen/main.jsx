import { Route, Routes, Navigate } from "react-router-native";
import ScreenView from "../components/atoms/View";

import theme from "../theme";

import AppBarTab from "../components/molecules/AppBarTab";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";

export default function Main() {
  return (
    <ScreenView style={styles.container}>
      <AppBarTab />
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ScreenView>
  );
}

const styles = {
  container: {
    backgroundColor: theme.colors.mainBg,
  },
};
