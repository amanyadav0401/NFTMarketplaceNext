'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

type Props = {}

const BuyCardComponent = ({ nft: card }: { nft: NFTItem }) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null)
  const router = useRouter()
  return (
    <div
      key={card._id}
      className="relative h-[300px] px-2 mb-4 cursor-pointer"
      onMouseEnter={() => setHoveredCardId(card._id)}
      onMouseLeave={() => setHoveredCardId(null)}

    >
      <div
        className={`bg-white h-[300px]  rounded-lg shadow-md p-4 ${hoveredCardId === card._id ? "shadow-lg" : "shadow-md"
          }`}
        style={{
          borderRadius: "12px",
          boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.10)",
        }}
      >
        <div

          className={`border block md:hidden rounded-lg border-gray-300 bg-white ${hoveredCardId === card._id ? "h-[150px]" : "h-[200px]"
            } transition-all duration-300`}
        >
          <Image
            height={200}
            width={200}
            src={card.images[0]}
            alt="Card"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <Link
          href={`/card/${card._id}`}
          className={`border md:block hidden rounded-lg border-gray-300 bg-white ${hoveredCardId === card._id ? "h-[150px]" : "h-[200px]"
            } transition-all duration-300`}
        >
          <Image
            height={200}
            width={200}
            src={card.images[0]}
            alt="Card"
            className="w-full h-full object-cover rounded-lg"
          />
        </Link>
        <div className="mt-4 truncate text-black font-semibold text-base">
          {card.name}
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="text-orange text-center font-semibold text-xs">
              {card.price}$
            </div>
            <div className="text-orange w-20 pl-2 flex items-center justify-center h-5 rounded-md font-semibold bg-orange-200 text-orange-500 text-xs">
              {
                `${(card.numOfTokens - card.purchasedTokens)} / ${card.numOfTokens}`
              }
            </div>
          </div>
        </div>
        <div
          className={`${hoveredCardId === card._id ? "opacity-1" : "opacity-0"
            } transition-opacity duration-300 space-x-1 absolute bottom-0 flex  right-2 left-2`}
        >
          <Link href={`/card/${card._id}`} className="flex-grow h-10 rounded-bl-lg bg-[#E377FF] inset-shadow-md flex items-center  justify-center">
            <p className="font-Avenir tracking-wide text-white font-semibold text-xs px-5 ">
              Add to Cart
            </p>
          </Link>
          <Link href={`/card/${card._id}`} className="flex-grow h-10 rounded-br-lg bg-[#E377FF] inset-shadow-md flex items-center  justify-center">
            <p className="font-Avenir tracking-wide text-white font-semibold text-xs px-5">
              Buy
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BuyCardComponent