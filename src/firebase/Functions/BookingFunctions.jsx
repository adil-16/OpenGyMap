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
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

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

export const getExpiredUserBookings = async (uid) => {
  try {
    const bookingsRef = collection(db, "bookings");
    const q = query(bookingsRef, where("createdBy", "==", uid));
    const querySnapshot = await getDocs(q);
    const now = new Date().toISOString();
    const expiredBookings = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter(
        (booking) => booking.bookingEndTime < now && booking.isActive !== false
      );
    return expiredBookings;
  } catch (error) {
    console.error("Error fetching expired user bookings: ", error);
    throw new Error("Failed to fetch expired user bookings");
  }
};

export const findBookingByDateTime = async (
  selectedStartTime,
  selectedEndTime,
  bookingDateAndTime,
  bookingList
) => {
  try {
    if (
      !moment.isMoment(selectedStartTime) ||
      !moment.isMoment(selectedEndTime)
    ) {
      throw new Error("Invalid start or end time");
    }

    let foundIndex = -1;
    for (let i = 0; i < bookingDateAndTime.length; i++) {
      const { start, end } = parseBookingDateAndTime(bookingDateAndTime[i]);

      if (
        selectedStartTime.isSameOrAfter(start) &&
        selectedEndTime.isSameOrBefore(end)
      ) {
        foundIndex = i;
        break;
      }
    }

    if (foundIndex !== -1) {
      const bookingId = bookingList[foundIndex];

      const bookingRef = doc(db, "bookings", bookingId);
      const bookingDoc = await getDoc(bookingRef);

      if (bookingDoc.exists()) {
        const bookingData = bookingDoc.data();
        return { bookingId, createdBy: bookingData.createdBy };
      } else {
        console.log("Booking not found.");
        return null;
      }
    } else {
      console.log("No matching booking time found.");
      return null;
    }
  } catch (error) {
    console.error("Error finding booking by date and time: ", error);
    return null;
  }
};

const parseBookingDateAndTime = (dateTimeString) => {
  const [start, end] = dateTimeString.split(" to ");
  return {
    start: moment(start, "YYYY-MM-DDTHH:mm:ss"),
    end: moment(end, "YYYY-MM-DDTHH:mm:ss"),
  };
};
