import { Camera as ExpoCamera } from "expo-camera";

export default async () => {
  await ExpoCamera.getCameraPermissionsAsync();
  await ExpoCamera.getMicrophonePermissionsAsync();
};
