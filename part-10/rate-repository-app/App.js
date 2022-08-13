import { NativeRouter } from "react-router-native";
import { StatusBar } from "expo-status-bar";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "./utils/apolloClient";
import AuthStorage from "./utils/authStorage";

import Main from "./screen/main";

const authStorage = new AuthStorage();
const apolloClient = createApolloClient();

export default function App() {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
}
