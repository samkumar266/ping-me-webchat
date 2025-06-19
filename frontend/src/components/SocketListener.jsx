// frontend/src/components/SocketListener.jsx
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useNotificationStore } from "../store/useNotificationStore";

export const SocketListener = () => {
  const authUser = useAuthStore((state) => state.authUser);
  const addMessage = useChatStore((state) => state.addMessage);
  const addNotification = useNotificationStore((state) => state.addNotification);

  useEffect(() => {
    if (!authUser?._id) return;

    const socket = io("http://localhost:5001", {
      query: { userId: authUser._id },
    });

    socket.on("newMessage", (message) => {
      addMessage(message);
    });

    socket.on("newNotification", (notification) => {
      addNotification(notification);
    });

    return () => {
      socket.disconnect();
    };
  }, [authUser, addMessage, addNotification]);

  return null;
};
