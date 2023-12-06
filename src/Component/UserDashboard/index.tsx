"use client";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { MdOutlineEdit } from "react-icons/md";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { AiOutlineSearch } from "react-icons/ai";
import SearchInput from "../Model/SearchInput";
import Nav from "../Navbar/Nav";
import { useMyItemsStore, useUserStore } from "@/utils/Zustand";
import CreateItemDashboard from "../Model/CreateItemDashboard";
import { ConnectWallet } from "@thirdweb-dev/react";
import EditDashboard from "@/Component/EditDashboard";
import { Modal } from "@nextui-org/react";
import Footer from "../Footer";
import useCreateParcel from '../../utils/web3/createVoucher';
import { APIClient, getEthPrice } from "@/utils/APIClient";
import { useRouter } from "next/navigation";
import MyItemsComponent from "../Micro/MyItems";
import PurchasedItemComponent from "../Micro/PurchasedItems";
import MyCollectionsComponent from "../Micro/MyCollections";




interface Product {
  imageSrc: string;
  productName: string;
  date: string;
  sales: string;
  subscription: string;
  price: string;
  stock: string;
  status: string;
}


const UserDashboard = () => {
  const { user } = useUserStore()
  const { myItems, myItemsLoading, setMyItems } = useMyItemsStore()
  const [isOpen, setIsOpen] = useState(false);
  const [tabs, setTabs] = useState([
    {
      name: "My NFTs",
      active: true
    },
    {
      name: "Purchased NFTs",
      active: false
    },
    {
      name: "My Collections",
      active: false
    }
  ])

  const userInfo = [
    {
      label: "Name",
      value: user?.name || "user123",
    },
    {
      label: "Email",
      value: user?.email || "example@example.com",
    },
    // {
    //   label: "Phone",
    //   value: "+91 0000000000",
    // },
    {
      label: "Country",
      value: user?.country || "N/A",
    },
  ];





  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <Nav />
      <div className="bg-[#FCEFFF] flex justify-center mt-[100px] h-[80px]">
        <div className="mt-5">
          <SearchInput />
        </div>
      </div>
      <div className="flex justify-between flex-col md:flex-row items-center p-2 mt-5">
        <div className="text-left md:mb-0 mb-4">
          <h1 className="text-black font-Avenir font-semibold space-4 md:text-2xl text-lg leading-5 tracking-wide">
            User Dashboard
          </h1>
        </div>
        <CreateItemDashboard showBuyNFTButton={true} />
      </div>

      <div className="flex flex-col md:flex-row gap-5 p-6 mt-4">
        <div
          className="w-full p-4 bg-white border rounded-lg"
          style={{
            borderRadius: "12px",
            boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.10)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="md:text-xl text-sm font-semibold font-Avenir tracking-wide">
              User Profile
            </h2>
            <p className="text-[#E377FF] cursor-pointer font-Avenir tracking-wide"
              onClick={openModal}
            >
              Edit
            </p>
            <Modal isOpen={isOpen} onClose={closeModal}>
              <EditDashboard onClose={closeModal} showPhoneNumberField={true} />
            </Modal>
          </div>
          <div className="border-b mb-4"></div>
          <div className="flex space-x-10 md:p-4">
            <div className="mb-4">
              <img
                src={
                  user?.avatar ||
                  "https://ui-avatars.com/api/?name=Style+Branding&background=0D8ABC&color=fff"
                }
                alt="Company Logo"
                className="md:w-20 md:h-20 rounded-full shadow-xl"
              />
            </div>
            <div>
              {userInfo.map((info, index) => (
                <div key={index} className="mb-2">
                  <p className="text-sm font-Avenir tracking-wide font-semibold text-gray-500">
                    {info.label}
                  </p>
                  <p className="font-Avenir tracking-wide">{info.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="w-full p-4 bg-white border rounded-lg mr-1"
          style={{
            borderRadius: "12px",
            boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.10)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold font-Avenir tracking-wide">
              Wallet
            </h2>
          </div>
          <div className="border-b mb-4"></div>
          <div className="text-center mt-20 space-y-5">
            <p className="font-Avenir tracking-wide text-[#3F2D6D] text-md font-semibold">
              Link your wallet to reflect the Earnings
            </p>
            <ConnectWallet modalSize="compact" theme={"light"} />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="md:w-full w-full flex-shrink-0 rounded-lg bg-gray-100 shadow-xl shadow-gray-500/40 md:p-5 p-5 md:-ml-0 ">
          <div className="w-full flex px-[1rem] rounded-lg bg-[#dedede] justify-start gap-[2rem] items-center">
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
                  }} key={item.name} className={`font-Avenir cursor-pointer transition-all duration-300 ${item.active && 'text-[#E377FF] border-b-[3px] border-[#E377FF]'} py-[0.8rem] md:text-lg text-[12px] font-semibold tracking-wide`}>
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
            tabs[2].active && <MyCollectionsComponent />
          }
        </div>
      </div>
      {/* <div className="mt-10 flex font-Avenir justify-between p-4 items-center">
        <div>
          <p>{`${startIndex + 1} to ${Math.min(
            endIndex,
            productContent.length
          )} of ${productContent.length}`}</p>
        </div>
        <div className="flex items-center">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination flex space-x-2"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            pageLinkClassName={
              "page-link border border-2 text-gray-800 rounded-md p-2"
            }
            previousClassName={"page-item"}
            previousLinkClassName={"page-link p-2"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link p-2"}
          />
        </div>
      </div> */}
      <Footer />
    </div>
  );
}

export default UserDashboard;
