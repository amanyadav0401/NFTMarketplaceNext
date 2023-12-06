"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  Input,
  Button, // Import Button from Next UI
} from "@nextui-org/react";
import { AiOutlineCloudUpload, AiOutlineClose } from "react-icons/ai";
import { useUserStore } from "@/utils/Zustand";
import { APIClient } from "@/utils/APIClient";
import toast from "react-hot-toast";
import { CountryDropdown } from "react-country-region-selector";

const EditDashboard = ({  
  onClose,
  showPhoneNumberField,
}: {
  onClose: () => void;
  showPhoneNumberField: boolean; }) => {
  const userStore = useUserStore();
  const [formState, setFormState] = useState({
    name: "",
    description: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const imageRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    // Fetch user data and update the form
    if (userStore.user) {
      const { name, desc } = userStore.user;
      setFormState({
        name: name || "",
        description: desc || "",
      });
      setSelectedCountry(userStore.user.country || "");
    }
  }, [userStore.user]);

  const handleImageUpload = () => {
    if (imageRef.current) {
      // setImages([]);
      imageRef.current.click();
    }
  };

  const handleImageRemove = () => {
    setImages([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = e.target.files as FileList;
      setImages(Array.from(fileList));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Handle country and region selection
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    // You can reset the region when a new country is selected
    setSelectedRegion("");
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      let location = null;
      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((image) => {
          formData.append("image", image);
        });

        // Upload the image and get the location
        const imageResponse: any = await APIClient.post("upload/image", {
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).json();

        if (imageResponse.success) {
          location = imageResponse.file.location;
          console.log("Image upload response:", imageResponse);
        } else {
          console.error("Image upload failed:", imageResponse);
        }
      }

      // Update user details
      const updatedName = formState.name || "";
      const updatedDescription = formState.description || "";

      const updateResponse: any = await APIClient.put("auth/update", {
        json: {
          name: updatedName,
          desc: updatedDescription,
          country: selectedCountry || userStore.user?.country,
          avatar: location || userStore.user?.avatar,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).json();

      console.log("auth/update response:", updateResponse);

      // Refresh user data in Zustand store
      await userStore.setUser(localStorage.getItem("token") || " ");
      onClose();
    } catch (err: any) {
      const error = await err.response?.json() || err;
      console.log(error, err)
      toast.error(error.message || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalContent>
      <ModalHeader>Edit Details</ModalHeader>
      <ModalBody>
        <div className="flex w-full justify-center">
          <div style={{
            backgroundImage: `url(${images.length > 0
              ? URL.createObjectURL(images[0])
              : userStore.user?.avatar
              })`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} className="h-[6rem] w-[6rem] rounded-full relative">
            <div className="absolute flex items-center justify-center bottom-0 right-0 h-full w-full bg-[rgba(0,0,0,0.3)] rounded-full ">
              <AiOutlineCloudUpload
                size={30}
                className="text-white hover:scale-105 transition-all duration-150 cursor-pointer"
                onClick={handleImageUpload}
              />
              <input
                ref={imageRef}
                type="file"
                accept={"image/*"}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
        <Input
          label="Name"
          name="name"
          labelPlacement="outside"
          placeholder="Enter your Name"
          value={formState.name}
          onChange={handleInputChange}
        />
        {showPhoneNumberField && (
          <Input
            label="Phone"
            name="phone"
            labelPlacement="outside"
            placeholder="Enter your Phone"
            // Add the appropriate value and onChange handlers here
          />
        )}
        <Textarea
          label="Description"
          name="description"
          labelPlacement="outside"
          placeholder="Enter your Desc"
          value={formState.description}
          onChange={handleInputChange}
        />
        <div className="mr-4">Country</div>
        <div className="flex items-center">
          <div className="border rounded-lg p-2">
            <label htmlFor="country" className="sr-only">
              Based in Country
            </label>
            <CountryDropdown
              id="country"
              name="country"
              value={selectedCountry}
              onChange={(val) => handleCountryChange(val)}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          className="py-1 px-4 rounded"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default EditDashboard;
