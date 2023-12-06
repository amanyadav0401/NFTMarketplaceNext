'use client'

import React, { useEffect, useState } from 'react'
import Nav from '../Navbar/Nav'
import BackButton from '../Micro/BackButton'
import Footer from '../Footer'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation'
import { goToDashboard } from '@/utils/Constants'
import { useUserStore } from '@/utils/Zustand'


type Props = {}

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  return (
    <div className='mb-[1rem] w-full'>
      <p className='font-bold text-[18px]'>
        {question}
      </p>
      <p className=' text-[18px]'>
        {answer}
      </p>
    </div>
  )
}

const Step1 = ({
  currentStep,
  numOfSteps,
  handleBack,
  handleNext,
  setCurrentStep
}: {
  currentStep: number,
  numOfSteps: number,
  handleBack: () => void,
  handleNext: () => void,
  setCurrentStep: (step: number) => void
}
) => {
  return (
    <div className='w-full relative h-auto p-[3%]'>
      <div className='md:w-[80%] w-full bg-[#f5f4ff] h-auto p-[3%]'>
        <div className='md:w-[70%] w-full'>
          <FaqItem question='What are NFT Buy-Back Programs?' answer={`Brands can offer to repurchase NFTs from customers, often at a set rate or the current market value, providing a cash-back benefit that encourages continued engagement with the brand's products and services.`} />
          <FaqItem question='How do Wellness Challenge NFTs work?' answer={`Brands can host wellness challenges where customers earn NFTs for completing fitness activities like exercise or yoga. These tokens can then be collected and redeemed for merchandise or vouchers, rewarding healthy lifestyles.`} />
          <FaqItem question='Can NFTs act as Warranty or Guarantee Certificates?' answer={`Yes, NFTs can be utilized as digital proof of warranties or guarantees for products, allowing for secure and verifiable ownership, as well as the ability to transfer or redeem for future purchase discounts.`} />
          <FaqItem question='What are Tiered Buy-Back Offers?' answer={`Brands can implement a tiered system for their NFT buy-back programs, where the value of the NFT increases with the customer's level of engagement or the duration of NFT ownership, thus promoting and rewarding brand loyalty.`} />
          <FaqItem question='How do NFT Auctions work?' answer={`Brands can organize auctions for customers to sell their NFTs, with a minimum buy-back price guaranteed. This creates a dynamic marketplace and encourages community interaction.`} />
          <FaqItem question='What are Interactive Storytelling NFTs?' answer={`Brands can create immersive, narrative-driven challenges that integrate real-world activities. Customers can mint NFTs at each storyline milestone, adding a gamified element to brand interaction.`} />
          <FaqItem question='What are Carbon Offset Rewards?' answer={`For environmentally conscious commuting, such as cycling or using public transport, brands can issue NFTs that customers can redeem for carbon credits or donations to environmental projects.`} />
        </div>
        <div className="flex w-full mt-[3rem] justify-center md:justify-start gap-[1rem]">

          <Button
            onClick={handleNext}
            className="text-center bg-[#3f2d6d] disabled:text-black disabled:bg-[#d0d0d0] hover:bg-[#E377FF] text-white font-medium text-sm uppercase px-3 py-2 rounded"
          >
            {
              currentStep === numOfSteps ? "Close" : "Next"
            }
          </Button>

        </div>
        <div className='flex w-full mt-[5rem] justify-center gap-[1rem]'>

          {
            Array.from(Array(numOfSteps), (e, i) => {
              return (
                <div key={i} onClick={() => {
                  setCurrentStep(i + 1)
                }} className={`w-[8%] cursor-pointer rounded-md h-[10px] ${(currentStep === (i + 1)) ? 'bg-[#3f2d6d]' : 'bg-[#d0d0d0]'}`}></div>
              )
            })
          }
        </div>
      </div>
      <div className='h-full md:flex hidden items-center absolute top-0 right-[10%]'>
        <div style={{
          boxShadow: '0px 4px 4px 4px rgba(0, 0, 0, 0.10)'
        }} className='bg-white'>
          <Image alt='faq1' src='/Images/faq1.png' className='h-auto w-[28vw]' width={400} height={400} />
        </div>
      </div>
    </div>
  )
}
const Step2 = ({
  currentStep,
  numOfSteps,
  handleBack,
  handleNext,
  setCurrentStep
}: {
  currentStep: number,
  numOfSteps: number,
  handleBack: () => void,
  handleNext: () => void,
  setCurrentStep: (step: number) => void
}
) => {

  return (
    <div className='w-full relative flex justify-end h-auto p-[3%]'>
      <div className='md:w-[80%] w-full flex flex-col items-end bg-[#f5f4ff] h-auto p-[3%]'>
        <div className='md:w-[70%] w-full'>
          <FaqItem question='How does earning with Learning for Points NFTs work?' answer={`Brands can develop educational content on their platforms where users can earn NFTs for completing quizzes or learning modules. Accumulated points from these NFTs can unlock special brand content or discounts.`} />
          <FaqItem question='What are Eco-Consumer Tokens?' answer={`Brands can reward customers who use reusable containers with NFTs at participating locations. These tokens can be exchanged for discounts or eco-friendly merchandise, promoting sustainability.`} />
          <FaqItem question='Can customers benefit from Dynamic Pricing NFTs?' answer={`With dynamic pricing, brands can offer NFTs whose buy-back value fluctuates based on market trends and customer loyalty, allowing customers to capitalize on the value of their tokens.`} />
          <FaqItem question='What is the Safe Driver NFT program?' answer={`By tracking safe driving habits via a connected app, brands can reward customers with NFTs for reaching safety milestones, which can then be exchanged for discounts or related merchandise.`} />
          <FaqItem question='How does NFT Staking for Discounts work?' answer={`Customers can "stake" their NFTs on a brand's platform to earn loyalty points or discounts over time, incentivizing sustained engagement and interaction with the brand.`} />
          <FaqItem question='What do Augmented Reality NFTs offer?' answer={`Brands can provide exclusive AR experiences that are only accessible to NFT holders, offering them discounts or promotional content within an immersive experience.`} />
          <FaqItem question='How do NFTs for Virtual Queues enhance the shopping experience?' answer={`Brands can allow customers to use NFTs for priority access during product launches or sales, functioning like a virtual "fast pass" and enhancing the customer's purchasing journey.`} />
        </div>
        <div className="flex md:w-[70%] w-full mt-[3rem] justify-center md:justify-start gap-[1rem]">
          <Button
            disabled={currentStep === 1}
            onClick={handleBack}
            className="text-center bg-[#3f2d6d] disabled:text-black disabled:bg-[#d0d0d0] hover:bg-[#E377FF] text-white font-medium text-sm uppercase px-3 py-2 rounded"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={false}
            className="text-center bg-[#3f2d6d] disabled:text-black disabled:bg-[#d0d0d0] hover:bg-[#E377FF] text-white font-medium text-sm uppercase px-3 py-2 rounded"
          >
            {
              "Close"
            }
          </Button>

        </div>
        <div className='flex w-full mt-[5rem] justify-center gap-[1rem]'>

          {
            Array.from(Array(numOfSteps), (e, i) => {
              return (
                <div key={i} onClick={() => {
                  setCurrentStep(i + 1)
                }} className={`w-[8%] cursor-pointer rounded-md h-[10px] ${(currentStep === (i + 1)) ? 'bg-[#3f2d6d]' : 'bg-[#d0d0d0]'}`}></div>
              )
            })
          }
        </div>
      </div>
      <div className='h-full hidden md:flex items-center absolute top-0 left-[10%]'>
        <div style={{
          boxShadow: '0px 4px 4px 4px rgba(0, 0, 0, 0.10)'
        }} className='bg-white'>
          <Image alt='faq1' src='/Images/faq2.png' className='h-auto w-[28vw]' width={400} height={400} />
        </div>
      </div>
    </div>
  )
}

const BrandFaqsComponent = (props: Props) => {
  const numOfSteps = 2
  const [currentStep, setCurrentStep] = useState(1)
  const router = useRouter()
  const { user } = useUserStore()

  const handleNext = () => {
    if (currentStep < numOfSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      if (user?._id) {
        goToDashboard(user, router)
      } else {
        router.push('/')
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <>
      <Nav />
      <div className='h-[20vh] relative mt-[100px] w-full bg-[#E377FF] flex items-center justify-center'>
        <h1 className='text-white md:w-full w-[60%] text-center text-xl md:text-3xl'>
          NFT Engagement Initiatives: Frequently Asked Questions
        </h1>
        <BackButton />
      </div>
      <div className='w-[100%] overflow-hidden'>
        <motion.div animate={{
          x: currentStep === 1 ? 0 : '-50%'
        }} transition={{
          duration: 0.5
        }} className='w-[200%] flex'>
          <Step1 currentStep={currentStep} numOfSteps={numOfSteps} handleBack={handleBack} handleNext={handleNext} setCurrentStep={setCurrentStep} />
          <Step2 currentStep={currentStep} numOfSteps={numOfSteps} handleBack={handleBack} handleNext={handleNext} setCurrentStep={setCurrentStep} />
        </motion.div>
      </div>
      <Footer />
    </>
  )
}

export default BrandFaqsComponent