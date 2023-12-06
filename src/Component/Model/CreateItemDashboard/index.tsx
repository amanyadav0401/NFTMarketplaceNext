"use client";
import React, { useState } from "react";
import CreateItemModal from "../CreateItemModal/CreateItemModal";
import { useDisclosure } from "@nextui-org/react";
import { useUserStore } from "@/utils/Zustand";
import { useRouter } from "next/navigation";

interface CreateItemDashboardProps {
  showBuyNFTButton: boolean;
}

function CreateItemDashboard({ showBuyNFTButton }: CreateItemDashboardProps) {
  const { user } = useUserStore()
  const router = useRouter()
  return (
    <div>
      <div className="flex md:flex-nowrap flex-wrap justify-start gap-[1rem]">
        {
          user?.role === 'buisness' && <button
            className="bg-[#E377FF] hover:bg-[#E377FF] text-white md:text-base text-sm md:px-2 py-2 md:w-40 px-[0.5rem] rounded-md"
            onClick={() => router.push(`/info/${user?.username}`)}
          >
            Storefront
          </button>
        }
        {
          !user?.account && (
            <button
              className="bg-[#E377FF] hover:bg-[#E377FF] text-white md:text-base text-sm md:px-2 py-2 md:w-40 px-[0.5rem] rounded-md"
              onClick={() => {
                window.open(`${process.env.NEXT_PUBLIC_PROD_API_URL}/auth/onboard-user?userid=${user?._id}`, '_blank')
              }}
            >
              Connect Stripe
            </button>
          )
        }
        <button
          className="bg-[#E377FF] hover:bg-[#E377FF] text-white md:text-base text-sm md:px-2 py-2 md:w-40 px-[0.5rem] rounded-md"
          onClick={() => router.push('/new-nft')}
        >
          Create New NFT
        </button>
        <button
          className="bg-[#E377FF] hover:bg-[#E377FF] text-white md:text-base text-sm md:px-2 py-2 md:w-40 px-[0.5rem] rounded-md"
          onClick={() => router.push('/')}
        >
          Marketplace
        </button>
      </div>

    </div>
  );
}

export default CreateItemDashboard;
