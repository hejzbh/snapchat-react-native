import { Alert } from "react-native";

export default async () =>
  new Promise((resolve, reject) => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => reject(),
        style: "cancel",
      },
      { text: "YES", onPress: () => resolve(true) },
    ]);
  });
