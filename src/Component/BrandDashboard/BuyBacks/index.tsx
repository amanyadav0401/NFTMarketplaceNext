'use client'

import { useMyItemsStore } from '@/utils/Zustand'
import React from 'react'

type Props = {}

const BuyBacksList = (props: Props) => {
  const { myBuyBacks } = useMyItemsStore()

  return (
    <div className='w-full flex mt-[4rem] flex-wrap gap-[2rem]'>
      {myBuyBacks?.map((item, index) => (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src={item.item.images[0]} alt="Sunset in the mountains" />
          <div className="px-6 py-4">
            <div className="font-bold truncate text-xl mb-2">{item.item.name} {'( ' + item.applicants.length + ' / ' + item.numofTokens + ' )'}</div>

          </div>
          <div className="px-6 pt-4 pb-2">
            <button className='w-full h-[3rem] bg-blue-600 rounded-lg text-white font-bold' onClick={() => { }}>Buy Back</button>
          </div>
        </div>

      ))}
    </div>
  )
}

export default BuyBacksList