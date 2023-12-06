'use client'

import { APIClient, getEthPrice } from '@/utils/APIClient'
import { useMyItemsStore } from '@/utils/Zustand'
import useCreateParcel from '@/utils/web3/createVoucher'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDisclosure } from '@nextui-org/react'
import BuyBackModal from '@/Component/Model/BuyBackModal'
import { MdOutlineEdit } from 'react-icons/md'
import CreateItemModal from '@/Component/Model/CreateItemModal/CreateItemModal'

type Props = {}

const formatDate = (date: (string | Date)) => {
  const d = new Date(date);
  const month = d.toLocaleString("default", { month: "short" });
  const day = d.getDate();
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};

const NFTListItem = ({ item, setMyItems, index }: { item: NFTItem, setMyItems: () => Promise<void>, index: number }) => {
  const [loading, setLoading] = useState(false)
  const { createParcel, isCreatingVoucher } = useCreateParcel()
  const { isOpen, onOpen, onOpenChange, } = useDisclosure()
  const { isOpen: createOpen, onClose, onOpen: handleOpen, onOpenChange: handleOpenChange } = useDisclosure()
  const router = useRouter()
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    item.liveOn
  )
  const [dropDownOpen, setDropdownOpen] = useState(false)


  const options = [
    {
      label: "On Marketplace",
      value: "marketplace"
    },
    {
      label: "On Storefront",
      value: "storefront"
    }
  ];

  const handleCheckboxChange = (option: { label: string, value: string }) => {
    if (selectedOptions.includes(option.value)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option.value));
    } else {
      setSelectedOptions([...selectedOptions, option.value]);
    }
  };

  const handleCreateVoucher = async () => {
    try {
      setLoading(true)
      const ethPrice = await getEthPrice()
      const amountInEth = (Number(item.price) / Number(ethPrice))

      if (!item.collectionAddress) return toast.error('No collection address found')

      const newP = await createParcel(index, item.numOfTokens, amountInEth, item.royality || 0, item.name, item.collectionAddress)

      const newParcel = newP?.newParcel

      if (!newParcel) return

      const updatedItem = await APIClient.put(`items/${item._id}`, {
        json: {
          vouchers: [newParcel],
          status: 'pending'
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

  const handleSelectLiveOn = async () => {
    try {
      setLoading(true)
      await APIClient.put(`items/${item._id}`, {
        json: {
          liveOn: selectedOptions
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setMyItems()
    }
    catch (err: any) {
      const error = await err?.response?.json()
      toast.error(error?.message || 'Something went wrong')
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-5 md:w-auto w-[500vw] cursor-pointer">
      <div className="flex space-x-20 font-semibold font-Avenir whitespace-nowrap">
        <div className="md:w-[10%] w-[20%] grow"></div>
        <div className="md:w-[10%] w-[30%]">NFT Name</div>
        <div className="md:w-[10%] w-[30%]">Date</div>
        <div className="md:w-[10%] w-[30%]">Sales</div>
        <div className="md:w-[15%] w-[30%]">Status</div>
        <div className="md:w-[10%] w-[30%]">Price ($)</div>
        <div className="md:w-[15%] w-[30%]">Status</div>
        <div className="md:w-[10%] w-[30%]">Stock</div>
        <div className="md:w-[10%] w-[30%]"></div>
        {/* <div className=""></div> */}
      </div>
      <div className="flex space-x-20 items-center">
        <div className="w-[20%] md:w-[10%] flex flex-col items-center">
          <div className='relative'>
            <Image
              height={160}
              width={160}
              onClick={() => {
                router.push(`/card/${item._id}`)
              }}
              src={item.images?.[0]}
              alt="Product"
              className="object-cover w-[80px] rounded-md h-[80px] mb-5"
              style={{
                boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.10)",
              }}
            />
            {item.status === 'inactive' && <button onClick={() => {
              handleOpenChange()
            }} className="absolute top-[-10px] cursor-pointer h-[25px] flex items-center justify-center w-[25px] rounded-full bg-[#E377FF] text-white right-[-10px]">
              <MdOutlineEdit className="text-white h-full w-full p-[4px]" />
            </button>}
          </div>
          <button onClick={onOpen} className="text-[#E377FF]">Buy Back</button>
        </div>
        <div className="md:w-[10%] w-[30%] truncate">{item.name}</div>
        <div className="md:w-[10%] w-[30%] truncate">{formatDate(item?.createdAt || new Date().toISOString())}</div>
        <div className="md:w-[10%] w-[30%]">{item.purchasedTokens}</div>
        <div className="md:w-[15%] w-[30%] text-[#E377FF]">{
          item.status?.charAt(0).toUpperCase() + item.status?.slice(1)
        }</div>
        <div className="md:w-[10%] w-[30%]">{item.price}</div>
        <div className="md:w-[15%] w-[30%]">
          {
            item.liveOn?.map((live, index) => {
              if (live === 'marketplace') return <p key={index} className="text-[#E377FF] truncate">Marketplace</p>
              if (live === 'storefront') return <p key={index} className="text-[#E377FF] truncate">Storefront</p>
              if (live === 'external-marketplace') return <p key={index} className="text-[#E377FF] truncate">External</p>
            })
          }
          {
            item.liveOn?.length === 0 && <p className="text-[#E377FF]">N/A</p>
          }
        </div>
        <div className="md:w-[10%] w-[30%]">{item.numOfTokens}</div>

        <div>
          {/* <MdOutlineEdit className="w-5 h-5" />
        </div>
        <div>
          <PiDotsThreeOutlineVerticalLight className="w-5 h-5" /> */}
          {
            item.status === 'inactive' && <button disabled={loading}
              className="bg-[#E377FF] disabled:opacity-50 text-white px-4 py-1 rounded-md"
              onClick={handleCreateVoucher}
            >
              {
                loading ? 'Minting...' : 'Mint NFT'
              }
            </button>
          }
          {
            item.status === 'pending' && <button
              className="bg-[#E377FF] disabled:opacity-50 text-white px-4 py-1 rounded-md"
              onClick={handlePublishVoucher}
              disabled={loading}
            >
              {
                loading ? 'Publishing...' : 'Publish NFT'
              }
            </button>
          }
          {(item.status === 'active' || item.status === 'sold') && (
            <>
              <button
                className="bg-[#E377FF] disabled:opacity-50 text-white px-4 py-1 rounded-md"
                onClick={() => setDropdownOpen(!dropDownOpen)}
                disabled={loading}
              >
                NFT Live On
              </button>
              {dropDownOpen && <div className="absolute z-[1] md:w-[250px] w-[220px] right-0  mt-2 bg-white border rounded-md border-gray-200 shadow-md p-4">
                {options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center p-1 space-x-2"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox cursor-pointer w-4 h-4"
                      value={option.value}
                      checked={selectedOptions.includes(option.value)}
                      onChange={() => handleCheckboxChange(option)}
                    />
                    <span className="text-sm font-Avenir tracking-wide">
                      {option.label}
                    </span>
                  </label>
                ))}
                <button
                  className="mt-3 bg-[#E377FF] hover:bg-[#E377FF] text-white px-3 py-1 rounded"
                  onClick={handleSelectLiveOn}
                >
                  Done
                </button>
              </div>}
            </>
          )}
        </div>
      </div>
      <div className="border-b mt-4"></div>
      <CreateItemModal nft={item} onModalClose={onClose} isOpen={createOpen} onOpenChange={handleOpenChange} />
      <BuyBackModal isOpen={isOpen} tokensSold={
        item.purchasedTokens
      } onOpenChange={onOpenChange} itemId={item?._id} itemName={item.name} />
    </div>
  )
}

const MyItemsComponent = (props: Props) => {
  const { myItems, myItemsLoading, setMyItems } = useMyItemsStore()
  return (
    <div className="mt-10 p-8 overflow-x-auto whitespace-nowrap">

      <div className="border-b mt-4"></div>

      {
        myItemsLoading && <div className="flex justify-center items-center mt-10">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      }

      {!myItemsLoading && myItems?.map((item, index) => (
        <NFTListItem index={index} setMyItems={setMyItems} key={item.name} item={item} />
      ))}
    </div>
  )
}

export default MyItemsComponent