import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { messaging } from "../firebase.config";
import { v4 as uuidv4 } from "uuid";

export const addBooking = async (bookingData) => {
  try {
    console.log("booking data", bookingData);
    await setDoc(doc(db, "bookings", bookingData.bookingId), bookingData);
    console.log("Booking added successfully!");
    const facilityRef = doc(db, "facilities", bookingData.facilityId);
    const facilityDoc = await getDoc(facilityRef);

    if (facilityDoc.exists()) {
      const facilityData = facilityDoc.data();
      const bookingDateTime = `${bookingData.bookingStartTime} to ${bookingData.bookingEndTime}`;

      const updatedBookingDateAndTime = [
        ...(facilityData.bookingDateAndTime || []),
        bookingDateTime,
      ];

      const updatedBookingList = [
        bookingData.bookingId,
        ...(facilityData.bookingList || []),
      ];

      await updateDoc(facilityRef, {
        bookingDateAndTime: updatedBookingDateAndTime,
        bookingList: updatedBookingList,
      });
      console.log("Facility updated successfully!");

      const notificationData = {
        userId: bookingData.createdBy,
        bookingId: bookingData.bookingId,
        bookingDate: bookingData.bookingDate,
        bookingStartTime: bookingData.bookingStartTime,
        bookingEndTime: bookingData.bookingEndTime,
        bookingStatus: "Confirmed",
        courtName: bookingData.bookingCourtName,
        notificationCount: 0,
        bookingRequestStatus: 0,
        notificationId: uuidv4(),
        notificationTime: new Date().toISOString(),
        requestedFrom: "",
        requestedTo: "",
        requestedUserImage: "",
        requestedUsername: "",
      };

      await setDoc(
        doc(db, "notifications", bookingData.bookingId),
        notificationData
      );
      console.log("Notification stored successfully!");
    } else {
      console.log("No such facility!");
    }
  } catch (error) {
    console.error("Error adding booking or updating facility: ", error);
  }
};

export const getUserBookings = async (uid) => {
  try {
    const bookingsRef = collection(db, "bookings");
    const q = query(bookingsRef, where("createdBy", "==", uid));
    const querySnapshot = await getDocs(q);
    const userBookings = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return userBookings;
  } catch (error) {
    console.error("Error fetching user bookings: ", error);
    throw new Error("Failed to fetch user bookings");
  }
};

export const getBookingDetails = async (bookingId) => {
  try {
    const bookingRef = doc(db, "bookings", bookingId);
    const bookingDoc = await getDoc(bookingRef);
    return bookingDoc.data();
  } catch (error) {
    console.error("Error fetching booking details: ", error);
    throw new Error("Failed to fetch booking details");
  }
};
