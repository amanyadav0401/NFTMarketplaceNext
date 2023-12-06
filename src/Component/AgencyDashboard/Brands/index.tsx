"use client";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { MdOutlineEdit } from "react-icons/md";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { useAgencyBrandWithItemsStore } from "@/utils/Zustand";

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

const Brands = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [publishedIndexes, setPublishedIndexes] = useState<number[]>([]);
  const { agencyBrandWithItemsLoading, brandsWithItems } = useAgencyBrandWithItemsStore();



  return (
    <div>
      <div className="mt-5  p-6 overflow-x-auto whitespace-nowrap">
        {/* <div className="w-full flex-shrink-0 rounded-lg bg-gray-100 shadow-xl shadow-gray-500/40 p-5"> */}
        <div className="flex md:w-[100vw] w-[500vw] space-x-20 font-semibold font-Avenir">
          <div className="w-[10%]"></div>
          <div className="w-[10%]">Brand Name</div>
          <div className="w-[10%]">Date</div>
          <div className="w-[10%]">Sales</div>
          <div className="w-[11%]">Subscription</div>
          <div className="w-[11%]">NFT Count</div>
          <div className="w-[11%]">Total Amount</div>
          <div className="w-[11%]">Stock</div>
        </div>
        <div className="border-b md:w-[100vw] w-[500vw] mt-4"></div>

        {brandsWithItems.map((item, index) => (
          <div key={index} className="mt-5 md:w-[100vw] w-[500vw] cursor-pointer">
            <div className="flex space-x-20 items-center">
              <div className="w-[10%]">
                <img
                  src={item.brand.avatar}
                  alt="Product"
                  className="w-20 h-20 rounded-md md:ml-5 mb-5 ml-2"
                  style={{
                    boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.10)",
                  }}
                />
              </div>
              {/* Data for each item */}
              <div className="w-[10%] truncate">{item.brand.name}</div>
              <div className="w-[10%] truncate">{new Date(item.brand.createdAt).toDateString()}</div>
              <div className="w-[10%] text-[#E377FF]">{
                item.items.reduce((acc, item) => acc + item.purchasedTokens, 0)
              }</div>
              <div className="w-[11%]">{
                'Subscribed'
              }</div>
              <div className="w-[11%]">{
                item.items.length
              }</div>
              <div className="w-[11%]">
                {
                  item.items.reduce((acc, item) => acc + (Number(item.numOfTokens) * Number(item.price)), 0)
                }
              </div>
              <div className="w-[11%]">{
                //item.items.numOfTokens reduce
                item.items.reduce((acc, item) => acc + item.numOfTokens, 0)
              }</div>
            </div>
            <div className="border-b mt-4"></div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Brands;
MdOutlineEdit;
