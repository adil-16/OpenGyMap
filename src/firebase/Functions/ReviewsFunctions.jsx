import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
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

export const getReviewsByFacilityId = async (facilityId) => {
  try {
    const reviewsCollection = collection(db, "reviews");

    const q = query(reviewsCollection, where("facilityId", "==", facilityId));

    const querySnapshot = await getDocs(q);
    const reviews = querySnapshot.docs.map((doc) => ({
      reviewId: doc.id,
      ...doc.data(),
    }));

    return reviews;
  } catch (error) {}
};
