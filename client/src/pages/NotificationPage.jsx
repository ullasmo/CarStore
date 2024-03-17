import { useEffect, useState } from "react";
import { message, Tabs } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const [seenNotifications, setSeenNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/user/get-all-notification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ userId: currentUser._id }),
        });
        const responseData = await response.json();

        if (responseData.success) {
          setNotifications(responseData.notifications.unread);
          setSeenNotifications(responseData.notifications.seen);
        } else {
          message.error(responseData.message);
        }
      } catch (error) {
        console.log(error);
        message.error("Something went wrong while fetching notifications");
      }
    };

    fetchNotifications();
  }, [currentUser]);

  const handleMarkAllRead = async () => {
    try {
      const response = await fetch("/api/user/mark-all-notification-as-read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ userId: currentUser._id }),
      });
      const responseData = await response.json();

      if (responseData.success) {
        message.success("All notifications marked as read");
        // Update local state after marking all notifications as read
        setNotifications([]);
        setSeenNotifications([...seenNotifications, ...notifications]);
      } else {
        message.error(responseData.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong while marking notifications as read");
    }
  };

  const handleDeleteAllRead = async () => {
    try {
      const response = await fetch("/api/user/delete-all-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ userId: currentUser._id }),
      });
      const responseData = await response.json();

      if (responseData.success) {
        message.success(responseData.message);
        // Update local state after deleting all read notifications
        setSeenNotifications([]);
      } else {
        message.error(responseData.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const renderNotificationCards = (notifications) => {
    return notifications.map((notificationMsg) => (
      <div
        className="bg-white shadow-md rounded-md p-4 mb-4 cursor-pointer"
        key={notificationMsg.id}
        onClick={() => navigate(notificationMsg.onClickPath)}
      >
        <div className="text-lg font-semibold mb-2">
          {notificationMsg.message}
        </div>
      </div>
    ));
  };

  return (
    <main className=" max-w-6xl mx-auto p-8">
      <h4 className="p-3 text-center font-bold text-lg">Notifications</h4>
      <Tabs>
        <Tabs.TabPane tab="UnRead" key={0}>
          <div className="flex justify-end">
            <h4
              className="p-2 text-green-400"
              onClick={handleMarkAllRead}
              style={{ cursor: "pointer" }}
            >
              Mark All Read
            </h4>
          </div>
          {renderNotificationCards(notifications)}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="flex justify-end">
            <h4
              className="p-2 text-red-500"
              onClick={handleDeleteAllRead}
              style={{ cursor: "pointer" }}
            >
              Delete All Read
            </h4>
          </div>
          {renderNotificationCards(seenNotifications)}
        </Tabs.TabPane>
      </Tabs>
    </main>
  );
};

export default NotificationPage;
