import { View, Image, BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
// Utils
import makeSureToGoBack from "../utils/makeSureToGoBack";
import { useEffect } from "react";
// REDUX
import { removePicture, useCameraPicture } from "../redux/slices/cameraPicture";
import { useDispatch } from "react-redux";
// Components
import PreviewImageOptions from "../components/preview/PreviewImageOptions";
import Button from "../components/Button";
// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
export const PreviewPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { picture } = useCameraPicture();

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", async () => {
      const sure = await makeSureToGoBack();
      sure
        ? (() => {
            navigation.goBack();
            dispatch(removePicture());
          })()
        : "";
    });

    return () => BackHandler.removeEventListener("hardwareBackPress");
  }, []);

  return (
    <View>
      {/** Image we took */}
      <Image
        style={{ width: "100%", height: "100%" }}
        source={{ uri: picture?.uri }}
      />
      {/** Options such as save to gallery */}
      <PreviewImageOptions image={picture?.uri} />
      {/** Navigation button to navigating us to page where we can select users we want snap sent to */}
      <Button
        extraClass="bg-[yellow] p-2 px-6 absolute bottom-5 right-5"
        textColor="text-black"
        reverse
        Icon={
          <MaterialCommunityIcons
            style={{ marginLeft: 4 }}
            name="arrow-right-thick"
            size={18}
            color="black"
          />
        }
        title="Send to"
      />
    </View>
  );
};

export default PreviewPage;
