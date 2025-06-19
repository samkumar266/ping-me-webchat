import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications, markNotificationAsRead } from "../store/notificationSlice";

export const NotificationDropdown = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleMarkAsRead = (id) => {
    dispatch(markNotificationAsRead(id));
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow z-50">
      <div className="p-3 font-bold border-b">Notifications</div>
      <ul className="max-h-60 overflow-y-auto">
        {notifications.map((notif) => (
          <li
            key={notif._id}
            className={`p-3 border-b ${notif.isRead ? "text-gray-500" : "text-black"}`}
          >
            {notif.content}
            {!notif.isRead && (
              <button
                className="ml-3 text-blue-500"
                onClick={() => handleMarkAsRead(notif._id)}
              >
                Mark as read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

