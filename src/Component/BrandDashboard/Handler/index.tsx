'use client'

import { useSearchParams } from 'next/navigation'
import React from 'react'
import Dashboard from '../Dashboard'
import Mis from '../Mis'
import Offer from '../Offer'

type Props = {}

const BrandDashboardHandler = (props: Props) => {
  const searchParam = useSearchParams()

  const tab = searchParam.get('tab') || ''
  return (
    <>
      {tab === '' && <Dashboard />}
      {tab === 'mis' && <Mis />}
      {tab === 'offer' && <Offer />}
    </>
  )
}

export default BrandDashboardHandler