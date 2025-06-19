import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useNotificationStore } from "../store/useNotificationStore"; // 👈 Import notification store

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser, getConversations } = useChatStore();
  const { markAllAsRead, fetchNotifications } = useNotificationStore(); // 👈 Grab these functions

  useEffect(() => {
    getConversations();

    // 🔔 Also mark all notifications as read and fetch fresh list
    const markAndFetch = async () => {
      const success = await markAllAsRead();
      if (success) await fetchNotifications();
    };

    markAndFetch();
  }, [getConversations, markAllAsRead, fetchNotifications]);

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
