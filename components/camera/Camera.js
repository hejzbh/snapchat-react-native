import { View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
// Camera
import { Camera as ExpoCamera } from "expo-camera";
// Components
import Button from "../Button";
import CameraToolbar from "./CameraToolbar";
// utils
import getCameraPermissions from "../../utils/getCameraPermissions";
// Icons
import { Feather } from "@expo/vector-icons";
// Redux
import { setPicture } from "../../redux/slices/cameraPicture";
import { useDispatch } from "react-redux";

const Camera = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const [status, requestPermission] = ExpoCamera.useCameraPermissions();
  const [cameraType, setCameraType] = useState("back");
  const [flashMode, setFlashMode] = useState("off");
  const [autoFocus, setAutoFocus] = useState(false);
  const cameraRef = useRef();

  useEffect(() => {
    if (!status?.granted) {
      getCameraPermissions();
    }
  }, [status]);

  const takePicture = async () => {
    // Options for image we will take
    const imageOptions = {
      quality: 1,
      base: 64,
      exif: false,
    };

    // Image we took
    const picture = await cameraRef.current.takePictureAsync(imageOptions);

    // Store image to redux
    dispatch(setPicture(picture));

    // Navigate user to the snap preview page
    navigate("Preview", { picutre: picture });
  };

  if (!status?.granted)
    return (
      <View>
        <Button
          title="Accept your camera permissions"
          onPress={() =>
            requestPermission((perms) => ({ ...perms, granted: true }))
          }
        />
      </View>
    );

  return (
    <ExpoCamera
      ref={cameraRef}
      type={cameraType}
      autoFocus={autoFocus}
      flashMode={flashMode}
      className="relative"
      ratio="16:9"
      style={{
        height: "92%",
        zIndex: 10,
      }}
    >
      {/** Button for taking a picture */}
      <Button
        Icon={<Feather name="circle" size={90} color="white" />}
        onPress={takePicture}
        extraClass="absolute bottom-10 left-[40%] p-0 bg-transparent"
      />

      {/** Tools/options for camera */}
      <CameraToolbar
        flashMode={flashMode}
        autoFocus={autoFocus}
        setCameraType={setCameraType}
        setFlashMode={setFlashMode}
        setAutoFocus={setAutoFocus}
      />
    </ExpoCamera>
  );
};

export default Camera;
