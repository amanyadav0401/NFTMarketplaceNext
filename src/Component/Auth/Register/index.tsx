"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { Card, CardBody } from "@nextui-org/react"; // Import Card components
import Image from "next/image";
import { useUserStore } from "@/utils/Zustand";
import toast from "react-hot-toast";
import { IoArrowBackOutline } from "react-icons/io5";

function Register() {
  const router = useRouter();
  const { user } = useUserStore()

  const handleBusinessSignUpClick = () => {
    if (user?._id) {
      toast.error('Already Logged In')
      return
    }

    router.push('/auth/signup/busines');
  };

  const handleBusinessLoginClick = () => {
    if (user?._id) {
      toast.error('Already Logged In')
      return
    }
    router.push('/auth/login/busines');
  };

  const handlePersonalSignUpClick = () => {
    if (user?._id) {
      toast.error('Already Logged In')
      return
    }
    router.push('/auth/signup/personal');
  };

  const handlePersonalLoginClick = () => {
    if (user?._id) {
      toast.error('Already Logged In')
      return
    }
    router.push('/auth/login/personal');
  };

  return (
    <div className="bg-[#3F2D6D] min-h-screen flex justify-center items-center overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:max-w-8xl">
        <div className="md:hidden">
          <div className=" text-white text-center mt-10 mb-10 font-bold text-4xl">NFT - World.one</div>
        </div>
        <div className="bg-gray-400 bg-opacity-40 items-center h-auto md:h-[90vh] rounded-xl flex justify-center flex-shrink-0 max-w-2xl ml-5 mr-5">
          <Image height={550} width={600} className='' src="/Images/Saly-13.png" alt="Saly" />
        </div>

        <div className="p-4 mt-10">
          <div className='hidden gap-[1rem] mb-10 md:flex items-center'>
            <IoArrowBackOutline onClick={() => {
              router.push('/')
            }} className="text-white cursor-pointer text-2xl" />
            <div onClick={() => {
              router.push('/')
            }} className="cursor-pointer  text-white font-bold text-4xl">
              NFT - World
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            <Card className="bg-[#FFFFFF66] bg-opacity-40 rounded-xl shadow-xl p-4 max-w-3xl">
              <CardBody>
                <h1 className="text-white font-bold text-2xl mb-2">
                  Business Account
                </h1>
                <p className="text-white text-base mb-4">
                  Login or Sign Up to your Business Account. Access your Business Dashboard and manage your NFTs.
                </p>
                <div className="flex">
                  <button
                    className="bg-[#E377FF] hover:bg-[#E377FF] text-white font-medium text-sm uppercase px-3 py-2 rounded"
                    onClick={handleBusinessSignUpClick}
                  >
                    Sign Up
                  </button>
                  <button
                    className="bg-[#3F2D6D] hover:bg-[#3F2D6D] text-white font-medium text-sm uppercase px-3 py-2 rounded ml-2"
                    onClick={handleBusinessLoginClick}
                  >
                    Login
                  </button>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-[#FFFFFF66] bg-opacity-40 rounded-xl shadow-xl p-4 max-w-3xl">
              <CardBody>
                <h1 className="text-white font-bold text-2xl mb-2">
                  Personal Account
                </h1>
                <p className="text-white text-base mb-4">
                  Login or Sign Up to your Personal Account. Access your Personal Dashboard and manage your NFTs.
                </p>
                <div className="flex">
                  <button
                    className="bg-[#E377FF] hover:bg-[#E377FF] text-white font-medium text-sm uppercase px-3 py-2 rounded"
                    onClick={handlePersonalSignUpClick}
                  >
                    Sign Up
                  </button>
                  <button
                    className="bg-[#3F2D6D] hover.bg-[#3F2D6D] text-white font-medium text-sm uppercase px-3 py-2 rounded ml-2"
                    onClick={handlePersonalLoginClick}
                  >
                    Login
                  </button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
