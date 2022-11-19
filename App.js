import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
// Tailwind
import { TailwindProvider } from "tailwindcss-react-native";
// Redux
import { Provider } from "react-redux";
import { store } from "./redux/store";
// Redis

export default function App() {
  useEffect(() => {
    alert("wow");
  }, []);

  return (
    <Provider store={store}>
      <TailwindProvider>
        <View style={styles.container}>
          <Text>SAS</Text>
          <StatusBar style="auto" />
        </View>
      </TailwindProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
