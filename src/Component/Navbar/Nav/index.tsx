'use client'
import React, { useState } from "react";
import Link from "next/link";
import { AiFillCaretDown, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";
import { stack as Menu } from "react-burger-menu";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useUserCartStore, useUserStore } from "@/utils/Zustand";
import { useRouter } from "next/navigation";
import { ConnectWallet } from "@thirdweb-dev/react";

interface NavProps {
  isOpen?: boolean;
  onClose?: () => void;
}

function Nav({ isOpen = false, onClose }: NavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUserStore();
  const { userCart } = useUserCartStore()
  const router = useRouter()

  let totalItems = 0;
  userCart?.forEach((item) => {
    totalItems += item.amount;
  })

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleGoToDashboard = () => {
    if (user?.role === 'personal') {
      router.push('/dashboard/personal')
    }
    if (user?.role === 'buisness') {
      router.push('/dashboard/brand')
    }
    if (user?.role === 'agency') {
      router.push('/dashboard/agency')
    }
    if (user?.role === 'admin') {
      router.push('/admin/dashboard')
    }
  }

  const menuIcon = isMenuOpen ? (
    <AiOutlineClose
      className="text-white text-2xl cursor-pointer sm:hidden"
      onClick={toggleMenu}
    />
  ) : (
    <AiOutlineMenu
      className="text-white text-2xl cursor-pointer sm:hidden"
      onClick={toggleMenu}
    />
  );

  const links = [{
    name: 'User',
    link: '/auth/login/personal'
  },
  {
    name: 'Brand',
    link: '/auth/login/busines'
  },
  {
    name: 'Partner',
    link: '/agency'
  }
  ]

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 w-full z-[20] bg-[#3F2D6D] flex items-center h-[100px]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-4">
              {menuIcon}
              <Link href="/">
                <h4 className="font-Avenir whitespace-nowrap font-semibold tracking-wide text-2xl text-white cursor-pointer">
                  NFT - World
                </h4>
              </Link>
            </div>
            <div className="hidden sm:flex items-center gap-10">
              <p onClick={() => {
                router.push('/about-us')
              }} className="font-Avenir cursor-pointer tracking-wide text-white">
                About Us
              </p>
              <p onClick={() => {
                router.push('/fresh')
              }} className="font-Avenir cursor-pointer tracking-wide text-white">
                Fresh
              </p>
              {!user?._id && <div className="relative cursor-pointer">
                {/* Dropdown Menu */}
                <Dropdown>
                  <DropdownTrigger>
                    <div className="flex items-center gap-2">
                      <p className="font-Avenir font-semibold tracking-wide text-white">
                        Explore
                      </p>
                      <AiFillCaretDown className="text-white" />
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Static Actions"
                    className="w-full"
                  >
                    {links.map((item, index) => (
                      <DropdownItem key={index}>
                        <Link href={item.link}>
                          <div className="py-2 px-4 font-Avenir tracking-wide cursor-pointer">
                            {item.name}
                          </div>
                        </Link>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>}
              <ConnectWallet modalSize="compact" theme={"light"} />
              {!user?._id && (
                <Link
                  href="/auth/register"
                  className="font-Avenir tracking-wide text-[#E377FF]"
                >
                  Login | Signup
                </Link>
              )}
              {user?._id && (
                <p
                  onClick={handleGoToDashboard}
                  className="font-Avenir cursor-pointer tracking-wide text-[#E377FF]"  >
                  Dashboard
                </p>
              )}
              {user?._id && (
                <p
                  onClick={() => {
                    localStorage.removeItem('token')
                    let url = window.location.origin
                    window.location.replace(url)
                  }}
                  className="font-Avenir cursor-pointer tracking-wide text-[#E377FF]"  >
                  Logout
                </p>
              )}
              <div className="ml-4 relative">
                <MdOutlineShoppingCart onClick={() => {
                  router.push('/checkout')
                }} className="text-white w-10 h-10 cursor-pointer variant-flat " />
                <div className="absolute top-0 right-0 w-4 h-4 bg-[#E377FF] rounded-full flex items-center justify-center text-white text-xs">
                  {totalItems}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <Menu
        isOpen={isMenuOpen}
        onStateChange={({ isOpen }) => setIsMenuOpen(isOpen)}
        customBurgerIcon={false}
        customCrossIcon={false}
        className="bg-[#3F2D6D] md:hidden items-between flex flex-col"
      >
        <div>
          <div className="ml-5 mt-5">
            <Link
              href="/about-us"
              className="menu-item font-Avenir tracking-wide text-white"
            >
              About Us
            </Link>
          </div>
          <div className="ml-5 mt-5">
            <Link
              href="/fresh"
              className="menu-item font-Avenir tracking-wide text-white"
            >
              Fresh
            </Link>
          </div>

          {!user?._id && <div className="relative menu-item ml-5 mt-5">
            <Dropdown>
              <DropdownTrigger>
                <div className="flex items-center gap-2">
                  <p className="font-Avenir font-semibold tracking-wide text-white">
                    Explore
                  </p>
                  <AiFillCaretDown className="text-white" />
                </div>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Static Actions"
                className="w-full"
              >
                {links.map((item, index) => (
                  <DropdownItem key={index}>
                    <Link href={item.link}>
                      <div className="py-2 px-4 font-Avenir tracking-wide cursor-pointer">
                        {item.name}
                      </div>
                    </Link>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>}
          <div className="ml-5 mt-5">
            {!user?._id && <Link
              href="/auth/register"
              className="menu-item font-Avenir tracking-wide text-white"
            >
              Login | Signup
            </Link>}
            {
              user?._id && <p
                onClick={handleGoToDashboard}
                className="menu-item font-Avenir tracking-wide text-white"  >
                Dashboard
              </p>
            }
          </div>
          {
            user?._id && <div className="ml-5 mt-5">
              <p
                onClick={() => {
                  localStorage.removeItem('token')
                  let url = window.location.origin
                  window.location.replace(url)

                }}
                className="menu-item font-Avenir tracking-wide text-white"  >
                Logout
              </p>
            </div>
          }
        </div>
        <div className="ml-5 mt-5">
          <ConnectWallet modalSize="compact" theme={"light"} />
        </div>
      </Menu>
    </div>
  );
}

export default Nav;
