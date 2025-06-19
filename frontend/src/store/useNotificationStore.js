import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useNotificationStore = create((set) => ({
  notifications: [],

  setNotifications: (notifs) => set({ notifications: notifs }),

  addNotification: (notif) =>
    set((state) => ({
      notifications: [notif, ...state.notifications],
    })),

  clearNotifications: () => set({ notifications: [] }),

  fetchNotifications: async () => {
    try {
      const res = await axiosInstance.get("/api/notifications");
      set({ notifications: res.data });
      return true;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return false;
    }
  },
}));