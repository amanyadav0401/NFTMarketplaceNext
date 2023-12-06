"use client";
import React, { useEffect, useState } from "react";
import { MdFilterAlt } from "react-icons/md";
import { AiOutlineDown } from "react-icons/ai";
import Brands from "../AgencyDashboard/Brands";
import AgencyList from "./AgencyList";
import UserList from "./UserList";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

import { Bar } from "react-chartjs-2";
import Nav from "../Navbar/Nav";
import SearchInput from "../Model/SearchInput";
import BrandList from "./BrandList/BrandList";
import { useAdminAnalyticsStore, useAdminItemsStore } from "@/utils/Zustand";
import CreateItemDashboard from "../Model/CreateItemDashboard";
import MyItemsComponent from '@/Component/Micro/MyItems';
import MyCollectionsComponent from "../Micro/MyCollections";
import AdminItemsComponent from "../Micro/AdminItems";

const StackedBarChart: React.FC = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [30, 40, 25, 60, 50, 75],
        backgroundColor: "rgba(54, 162, 235, 0.8)", // Blue color
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        borderRadius: 10, // Rounded corners
      },
      {
        data: [20, 50, 15, 40, 50, 25],
        backgroundColor: "rgba(255, 99, 132, 0.8)", // Red color
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        borderRadius: 10, // Rounded corners
      },
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false, // Hide the grid lines
        },
        beginAtZero: true,
      },
      y: {
        stacked: true,
        ticks: {
          stepSize: 20, // Y-axis interval
        },
        // Start Y-axis from 0
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <Bar data={data} options={options} />
      <div className="mt-4 flex justify-center space-x-10">
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 rounded-full bg-blue-500"></span>
          <p className="font-Avenir text-blue-500">Renewal Due</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 rounded-full bg-red-500"></span>
          <p className="font-Avenir text-red-500">Total Renewal</p>
        </div>
      </div>
    </div>
  );
};

const DoughnutChart: React.FC = () => {
  const { adminAnalytics } = useAdminAnalyticsStore();
  const data = {
    datasets: [
      {
        data: [
          adminAnalytics.brandNFTs.length,
          adminAnalytics.adminNFTs.length,
          adminAnalytics.agencyNFTs.length,
          adminAnalytics.personalNFTs.length,
        ],
        backgroundColor: ["#3F2D6D", "#4A00FF", "#8250FF", "#BFA5FF"],
        hoverBackgroundColor: ["#3F2D6D", "#4A00FF", "#8250FF", "#BFA5FF"],
      },
    ],
  };

  return <Doughnut data={data} />;
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

function SuparAdminDashboard() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { adminAnalytics } = useAdminAnalyticsStore()
  const { setAdminItems } = useAdminItemsStore()

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const tabs: Tab[] = [
    { label: "List of Agencies" },
    { label: "List of Brands" },
    { label: "List of Users" },
    { label: 'My Listings' },
    { label: 'My Collections' },
    { label: 'All Items' }
  ];

  const revenueData = [
    { category: "Brand", mtd: 100, ytd: 100 },
    { category: "Agency", mtd: 2000, ytd: 2000 },
    { category: "User", mtd: 3000, ytd: 3000 },
  ];

  useEffect(() => {
    setAdminItems()
  }
    , [])

  return (
    <div>
      <Nav />
      <div className="bg-[#FCEFFF] flex justify-center mt-[100px] h-[80px]">
        <div className="mt-5">
          <SearchInput />
        </div>
      </div>
      <div className="flex justify-between items-center p-6">
        <div className="text-left">
          <h1 className="text-black font-Avenir font-semibold space-4 text-2xl leading-7 tracking-wide">
            Super Admin
          </h1>
        </div>
        <div className="flex space-x-4">
          <div className="relative inline-block">
            <button
              className="bg-purple-900 hover:bg-purple-900 w-[100px] font-Avenir tracking-wide flex justify-between items-center text-white px-4 py-2 rounded-md"
              onClick={toggleDropdown}
            >
              Links
              <AiOutlineDown className="text-xl" />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-8 w-[220px] mt-3 right-0 bg-white border rounded-md shadow-md">
                <ul>
                  <li className="py-2 px-4 font-Avenir tracking-wide   cursor-pointer">
                    Send Renewal Link
                  </li>
                  <li className="py-2 px-4 font-Avenir tracking-wide  cursor-pointer">
                    Send Subscription Link
                  </li>
                  <li className="py-2 px-4 font-Avenir tracking-wide cursor-pointer">
                    Send Payment Link
                  </li>
                </ul>
              </div>
            )}
          </div>
          <CreateItemDashboard showBuyNFTButton={false} />
        </div>
      </div>
      <div className="p-6 grid grid-cols-3 gap-4">
        <div
          className="w-full flex-shrink-0 rounded-lg shadow-xl shadow-gray-500/40 p-10"
          style={{
            borderRadius: "12px",
            boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.10)",
          }}
        >
          <StackedBarChart />
        </div>

        <div
          className="w-full flex-shrink-0 rounded-lg shadow-xl shadow-gray-500/40 p-10"
          style={{
            borderRadius: "12px",
            boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.10)",
          }}
        >
          <h2 className="text-center text-lg font-semibold mb-4 font-Avenir tracking-wide">
            Total Revenue
          </h2>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 flex justify-between items-center">
                <th className="py-2 px-4 font-Avenir tracking-wide">
                  Category
                </th>
                <th className="py-2 px-4 font-Avenir tracking-wide">MTD</th>
                <th className="py-2 px-4 font-Avenir tracking-wide">YTD</th>
              </tr>
            </thead>
            <tbody>
              {revenueData.map((data, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-300 flex justify-between items-center"
                >
                  <td className="py-2 ml-4 font-Avenir tracking-wide w-[130px]">
                    {data.category}
                  </td>
                  <td className="py-2 mr-10 font-Avenir tracking-wide ">
                    {data.mtd}
                  </td>
                  <td className="py-2 mr-5 font-Avenir tracking-wide ">
                    {data.ytd}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className="w-full flex-shrink-0 rounded-lg shadow-xl shadow-gray-500/40 p-10 relative"
          style={{
            borderRadius: "12px",
            boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.10)",
          }}
        >
          <div className="flex justify-between items-center ">
            <div className="w-48 h-48">
              <DoughnutChart />
            </div>
            <div className="gap-4 flex flex-col items-center">
              <div className="flex items-center gap-2 w-full">
                <p className="font-Avenir tracking-wide">

                  {adminAnalytics.brandNFTs.length}
                  {" "}
                  <span className="w-4 h-4 rounded-full bg-black inline-block"></span>{" "}
                  Brand’s NFT
                </p>
              </div>
              <div className="flex items-center gap-2 w-full">
                <p className="font-Avenir tracking-wide">
                  {adminAnalytics.adminNFTs.length}{" "}
                  {" "}
                  <span className="w-4 h-4 rounded-full bg-blue-500 inline-block"></span>{" "}
                  Own NFT
                </p>
              </div>
              <div className="flex items-center gap-2 w-full">
                <p className="font-Avenir tracking-wide">
                  {adminAnalytics.agencyNFTs.length}{" "}
                  {" "}
                  <span className="w-4 h-4 rounded-full bg-purple-500 inline-block"></span>{" "}
                  Agency NFT
                </p>
              </div>
              <div className="flex items-center gap-2 w-full">
                <p className="font-Avenir tracking-wide">
                  {adminAnalytics.personalNFTs.length}{" "}
                  {" "}
                  <span className="w-4 h-4 rounded-full bg-[#E377FF] inline-block"></span>{" "}
                  User NFT
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div
          className="w-full flex justify-between items-center flex-shrink-0 rounded-lg bg-gray-100 box-shadow shadow-xl shadow-gray-500/40"
          style={{
            borderRadius: "12px",
            boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.10)",
          }}
        >
          <div className="flex items-start">
            {tabs.map((tab, index) => (
              <TabComponentAgency
                key={index}
                label={tab.label}
                active={index === activeTabIndex}
                onClick={() => setActiveTabIndex(index)}
              />
            ))}
          </div>
        </div>
        <div className="mt-6">
          {activeTabIndex === 0 && (
            <div>
              {/* Content for Published Tab */}
              <AgencyList />
            </div>
          )}
          {activeTabIndex === 1 && (
            <div>
              {/* Content for Unpublished Tab */}
              <BrandList />
            </div>
          )}
          {activeTabIndex === 2 && (
            <div>
              {/* Content for Unpublished Tab */}
              <UserList />
            </div>
          )}
          {
            activeTabIndex === 3 && (
              <MyItemsComponent />
            )
          }
          {
            activeTabIndex === 4 && (
              <MyCollectionsComponent />
            )
          }
          {
            activeTabIndex === 5 && (
              <AdminItemsComponent />
            )
          }
        </div>
      </div>
    </div>
  );
}

export default SuparAdminDashboard;
