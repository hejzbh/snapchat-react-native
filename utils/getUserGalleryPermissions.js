// Libary
import * as MediaLibary from "expo-media-library";

export default async () => {
  await MediaLibary.requestPermissionsAsync();
};
