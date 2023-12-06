"use client";
import React, { useState } from "react";
import MISList from "./UnpublishedList";
import { useMyItemsStore } from "@/utils/Zustand";
import CreateItemDashboard from "../../Model/CreateItemDashboard";

interface CardProps {
  heading: string;
  value: string;
  backgroundColor: string;
}




const CardMis: React.FC<CardProps> = ({ heading, value, backgroundColor }) => {

  return (
    <div
      className={`md:w-full w-[160px] md:-ml-0 -ml-6 md:-mr-0 -mr-5 h-32 flex-shrink-0 rounded-lg shadow-xl shadow-gray-500/40 p-4 flex flex-col justify-center items-center ${backgroundColor}`}
      style={{
        borderRadius: "12px",
        boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.10)",
      }}
    >
      <h3 className="font-Avenir text-base font-light mb-2 text-center">
        {heading}
      </h3>
      <p className="font-Avenir font-semibold text-3xl mt-5 text-center">
        {value}
      </p>
    </div>
  );
};

interface Tab {
  label: string;
  count: number;
}

function TabComponent({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`cursor-pointer p-3 bg-gray-200 text-center w-64 md:h-12 h-16 md:text-base text-sm ${active ? "text-purple-900" : "text-gray-500 hover:text-gray-500"
        }`}
      onClick={onClick}
    >
      {label} | {count}
      {active && (
        <div className="ml-auto mr-auto h-0.5 bg-purple-900 mt-2"></div>
      )}
    </div>
  );
}

function Mis() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { myItemsAnalytics } = useMyItemsStore();
  const analytics = myItemsAnalytics?.data;

  const cardData: CardProps[] = [
    {
      heading: "Total NFT Collection",
      value: analytics?.totalItemsLength.toString() || "0",
      backgroundColor: "bg-yellow-100",
    },
    {
      heading: "Total NFT Value",
      value: analytics?.totalNFTValue.toString() || "0",
      backgroundColor: "bg-yellow-100",
    },
    {
      heading: "Total Buy Back Count",
      value: "0",
      backgroundColor: "bg-lime-100",
    },
    {
      heading: "Total Buy Back Value",
      value: "0",
      backgroundColor: "bg-lime-100",
    },
    {
      heading: "Total Sold",
      value: analytics?.soldItemsLength.toString() || "0",
      backgroundColor: "bg-fuchsia-100",
    },
    {
      heading: "Total Sold Value",
      value: analytics?.totalSales.toString() || "0",
      backgroundColor: "bg-fuchsia-100",
    },
    {
      heading: "Total Unsold",
      value: analytics?.pendingOrInactiveItemsLength.toString() || "0",
      backgroundColor: "bg-gray-200",
    },
    {
      heading: "Total Unsold Value",
      value: analytics?.unsoldItemsValue.toString() || "0",
      backgroundColor: "bg-gray-200",
    },
  ];

  const tabs: Tab[] = [
    { label: "Published", count: analytics?.activeItemsLength || 0 },
    { label: "Unpublished", count: analytics?.pendingOrInactiveItemsLength || 0 },
    { label: "Buy Back", count: 0 },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center p-4">
        <div className="mb-4 md:mb-0">
          <h1 className="font-Avenir font-semibold md:text-2xl -ml-5 text-lg md:leading-7 tracking-wide">
            Management Information Systems
          </h1>
        </div>
        <CreateItemDashboard showBuyNFTButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-3">
        <div className="grid grid-cols-2 md:gap-6 gap-20">
          {cardData.map((card, index) => (
            <CardMis
              key={index}
              heading={card.heading}
              backgroundColor={card.backgroundColor}
              value={card.value}
            />
          ))}
        </div>

        <div className="md:w-full w-94 md:-ml-0 -ml-6 md:-mr-0 -mr-5 flex-shrink-0 rounded-lg bg-gray-100 p-3 box-shadow shadow-xl shadow-gray-500/40">
          <div>
            <h4>Listed NFT | {analytics?.totalItemsLength}</h4>
          </div>
          <div className="flex items-start mt-5">
            {tabs.map((tab, index) => (
              <TabComponent
                key={index}
                label={tab.label}
                count={tab.count}
                active={index === activeTabIndex}
                onClick={() => setActiveTabIndex(index)}
              />
            ))}
          </div>
          <div className="mt-6">
            {activeTabIndex === 0 && (
              <div>
                <MISList nftData={analytics?.activeItems || []} />
              </div>
            )}
            {activeTabIndex === 1 && (
              <div>
                {/* Content for Unpublished Tab */}
                <MISList nftData={analytics?.pendingOrInactiveItems || []} />
              </div>
            )}
            {activeTabIndex === 2 && (
              <div>{/* Content for Buy Back Tab */}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mis;
