"use client";
import React, { useEffect, useState } from "react";
import Brands from "./Brands";
import AllNft from "./AllNft";
import { MdFilterAlt } from "react-icons/md";
import { AiOutlineDown } from "react-icons/ai";
import SearchInput from "../Model/SearchInput";
import Nav from "../Navbar/Nav";
import CreateItemDashboard from "../Model/CreateItemDashboard";
import Footer from "../Footer";
import { useAgencyBrandWithItemsStore, useUserStore } from "@/utils/Zustand";
import AgencyInviteModal from "../Model/AgencyInvitePopup";
import MyItemsComponent from "../Micro/MyItems";
import PurchasedItemComponent from "../Micro/PurchasedItems";
import toast from "react-hot-toast";
import { APIClient } from "@/utils/APIClient";
import MyCollectionsComponent from "../Micro/MyCollections";
import { useRouter, useSearchParams } from "next/navigation";
import AgencyNavigation from "./Navigation";
import Mis from "../BrandDashboard/Mis";
import AgencyMain from "./Dash";

interface CardProps {
  heading: string;
  value: string;
  backgroundColor: string;
}

const CardMis: React.FC<CardProps> = ({ heading, value, backgroundColor }) => {
  return (
    <div
      className={` w-full md:h-[120px] flex-shrink-0 rounded-lg shadow-xl shadow-gray-500/40 md:p-10 p-5 ${backgroundColor}`}
      style={{
        borderRadius: "12px",
        boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.10)",
      }}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-Avenir md:text-2xl text-xl font-light text-center">
          {heading}
        </h3>
        <p className="font-Avenir font-semibold md:text-2xl text-xl text-center">
          {value}
        </p>
      </div>
    </div>
  );
};

interface Tab {
  label: string;
}



function TabComponentAgency({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`cursor-pointer p-3 text-center md:w-64 h-12 ${active ? "text-purple-900" : "text-gray-500 hover:text-gray-500"
        }`}
      onClick={onClick}
    >
      {label}
      {active && (
        <div className="ml-auto mr-auto h-0.5 bg-purple-900 mt-2"></div>
      )}
    </div>
  );
}

function AgencyDashboard() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const { user, setUser } = useUserStore()
  const [subdomain, setSubdomain] = useState('')
  const router = useRouter()
  const searchParam = useSearchParams()
  const { agencyBrandWithItemsLoading, brandsWithItems, setAgencyBrandWithItems } = useAgencyBrandWithItemsStore()

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getTotalSales = () => {
    let brandsItems: NFTItem[] | NFTItem[][] = brandsWithItems.map((item) => {
      return item.items
    })

    brandsItems = brandsItems.flat(3)

    //get each item's purchasedTokens
    let totalSales = brandsItems.map((item) => {
      return item.purchasedTokens
    })

    //get total sales
    return totalSales.reduce((acc, item) => acc + item, 0).toString()
  }

  const getTotalNFT = () => {
    let brandsItems: NFTItem[] | NFTItem[][] = brandsWithItems.map((item) => {
      return item.items
    })

    brandsItems = brandsItems.flat(3)

    return brandsItems.length.toString()
  }

  const getTotalValue = () => {
    let brandsItems: NFTItem[] | NFTItem[][] = brandsWithItems.map((item) => {
      return item.items
    })

    brandsItems = brandsItems.flat(3)

    //get each item's purchasedTokens
    let totalSales = brandsItems.map((item) => {
      return Number(item.numOfTokens) * Number(item.price)
    })

    //get total sales
    return totalSales.reduce((acc, item) => acc + item, 0).toString()
  }

  const tabs: Tab[] = [{ label: "Brands" }, { label: "My NFTs" }, { label: "Purchased NFTs" }, { label: 'My Collections' }];

  const tab = searchParam.get('tab') || ''

  const cardData: CardProps[] = [
    {
      heading: "Total Sales",
      value: getTotalSales(),
      backgroundColor: "bg-fuchsia-100",
    },
    {
      heading: "Total NFT",
      value: getTotalNFT(),
      backgroundColor: "bg-fuchsia-100",
    },
    {
      heading: "Total Value",
      value: getTotalValue(),
      backgroundColor: "bg-fuchsia-100",
    },
  ];

  useEffect(() => {
    setAgencyBrandWithItems()
    setSubdomain((user?.userInformation as AgencyUser)?.subdomain || '');
  }
    , [user])

  const handleSaveSubDomain = async () => {
    try {
      const data = await APIClient.put('auth/update-agency-subdomain', {
        json: {
          subdomain
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const dataJson: any = await data.json()

      if (dataJson.success) {
        toast.success('Subdomain Updated Successfully')
        setUser()
      }
    }
    catch (err: any) {
      const error = await err?.response?.json()
      toast.error(error?.message || 'Something Went Wrong')
    }
  }

  return (
    <div>
      <Nav />
      <div className="bg-[#FCEFFF] flex justify-center mt-[100px] h-[80px]">
        <div className="mt-5">
          <SearchInput />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center p-6">
        <div className="text-left flex md:flex-row flex-col w-full justify-between items-center gap-[1rem]">
          <h1 className="text-black md:text-start text-center font-Avenir font-semibold space-4 md:text-2xl text-xl leading-7 tracking-wide">
            Partner Dashboard -{" "}
            <span className="text-[#E377FF]">{user?.name?.toUpperCase()}</span>
          </h1>
          <div className="flex items-center gap-[0.5rem]">
            <input value={subdomain} onChange={e => {
              setSubdomain(e.target.value.replace(/\s/g, '-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, ''))
            }} className="h-[3rem] w-[9rem] px-[0.5rem] focus:outline-none rounded-md border border-black/10" placeholder="Subdomain" />
            <button disabled={
              subdomain === (user?.userInformation as AgencyUser)?.subdomain || subdomain === ''
            } onClick={handleSaveSubDomain} className="bg-[#3F2D6D] disabled:opacity-50 hover:bg-[#3F2D6D] px-[1rem] font-Avenir tracking-wide flex justify-between items-center text-white  py-2 rounded-md">
              Save
            </button>
          </div>
        </div>

      </div>
      <div className="flex w-full justify-end px-[2rem] space-x-2 gap-[1rem] items-center">

        <button onClick={() => {
          setIsInviteOpen(true)
        }} className="bg-[#3F2D6D] md:text-base whitespace-nowrap text-[12px] hover:bg-[#3F2D6D] px-[1rem] font-Avenir tracking-wide flex justify-between items-center text-white  py-2 rounded-md">
          Send Invite
        </button>

        <button onClick={() => {
          router.push(`/info/${user?.username}`)
        }} className="bg-[#3F2D6D] md:text-base text-[12px] hover:bg-[#3F2D6D] px-[1rem] font-Avenir tracking-wide flex justify-between items-center text-white  py-2 rounded-md">
          Storefront
        </button>
        <div className="relative inline-block">
          <button
            className="bg-[#3F2D6D] md:text-base text-[12px] hover:bg-[#3F2D6D] w-[100px] font-Avenir tracking-wide flex justify-between items-center text-white px-4 py-2 rounded-md"
            onClick={toggleDropdown}
          >
            Payment
            <AiOutlineDown className="text-xl" />
          </button>
          {isDropdownOpen && (
            <div className="absolute top-8 w-[220px] mt-3 left-0 bg-white border rounded-md shadow-md">
              <ul>
                <li className="py-2 px-4 font-Avenir tracking-wide cursor-pointer">
                  Send Payment Link
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="md:flex hidden">
          <CreateItemDashboard showBuyNFTButton={false} />
        </div>
      </div>
      <div className="md:hidden flex mt-[1rem] w-full justify-center">
        <CreateItemDashboard showBuyNFTButton={false} />
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {cardData.map((card, index) => (
          <CardMis
            key={index}
            heading={card.heading}
            backgroundColor={card.backgroundColor}
            value={card.value}
          />
        ))}
      </div>
      <AgencyNavigation />
      {
        tab === 'mis' && <div className="px-6 mb-[1rem]">
          <Mis />
        </div>
      }
      {
        tab === '' && <AgencyMain activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} tabs={tabs} />
      }
      <AgencyInviteModal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(!isInviteOpen)} />
      <Footer />
    </div>
  );
}

export default AgencyDashboard;
