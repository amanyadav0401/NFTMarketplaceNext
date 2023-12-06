'use client'

import { useMyCollectionsStore, useMyItemsStore, useUserStore } from '@/utils/Zustand'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {
  children: React.ReactNode
}

const Template = ({ children }: Props) => {
  const { user, userLoading } = useUserStore()
  const router = useRouter()
  const { setMyItems } = useMyItemsStore()
  const { setMyCollections } = useMyCollectionsStore()

  useEffect(() => {
    if (!userLoading) {
      if (!user?._id) {
        router.push('/')
      } else {
        setMyItems()
        setMyCollections()
        if (user?.role === 'buisness') {
          router.push('/dashboard/brand')
        } else if (user?.role === 'agency') {
          router.push('/dashboard/agency')
        } else if (user?.role === 'personal') {
          router.push('/dashboard/personal')
        }
      }
    }
  }, [userLoading, user])

  if (!user?._id && userLoading) {
    return <div className="flex flex-col justify-center items-center h-screen">
      <img src='/Images/blockchain.svg' alt="Sky branding logo" className="w-[10rem] h-[10rem]" />
      <p className="text-3xl font-medium text-center">
        Getting your dashboard ready...
      </p>
    </div>
  }

  return (
    <>
      {children}
    </>
  )
}

export default Template