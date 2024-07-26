import { db } from "../firebase.config";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const fetchPopularFacilities = async (
  setPopularFacilities,
  setLoading
) => {
  try {
    setLoading(true);
    const reviewsQuery = query(
      collection(db, "reviews"),
      where("rating", ">=", 4)
    );
    const reviewsSnapshot = await getDocs(reviewsQuery);
    const facilityIds = reviewsSnapshot.docs
      .map((doc) => doc.data().facilityId)
      .filter((id) => id);

    if (facilityIds.length === 0) {
      console.warn("No facility IDs found.");
      setPopularFacilities([]);
      return;
    }

    const facilitiesQuery = query(
      collection(db, "facilities"),
      where("facilityId", "in", facilityIds)
    );
    const facilitiesSnapshot = await getDocs(facilitiesQuery);

    const facilitiesList = facilitiesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPopularFacilities(facilitiesList);
  } catch (error) {
    console.error("Error fetching popular facilities:", error);
  } finally {
    setLoading(false);
  }
};

export const fetchFacilitiesFromFirestore = async (setData, setLoading) => {
  try {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "facilities"));
    const facilitiesList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const uid = localStorage.getItem("uid");
    const filteredFacilities = facilitiesList.filter(
      (facility) => facility.createdBy === uid
    );

    setData(filteredFacilities);
  } catch (error) {
    console.error("Error fetching facilities:", error);
  } finally {
    setLoading(false);
  }
};

/**
 * Fetch facilities from Firestore, excluding those created by the current user.
 * @param {Function} setFacilities
 * @param {Function} setLoading
 */
export const fetchFacilitiesForUser = async (setFacilities, setLoading) => {
  try {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "facilities"));
    const facilitiesList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const uid = localStorage.getItem("uid");
    const filteredFacilities = facilitiesList.filter(
      (facility) => facility.createdBy !== uid
    );

    setFacilities(filteredFacilities);
  } catch (error) {
    console.error("Error fetching facilities:", error);
  } finally {
    setLoading(false);
  }
};

export const updateFacilityInFirestore = async (
  facilityId,
  updatedFacilityData
) => {
  try {
    const facilityRef = doc(db, "facilities", facilityId);
    await setDoc(facilityRef, updatedFacilityData, { merge: true });
    console.log("Facility updated successfully!");
  } catch (error) {
    console.error("Error updating facility:", error);
  }
};

/**
 * @param {Object} facilityData
 * @returns {Promise<void>}
 */

export const addFacilityToFirestore = async (facilityData, facilityId) => {
  try {
    const facilityDocRef = doc(collection(db, "facilities"), facilityId);

    const updatedFacilityData = {
      ...facilityData,
      facilityId,
    };

    await setDoc(facilityDocRef, updatedFacilityData);

    console.log("Facility added successfully");
  } catch (error) {
    console.error("Error adding facility to Firestore:", error);
  }
};

/**
 * @param {string} facilityId
 * @returns {Promise<void>}
 */
export const deleteFacilityFromFirestore = async (facilityId) => {
  try {
    const facilityDocRef = doc(db, "facilities", facilityId);

    await deleteDoc(facilityDocRef);

    console.log("Facility deleted successfully");
  } catch (error) {
    console.error("Error deleting facility from Firestore:", error);
  }
};

/**
 * Fetch nearby facilities based on the user's location.
 * @param {Function} setFacilities
 * @param {Function} setLoading
 * @param {Object} userLocation
 * @param {number} radius
 */
export const fetchNearbyFacilities = async (
  setFacilities,
  setLoading,
  userLocation,
  radius
) => {
  try {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "facilities"));
    const facilitiesList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const filteredFacilities = facilitiesList.filter((facility) => {
      const facilityLocation = {
        lat: facility.latitude,
        lng: facility.longitude,
      };
      const distance = calculateDistance(userLocation, facilityLocation);
      return distance <= radius;
    });
    setFacilities(filteredFacilities);
  } catch (error) {
    console.error("Error fetching nearby facilities:", error);
  } finally {
    setLoading(false);
  }
};

const calculateDistance = (location1, location2) => {
  const rad = (x) => (x * Math.PI) / 180;

  const R = 6371;
  const dLat = rad(location2.lat - location1.lat);
  const dLng = rad(location2.lng - location1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(location1.lat)) *
      Math.cos(rad(location2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
};
