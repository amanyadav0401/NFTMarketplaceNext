'use client'

import React, { useEffect, useState, useRef } from 'react';
import Footer from '../Footer';
import Navbar from '../Navbar';
import Nav from '../Navbar/Nav';
import { useRouter } from 'next/navigation';

const App = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const router = useRouter();


  useEffect(() => {
    const vw = window.innerWidth;

    const handleScroll = () => {
      if (imageRef.current) {
        const imageWidth = imageRef.current.offsetWidth;
        const maxVerticalScroll = 2 * imageWidth // adjust for two images

        if (window.scrollY <= maxVerticalScroll) {
          setScrollPosition(-window.scrollY / 2);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const horizontalScroll = scrollPosition;

  return (
    <>
      <Nav />
      <div className='relative md:block hidden h-[250vw] '>
        <div className="h-[200vw] z-[-1] fixed w-[200vw] flex">
          <div className="h-[100vh] relative w-[100vw]" style={{ transform: `translateX(${horizontalScroll}px)` }}>
            <div className='absolute h-full w-full'>
              <div className='w-full absolute bottom-[4rem] flex justify-center mt-[8rem]'>
                <h1 className="text-4xl font-medium text-black relative font-Avenir tracking-normal text-center">
                  Grow your business with{" "}
                  <span className="text-[#E377FF]">NFT-World.One</span>
                </h1>
              </div>
              <div className='w-full px-[4rem] mt-[8rem] flex justify-between h-[60vh]'>
                <div className='h-[60vh]  flex items-end'>
                  <p className='text-2xl  px-[2rem] py-[2rem] rounded-lg bg-[#f5ecf0] font-bold text-[#3F2D6D]'>
                    Expanded<br /> Revenue Streams
                  </p>
                </div>
                <div className='h-[60vh]  flex items-start'>
                  <p className='text-2xl  px-[2rem] py-[2rem] rounded-lg bg-[#f5ecf0] font-bold text-[#3F2D6D]'>
                    NFT Marketplace<br /> Integration
                  </p>
                </div>
                <div className='h-[60vh]  flex items-end'>
                  <p className='text-2xl  px-[2rem] py-[2rem] rounded-lg bg-[#f5ecf0] font-bold text-[#3F2D6D]'>
                    Creative Branding
                  </p>
                </div>
              </div>
            </div>
            <img ref={imageRef} src="/Images/Agency/1.png" alt="Image 1" className="w-[100vw] h-[100vh]" />
          </div>
          <div className="h-[100vh] relative w-[100vw]" style={{ transform: `translateX(${horizontalScroll}px)` }}>
            <div className='absolute h-full w-full'>
              <div className='w-full flex justify-center mt-[8rem]'>
                <h1 className="text-4xl font-medium text-black relative font-Avenir tracking-normal text-center">
                  Fuel Your Partnership's NFT Journey with{" "}
                  <span className="text-[#E377FF]">NFT-World.One</span>
                </h1>
              </div>
              <div className='w-full px-[4vw] mt-[2rem] flex justify-between h-[55vh]'>
                <div className='h-[55vh]  flex items-end'>
                  <p className='text-2xl  px-[2rem] py-[2rem] rounded-lg bg-[#f5ecf0] font-bold text-[#3F2D6D]'>
                    Client Engagement<br /> and Retention
                  </p>
                </div>
                <div className='h-[55vh]  flex items-start'>
                  <p className='text-2xl  px-[2rem] py-[2rem] rounded-lg bg-[#f5ecf0] font-bold text-[#3F2D6D]'>
                    Supercharge Your<br /> Partnership's NFT Path to Profit.
                  </p>
                </div>
                <div className='h-[55vh]  flex items-end'>
                  <p className='text-2xl  px-[2rem] py-[2rem] rounded-lg bg-[#f5ecf0] font-bold text-[#3F2D6D]'>
                    Expanded<br /> Revenue Streams
                  </p>
                </div>
              </div>
            </div>
            <img src="/Images/Agency/2.png" alt="Image 2" className="w-[100vw] h-[100vh]" />
          </div>
        </div>
      </div >
      <div className="bg-[#3F2D6D] mt-[100px] md:flex-row flex-col flex gap-[1rem] md:gap-40 md:space-x-10">
        <div>
          <img
            src="/Images/Saly-19.svg"
            alt="Grow your business"
            className="w-[800px]"
          />
        </div>
        <div className="md:mt-40">
          <div>
            <p className="font-Avenir tracking-wide md:text-start text-center text-2xl text-white leading-loose">
              Elevate Your Partnership's NFT <br /> Game, Amplify Growth
            </p>
            <div className="flex md:justify-start justify-center gap-[2rem]">
              <button onClick={() => {
                router.push('/auth/login/agency')
              }} className="bg-[#E377FF] font-Avenir tracking-wide w-40 h-10 rounded-md text-white mt-5">
                Login
              </button>
              <button onClick={() => {
                router.push('/auth/signup/agency')
              }} className="bg-[#E377FF] font-Avenir tracking-wide w-40 h-10 rounded-md text-white mt-5">
                Register
              </button>
            </div>
          </div>

          <div className="md:mt-40 flex flex-col md:items-start items-center mb-[1rem] md:mb-[0] mt-[2rem]">
            <p className="font-Avenir tracking-wide text-2xl text-white leading-loose">
              Digital assets, real investments, <br /> endless possibilities
            </p>
            <button onClick={() => {
              router.push('/')
            }} className="bg-white font-Avenir tracking-wide w-40 h-10 rounded-md text-[#E377FF] mt-5">
              Marketplace
            </button>
          </div>
        </div>
      </div>
      <div className='bg-[#dfbefa]'>
        <Footer />
      </div>
    </>
  );
};

export default App;
