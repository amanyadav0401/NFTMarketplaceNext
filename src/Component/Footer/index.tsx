'use client'
import React from "react";
import useWindowWidth from "../Model/useWindowWidth";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import { RiInstagramFill } from "react-icons/ri";


const socials = {
  twitter: "https://twitter.com/Nftworldone",
  facebook: "https://www.facebook.com/nftworld.one/",
  linkedin: "https://www.linkedin.com/company/zerocarbonone/?viewAsMember=true",
  discord: "https://discord.com/channels/1166795553082974278/1166795553598869506",
  instagram: "https://www.instagram.com/nftworldone/",
};

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

function Footer() {
  const { isPhoneScreen } = useWindowWidth();

  return (
    <div>
      <div className="relative w-full h-full flex-shrink-0">
        <div
          className="absolute footer-grad inset-0"
        // style={{
        //   opacity: 0.5,
        //   background:
        //     "linear-gradient(91deg, #13AAFF 0%, #E377FF 34.19%, #E06C6E 72.04%, #0A93FA 102.2%)",
        // }}
        ></div>
        <div className="flex flex-col p-10 items-center md:flex-row md:justify-between md:ml-10 md:mr-10 relative ">
          <div>
            <h2 className="text-[#3F2D6D] font-Avenir font-semibold tracking-wide text-4xl">
              NFT - World
            </h2>
          </div>
          <div
            className={`mt-5 md:mt-0 md:flex hidden`}
          >
            <div className="flex gap-10 cursor-pointer">
              <Link href={socials.twitter} target="_blank">
                <img
                  src="/Images/twitter.svg"
                  alt="twitter"

                  className={`w-10 cursor-pointer h-10 text-[#3F2D6D] ${isPhoneScreen ? "block" : "flex"
                    }`}
                />
              </Link>
              <Link href={socials.facebook} target="_blank">
                <img
                  src="/Images/facebook.svg"
                  alt="facebook"
                  className={`w-10 h-10 text-[#3F2D6D] ${isPhoneScreen ? "block" : "flex"
                    }`}
                />
              </Link>
              <Link href={socials.discord} target="_blank">
                <img
                  src="/Images/discord.svg"
                  alt="discord"
                  className={`w-10 h-10 text-[#3F2D6D] ${isPhoneScreen ? "block" : "flex"
                    }`}
                />
              </Link>
              <Link href={socials.instagram} target="_blank">
                <RiInstagramFill className="text-white text-[38px]" />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:flex-row md:justify-between md:ml-20 md:mr-20 relative ">
          <div className="flex flex-col md:flex-row items-center gap-4 md:mb-0 mb-10">
            <p className="font-Avenir tracking-wide text-[#3F2D6D]">
              A Product by
            </p>
            <img
              src="/Images/blockchain.svg"
              alt="Company Logo"
              className="h-[35px]"
            />
            <p className="font-Avenir md:text-start text-center font-semibold tracking-wide text-[#3F2D6D] ">
              BLOCKCHAIN LABS LLC <br />
              <span className="text-[14px]">WY 82801,United States</span>
            </p>
          </div>
          <div className="flex md:w-[50vw] w-full flex-wrap md:justify-start justify-center items-center gap-[1rem] text-[#3F2D6D] mt-10 md:mt-0">
            <Link href="/faqs" className="font-Avenir tracking-wide">
              FAQs
            </Link>
            <Link href="/brand-faqs" className="font-Avenir tracking-wide">
              Brand FAQs
            </Link>
            <Link href="/fresh" className="font-Avenir tracking-wide">
              Fresh
            </Link>
            <div>
              <Dropdown>
                <DropdownTrigger>
                  <div className="flex items-center gap-1">
                    <p className="font-Avenir tracking-wide text-[#3F2D6D]">
                      Explore
                    </p>
                    <AiFillCaretDown className="text-[#3F2D6D]" />
                  </div>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Static Actions"
                  className="w-full"
                >
                  {links.map((item, index) => (
                    <DropdownItem key={index}>
                      <Link href={item.link}>
                        <div className="py-2 px-4 font-Avenir tracking-wide  text-black cursor-pointer">
                          {item.name}
                        </div>
                      </Link>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
            <Link href="/auth/register" className="font-Avenir tracking-wide">
              Login|SignUp
            </Link>
            <Link href="/contact-us" className="font-Avenir md:mt-0 mt-2 tracking-wide">
              Help
            </Link>
            <Link href="/terms-of-service" className="font-Avenir md:mt-0 mt-2 tracking-wide">
              Terms of Service
            </Link>
            <Link href="/privacy-policy" className="font-Avenir md:mt-0 mt-2 tracking-wide">
              Privacy Policy
            </Link>
            <Link href="/about-us " className="font-Avenir md:mt-0 mt-2 tracking-wide">
              About us
            </Link>
            <Link href="/how-to-mint" className="font-Avenir md:mt-0 mt-2 tracking-wide">
              How to Mint?
            </Link>
          </div>
          <div
            className={`my-5 md:mt-0 md:hidden flex`}
          >
            <div className="flex gap-10 cursor-pointer">
              <Link href={socials.twitter} target="_blank">
                <img
                  src="/Images/twitter.svg"
                  alt="twitter"

                  className={`w-10 cursor-pointer h-10 text-[#3F2D6D] ${isPhoneScreen ? "block" : "flex"
                    }`}
                />
              </Link>
              <Link href={socials.facebook} target="_blank">
                <img
                  src="/Images/facebook.svg"
                  alt="facebook"
                  className={`w-10 h-10 text-[#3F2D6D] ${isPhoneScreen ? "block" : "flex"
                    }`}
                />
              </Link>
              <Link href={socials.discord} target="_blank">
                <img
                  src="/Images/discord.svg"
                  alt="discord"
                  className={`w-10 h-10 text-[#3F2D6D] ${isPhoneScreen ? "block" : "flex"
                    }`}
                />
              </Link>
              <Link href={socials.instagram} target="_blank">
                <RiInstagramFill className="text-white text-[38px]" />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-5 bottom-5 md:mt-20 relative ">
          <p className="font-Avenir tracking-wide text-[#3F2D6D]">
            © 2023 Blockchain Labs. All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
