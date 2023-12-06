"use client";
import { useRouter } from "next/navigation";
import React, { createRef, useRef, useState } from "react";
import moment from 'moment';
import { AiOutlineArrowLeft } from "react-icons/ai";
import CardComponent from "../../Model/CardModel";
import SelectInput from "../../Model/SelectInput";
import Nav from "@/Component/Navbar/Nav";
import Footer from "@/Component/Footer";
import { useUserStore } from "@/utils/Zustand";

function AgencyStoreFrontDetail() {
  const { user } = useUserStore()
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All Collection");
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Function to toggle showFullDescription
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const handleBackButtonClick = () => {
    router.back();
  };

  const tabs = ["Total Collection", "Brand NFT", "Buy Back"];

  const companyData = [
    {
      name: user?.name || "Forte Labs",
      description: user?.desc || "Forte is building economic technology for games that is secure, easy to use, and fully compliant. It's an end-to-end blockchain platform that enables the emergence of community economics, a system where the interests of game developers and players are aligned, leading to healthier, sustainable game communities.",
      basedIn: user?.country || "United States",
      contact: user?.email || "contactus@forteLabs.com",
    },
    // Add more company data here...
  ];
  console.log(user)
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
    // Add more options as needed
  ];

  const handleSelectChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
  };

  const handleStoreFront = () => {
    router.push("/storefrontdetail/agencystorefrontdetail");
  };

  const tabsPerPage = 1; // Number of tabs to display per page
  const tabWidth = "w-1/2"; // Adjust tab width as needed

  // Initialize the ref for the tab container
  const tabContainerRef = useRef<HTMLDivElement | null>(null);

  // Initialize an array of refs for individual tab elements
  const tabRefs = tabs.map(() => createRef<HTMLDivElement>());

  // Function to scroll tabs to the left
  const scrollTabsLeft = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
      scrollToTab(currentIndex - 1);
    }
  };

  // Function to scroll tabs to the right
  const scrollTabsRight = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - tabsPerPage) {
      setActiveTab(tabs[currentIndex + 1]);
      scrollToTab(currentIndex + 1);
    }
  };

  // Function to scroll to a specific tab
  const scrollToTab = (index: number) => {
    if (tabContainerRef.current) {
      const tabElement = tabRefs[index].current;
      if (tabElement) {
        tabElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };
  const joinedDate = moment(user?.createdAt, 'YYYY/MM/DD').format('YYYY/MM/DD');

  return (
    <div>
      <Nav />
      <div className="bg-gradient-to-r mt-[100px] from-blue-200 via-purple-200 to-pink-200 h-[400px]">
        <div className="p-10 md:ml-20 ml-5">
          <div>
            <img
              src={user?.avatar}
              className="h-[80px] w-[80px] border-black rounded-full"
            />
          </div>
          <p className="text-[#3F2D6D] mt-5 font-Avenir tracking-wide text-2xl">
            {user?.name}
          </p>
          <p className="text-[#3E3E3E] mt-5 font-Avenir tracking-wide text-1xl">
            Storefront
          </p>
          <p className="text-[#3E3E3E] mt-3 font-Avenir tracking-wide text-1xl">
            Joined {joinedDate}
          </p>
          <div className="flex gap-3 mt-5 w-8 h-8 text-[#3E3E3E] cursor-pointer">
            <img src="/Images/facebook.svg" alt="facebook" />
            <img src="/Images/linkedin.svg" alt="linkedin" />
            <img src="/Images/discord.svg" alt="discord" />
            <img src="/Images/twitter.svg" alt="twitter" />
            <img src="/Images/instagram.svg" alt="instagram" />
          </div>
          <div className="mt-5">
            <button
              className="w-10 h-10 flex-shrink-0 text-[#3F2D6D] cursor-pointer"
              onClick={handleBackButtonClick}
            >
              <AiOutlineArrowLeft className="text-xl" />
            </button>
          </div>
        </div>
      </div>
      <div className="md:p-2 mt-5">
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
                  <p className="font-semibold font-Avenir tracking-wide text-2xl">
                    {company.name}
                  </p>
                  <p
                    className={`md:leading-loose w-full text-sm md:text-base font-Avenir tracking-wide mt-2 mb-4 ${showFullDescription ? "" : "line-clamp-6"
                      }`}
                  >
                    {company.description}
                  </p>
                  <button
                    onClick={toggleDescription}
                    className={`text-blue-500 cursor-pointer ${"md:hidden"}`}
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
                    <p className="text-center text-[10px] text-white">
                      {deal.couponCode}
                    </p>
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

        <div className="relative flex flex-col md:flex-row items-center mt-5 mb-5 p-2">
          <div className="flex gap-4">
            <div
              className={`cursor-pointer font-Avenir tracking-wide text-center uppercase ${"left" === activeTab
                ? "text-[#E377FF]"
                : "text-[#00000099] hover:text-[#00000099]"
                }  md:hidden`}
              onClick={scrollTabsLeft}
            >
              {"<"}
            </div>
            <div className="flex space-x-10 items-center overflow-x-auto whitespace-nowrap md:w-full w-80 mb-4 md:mb-0" ref={tabContainerRef}>
              {tabs.map((tab, index) => (
                <div
                  key={tab}
                  className={`cursor-pointer font-Avenir tracking-wide text-center uppercase ${activeTab === tab
                    ? "text-[#E377FF]"
                    : "text-[#00000099] hover:text-[#00000099]"
                    }`}
                  onClick={() => {
                    setActiveTab(tab);
                    scrollToTab(index);
                  }}
                  ref={tabRefs[index]}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="h-1 bg-[#E377FF] w-[180px] mt-1"></div>
                  )}
                </div>
              ))}
            </div>
            <div
              className={`cursor-pointer font-Avenir tracking-wide text-center uppercase ${"right" === activeTab
                ? "text-[#E377FF]"
                : "text-[#00000099] hover:text-[#00000099]"
                }  md:hidden`}
              onClick={scrollTabsRight}
            >
              {">"}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center mt-5 mb-5 md:ml-10 mr-36 md:gap-4 gap-2 w-full md:w-auto">
              <button className="flex items-center justify-center md:w-32 w-30 h-10 p-2 border rounded-full bg-blue-100">
                <div className="text-[#13AAFF] text-sm text-center font-Avenir tracking-wide font-bold ">
                  Fast Moving
                </div>
              </button>
            </div>
            <div className="absolute md:inset-y-8 right-0 md:w-40 w-32 mr-2">
              <SelectInput
                options={options}
                value={selectedOption}
                onChange={handleSelectChange}
              />
              {/* {selectedOption && <p className="mt-2">Selected Option: {selectedOption.label}</p>} */}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:gap-0 gap-5 p-2 justify-between">
          <div className="md:w-[500px] h-32 border rounded-lg bg-[#E9FBFF] p-6">
            <div className="flex justify-between ">
              <h4 className="font-Avenir tracking-wide text-1xl">Total NFT Collection</h4>
              <p className="font-Avenir tracking-wide text-2xl font-bold">57</p>
            </div>
            <div className="flex justify-between mt-5">
              <h4 className="font-Avenir tracking-wide text-1xl">Total NFT Collection</h4>
              <p className="font-Avenir tracking-wide text-2xl font-bold">57</p>
            </div>
          </div>

          <div>
            <div className=" md:w-[500px] h-32 border rounded-lg bg-[#FFF8DD] p-6">
              <div className="flex justify-between ">
                <h4 className="font-Avenir tracking-wide text-1xl">Total Buy Back</h4>
                <p className="font-Avenir tracking-wide text-2xl font-bold">57</p>
              </div>
              <div className="flex justify-between mt-5">
                <h4 className="font-Avenir tracking-wide text-1xl">Total Buy Back Value</h4>
                <p className="font-Avenir tracking-wide text-2xl font-bold">57</p>
              </div>
            </div>
          </div>

          <div>
            <div className="md:w-[500px] h-32 border rounded-lg bg-[#E7FFDF] p-6">
              <div className="flex justify-between ">
                <h4 className="font-Avenir tracking-wide text-1xl">Current Live Collection</h4>
                <p className="font-Avenir tracking-wide text-2xl font-bold">57</p>
              </div>
              <div className="flex justify-between mt-5">
                <h4 className="font-Avenir tracking-wide text-1xl">Total Value</h4>
                <p className="font-Avenir tracking-wide text-2xl font-bold">57</p>
              </div>
            </div>
          </div>
        </div>

        <div className="font-semibold font-Avenir tracking-wide mb-5 mt-5">
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

export default AgencyStoreFrontDetail;
