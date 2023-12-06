'use client'
import React, { ReactNode, useEffect, useState } from 'react';
import TabNavigation from './TabNavigation';
import Nav from '../Navbar/Nav';
import Footer from '../Footer';
import SearchInput from '../Model/SearchInput';
import { useUserStore } from '@/utils/Zustand';
import { useRouter } from 'next/navigation';

interface BrandDashboardProps {
  children: ReactNode;
}

function BrandDashboard({ children }: BrandDashboardProps) {
  const { user } = useUserStore()
  const router = useRouter()
  return (
    <div>
      <Nav />
      <div className="bg-[#FCEFFF] flex justify-center mt-[100px] h-[80px]">
        <div className="mt-5">
          <SearchInput />
        </div>
      </div>
      <div className="bg-gradient-to-r  from-blue-200 via-purple-200 md:flex-row flex-col to-pink-200 w-full flex justify-between md:h-[68px]">
        <TabNavigation />
        {user?.role === 'buisness' && <div className="h-full px-[1rem] flex md:flex-row flex-col items-center gap-[1rem] md:justify-center">
          <button
            className="bg-[#E377FF] hover:bg-[#E377FF] w-full text-white md:text-base md:mb-[0] mb-[1rem] text-sm md:px-2 py-2 md:w-40 px-[0.5rem] rounded-md"
            onClick={() => router.push(`/brand-faqs`)}
          >
            Brand FAQs
          </button>
          <button
            className="bg-[#E377FF] hover:bg-[#E377FF] w-full text-white md:text-base md:mb-[0] mb-[1rem] text-sm md:px-2 py-2 md:w-40 px-[0.5rem] rounded-md"
            onClick={() => router.push(`/use-cases`)}
          >
            Use Cases
          </button>
        </div>}
      </div>
      <main className="flex-grow p-6">{children}</main>
      <div className='mt-10'>
        <Footer />
      </div>
    </div>
  );
}

export default BrandDashboard;
