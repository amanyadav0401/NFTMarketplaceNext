'use client';

import { useUserStore, usehowtoStore } from '@/utils/Zustand';
import React, { useEffect, useState } from 'react';
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from 'react-hot-toast'
import { ThirdwebProvider, metamaskWallet, paperWallet, magicLink } from '@thirdweb-dev/react'
import { Polygon, } from '@thirdweb-dev/chains';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HowToModal from '@/Component/Model/HowToModal';

type Props = {
  children: React.ReactNode
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const Template = ({ children }: Props) => {
  const { setUser } = useUserStore()
  const { isHowToOpen, setHowto } = usehowtoStore()

  useEffect(() => {
    setUser()
  }, [])
  return (
    <>
      <ThirdwebProvider supportedWallets={[
        metamaskWallet(), paperWallet({
          paperClientId: "9b0ec376-0df1-470c-81c0-84955e0e8232",
        }),
      ]} autoSwitch={true} supportedChains={[Polygon]} clientId='105a22d5ae52b8bf08028c35bf029968d4aff4f3559d0ed98606d1a564ee8125295a99d0e997ed57b805109db418be3385f00504093858811a3e73d1572cdb1d' activeChain={Polygon}>
        <NextUIProvider>
          <Elements stripe={stripePromise}>
            {children}
          </Elements>
          <HowToModal isOpen={isHowToOpen} onClose={() => setHowto(false)} size="md" />
        </NextUIProvider>
      </ThirdwebProvider>
      <Toaster />
    </>
  )
}

export default Template
