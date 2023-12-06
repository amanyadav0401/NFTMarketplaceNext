'use client'

import { APIClient, getEthPrice } from '@/utils/APIClient'
import { useMyCollectionsStore, useMyItemsStore } from '@/utils/Zustand'
import useCreateParcel from '@/utils/web3/createVoucher'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDisclosure } from '@nextui-org/react'
import BuyBackModal from '@/Component/Model/BuyBackModal'
import { useCollection } from '@/utils/web3/createCollection'

type Props = {}

const formatDate = (date: (string | Date)) => {
  const d = new Date(date);
  const month = d.toLocaleString("default", { month: "short" });
  const day = d.getDate();
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};

const NFTListItem = ({ item: itemData, setMyItems, index }: { item: Collection, setMyItems: () => Promise<void>, index: number }) => {
  const [loading, setLoading] = useState(false)
  const { createParcel, isCreatingVoucher } = useCreateParcel()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const router = useRouter()
  const [item, setItem] = useState<Collection>(itemData)
  const { createCollection, loading: collectionLoading } = useCollection()


  const handlePublishVoucher = async () => {
    try {
      setLoading(true)
      await APIClient.put(`items/${item._id}`, {
        json: {
          status: 'active'
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setMyItems()
    }
    catch (err: any) {
      console.log(err)
    }
    finally {
      setLoading(false)
    }
  }

  const handleChangeState = async (status: string) => {
    console.log(status)
    try {
      setLoading(true)
      await APIClient.put(`collection/${item._id}`, {
        json: {
          status
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setMyItems()
    }
    catch (err: any) {
      console.log(err)
    }
    finally {
      setLoading(false)
    }
  }

  const handleDeploy = async () => {
    const updatedCollection = await createCollection(item._id, item.name, item.symbol, item.royalty)
    if (updatedCollection) {
      setItem(updatedCollection)
    }
  }


  return (
    <div className="mt-5 cursor-pointer">
      <div className="flex space-x-20 font-semibold font-Avenir overflow-x-auto whitespace-nowrap">
        <div className="w-[10%]"></div>
        <div className="w-[10%]">Collection Name</div>
        <div className="w-[10%]">Creator</div>
        <div className="w-[10%]">Symbol</div>
        <div className="w-[15%]">Status</div>
        <div className="w-[10%]">Royality (%)</div>
        <div className="w-[15%]">Status</div>
        <div className="w-[10%]">Category</div>
        <div className="w-[10%]"></div>
      </div>
      <div className="flex space-x-20 items-center">
        <div className="w-[10%] flex flex-col items-center">
          <Image
            height={160}
            width={160}
            onClick={() => {
              // router.push(`/card/${item._id}`)
            }}
            src={item.logo}
            alt="Product"
            className="object-cover rounded-md w-[80px] h-[80px] mb-5"
            style={{
              boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.10)",
            }}
          />
          {/* <button onClick={onOpen} className="text-[#E377FF]">Buy Back</button> */}
        </div>
        <div className="w-[10%] truncate">{item.name}</div>
        <div className="w-[10%] truncate">{item.creatorAddress}</div>
        <div className="w-[10%]">{item.symbol}</div>
        <div className="w-[15%] text-[#E377FF]">{
          item.status?.charAt(0).toUpperCase() + item.status?.slice(1)
        }</div>
        <div className="w-[10%]">{item.royalty}</div>
        <div className="w-[15%] text-[#E377FF]">
          {
            item.status === 'pending' ? 'Not Deployed' : item.status === 'active' ? 'Deployed' : 'Hidden'
          }

        </div>
        <div className="w-[10%] truncate">{item.category?.toUpperCase()}</div>

        <div className='w-[10%]'>
          {/* <MdOutlineEdit className="w-5 h-5" />
        </div>
        <div>
          <PiDotsThreeOutlineVerticalLight className="w-5 h-5" /> */}
          {
            item.status === 'inactive' && <button disabled={loading}
              className="bg-[#E377FF] disabled:opacity-50 text-white px-4 py-1 rounded-md"
              onClick={() => handleChangeState('active')}
            >
              {
                loading ? 'Activating...' : 'Activate'
              }
            </button>
          }
          {
            item.status === 'pending' && <button
              className="bg-[#E377FF] disabled:opacity-50 text-white px-4 py-1 rounded-md"
              onClick={handleDeploy}
              disabled={collectionLoading}
            >
              {
                collectionLoading ? 'Deploying...' : 'Deploy'
              }
            </button>
          }
          {(item.status === 'active') && (
            <button
              className="bg-[#E377FF] disabled:opacity-50 text-white px-4 py-1 rounded-md"
              onClick={() => handleChangeState('inactive')}
              disabled={loading}
            >
              Hide
            </button>

          )}
        </div>
      </div>
      <div className="border-b mt-4"></div>
    </div>
  )
}

const MyCollectionsComponent = (props: Props) => {
  const { myItems, myItemsLoading, setMyItems } = useMyItemsStore()
  const { myCollections, myCollectionsLoading, setMyCollections } = useMyCollectionsStore()
  return (
    <div className="mt-10 p-8 overflow-x-auto whitespace-nowrap">

      <div className="border-b md:w-[100vw] w-[500vw] mt-4"></div>

      {
        myCollectionsLoading && <div className="flex justify-center items-center mt-10">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      }

      <div className='md:w-[100vw] w-[500vw]'>

        {!myCollectionsLoading && myCollections?.map((item, index) => (
          <NFTListItem index={index} setMyItems={setMyCollections} key={item._id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default MyCollectionsComponent