import { collection, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase/config";

export default (chatID) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chatID) return;
    onSnapshot(collection(db, "chats", chatID, "messages"), (snapshot) => {
      if (messages.length > 0) {
        const newMessage = snapshot.docs[snapshot.docs.length - 1];
        setMessages((messages) => [
          ...messages,
          { id: newMessage.id, ...newMessage.data() },
        ]);
      } else {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      }
      loading && setLoading(false);
    });
  }, [chatID]);
  return [messages, loading];
};
