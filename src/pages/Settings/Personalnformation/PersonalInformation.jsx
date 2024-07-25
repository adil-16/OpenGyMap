import React, { useContext, useState, useEffect } from "react";
import LabelInput from "../components/LabelInput";
import {
  getUserDetails,
  updateUserPassword,
  updateUserFullName,
  updateUserProfilePicture,
} from "../../../firebase/Functions/ApiFunctions";
import CryptoJS from "crypto-js";

const PersonalInformation = () => {
  const [userDetails, setUserDetails] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    if (uid) {
      getUserDetails(uid)
        .then((details) => {
          setUserDetails(details);
          if (details.profilePicture) {
            setImage(details.profilePicture);
          }
        })
        .catch((error) => console.error("Error fetching user details:", error))
        .finally(() => setLoading(false));
    }
  }, [uid]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setImage(imageDataUrl);
        updateUserProfilePicture(uid, imageDataUrl)
          .then(() => {
            console.log("Profile picture updated successfully");
          })
          .catch((error) => {
            console.error("Error updating profile picture:", error);
          });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelUpdate = () => {
    setIsUpdatingPassword(false);
    setEditingId(null);
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleUpdatePassword = async () => {
    console.log("Old Password:", decryptedPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
    try {
      if (!decryptedPassword || !newPassword || !confirmPassword) {
        console.log("Please fill in all password fields.");
        return;
      }

      if (newPassword !== confirmPassword) {
        console.log("New password and confirm password do not match.");
        return;
      }

      await updateUserPassword(decryptedPassword, newPassword);
      console.log("Password Changed Successfully!");
      const encryptedNewPassword = CryptoJS.AES.encrypt(
        newPassword,
        "your-encryption-key"
      ).toString();
      localStorage.setItem("encryptedPassword", encryptedNewPassword);
      handleCancelUpdate();
    } catch (error) {
      console.log(`Error changing password: ${error.message}`);
    }
  };

  const handleUpdateFullName = async (fullName) => {
    try {
      await updateUserFullName(uid, fullName);
      setUserDetails((prevDetails) => ({ ...prevDetails, fullName }));
      console.log("Full name updated successfully");
    } catch (error) {
      console.log(`Error updating full name: ${error.message}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const encryptedPassword = localStorage.getItem("encryptedPassword");
  const decryptedPassword = encryptedPassword
    ? CryptoJS.AES.decrypt(encryptedPassword, "your-encryption-key").toString(
        CryptoJS.enc.Utf8
      )
    : "";

  return (
    <>
      <div className="font-semibold font-inter text-xl text-custom-black">
        Personal Information
      </div>
      <div className="border-b border-nav-gray py-3 w-full"></div>
      <div className="lg:flex lg:flex-row sm:flex-col  ">
        <div className="flex-1">
          <div className="py-4">
            <div>
              <LabelInput
                label="Name"
                value={userDetails?.fullName || ""}
                handleChange={(e) =>
                  setUserDetails({ ...userDetails, fullName: e.target.value })
                }
                buttonText="Edit"
                editingId={editingId}
                setEditingId={setEditingId}
                saveButtonText="Save"
                type="text"
                inputId="name"
                onSave={handleUpdateFullName}
              />
            </div>
            <div className="py-3">
              <LabelInput
                label="Email"
                value={userDetails?.email || ""}
                handleChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
                buttonText="Edit"
                editingId={editingId}
                setEditingId={setEditingId}
                saveButtonText="Get Code"
                type="text"
                inputId="email"
              />
            </div>
            <div className="py-3">
              {!isUpdatingPassword ? (
                <LabelInput
                  label="Password"
                  value={decryptedPassword}
                  buttonText="Update"
                  editingId={editingId}
                  setEditingId={(editing) => {
                    setEditingId(editing);
                    setIsUpdatingPassword(editing);
                  }}
                  type="password"
                  inputId="password"
                />
              ) : (
                <>
                  <LabelInput
                    label="Old Password"
                    value={decryptedPassword}
                    type="password"
                    buttonText=""
                    editingId={editingId}
                    setEditingId={setEditingId}
                    saveButtonText=""
                    inputId="oldPassword"
                  />
                  <LabelInput
                    label="New Password"
                    initialValue=""
                    buttonText=""
                    type="password"
                    saveButtonText=""
                    inputId="newPassword"
                    value={newPassword}
                    handleChange={(e) => setNewPassword(e.target.value)}
                  />
                  <LabelInput
                    label="Confirm Password"
                    initialValue=""
                    buttonText=""
                    saveButtonText=""
                    type="password"
                    inputId="confirmPassword"
                    value={confirmPassword}
                    handleChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <div className="py-3 space-x-2">
                    <button
                      onClick={handleCancelUpdate}
                      className="bg-white border border-custom-black text-xs w-24 text-black p-3 text-center rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdatePassword}
                      className="bg-custom-gradient text-xs w-24 text-white p-3 text-center rounded-lg"
                    >
                      Update
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 p-5">
          <p className="pr-4 text-lg font-medium font-inter">Profile Picture</p>
          <div className="flex flex-col">
            <div className="w-[150px] h-[150px] mt-3 ml-4 rounded-full flex justify-center items-center overflow-hidden bg-black">
              {image ? (
                <img
                  src={image}
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-white text-5xl font-inter">JS</p>
              )}
            </div>
            <label
              htmlFor="imageUpload"
              className="cursor-pointer -mt-8 w-20 text-center ml-12 text-white font-inter bg-Upload-bg p-2 rounded-lg"
            >
              Upload
            </label>
          </div>
        </div>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
    </>
  );
};

export default PersonalInformation;
