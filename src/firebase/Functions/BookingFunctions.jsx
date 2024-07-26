// BookingFunctions.jsx
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";

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
    } else {
      console.log("No such facility!");
    }
  } catch (error) {
    console.error("Error adding booking or updating facility: ", error);
  }
};
