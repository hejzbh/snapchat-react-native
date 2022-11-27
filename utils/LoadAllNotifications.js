import { db } from "../firebase/config";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";
// NOTIFICATINOS
// Notifications
import * as Notifications from "expo-notifications";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default async (userID) => {
  // All notifications for user who is logged in
  onSnapshot(doc(db, "notifications", userID), (snapshot) => {
    if (!snapshot.exists()) return;

    const { notifications } = snapshot.data();

    new Promise((resolve) => {
      let deleted = 0;
      notifications.map(async (notification) => {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `You've got notificatins from ${
              notification.from.first_name || "snapchat"
            }`,
            body: notification.message,
            data: { data: "goes here" },
          },
          trigger: { seconds: 2 },
        });
        await updateDoc(doc(db, "notifications", userID), {
          notifications: arrayRemove(notification),
        });
        deleted += 1;
      });

      // When we load and delete all notifications resolve promise.
      if (deleted.length === notifications.length) resolve();
    });
  });
};
