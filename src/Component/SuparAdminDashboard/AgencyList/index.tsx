"use client";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { FaEye } from "react-icons/fa";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { useAdminAnalyticsStore } from "@/utils/Zustand";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Product {
  imageSrc: string;
  brandName: string;
  date: string;
  sales: string;
  subscription: string;
  price: string;
  stock: string;
  status: string;
}

function AgencyList() {
  const { adminAnalytics } = useAdminAnalyticsStore()


  return (
    <div>
      <div className="mt-5 p-6">
        {/* <div className="w-full flex-shrink-0 rounded-lg bg-gray-100 shadow-xl shadow-gray-500/40 p-5"> */}
        <div className="flex space-x-10 font-semibold font-Avenir">
          <div className="w-[8%]"></div>
          <div className="w-[11%]">Agency Name</div>
          <div className="w-[12%]">Service Start Date</div>
          <div className="w-[11%]">Sales</div>
          <div className="w-[11%]">Subscription</div>
          <div className="w-[10%]">NFT Count</div>
          <div className="w-[10%]">No of Brands</div>
          <div className=""></div>
          <div className=""></div>
        </div>
        <div className="border-b mt-4"></div>


        {adminAnalytics?.agencyUsers.map((item, index) => (
          <div key={index} className="mt-5 cursor-pointer">
            <div className="flex space-x-10 items-center">
              <div className="w-[8%]">
                <img
                  src={item.userId?.avatar}
                  alt="Product"
                  className="w-20 h-20 rounded-md"
                  style={{
                    boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.10)",
                  }}
                />
              </div>
              {/* Data for each item */}
              <div className="w-[11%]">{item.userId?.name}</div>
              <div className="w-[12%]">{new Date(item.userId?.createdAt || '').toDateString()}</div>
              <div className="w-[11%]">{
                adminAnalytics.agencyNFTs.filter((nft) => nft.creator as unknown === item.userId?._id).reduce((acc, nft) => acc + (nft.price * nft.purchasedTokens), 0)
              }</div>
              <div className="w-[11%] text-[#3AC977]">{'Verified'}</div>
              <div className="w-[10%]">{
                adminAnalytics.agencyNFTs.filter((nft) => nft.creator as unknown === item.userId?._id).length
              }</div>
              <div className="w-[10%]">{
                item.associatedBrands.length
              }</div>
              <Link href={`/info/${item.userId?.username}`} target="__blank">
                <FaEye className="w-5 h-5 cursor-pointer" />
              </Link>
              <div className="space-x-5">

              </div>
            </div>
            <div className="border-b mt-4"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AgencyList;
