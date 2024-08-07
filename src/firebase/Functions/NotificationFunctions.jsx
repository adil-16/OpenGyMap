import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { getBookingDetails } from "./BookingFunctions";
import { v4 as uuidv4 } from "uuid";

const formatTimeRange = (startTime, endTime) => {
  const start = startTime.slice(11, 16);
  const end = endTime.slice(11, 16);
  return `${start} to ${end}`;
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  if (isNaN(date)) {
    return "Invalid date";
  }
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
};

const getTimeDifference = (date) => {
  const now = new Date();
  const bookingDate = new Date(date);
  const diffInSeconds = Math.floor((now - bookingDate) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} s ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} days ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} month ago`;
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} years ago`;
};

export const getUserNotifications = async (uid) => {
  try {
    const notificationsRef = collection(db, "notifications");
    const q = query(notificationsRef, where("userId", "==", uid));
    const querySnapshot = await getDocs(q);

    const notifications = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const notificationData = doc.data();
        const booking = await getBookingDetails(notificationData.bookingId);
        const bookingDate = formatDate(booking.createdAt);
        const bookingStartTime = booking.bookingStartTime;
        const bookingEndTime = booking.bookingEndTime;
        return {
          id: doc.id,
          profileImage: booking.imagesList[0] || "",
          courtName: booking.bookingCourtName,
          timestamp: getTimeDifference(booking.createdAt),
          date: bookingDate,
          time: formatTimeRange(bookingStartTime, bookingEndTime),
          ...notificationData,
        };
      })
    );

    return notifications;
  } catch (error) {
    console.error("Error fetching user notifications: ", error);
    throw new Error("Failed to fetch user notifications");
  }
};

export const createNotificationForRequest = async (notificationData) => {
  try {
    const notificationId = uuidv4();
    const notificationTime = new Date().toISOString();
    const notificationRef = doc(
      collection(db, "notifications"),
      notificationId
    );
    const updatedNotificationData = {
      ...notificationData,
      bookingRequestStatus: 1,
      notificationId: notificationId,
      notificationTime: notificationTime,
    };

    await setDoc(notificationRef, updatedNotificationData);
    console.log("id noti", notificationId);
    console.log("Notification created successfully");
  } catch (error) {
    console.error("Error creating notification: ", error);
    throw new Error("Failed to create notification");
  }
};

export const getUserRequestedNotifications = async (uid) => {
  try {
    const notificationsRef = collection(db, "notifications");
    const q = query(notificationsRef, where("requestedTo", "==", uid));
    const querySnapshot = await getDocs(q);

    const notifications = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const notificationData = doc.data();
        const booking = await getBookingDetails(notificationData.bookingId);
        const bookingDate = formatDate(booking.createdAt);
        const bookingStartTime = booking.bookingStartTime;
        const bookingEndTime = booking.bookingEndTime;
        return {
          id: doc.id,
          profileImage: booking.imagesList[0] || "",
          courtName: booking.bookingCourtName,
          timestamp: getTimeDifference(notificationData.notificationTime),
          date: bookingDate,
          time: formatTimeRange(bookingStartTime, bookingEndTime),
          ...notificationData,
        };
      })
    );

    return notifications;
  } catch (error) {
    console.error("Error fetching user requested notifications: ", error);
    throw new Error("Failed to fetch user requested notifications");
  }
};
