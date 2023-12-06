'use client'

import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

type Props = {}

const BackButton = (props: Props) => {
  return (
    <div onClick={() => {
      window.history.back()
    }} className='absolute cursor-pointer top-[40%] md:top-[45%] left-[10%]'>
      <FaArrowLeft className='text-white text-2xl' />
    </div>
  )
}

export default BackButton