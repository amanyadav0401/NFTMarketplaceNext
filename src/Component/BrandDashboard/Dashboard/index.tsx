"use client";
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { AiOutlineDown } from "react-icons/ai";
import CreateItemDashboard from "@/Component/Model/CreateItemDashboard";
import { Modal } from "@nextui-org/react";
import EditDashboard from "@/Component/EditDashboard";
import { useMyItemsStore, useUserStore } from "@/utils/Zustand";
import MyItemsComponent from "@/Component/Micro/MyItems";
import { useRouter } from "next/navigation";
import PurchasedItemComponent from "@/Component/Micro/PurchasedItems";
import BuyBacksList from "../BuyBacks";
import MyCollectionsComponent from "@/Component/Micro/MyCollections";

interface Product {
  imageSrc: string;
  productName: string;
  description: string;
  date: string;
  price: string;
  stock: string;
  status: string;
}

function Dashboard() {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [publishedIndexes, setPublishedIndexes] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { myItems, myItemsLoading, setMyItems } = useMyItemsStore();
  const router = useRouter();
  const [tabs, setTabs] = useState([
    {
      name: "Recently Added NFT",
      active: true
    },

    {
      name: "Purchased NFT",
      active: false
    },
    {
      name: "Buy Backs",
      active: false
    },
    {
      name: "My Collections",
      active: false
    }
  ])

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUnpublishClick = (index: number) => {
    setOpenDropdownIndex(index === openDropdownIndex ? null : index);
  };

  const handleCheckboxChange = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleDoneClick = (index: number) => {
    if (selectedOptions.length > 0) {
      setPublishedIndexes((prevIndexes) => [...prevIndexes, index]);
    } else {
      setPublishedIndexes((prevIndexes) =>
        prevIndexes.filter((item) => item !== index)
      );
    }
    setOpenDropdownIndex(null);
  };

  const options: string[] = [
    "On Marketplace",
    "On Storefront",
    "On External Marketplace",
  ];

  const { user } = useUserStore();

  const productContent: Product[] = [
    {
      imageSrc: "/Images/cardimg.svg",
      productName: "T Shirt",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since...Read more",
      date: "24 Apr 2023",
      price: "$ 240",
      stock: "120/150",
      status: "LiveOn  Marketplace  Storefront",
    },
    {
      imageSrc: "/Images/cardimg.svg",
      productName: "T Shirt",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since...Read more",
      date: "24 Apr 2023",
      price: "$ 240",
      stock: "120/150",
      status: "LiveOn Marketplace Storefront",
    },
    // ... Add more product items as needed
  ];


  return (
    <div>
      <div className="flex justify-between flex-col md:flex-row items-center p-2">
        <div className="text-left md:mb-0 mb-4">
          <h1 className="text-black font-Avenir font-semibold space-4 md:text-2xl text-lg leading-5 tracking-wide">
            Brand Dashboard -{" "}
            <span className="text-[#E377FF]"> {user?.name.toUpperCase()} </span>
          </h1>
        </div>

        <CreateItemDashboard showBuyNFTButton={true} />
      </div>

      <div className="md:w-full w-96 h-full flex-shrink-0 rounded-lg bg-gray-100 shadow-xl shadow-gray-500/40 p-4 md:-ml-0 -ml-5">
        <div className="flex justify-end mt-4 space-x-4">
          <p
            className="text-[#E377FF] cursor-pointer font-Avenir font-semibold text-base leading-6 tracking-wide"
            onClick={openModal}
          >
            Edit
          </p>
          <Modal isOpen={isOpen} onClose={closeModal}>
            <EditDashboard onClose={closeModal} showPhoneNumberField={false} />
          </Modal>
        </div>

        <div className="flex md:p-5 mt-4">
          <div
            className="flex justify-between flex-col md:flex-row space-x-10"
          >
            <div className="flex space-x-5">
              <img
                src={user?.avatar}
                alt="Logo"
                className="md:w-24 md:h-24 w-16 h-16 rounded-full shadow-xl"
                style={{
                  boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.10)",
                }}
              />
              <div>
                <h2 className="font-bold font-Avenir md:text-xl text-lg">
                  {user?.username}
                </h2>
                <p className="mt-4 font-Avenir text-gray-600 md:text-base text-sm">
                  {user?.desc}
                </p>
              </div>
            </div>
            <div className="flex md:flex-col flex-row md:space-x-0 space-x-8 md:mt-0 mt-5">
              <div>
                <p className="text-gray-500 font-Avenir">Based In</p>
                <div className="flex mt-2 items-center space-x-2">
                  {/* <item.basedIn.icon className="text-gray-800" /> */}
                  <p className="text-gray-800 font-Avenir md:text-base text-sm">
                    {user?.country}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-gray-500 md:mt-8 font-Avenir">Contact</p>
                <div className="flex mt-2 items-center space-x-2">
                  {/* <item.contact.icon className="text-gray-800" /> */}
                  <p className="text-gray-800 font-Avenir md:text-base text-sm">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="md:w-full w-96 flex-shrink-0 rounded-lg bg-gray-100 shadow-xl shadow-gray-500/40 md:p-5 p-5 md:-ml-0 -ml-5">
          <div className="w-full flex px-[1rem] rounded-lg bg-[#dedede] justify-start gap-[0.5rem] md:gap-[2rem] items-center">
            {
              tabs.map((item, index) => {
                return (
                  <h4 onClick={() => {
                    setTabs(tabs.map((item, i) => {
                      return {
                        ...item,
                        active: index === i
                      }
                    }))
                  }} key={item.name} className={`font-Avenir text-[12px] cursor-pointer md:text-start text-center transition-all duration-300 ${item.active && 'text-[#E377FF] border-b-[3px] border-[#E377FF]'} py-[0.8rem] md:text-lg font-semibold tracking-wide`}>
                    {item.name}
                  </h4>
                )
              })
            }

          </div>
          {
            tabs[0].active && <MyItemsComponent />
          }
          {
            tabs[1].active && <PurchasedItemComponent />
          }
          {
            tabs[2].active && <BuyBacksList />
          }
          {
            tabs[3].active && <MyCollectionsComponent />
          }
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
