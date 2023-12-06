"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import CardComponent from "../../Model/CardModel";
import SelectInput from "../../Model/SelectInput";
import Nav from "@/Component/Navbar/Nav";
import Footer from "@/Component/Footer";
import { useUserStore } from "@/utils/Zustand";
import moment from "moment";

function PremiumUserStoreFrontDetail() {
  const { user } = useUserStore();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Function to toggle showFullDescription
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleBackButtonClick = () => {
    router.back();
  };

  const companyData = [
    {
      description:
        user?.desc ||
        "Forte is building economic technology for games that is secure, easy to use, and fully compliant. It's an end-to-end blockchain platform that enables the emergence of community economics, a system where the interests of game developers and players are aligned, leading to healthier, sustainable game communities.",
      basedIn: user?.country || "United States",
      contact: user?.email || "contactus@forteLabs.com",
    },
    // Add more company data here...
  ];

  const dealsData = [
    {
      image: "/Images/offer.svg",
      title: "Offer 20% on NFT Today",
      couponCode: "Coupon Code GP0Z HKDGN",
    },
    {
      image: "/Images/offer.svg",
      title: "Offer 20% on NFT Today",
      couponCode: "Coupon Code GP0Z HKDGN",
    },
    {
      image: "/Images/offer.svg",
      title: "Offer 20% on NFT Today",
      couponCode: "Coupon Code GP0Z HKDGN",
    },
    {
      image: "/Images/offer.svg",
      title: "Offer 20% on NFT Today",
      couponCode: "Coupon Code GP0Z HKDGN",
    },
    // Add more deal data entries as needed
  ];

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const handleSelectChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
  };

  const handleStoreFront = () => {
    router.push("/storefrontdetail/premiumuserstorefrontdetail");
  };
  const joinedDate = moment(user?.createdAt, 'YYYY/MM/DD').format('YYYY/MM/DD');
  return (
    <div>
      <Nav />
      <div className="bg-[url('/Images/premiumuser.svg')] w-full bg-cover mt-[100px] h-[400px]">
        <div className="md:p-8 p-5 md:ml-20  flex gap-10 items-center">
          <div>
            <img
              src={user?.avatar}
              className="md:h-[150px] md:w-[150px] w-[100px] h-[100px] border-black rounded-full"
            />
          </div>
          <div>
            <p className="text-white mt-5 font-Avenir tracking-wide text-3xl">
              {user?.name}
            </p>
            <p className="text-[#E377FF] mt-5 font-Avenir tracking-wide text-1xl">
              Premium User
            </p>
            <p className="text-white mt-5 font-Avenir tracking-wide text-1xl">
              Storefront
            </p>
            <p className="text-white mt-3 font-Avenir tracking-wide text-1xl">
              Joined {joinedDate}
            </p>
            <div className="flex gap-3 mt-5 w-8 h-8 text-white cursor-pointer">
              <img src="/Images/facebook.svg" alt="facebook" />
              <img src="/Images/linkedin.svg" alt="linkedin" />
              <img src="/Images/discord.svg" alt="discord" />
              <img src="/Images/twitter.svg" alt="twitter" />
              <img src="/Images/instagram.svg" alt="instagram" />
            </div>
            <div className="mt-5">
              <button
                className="w-10 h-10 flex-shrink-0 text-white cursor-pointer"
                onClick={handleBackButtonClick}
              >
                <AiOutlineArrowLeft className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="md:p-5 mt-5">
        <div className="grid grid-col grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="md:w-full md:h-full h-96 ml-2 mr-2 flex-shrink-0 border rounded-xl bg-white box-shadow shadow-xl"
            style={{
              borderRadius: "12px",
              boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.10)",
            }}
          >
            {companyData.map((company, index) => (
              <div key={index}>
                <div className="p-8">
                  <p
                    className={`md:leading-loose w-full text-sm md:text-base font-Avenir tracking-wide mb-4 ${showFullDescription ? "" : "line-clamp-6"
                      }`}
                  >
                    {company.description}
                  </p>
                  <button
                    onClick={toggleDescription}
                    className={`text-blue-500 cursor-pointer ${'md:hidden'
                      }`}
                  >
                    {showFullDescription ? "See Less" : "See More"}
                  </button>
                  <div className="flex gap-6 md:mt-10 mt-5">
                    <div className="">
                      <p className="md:text-base text-md mb-0 font-Avenir tracking-wide">
                        Based In
                      </p>
                      <p className="font-semibold md:text-lg text-md mt-2 font-Avenir tracking-wide">
                        {company.basedIn}
                      </p>
                    </div>
                    <div>
                      <p className="md:text-base text-sm mb-0 font-Avenir tracking-wide">
                        Contact
                      </p>
                      <p className="font-semibold md:text-lg text-sm mt-2 font-Avenir tracking-wide">
                        {company.contact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="w-670 h-280 ml-2 mr-2 flex-shrink-0 border rounded-xl bg-white box-shadow shadow-xl"
            style={{
              borderRadius: "12px",
              boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.10)",
            }}
          >
            <div className="grid gap-2 mt-5 grid-cols-2 md:grid-cols-2">
              {dealsData.map((deal, index) => (
                <div key={index} className="relative mt-2 rounded-lg p-2">
                  <img src={deal.image} alt="Offer" className="" />
                  <div className="absolute inset-0 flex flex-col justify-center items-center">
                    <h3 className="md:text-xl text-[10px] font-semibold text-center text-white">
                      {deal.title}
                    </h3>
                    <p className="text-center text-[10px] text-white">{deal.couponCode}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 mr-5 mt-8 mb-2 flex items-left justify-end font-Avenir tracking-wide text-white font-semibold text-sm uppercase">
              <button
                className="w-48 h-10 flex-shrink-0 rounded-md bg-[#3F2D6D] shadow-md"
                onClick={handleStoreFront}
              >
                Explore Storefront
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-10 mb-5 p-2 justify-between ">
          <div className="flex md:space-x-10 items-center">
            <div className="flex md:gap-5 gap-2">
              <button className="flex items-center justify-center md:w-32 w-28 h-10 p-2 border rounded-full bg-blue-100">
                <div className="text-[#13AAFF] text-center font-Avenir md:text-sm text-[13px] tracking-wide font-bold ">
                  Fast Moving
                </div>
              </button>
              <button className="flex items-center justify-center md:w-32 w-28 h-10 p-2 border rounded-full bg-blue-100">
                <div className="text-[#13AAFF] text-center font-Avenir md:text-sm text-[13px] tracking-wide font-bold">
                  Closing Soon
                </div>
              </button>
            </div>
          </div>
          <div className="w-64">
            <SelectInput
              options={options}
              value={selectedOption}
              onChange={handleSelectChange}
            />
            {/* {selectedOption && <p className="mt-2">Selected Option: {selectedOption.label}</p>} */}
          </div>
        </div>

        <div className="font-semibold font-Avenir tracking-wide ml-2 mb-5 mt-5">
          <h3>14 Items</h3>
        </div>
        <div>
          <CardComponent />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default PremiumUserStoreFrontDetail;
