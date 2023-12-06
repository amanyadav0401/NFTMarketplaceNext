"use client";
import React, { useState } from "react";
import CardComponent from "@/Component/CardComponent";
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillCaretDown, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "../Footer";
import { useRouter } from "next/navigation";
import Nav from "../Navbar/Nav";
import Link from "next/link";
import SearchInput from "../Model/SearchInput";
import useWindowWidth from "../Model/useWindowWidth";
import BuyCardComponent from "../CardComponent/BuyCard";
import Slider from "react-slick";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Marquee from "react-fast-marquee";
import Image from "next/image";

interface MinBrand {
  _id: string;
  username: string;
  name: string;
}

function MarketPlace({ nfts, coupans, carouselItems, brands }: { nfts: NFTItem[], coupans: CoupanType[], carouselItems: NFTItem[], brands: MinBrand[] }) {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName === activeButton ? null : buttonName);
  };


  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  const router = useRouter();

  const { isPhoneScreen } = useWindowWidth();

  const images = [
    'https://logo.uplead.com/amazon.com',
    'https://logo.uplead.com/flipkart.com',
    'https://logo.uplead.com/myntra.com',
    'https://logo.uplead.com/microsoft.com',
    'https://logo.uplead.com/zomato.com',
    'https://logo.uplead.com/limeroad.com',
    'https://logo.uplead.com/clubfactory.com',
    'https://logo.uplead.com/pepperfry.com',
    'https://logo.uplead.com/dominos.com',
  ]

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };


  return (
    <div>
      <Nav />
      <div className="bg-[#FCEFFF] max-w-screen mt-[100px] h-[80px]">
        <div className="flex md:hidden justify-center p-5">
          <SearchInput />
        </div>
        <div className="p-5 hidden md:flex justify-between">
          <h5 className="font-Avenir tracking-wide text-2xl font-semibold">
            Marketplace
          </h5>

          <div className="ml-20">
            <SearchInput />
          </div>
          <Dropdown>
            <DropdownTrigger>
              <div className="flex cursor-pointer items-center gap-2">
                <p className="font-Avenir  font-semibold tracking-wide ">
                  Brand StoreFront
                </p>
                <AiFillCaretDown className="" />
              </div>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Static Actions"
              className="w-full max-h-[300px] overflow-auto"
            >
              {brands.map((item, index) => (
                <DropdownItem key={index}>
                  <Link href={`/info/${item.username}`}>
                    <div className="py-2 px-4 font-Avenir tracking-wide cursor-pointer">
                      {item.name}
                    </div>
                  </Link>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <div className="w-full h-auto">
        <div className="md:hidden flex mb-5">
          {isPhoneScreen ? (
            <div className="p-2">
              <div className="w-full h-full flex-shrink-0 rounded-2xl overflow-hidden shadow-md">
                <Carousel
                  showThumbs={false}
                  showStatus={false}
                  showArrows={false}
                  infiniteLoop
                  autoPlay
                  interval={5000}
                  stopOnHover
                >
                  {carouselItems.splice(0, 2).map((item, index) => (
                    <div onClick={() => {
                      router.push(`/card/${item._id}`)
                    }} key={index} className="relative cursor-pointer">
                      <Image
                        height={400}
                        width={400}
                        src={item.images[0]}
                        alt={`Carousel ${index}`}
                        className="w-full h-48 object-cover"

                      />
                      <div className="absolute left-4 bottom-4 text-white font-Avenir tracking-wide">
                        {
                          item.name.toUpperCase()
                        }
                      </div>
                      <div className="absolute right-4 bottom-4 text-white font-Avenir tracking-wide">
                        {
                          `${item.price} $`
                        }
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="hidden md:flex mb-5">
          <>
            <div className="p-5">
              <div className="w-full h-full flex-shrink-0 rounded-2xl overflow-hidden shadow-md">
                <Carousel
                  showThumbs={false}
                  showStatus={false}
                  showArrows={false}
                  infiniteLoop
                  autoPlay
                  interval={5000}
                  stopOnHover
                >
                  {carouselItems.slice(0, Math.ceil(carouselItems.length / 2)).map((item, index) => (
                    <div onClick={() => {
                      router.push(`/card/${item._id}`)
                    }} key={index} className="relative cursor-pointer">
                      <Image
                        height={400}
                        width={400}
                        src={item.images[0]}
                        alt={`Carousel ${index}`}
                        className="w-96 h-96 object-cover"

                      />
                      <div className="absolute left-4 bottom-4 text-white font-Avenir tracking-wide">
                        {
                          item.name.toUpperCase()
                        }
                      </div>
                      <div className="absolute right-4 bottom-4 text-white font-Avenir tracking-wide">
                        {
                          `${item.price} $`
                        }
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
            <div className=" p-5">
              <div className="w-full h-full flex-shrink-0 rounded-2xl overflow-hidden shadow-md">
                <Carousel
                  showThumbs={false}
                  showArrows={false}
                  showStatus={false}
                  infiniteLoop
                  autoPlay
                  interval={5000}
                  stopOnHover
                >
                  {carouselItems.slice(Math.ceil(carouselItems.length / 2), carouselItems.length).map((item, index) => (
                    <div onClick={() => {
                      router.push(`/card/${item._id}`)
                    }} key={index} className="relative cursor-pointer">
                      <Image
                        height={400}
                        width={400}
                        src={item.images[0]}
                        alt={`Carousel ${index}`}

                        className="w-96 h-96 object-cover"
                      />
                      <div className="absolute left-4 bottom-4 text-white font-Avenir tracking-wide">
                        {
                          item.name.toUpperCase()
                        }
                      </div>
                      <div className="absolute right-4 bottom-4 text-white font-Avenir tracking-wide">
                        {
                          `${item.price} $`
                        }
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          </>
        </div>



        <Slider {...settings}>
          {coupans.map((offer, index) => (
            <div onClick={() => {
              const item = offer.itemsAvailable[0]
              router.push(`/card/${item}`)
            }} key={index} className="relative rounded-lg p-2">
              <Image
                height={400}
                width={400} src={'/Images/offer.svg'} alt="Offer" className="h-full w-full" />
              <div className="absolute inset-0 flex flex-col justify-center items-center">
                <h3 className="text-xl text-white font-semibold text-center">
                  {offer.coupanText.toUpperCase()}
                </h3>
                <p className="text-center text-white">{offer.coupanCode}</p>
              </div>
            </div>
          ))}
        </Slider>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {
            nfts.map((nft) => {
              return <BuyCardComponent nft={nft} />
            })
          }
        </div>
        <CardComponent nfts={nfts} />
      </div>
      <div className='relative w-full h-[100px] my-[2rem]'>
        <div className='h-[8rem] w-[15rem] md:flex hidden items-center justify-center absolute bottom-[-20%]  z-[5] bg-white'>
          <p className='text-2xl font-bold'>Brands</p>
        </div>
        <Marquee autoFill className=''>
          {
            images.map((image, index) => (
              <div key={image} className='h-[100px] flex items-center justify-center'>
                <Image src={image} width={80} height={80} alt='alt' sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
                  className='w-[80px] object-cover ml-[8rem]' />
              </div>
            ))
          }
        </Marquee>
      </div>
      <Footer />
    </div>
  );
}

export default MarketPlace;
