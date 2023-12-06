'use client'
import React, { useState } from "react";
import DailyDeals from "./DailyDeals";
import SpecialOffers from "./SpecialOffers";
import CreateItemDashboard from "@/Component/Model/CreateItemDashboard";

interface Tab {
  label: string;
}

function TabComponentOffer({
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
      className={`cursor-pointer p-3 text-center w-64 h-12 ${active ? "text-purple-900" : "text-gray-500 hover:text-gray-500"
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

function Offer() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const tabs: Tab[] = [
    { label: "Daily Deals" },
    { label: "Special Offers" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center p-6">
        <div className="text-left">
          <h1 className="text-black font-Avenir font-semibold space-4 text-2xl leading-7 tracking-wide">
            Offers
          </h1>
        </div>
        <CreateItemDashboard showBuyNFTButton />
      </div>
      <div className="w-full flex-shrink-0 rounded-lg bg-gray-100 p-6 box-shadow shadow-xl shadow-gray-500/40">
        {/* <div className="flex items-start mt-5">
            {tabs.map((tab, index) => (
              <TabComponentOffer
                key={index}
                label={tab.label}
                active={index === activeTabIndex}
                onClick={() => setActiveTabIndex(index)}             
                />
            ))}
          </div> */}
        <div>
          <DailyDeals />
        </div>
      </div>
    </div>
  );
}

export default Offer;
