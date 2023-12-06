'use client'

import { APIClient, getEthPrice } from '@/utils/APIClient'
import { useMyItemsStore, useUserStore } from '@/utils/Zustand'
import useCreateParcel from '@/utils/web3/createVoucher'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

type Props = {}

const formatDate = (date: (string | Date)) => {
  const d = new Date(date);
  const month = d.toLocaleString("default", { month: "short" });
  const day = d.getDate();
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};




const NFTListItem = ({ item, index, boughtItem }: { item: NFTItem, boughtItem: BoughtItem, index: number }) => {
  const router = useRouter()

  return (
    <div className="mt-5 cursor-pointer">
      <div className="flex space-x-20 font-semibold font-Avenir overflow-x-auto whitespace-nowrap">
        <div className="w-[10%]"></div>
        <div className="w-[10%]">NFT Name</div>
        <div className="w-[10%]">Purchased</div>
        <div className="w-[10%]">Amount</div>
        <div className="w-[15%]">Type</div>
        <div className="w-[10%]">Price ($)</div>
        <div className="w-[15%]">Hash</div>
        <div className="w-[10%]">Token ID</div>
      </div>
      <div className="flex space-x-20 items-center">
        <div className="w-[10%]">
          <Image
            height={160}
            width={160}
            onClick={() => {
              router.push(`/card/${item._id}`)
            }}
            src={item.images?.[0]}
            alt="Product"
            className="object-cover rounded-md h-[80px] md:ml-5 mb-5 ml-2"
            style={{
              boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.10)",
            }}
          />
        </div>
        <div className="w-[10%] truncate">{item.name}</div>
        <div className="w-[10%] truncate">{formatDate(boughtItem.createdAt || new Date().toISOString())}</div>
        <div className="w-[10%]">{boughtItem.quantity}</div>
        <div className="w-[15%] text-[#E377FF]">{
          boughtItem.type.toUpperCase()
        }</div>
        <div className="w-[10%] truncate">{Number(item.price) * boughtItem.quantity}</div>
        <div onClick={() => {
          //sepolia transaction hash
          window.open(`https://polygonscan.com/tx/${boughtItem.txHash}`)
        }} className="w-[15%] truncate">
          <p key={index} className="text-[#E377FF] truncate">{boughtItem.txHash}</p>
        </div>
        <div className="w-[10%]">{
          boughtItem.voucher.tokenId
        }</div>


      </div>
      <div className="border-b mt-4"></div>
    </div>
  )
}

const PurchasedItemComponent = (props: Props) => {
  const { user } = useUserStore()

  const boughtItems = user?.boughtItems || []
  return (
    <div className="mt-10 p-8 overflow-x-auto whitespace-nowrap">

      <div className="border-b md:w-[100vw] w-[500vw] mt-4"></div>

      <div className='md:w-[100vw] w-[500vw]'>

        {boughtItems?.map((item, index) => (
          <NFTListItem index={index} key={item.createdAt} boughtItem={item} item={item.item} />
        ))}
      </div>
    </div>
  )
}

export default PurchasedItemComponent