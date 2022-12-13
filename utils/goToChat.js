import { db } from "../firebase/config";
import { getDoc, doc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import getChat from "./getChat";
import createChat from "./createChat";
export default async (stranger, loggedUser, navigate) => {
  let id =
    loggedUser.uid > stranger.id
      ? loggedUser.uid + stranger.id
      : stranger.id + loggedUser.uid;

  await getChat(id).then(async (chat) => {
    if (chat.exists()) {
      navigate("Chat", { chat: chat.data() });
    } else {
      const newChat = await createChat(stranger, loggedUser).then(
        (chat) => chat
      );
      navigate("Chat", { chat: newChat });
    }
  });
};
