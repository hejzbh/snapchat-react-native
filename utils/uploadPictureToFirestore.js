import { storage } from "../firebase/config";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";

export default async (picture) => {
  const convertPictureToFile = await fetch(picture.uri);
  const blob = await convertPictureToFile.blob();

  const pictureRef = ref(storage, "images/" + `snap${blob._data.name}`);

  const uploading = await uploadBytes(pictureRef, blob);
  const pictureURL = await getDownloadURL(uploading.ref).then((URL) => URL);

  return {
    pictureURL,
  };
};
