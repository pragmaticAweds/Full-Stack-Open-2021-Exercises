import { Route, Routes, Navigate } from "react-router-native";
import ScreenView from "../components/atoms/View";

import theme from "../theme";

import AppBarTab from "../components/molecules/AppBarTab";
import RepositoryList from "./repository-list";
import SignIn from "./sign-in";
import { SingleRepo } from "./single-repo";
import CreateReview from "./create-review";
import SignUp from "./sign-up";

export default function Main() {
  return (
    <ScreenView style={styles.container}>
      <AppBarTab />
      <Routes>
        <Route path="/create-review/:id" element={<CreateReview />} />
        <Route path="/repo/:id" element={<SingleRepo />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
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
