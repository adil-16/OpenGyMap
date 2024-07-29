import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { v4 as uuidv4 } from "uuid";
import { getUserDetails } from "./ApiFunctions";

export const addReview = async (reviewData) => {
  try {
    const { userId, bookingId, facilityId, rating, reviewText } = reviewData;
    const userDoc = await getUserDetails(userId);

    const reviewId = uuidv4();
    const timestamp = new Date().toISOString();
    const review = {
      reviewId,
      userId,
      userName: userDoc.fullName,
      userImageUrl: userDoc.profilePicture,
      userLocation: userDoc.address,
      facilityId,
      rating,
      reviewText,
      timestamp,
    };

    await setDoc(doc(db, "reviews", reviewId), review);
    console.log("Review added successfully!");

    const bookingRef = doc(db, "bookings", bookingId);
    await updateDoc(bookingRef, { isActive: false });
    console.log("Booking isActive updated successfully!");
  } catch (error) {
    console.error("Error adding review or updating booking: ", error);
    throw new Error("Failed to add review or update booking");
  }
};
