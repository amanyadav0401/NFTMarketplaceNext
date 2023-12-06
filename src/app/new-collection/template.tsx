'use client';

import toastError from '@/Component/Model/Toast';
import { useUserStore } from '@/utils/Zustand';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

type Props = {
  children: React.ReactNode
}

const Template = ({ children }: Props) => {
  const { user, userLoading } = useUserStore()
  const router = useRouter()

  useEffect(() => {
    if (!userLoading && !user) {
      toastError('Please login first')
      router.push('/auth/register')
    }
  }, [userLoading])


  return (
    <>
      {children}
    </>
  )
}

export default Template