// PersonalInformation.jsx
import React, { useState } from "react";
import LabelInput from "../components/LabelInput";

const PersonalInformation = () => {
  const [editingId, setEditingId] = useState(null);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelUpdate = () => {
    setIsUpdatingPassword(false);
    setEditingId(null);
  };

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
                initialValue="Shayan"
                buttonText="Edit"
                editingId={editingId}
                setEditingId={setEditingId}
                saveButtonText="Save"
                type="text"
                inputId="name"
              />
            </div>
            <div className="py-3">
              <LabelInput
                label="Email"
                initialValue="Shayan@gmail.com"
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
                  initialValue="123456"
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
                    initialValue=""
                    type="password"
                    buttonText=""
                    // editingId={editingId}
                    setEditingId={setEditingId}
                    saveButtonText=""
                    readOnly
                    inputId="oldPassword"
                  />
                  <LabelInput
                    label="New Password"
                    initialValue=""
                    buttonText=""
                    type="password"
                    saveButtonText=""
                    inputId="newPassword"
                  />
                  <LabelInput
                    label="Confirm Password"
                    initialValue=""
                    buttonText=""
                    saveButtonText=""
                    inputId="confirmPassword"
                  />
                  <div className="py-3 space-x-2">
                    <button
                      onClick={handleCancelUpdate}
                      className="bg-white border border-custom-black text-xs w-24 text-black p-3 text-center rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setIsUpdatingPassword(false);
                        setEditingId(null);
                      }}
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
