import { auth } from "../firebase.config";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithEmailLink,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";

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

// Function to send OTP to phone number
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

// Function to verify OTP for phone number
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

// Function to send OTP to email
export const sendOtpToEmail = async (email) => {
  const actionCodeSettings = {
    // URL to redirect to after email verification
    url: "http://localhost:5173/otp",
    handleCodeInApp: true,
  };

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", email);
  } catch (error) {
    console.error("Error during sendSignInLinkToEmail", error);
    throw error;
  }
};

// Function to verify OTP for email
export const verifyEmailOtp = async (email, emailLink) => {
  if (isSignInWithEmailLink(auth, emailLink)) {
    try {
      const result = await signInWithEmailLink(auth, email, emailLink);
      window.localStorage.removeItem("emailForSignIn");
      return result.user;
    } catch (error) {
      console.error("Error during signInWithEmailLink", error);
      throw error;
    }
  } else {
    throw new Error("Invalid email link");
  }
};
