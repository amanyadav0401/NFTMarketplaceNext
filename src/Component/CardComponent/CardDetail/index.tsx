"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { Card, CardBody, useDisclosure } from "@nextui-org/react";
import Nav from "@/Component/Navbar/Nav";
import Footer from "@/Component/Footer";
import { toast } from "react-hot-toast";
import { useUserCartStore, useUserStore } from "@/utils/Zustand";
import { APIClient } from "@/utils/APIClient";
import useBuyVoucher from "@/utils/web3/buyVoucher";
import CardModal from "@/Component/Model/CardModal";
import { useAddress } from "@thirdweb-dev/react";
import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebook, FaSquareReddit, FaSquareWhatsapp, FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";

interface CardDetailProps {
  id: string;
  item: NFTItem
}

interface ShareDetails {
  link: string;
  title: string;
  desc: string;
}

const CardDetails: React.FC<CardDetailProps> = ({ id, item: nftItem }) => {
  const router = useRouter();
  const { user } = useUserStore()
  const [item, setItem] = useState<NFTItem>(nftItem)
  const address = useAddress()
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [discountApplied, setDiscountApplied] = useState<string>('')
  const { userCart, setUserCart } = useUserCartStore()
  const { buyNFT, isBuying, issueDiscountedNFT } = useBuyVoucher()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleApplyDiscount = (id: string) => {
    if (item.numOfTokens - item.purchasedTokens < 1) return toast.error('Not enough tokens in stock')

    setDiscountApplied(id)
    setQuantity(1)
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (discountApplied) return toast.error('One coupan code can only be applied for one item')

    if (item.numOfTokens - item.purchasedTokens <= quantity) return toast.error('Not enough tokens in stock')

    setQuantity(quantity + 1);
  };

  const handleBackButtonClick = () => {
    router.back();
  };


  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? item.images.length - 1 : prevIndex - 1

    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === item.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleStoreFront = () => {
    router.push(`/info/${item.creator.username}`);
  };

  const handleLikeItem = async () => {
    if (!user?._id) return toast.error('Please login to like item')
    try {
      const updatedItem: any = await APIClient.put(`items/${item._id}/like`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      const itemToSet = await updatedItem.json()
      setItem(itemToSet.item)
    }
    catch (err: any) {
      if (err?.name === 'HTTPError') {
        const errorJson = await err.response.json();
        toast.error(errorJson.message)
      } else {
        toast.error('Something went wrondg')
      }
    }
  }

  const handleAddItemToCart = () => {
    if (discountApplied) return toast.error('Please remove discount code to add item to cart')

    const cartItem: CartItem = {
      _id: item._id,
      amount: quantity,
      name: item.name,
      photo: item.images[0],
      item: item,
    }

    setUserCart(cartItem)
    toast.success('Added to cart')
  }

  const handleBuyWithMetamask = async () => {
    if (!address) {
      toast.error('Please connect your metamask wallet')
      return
    }

    if (!user?._id) {
      toast.error('Please login to buy item')
      return
    }

    try {
      if (!discountApplied) {
        const returnItem = await buyNFT(item?.vouchers[0], quantity, item._id)
        if (!returnItem._id) return
        setItem(returnItem)
      } else {
        const coupanCode = item.availablePromoCodes.find((section) => section._id === discountApplied)?.coupanCode
        if (!coupanCode) return toast.error('Invalid coupan code')
        const returnItem = await issueDiscountedNFT(item._id, coupanCode)
        if (!returnItem._id) return
        setItem(returnItem)
      }

      if (user?.role === "buisness") {
        router.push("/dashboard/brand");
      } else if (user?.role === "agency") {
        router.push("/dashboard/agency");
      } else if (user?.role === "personal") {
        router.push("/dashboard/personal");
      }
    }
    catch (err: any) {
      if (err?.name === 'HTTPError') {
        const errorJson = await err.response.json();
        toast.error(errorJson.message)
      } else {
        toast.error('Something went wrondg')
      }
    }
  }

  const handleOpen = (e: any) => {
    if (!address) {
      toast.error('Please connect your metamask wallet')
      return
    }

    if (!user?._id) {
      toast.error('Please login to buy item')
      return
    }

    onOpen()
  }



  function shareOnPlatform(platform: 'whatsapp' | 'twitter' | 'linkedin.com' | 'instagram' | 'facebook' | 'reddit', details: ShareDetails): void {
    const { link, title, desc } = details;
    let url: string;

    switch (platform) {
      case 'whatsapp':
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} - ${desc}: ${link}`)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title} - ${desc}`)}&url=${encodeURIComponent(link)}`;
        break;
      case 'linkedin.com':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(desc)}`;
        break;
      case 'instagram':
        url = `https://www.instagram.com/`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
        break;
      case 'reddit':
        url = `https://www.reddit.com/submit?url=${encodeURIComponent(link)}&title=${encodeURIComponent(title)}`;
        break;
      default:
        console.error('Unsupported platform');
        return;
    }

    window.open(url, '_blank');
  }


  return (
    <div>
      <div style={{
        backgroundImage: `url(${item.images[0]})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }} className="bg-gradient-to-r mt-[100px] from-blue-200 via-purple-200 to-pink-200 h-[250px]">
        <Nav />
        <div className="md:ml-[1rem] py-[1rem] px-2 sm:px-5">
          <button
            className=" flex gap-[0.5rem] items-center mt-[2rem] text-white bg-[#3F2D6D] px-[1rem] py-[0.5rem] rounded-md cursor-pointer"
            onClick={handleBackButtonClick}
          >
            <AiOutlineArrowLeft className="text-xl" />
            <p className="font-bold">Back</p>
          </button>
        </div>
        <div className="flex items-center sm:flex-row justify-between p-2 sm:p-10">
          <div className="flex bg-[#0e8abc] rounded-md shadow-md px-[1rem] py-[0.5rem] items-center gap-2">
            <div style={{
              backgroundImage: `url(${item.creator.avatar})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
              className="h-[30px] w-[30px] rounded-full"></div>
            <div className="text-white text-[14px] font-Avenir font-bold tracking-wide md:text-xl">
              {item.creator.name}
            </div>
          </div>
          <div className="flex items-center justify-center font-Avenir tracking-wide text-white font-semibold text-sm uppercase">
            <button
              className="w-36 sm:w-48 md:text-base text-[14px] h-10 flex-shrink-0 rounded-md bg-[#3F2D6D] shadow-md"
              onClick={handleStoreFront}
            >
              Explore Storefront
            </button>
          </div>
        </div>

        <Card className="w-[95%] mx-auto flex items-center flex-shrink-0 border rounded-lg bg-white box-shadow">
          <div className="flex flex-col md:flex-row md:justify-between w-full">
            <div className="md:mx-0 mx-2 w-full md:w-[45%]">
              <div className="relative md:ml-4 w-[95%] md:w-full flex justify-center mt-4 mb-4 bg-white border rounded-lg shadow-md">

                <CardBody>
                  <div className="p-5 sm:p-10 relative">
                    <Carousel
                      showArrows={false}
                      selectedItem={currentImageIndex}
                      showThumbs={false}
                      showStatus={false}
                      showIndicators={false}
                    >
                      {item.images.map((image, index) => (
                        <div key={index}>
                          <img
                            src={image}
                            alt={`Image ${index + 1}`}
                            className="w-full h-[30vh] sm:h-[50vh] object-contain"
                          />
                        </div>
                      ))}
                    </Carousel>
                    <div className="absolute top-1/2 transform -translate-y-1/2 -left-4">
                      <IoIosArrowBack
                        className="text-gray-500 cursor-pointer"
                        size={40}
                        onClick={handlePrevClick}
                      />
                    </div>
                    <div className="absolute top-1/2 transform -translate-y-1/2 -right-4">
                      <IoIosArrowForward
                        className="text-gray-500 cursor-pointer"
                        size={40}
                        onClick={handleNextClick}
                      />
                    </div>
                  </div>
                </CardBody>
              </div>
              <div className="z-[1] w-full px-[3%] pb-[1rem] justify-center md:justify-end flex gap-[1rem]">
                <FaFacebook onClick={() => shareOnPlatform('facebook', {
                  link: `https://nft-world.vercel.app/card/${item._id}`,
                  title: item.name,
                  desc: item.description
                })} className="w-7 h-7 text-[#4267B2] cursor-pointer" />
                <RiTwitterXLine onClick={() => shareOnPlatform('twitter', {
                  link: `https://nft-world.one/card/${item._id}`,
                  title: item.name,
                  desc: item.description
                })} className="w-7 h-7 cursor-pointer" />
                <FaLinkedin onClick={() => shareOnPlatform('linkedin.com', {
                  link: `https://nft-world.one/card/${item._id}`,
                  title: item.name,
                  desc: item.description
                })} className="w-7 h-7 text-[#2867B2] cursor-pointer" />
                <FaInstagram onClick={() => shareOnPlatform('instagram', {
                  link: `https://nft-world.one/card/${item._id}`,
                  title: item.name,
                  desc: item.description
                })} className="w-7 h-7 text-[#C13584] cursor-pointer" />
                <FaSquareReddit onClick={() => shareOnPlatform('reddit', {
                  link: `https://nft-world.one/card/${item._id}`,
                  title: item.name,
                  desc: item.description
                })} className="w-7 h-7 text-[#FF4500] cursor-pointer" />
                <FaSquareWhatsapp onClick={() => shareOnPlatform('whatsapp', {
                  link: `https://nft-world.one/card/${item._id}`,
                  title: item.name,
                  desc: item.description
                })} className="w-7 h-7 text-[#25D366] cursor-pointer" />
              </div>
            </div>
            <div className="w-full md:w-[50%] p-[2rem]">
              <div>
                <div className="flex justify-between">
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-wide mb-3 sm:mb-4 text-[#3F2D6D]">
                    {item.name}
                  </h2>
                  <div onClick={handleLikeItem} className="text-lg flex items-center gap-[0.5rem] sm:text-xl cursor-pointer ">
                    <p className="font-bold text-[#3F2D6D]">{item.likes.length}</p>
                    {
                      (!user?._id || !item.likes.includes(user._id)) && <AiOutlineHeart className="w-7 h-7 sm:w-8 sm:h-8" />
                    }
                    {
                      user?._id && item.likes.includes(user._id) && <AiFillHeart className="w-7 h-7 text-red-600 sm:w-8 sm:h-8" />
                    }
                  </div>
                </div>
                <p className="font-Avenir tracking-wide text-sm sm:text-base">
                  {item.description}
                </p>
              </div>

              {item?.availablePromoCodes?.length > 0 && <div className="w-full mt-10 grid grid-col grid-cols-1 sm:mt-10 h-auto sm:h-auto flex-shrink-0 rounded-lg bg-[#F6F6F6]">
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-between items-center p-4 sm:p-4">
                  <div className="flex flex-col gap-1">
                    <div className="font-Avenir tracking-wide text-sm sm:text-base">
                      Promo Code
                    </div>
                    <div className="flex">
                      <input
                        value={item.availablePromoCodes.find((section) => section._id === discountApplied)?.coupanCode || ''}
                        readOnly
                        type="text"
                        id="promoCode"
                        className="w-[250px] md:w-[180px] h-6 sm:h-8 border rounded-md py-3 px-3 focus:outline-none focus:border-[#3E3E3E] text-sm sm:text-base"
                        placeholder="Enter Code"
                      />
                      {
                        discountApplied && <button
                          className="font-Avenir tracking-wide border rounded-lg py-2 px-3 sm:px-4 ml-2 h-6 sm:h-8 flex items-center bg-[#E377FF] text-white text-sm sm:text-base"
                          onClick={() => setDiscountApplied('')}
                        >
                          Remove
                        </button>
                      }
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    {item?.availablePromoCodes.map((section: CoupanType, sectionIndex) => {
                      return (user && section.availableForUsers.includes(user?._id) && (section.usageCount! < section.maxUsageCount!)) ? (
                        <div key={section._id} className="flex items-center">
                          <div className="w-[240px] md:w-[180px] h-6 sm:h-8 flex justify-center font-Avenir tracking-wide items-center flex-shrink-0 border rounded-md border-dashed border-purple-400 bg-[#FBE9FF] text-sm sm:text-base">
                            {section.coupanCode}
                          </div>
                          <button
                            className={`font-Avenir tracking-wide border rounded-lg py-2 px-3 sm:px-4 ml-2 h-6 sm:h-8 flex items-center ${discountApplied[sectionIndex]
                              ? "bg-[#E377FF] text-white"
                              : "bg-[#9A9A9A] text-white"
                              } text-sm sm:text-base`}
                            onClick={() => handleApplyDiscount(section._id)}
                            disabled={discountApplied === section._id}
                          >
                            {(discountApplied === section._id) ? "Applied" : "Apply"}
                          </button>
                        </div>
                      ) : null
                    })}
                  </div>
                </div>
              </div>}

              <div className="mt-5 grid grid-col grid-cols-1 sm:mt-10 h-auto sm:h-auto flex-shrink-0 rounded-lg bg-[#E377FF1F]">

                <div
                  className="flex flex-col gap-2 sm:flex-row justify-between p-3 sm:p-4"
                >
                  <div className="flex flex-col gap-1">
                    <div className="text-[#9A9A9A] font-Avenir tracking-wide text-sm sm:text-base">
                      Stock
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="font-Avenir tracking-wide text-base sm:text-lg font-semibold">
                        <span className="text-[#9A9A9A] ">
                          {
                            item.numOfTokens - item.purchasedTokens
                          }
                        </span>
                        {" / "}
                        <span className="text-black">
                          {
                            item.numOfTokens
                          }
                        </span>
                        {" in stock"}
                      </div>
                      <div className="w-24 sm:w-24 sm:ml-0 ml-16 flex items-center justify-center h-4 sm:h-5 rounded-xl bg-[#E06C6E] opacity-80 text-xs sm:text-sm">
                        <p className="text-white font-semibold font-Avenir tracking-wide text-xs sm:text-sm">
                          Selling Fast
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-5 sm:gap-10">
                      <p className="text-[#9A9A9A] text-center tracking-wide font-Avenir text-sm sm:text-base">
                        Discount Price
                      </p>
                      <div className="font-Avenir text-base sm:text-lg tracking-wide font-semibold">
                        {
                          discountApplied ? item.price : 0
                        }
                      </div>
                    </div>
                    <div className="flex items-center gap-14 sm:gap-[80px]">
                      <p className="text-[#9A9A9A] text-center tracking-wide font-Avenir text-sm sm:text-base">
                        Total Price
                      </p>
                      <div className="font-Avenir text-base sm:text-lg tracking-wide font-semibold">
                        ${
                          // item.price - (item.price * item.discountPercentage)
                          discountApplied ? 0 : item.price
                        }
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {!discountApplied && <div className="mt-5 relative sm:mt-10 flex gap-3">
                <div className="w-[40px] sm:w-[50px] h-100 flex-shrink-0 border rounded-lg bg-[#EBEBEB]">
                  <div className="flex flex-col gap-4 p-2 sm:p-4 items-center">
                    <button
                      className="w-6 sm:w-8 h-6 sm:h-8 border rounded-full flex items-center justify-center"
                      onClick={decreaseQuantity}
                    >
                      <FaMinus size={12} />
                    </button>
                    <div className="mx-3 sm:mx-4 text-gray-600 bg-white w-6 sm:w-10 flex justify-center text-xs sm:text-sm">
                      {quantity}
                    </div>
                    <button
                      className="w-6 sm:w-8 h-6 sm:h-8 border rounded-full flex items-center justify-center"
                      onClick={increaseQuantity}
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <button onClick={handleAddItemToCart} className=" h-8 sm:h-10 bg-[#EBEBEB] text-black font-semibold rounded-md text-sm sm:text-base">
                    {
                      userCart?.find((cartItem) => cartItem.item._id === item._id) ? 'Update Cart' : 'Add to Cart'
                    }
                  </button>
                  {(item.paymentType === 'web3' || item.paymentType === 'both') && <button onClick={handleBuyWithMetamask} disabled={isBuying} className=" h-8 sm:h-10 disabled:opacity-50 bg-[#E377FF] text-white font-semibold rounded-md text-sm sm:text-base">
                    {
                      isBuying ? 'Buying...' : 'Buy with Metamask'
                    }
                  </button>}
                  {(item.paymentType === 'fiat' || item.paymentType === 'both') && <button onClick={handleOpen} className=" h-8 sm:h-10 disabled:opacity-50 disabled:cursor-not-allowed bg-[#3E3E3E] text-white font-semibold rounded-md text-sm sm:text-base">
                    Buy with Card
                  </button>}
                </div>
              </div>}
              {
                discountApplied && <div className="mt-5 relative sm:mt-10 flex gap-3">
                  <button onClick={handleBuyWithMetamask} disabled={isBuying} className=" h-8 sm:h-10 w-full disabled:opacity-50 bg-[#E377FF] text-white font-semibold rounded-md text-sm sm:text-base">
                    {
                      isBuying ? 'Buying...' : 'Buy Discounted NFT'
                    }
                  </button>
                </div>
              }
            </div>
          </div>
        </Card>
        <div className="mt-5 sm:mt-40">
          <Footer />
        </div>
      </div>
      <CardModal quantity={quantity} setItem={setItem} isOpen={isOpen} onOpenChange={onOpenChange} item={item} />
    </div>
  );
};
export default CardDetails;


