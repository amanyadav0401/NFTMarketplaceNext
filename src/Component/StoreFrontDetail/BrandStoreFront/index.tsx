"use client";
import { useRouter } from "next/navigation";
import React, { createRef, useRef, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import CardComponent from "../../Model/CardModel";
import SelectInput from "../../Model/SelectInput";
import Nav from "@/Component/Navbar/Nav";
import Footer from "@/Component/Footer";
import { useMyItemsStore, useUserStore } from "@/utils/Zustand";
import moment from "moment";
import BuyBackStoreFrontList from "@/Component/CardComponent/BuyBackStoreFrontList";
import BuyCardComponent from "@/Component/CardComponent/BuyCard";

interface Props {
  user?: User;
  buybacks: BuyBack[];
  items: NFTItem[];
  coupans: CoupanType[]
}

// Define your social media platforms here
const SOCIAL_MEDIA_PLATFORMS = ['facebook', 'linkedin', 'discord', 'twitter', 'instagram'];

const SocialIcons = ({ user }: { user: User }) => {

  const openInNewTab = (url: string | undefined) => {
    if (url) {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (newWindow) newWindow.opener = null;
    }
  };

  return (
    <div className="flex gap-3 mt-5 w-8 h-8 text-white cursor-pointer">
      {SOCIAL_MEDIA_PLATFORMS.map(platform => {
        // Check if the user has the current social media platform
        const link = user?.socials?.[platform as keyof typeof user.socials];
        if (link) {
          return (
            <img
              key={platform}
              src={`/Images/${platform}.svg`}
              alt={platform}
              onClick={() => openInNewTab(link)}
            />
          );
        }
        return null;
      })}
    </div>
  );
};


function BrandStoreFrontDetail({ user, buybacks, items, coupans }: Props) {
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

  const tabs = ["All Collection", "Buy Back", "Own Nfts"];

  const companyData = [
    {
      name: user?.name || "NFT World",
      description:
        user?.desc || "NFT World is an online platform dedicated to digital collectibles, where users can mint their own NFTs and engage with the world through their unique digital assets.",
      basedIn: user?.country || "United States",
      contact: user?.email || "help@nft-world.one",
    },
    // Add more company data here...
  ];



  const handleSelectChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
  };

  const handleStoreFront = () => {
    router.push("/storefrontdetail/brandstorefrontdetail");
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
      <div style={{
        backgroundImage: `url(${items?.[0]?.images?.[0] || "/Images/banner.webp"} )`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'end',
      }} className=" mt-[100px] from-blue-200 via-purple-200 to-pink-200 h-[400px]">
        <div className="p-10 md:ml-20 ml-5">
          <div>
            <img
              src={user?.avatar}
              className="h-[80px] w-[80px] border-black rounded-full"
            />
          </div>
          <p className="text-[#9a88c9] mt-5 font-Avenir tracking-wide text-2xl">
            {user?.name}
          </p>
          <p className="text-white mt-5 font-Avenir tracking-wide text-1xl">
            Storefront
          </p>
          <p className="text-white mt-3 font-Avenir tracking-wide text-1xl">
            Joined {joinedDate}
          </p>
          <SocialIcons user={user!} />
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
      <div className="md:p-2 mt-5">
        <div className="grid grid-col grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="md:w-full md:h-full h-fit ml-2 mr-2 flex-shrink-0 border rounded-xl bg-white box-shadow shadow-xl"
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
            {coupans.length > 0 && <div className="grid gap-2 mt-5 grid-cols-2 md:grid-cols-2">
              {coupans.map((deal, index) => (
                <div key={index} className="relative mt-2 rounded-lg p-2">
                  <img src={'/Images/offer.svg'} alt="Offer" className="" />
                  <div className="absolute inset-0 flex flex-col justify-center items-center">
                    <h3 className="md:text-xl text-[10px] font-semibold text-center text-white">
                      {deal.coupanText.toUpperCase()}
                    </h3>
                    <p className="text-center text-[10px] text-white">
                      {deal.coupanCode}
                    </p>
                  </div>
                </div>
              ))}

            </div>}
            {
              coupans.length === 0 && (
                <div className="flex md:h-full h-[4rem] w-full justify-center items-center">
                  <p className="text-[#3E3E3E] font-Avenir tracking-wide text-1xl">
                    No Deals Available
                  </p>
                </div>
              )
            }
            {/* <div className="p-2 mr-5 mt-8 mb-2 flex items-left justify-end font-Avenir tracking-wide text-white font-semibold text-sm uppercase">
              <button
                className="w-48 h-10 flex-shrink-0 rounded-md bg-[#3F2D6D] shadow-md"
                onClick={handleStoreFront}
              >
                Explore Storefront
              </button>
            </div> */}
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
            <div
              className="flex space-x-10 items-center overflow-x-auto whitespace-nowrap md:w-full w-80 mb-4 md:mb-0"
              ref={tabContainerRef}
            >
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
                    <div className="h-1 bg-[#E377FF] w-[140px] mt-1"></div>
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
              {/* <SelectInput
                options={options}
                value={selectedOption}
                onChange={handleSelectChange}
              /> */}
              {/* {selectedOption && <p className="mt-2">Selected Option: {selectedOption.label}</p>} */}
            </div>
          </div>
        </div>

        {/* <div className="font-semibold font-Avenir tracking-wide ml-2 mb-5">
          <h3>14 Items</h3>
        </div>
        <div>
          <CardComponent />
        </div> */}
        {
          activeTab === 'Buy Back' && (
            <>
              <div className="font-semibold text-center md:text-start  font-Avenir tracking-wide ml-2 mb-5">
                <h3>{buybacks.length} Items</h3>
              </div>
              <div>
                <BuyBackStoreFrontList buybacks={buybacks} />
              </div>
            </>
          )
        }
        {
          activeTab === 'Own Nfts' && (
            <>
              <div className="font-semibold text-center md:text-start  font-Avenir tracking-wide ml-2 mb-5">
                <h3>{items.length} Items</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {
                  items.map((nft) => {
                    return <BuyCardComponent nft={nft} />
                  })
                }
              </div>
            </>
          )
        }
        {
          activeTab === 'All Collection' && (
            <>
              <div className="font-semibold text-center md:text-start font-Avenir tracking-wide ml-2 mb-5">
                <h3>{items.length + buybacks.length} Items</h3>
              </div>
              <div>
                <BuyBackStoreFrontList buybacks={buybacks} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {
                  items.map((nft) => {
                    return <BuyCardComponent nft={nft} />
                  })
                }
              </div>
            </>
          )
        }
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default BrandStoreFrontDetail;
