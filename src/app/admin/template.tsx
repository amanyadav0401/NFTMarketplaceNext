'use client';

import { useAdminAnalyticsStore, useMyCollectionsStore, useMyItemsStore, useUserStore } from '@/utils/Zustand';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

type Props = {}

const Template = ({ children }: any) => {
  const { user, userLoading } = useUserStore()
  const router = useRouter()
  const { setMyItems } = useMyItemsStore()
  const { setMyCollections } = useMyCollectionsStore()
  const { setAdminAnalytics, adminAnalyticsLoading } = useAdminAnalyticsStore()

  useEffect(() => {
    if (!userLoading) {
      if (!user?._id) {
        router.push('/admin/login')
      } else {
        setMyItems()
        setMyCollections()
        if (user?.role === 'buisness') {
          router.push('/dashboard/brand')
        } else if (user?.role === 'agency') {
          router.push('/dashboard/agency')
        } else if (user?.role === 'personal') {
          router.push('/dashboard/personal')
        } else if (user?.role === 'admin') {
          setAdminAnalytics()
          router.push('/admin/dashboard')
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