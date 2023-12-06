'use client'

import { APIClient } from '@/utils/APIClient'
import { useUserStore } from '@/utils/Zustand'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'


type Props = {
  buyback: BuyBack
}

const BuyBackCard = ({ buyback: buyBackFromServer }: Props) => {
  const router = useRouter()
  const [hoveredCardId, setHoveredCardId] = React.useState<string | null>(null)
  const [buyback, setBuyback] = React.useState<BuyBack>(buyBackFromServer)
  const { user } = useUserStore()
  const [applying, setApplying] = React.useState(false)

  const handleApplyForBuyBack = async () => {
    try {
      if (!user?._id) {
        toast.error('Login to Apply')
        return
      }

      if (!user?.account) {
        toast.error('Go to Profile and Connect Stripe Account for receiving payments')
        return
      }

      if (buyback.applicants.length === buyback.numofTokens) {
        toast.error('Max. Applicants')
        return
      }
      if (buyback.applicants.map(applicant => applicant.user._id).includes(user._id)) {
        toast.error('Already Applied')
        return
      }
      setApplying(true)
      const data = await APIClient.put(`buybacks/apply`, {
        json: {
          buyBackId: buyback._id
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      const res: any = await data.json()
      if (res.success) {
        setBuyback(res.buyBack)
        toast.success('Successfully Applied')
      }
    }
    catch (e: any) {
      console.log(e)
      const error = await e?.response?.json()
      toast.error(error?.message)
    }
    finally {
      setApplying(false)
    }
  }

  return (
    <div
      key={buyback._id}
      className="relative px-2 mb-10 w-[300px] cursor-pointer"
      onMouseEnter={() => setHoveredCardId(buyback._id)}
      onMouseLeave={() => setHoveredCardId(null)}

    >
      <div
        className={`bg-white h-full rounded-lg shadow-md p-4 ${hoveredCardId === buyback._id ? "shadow-lg" : "shadow-md"
          }`}
        style={{
          borderRadius: "12px",
          boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.10)",
        }}
      >
        <div
          className={`border rounded-lg border-gray-300 bg-white ${hoveredCardId === buyback._id ? "sm:h-[200px] h-[100px]" : "sm:h-[200px] h-[130px]"
            } transition-all duration-300`}
        >
          <img
            src={buyback.item.images[0]}
            alt="Card"
            className="w-full h-full rounded-lg"
          />
        </div>
        <div className="mt-4 text-black truncate font-semibold text-base">
          {buyback.item.name}
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="text-orange text-center font-semibold text-xs">
              {buyback.price}$
            </div>
            <div className="text-orange w-20 pl-2 flex items-center justify-center h-5 rounded-md font-semibold bg-orange-200 text-orange-500 text-xs">
              {
                buyback.applicants.length + ' / ' + buyback.numofTokens
              }
            </div>
          </div>
        </div>
        <div
          className={`${hoveredCardId === buyback._id ? "opacity-1" : "opacity-0"
            } transition-opacity duration-300 space-x-1 absolute bottom-0 flex  right-2 left-2`}
        >
          <div className="flex-grow h-10 rounded-bl-lg bg-[#E377FF] inset-shadow-md flex items-center  justify-center">
            <button onClick={handleApplyForBuyBack} className="font-Avenir tracking-wide text-white font-semibold text-xs px-5 ">
              {
                buyback.applicants.length === buyback.numofTokens ? 'Max. Applicants' : !user?._id ? 'Login to Apply' : buyback.applicants.map(applicant => applicant.user._id).includes(user._id) ? 'Applied' : applying ? 'Applying...' : 'Apply'
              }
            </button>
          </div>
          <div className="flex-grow h-10 rounded-br-lg bg-[#E377FF] inset-shadow-md flex items-center  justify-center">
            <button onClick={() => router.push(`/card/${buyback.item._id}`)} className="font-Avenir tracking-wide text-white font-semibold text-xs px-5">
              Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyBackCard