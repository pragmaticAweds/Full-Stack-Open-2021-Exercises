import { NativeRouter } from "react-router-native";
import { StatusBar } from "expo-status-bar";
import Main from "./screen/main";

export default function App() {
  return (
    <>
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
}
