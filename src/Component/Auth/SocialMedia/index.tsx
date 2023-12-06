'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/utils/Zustand";
import InputField from "@/Component/Model/InputField";
import { APIClient } from "@/utils/APIClient";
import { IoArrowBackOutline } from "react-icons/io5";

function SocialMedia() {
  const router = useRouter();
  const { user } = useUserStore();

  const [socialMediaLinks, setSocialMediaLinks] = useState({
    facebook: "",
    linkedin: "",
    instagram: "",
    discord: "",
    twitter: "",
  });

  useEffect(() => {
    if (!user?._id) {
      router.push("/auth/register");
    } else {
      setSocialMediaLinks({
        facebook: user?.socials?.facebook || "",
        linkedin: user?.socials?.linkedin || "",
        instagram: user?.socials?.instagram || "",
        discord: user?.socials?.discord || "",
        twitter: user?.socials?.twitter || "",
      })
    }
  }, [user]);

  const handleLinkChange = (type: string, value: string) => {
    // Update the social media links state
    setSocialMediaLinks((prevLinks) => ({
      ...prevLinks,
      [type]: value,
    }));
  };

  const isNextButtonEnabled = () => {
    // Check if at least one social media link is entered
    return Object.values(socialMediaLinks).some((link) => link.trim() !== "");
  };

  const handleSubmit = async (type: string) => {
    if (type === "next") {
      // Check user's role and navigate accordingly
      if (isNextButtonEnabled()) {
        await APIClient.put('auth/update', {
          json: {
            socials: socialMediaLinks
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })

        if (user?.role === "buisness") {
          router.push("/dashboard/brand");
        } else if (user?.role === "agency") {
          router.push("/dashboard/agency");
        } else if (user?.role === "personal") {
          router.push("/");
        }
      } else {
        console.log("Please enter at least one social media link.");
      }

    } else if (type === "not-now") {
      if (user?.role === "buisness") {
        router.push("/dashboard/brand");
      } else if (user?.role === "agency") {
        router.push("/dashboard/agency");
      } else if (user?.role === "personal") {
        router.push("/");
      }
    }
  };

  return (
    <div className="bg-[#3F2D6D] min-h-screen flex justify-center items-center overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 md:max-w-8xl">
        <div className="md:hidden">
          <div className="text-white text-center mt-10 mb-10 font-bold text-4xl">
            NFT - World
          </div>
        </div>
        <div className="bg-gray-400 bg-opacity-40 flex justify-center rounded-xl flex-shrink-0 ml-2 mr-2">
          <img src="/Images/Saly-10.svg" alt="Saly" />
        </div>

        <div className="p-4">
        <div className='hidden gap-[1rem] mb-10 md:flex items-center'>
            <IoArrowBackOutline onClick={() => {
              router.push('/')
            }} className="text-white cursor-pointer text-2xl" />
            <div onClick={() => {
              router.push('/')
            }} className="cursor-pointer  text-white font-bold text-4xl">
              NFT - World
            </div>
          </div>
          <h1 className="text-white font-bold text-2xl mt-5 mb-4">
            {" "}
            Link your Social Media Accounts
          </h1>

          <InputField
            label="Facebook"
            type="text"
            placeholder="Enter URL here"
            value={socialMediaLinks.facebook}
            onChange={(value) => handleLinkChange("facebook", value)}
          />
          <InputField
            label="LinkedIn"
            type="text"
            placeholder="Enter URL here"
            value={socialMediaLinks.linkedin}
            onChange={(value) => handleLinkChange("linkedin", value)}
          />
          <InputField
            label="Instagram"
            type="text"
            placeholder="Enter URL here"
            value={socialMediaLinks.instagram}
            onChange={(value) => handleLinkChange("instagram", value)}
          />
          <InputField
            label="Discord"
            type="text"
            placeholder="Enter URL here"
            value={socialMediaLinks.discord}
            onChange={(value) => handleLinkChange("discord", value)}
          />
          <InputField
            label="Twitter"
            type="text"
            placeholder="Enter URL here"
            value={socialMediaLinks.twitter}
            onChange={(value) => handleLinkChange("twitter", value)}
          />

          <button
            className={`w-full mt-5 text-center bg-[#E377FF] hover:bg-[#E377FF] text-white font-medium text-sm  px-3 py-2 rounded ${isNextButtonEnabled() ? "" : "opacity-50 cursor-not-allowed"
              }`}
            onClick={() => handleSubmit("next")}
            disabled={!isNextButtonEnabled()}
          >
            Next {">"}
          </button>
          <button
            className="w-full mt-5 text-center bg-[#13AAFF] hover.bg-[#13AAFF] text-white font-medium text-sm  px-3 py-2 rounded"
            onClick={() => handleSubmit("not-now")}
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default SocialMedia
