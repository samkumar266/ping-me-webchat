// frontend/src/components/NotificationListener.jsx
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAuthStore } from "../store/useAuthStore";
import { useNotificationStore } from "../store/useNotificationStore";

export const NotificationListener = () => {
  const authUser = useAuthStore((state) => state.authUser);
  const addNotification = useNotificationStore((state) => state.addNotification);

  useEffect(() => {
    if (!authUser?._id) return; // Don't connect if user not logged in

    const socket = io("http://localhost:5001", {
      query: { userId: authUser._id },
    });

    socket.on("newNotification", (notif) => {
      addNotification(notif);
    });

    return () => {
      socket.disconnect();
    };
  }, [authUser, addNotification]);

  return null; // This component doesn't render anything visible
};

