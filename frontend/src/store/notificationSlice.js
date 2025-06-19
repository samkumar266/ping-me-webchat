// notificationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/axios";

// Fetch all notifications
export const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  async () => {
    const res = await axios.get("/api/notifications");
    return res.data;
  }
);

// Mark one notification as read
export const markNotificationAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (id) => {
    const res = await axios.put(`/api/notifications/${id}/read`);
    return res.data;
  }
);

export const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const index = state.notifications.findIndex(n => n._id === action.payload._id);
        if (index !== -1) {
          state.notifications[index] = action.payload;
        }
      });
  },
});

