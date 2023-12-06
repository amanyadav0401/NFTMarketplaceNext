'use client'
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaHome, FaChartBar, FaGift } from "react-icons/fa";

function AgencyNavigation() {
  const tabs = [
    { name: "", label: "Dashboard", icon: FaHome },
    { name: "mis", label: "MIS", icon: FaChartBar },
  ];


  const router = useRouter()
  const searchParam = useSearchParams()
  const pathname = usePathname()

  const tab = searchParam.get('tab') || ''

  const handleTabClick = (tabName: React.SetStateAction<string>) => {
    if (tabName === '') {
      router.replace(pathname)
      return
    }

    router.replace(pathname + '?tab=' + tabName)

  };

  const activeTab = tab


  return (
    <nav className="flex md:space-x-20 space-x-10 p-9 md:ml-10">
      {tabs.map((tab) => {
        const Icon = tab.icon;

        return (
          <div
            key={tab.name}
            className={`cursor-pointer ${activeTab === tab.name
              ? "text-[#E377FF] active-tab"
              : "text-gray-600 hover:text-gray-800"
              }`}
            onClick={() => handleTabClick(tab.name)}
          >
            <span>
              <Link href={`/brand-dashboard/${tab.name}`} passHref>
                <p className="flex items-center">
                  <Icon className="w-6 h-6 mr-1" />
                  {tab.label}
                </p>
              </Link>
            </span>
            {activeTab === tab.name && (
              <div className="h-1 bg-[#E377FF] w-full mt-1"></div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default AgencyNavigation;
