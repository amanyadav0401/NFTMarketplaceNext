'use client'

import { useUserStore } from '@/utils/Zustand'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {
  children: React.ReactNode
}

const Template = ({ children }: Props) => {
  const { user } = useUserStore()
  const router = useRouter()

  useEffect(() => {
    if (user?._id) {
      router.push('/')
    }
  }, [])

  return (
    <>
      {children}
    </>
  )
}

export default Template