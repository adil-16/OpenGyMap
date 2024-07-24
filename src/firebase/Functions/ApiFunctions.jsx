import { auth } from "../firebase.config";
import {
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithEmailLink,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";

/**
 * Register a user with email and password
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<UserCredential>} - A promise that resolves with the user credential.
 */

export const registerUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    console.error("Error creating user with email and password:", error);
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
