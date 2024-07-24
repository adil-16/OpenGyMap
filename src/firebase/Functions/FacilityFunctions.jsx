import { db } from "../firebase.config";
import { collection, doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

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
