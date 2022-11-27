import getCameraPermissions from "./getCameraPermissions";
import getUserGalleryPermissions from "./getUserGalleryPermissions";
import getLocationPermissions from "./getLocationPermissions";

export default async () => {
  await getCameraPermissions();
  await getUserGalleryPermissions();
  await getLocationPermissions();
};
