import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  getAccessToken() {
   const accessToken = await AsyncStorage.getItem(
      `${this.namespace}:Token`)
      return accessToken ? JSON.parse(accessToken) : null
  }

  setAccessToken(accessToken) {
    console.log({accessToken})
      await AsyncStorage.setItem(
      `${this.namespace}:Token`,
      JSON.stringify(accessToken),
    );
  }

  removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(`${this.namespace}:Token`);
  }
}

export default AuthStorage;
