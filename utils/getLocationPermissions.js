// LOCATION
import * as Location from "expo-location";

export default async () => {
  await Location.requestBackgroundPermissionsAsync();
  await Location.requestForegroundPermissionsAsync();
};
