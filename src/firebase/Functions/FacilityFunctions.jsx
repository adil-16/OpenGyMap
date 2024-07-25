import { db } from "../firebase.config";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

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
 * @param {Object} facilityData
 * @returns {Promise<void>}
 */

export const addFacilityToFirestore = async (facilityData) => {
  try {
    const facilityId = uuidv4();
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
