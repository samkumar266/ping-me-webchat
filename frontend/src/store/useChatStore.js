import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  conversations: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getConversations: async () => {
    try {
      const res = await axiosInstance.get("/conversations");
      set({ conversations: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load conversations");
    }
  },

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  // --- Socket subscription ---

  socketListenerAdded: false, // flag to prevent multiple listeners

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    if (get().socketListenerAdded) return; // already listening

    socket.on("newMessage", (newMessage) => {
      const selectedUser = get().selectedUser;
      if (!selectedUser) return;

      // Only add if message is relevant to selected chat
      const isRelevant =
        newMessage.senderId === selectedUser._id ||
        newMessage.receiverId === selectedUser._id;

      if (!isRelevant) return;

      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    });

    set({ socketListenerAdded: true });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage");
    set({ socketListenerAdded: false });
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser, messages: [] });

    // Important: Unsubscribe then subscribe (to avoid duplicates)
    const { unsubscribeFromMessages, subscribeToMessages } = get();
    unsubscribeFromMessages();
    subscribeToMessages();

    if (selectedUser?._id) {
      get().getMessages(selectedUser._id);
    }
  },
}));
