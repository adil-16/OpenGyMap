import React, { useState } from "react";
import LabelInput from "../components/LabelInput";

const PersonalInformation = () => {
  const [isAnyEditing, setIsAnyEditing] = useState(false);
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

  return (
    <>
      <div className="font-semibold font-inter text-xl text-custom-black">
        Personal Information
      </div>
      <div className="border-b border-nav-gray py-1 w-full"></div>

      <div className="flex">
        <div className="flex-1">
          <div className="py-4">
            <div>
              <LabelInput
                label="Name"
                initialValue="Shayan"
                buttonText="Edit"
                isAnyEditing={isAnyEditing}
                setEditing={setIsAnyEditing}
              />
            </div>

            <div className="py-3">
              <LabelInput
                label="Email"
                initialValue="Shayan@gmail.com"
                buttonText="Edit"
                isAnyEditing={isAnyEditing}
                setEditing={setIsAnyEditing}
              />
            </div>

            <div className="py-3">
              <LabelInput
                label="Password"
                initialValue="***********"
                buttonText="Update"
                isAnyEditing={isAnyEditing}
                setEditing={setIsAnyEditing}
              />
            </div>
          </div>
        </div>

        <div className="flex-1   p-5  ">
          <p className="pr-4 text-lg font-medium font-inter">Profile Picture</p>

          <div className="relative w-[150px] h-[150px] mt-3 ml-4 rounded-full flex justify-center items-center overflow-hidden bg-black">
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
            className=" absolute bottom-32 ml-5 translate-x-1/2 translate-y-1/2 cursor-pointer  z-20  text-white font-inter bg-Upload-bg p-2 rounded-lg"
          >
            Upload
          </label>
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


