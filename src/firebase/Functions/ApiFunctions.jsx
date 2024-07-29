import { auth } from "../firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";

/**
 * Update the user's FCM token
 * @param {string} uid
 * @param {string} fcmToken
 */
export const updateUserFcmToken = async (uid, fcmToken) => {
  try {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, { fcmToken });
    console.log("User FCM token updated successfully");
  } catch (error) {
    console.error("Error updating user FCM token:", error);
    throw error;
  }
};

/**
 * Update the user's full name
 * @param {string} uid
 * @param {string} fullName
 */
export const updateUserFullName = async (uid, fullName) => {
  try {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, { fullName });
    console.log("User full name updated successfully");
  } catch (error) {
    console.error("Error updating user full name:", error);
    throw error;
  }
};

/**
 * Update the user's profile picture
 * @param {string} uid
 * @param {string} profilePicture
 */
export const updateUserProfilePicture = async (uid, profilePicture) => {
  try {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, { profilePicture });
    console.log("User profile picture updated successfully");
  } catch (error) {
    console.error("Error updating user profile picture:", error);
    throw error;
  }
};

/**
 * Update the user's address, latitude, and longitude
 * @param {string} uid -
 * @param {string} address
 * @param {number} latitude
 * @param {number} longitude
 */
export const updateUserAddress = async (uid, address, latitude, longitude) => {
  try {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, { address, latitude, longitude });
    console.log("User address updated successfully");
  } catch (error) {
    console.error("Error updating user address:", error);
    throw error;
  }
};

/**
 * Fetch user details by UID
 * @param {string} uid
 * @returns {Promise<Object>}
 */
export const getUserDetails = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error("No such user!");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

/**
 * @param {string} email
 * @param {string} password
 * @param {string} username
 * @returns {Promise<UserCredential>}
 */

export const registerUserWithEmailAndPassword = async (
  email,
  password,
  username
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      fullName: username,
      uid: user.uid,
      createdAt: new Date().toISOString(),
      address: "",
      fcmToken: "",
      isActive: true,
      latitude: null,
      longitude: null,
      phoneNumber: "",
      profilePicture: "",
      totalRevenue: null,
      updatedAt: new Date().toISOString(),
    });

    return userCredential;
  } catch (error) {
    console.error("Error creating user with email and password:", error);
    throw error;
  }
};

export const updateUserPassword = async (oldPassword, newPassword) => {
  try {
    const user = auth.currentUser;
    console.log("user", user);
    if (!user) throw new Error("No user is currently signed in.");
    console.log("old", oldPassword);
    console.log("new", newPassword);

    const credential = EmailAuthProvider.credential(user.email, oldPassword);
    await reauthenticateWithCredential(user, credential);

    await updatePassword(user, newPassword);
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

/**
 * Sign in a user with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<UserCredential>}
 */
export const Login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    console.error("Error signing in with email and password:", error);
    throw error;
  }
};

// Function to setup Recaptcha
const setupRecaptcha = () => {
  const recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
    size: "invisible",
    callback: (response) => {},
    "expired-callback": () => {},
  });

  recaptchaVerifier.render().catch((error) => {
    console.error("Error rendering ReCAPTCHA:", error);
  });

  return recaptchaVerifier;
};

export const sendOtpToPhone = async (phoneNumber) => {
  setupRecaptcha();
  const appVerifier = window.recaptchaVerifier;

  try {
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      appVerifier
    );
    return confirmationResult.verificationId;
  } catch (error) {
    console.error("Error during signInWithPhoneNumber", error);
    throw error;
  }
};

export const verifyPhoneOtp = async (verificationId, otp) => {
  try {
    const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
    const result = await auth.signInWithCredential(credential);
    return result.user;
  } catch (error) {
    console.error("Error during signInWithCredential", error);
    throw error;
  }
};
