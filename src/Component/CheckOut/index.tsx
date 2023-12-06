"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaMinus, FaPlus } from "react-icons/fa";
import Footer from "../Footer";
import Nav from "../Navbar/Nav";
import { useUserCartStore, useUserStore } from "@/utils/Zustand";
import { useAddress } from "@thirdweb-dev/react";
import useBuyVoucher from "@/utils/web3/buyVoucher";
import { toast } from "react-hot-toast";
import CardModal from "../Model/CardModal";
import { useDisclosure } from "@nextui-org/react";


const CheckOutItem = ({ cartItem }: { cartItem: CartItem }) => {
  const { userCart, setUserCart, removeCartItem } = useUserCartStore();
  const { user } = useUserStore()


  const increaseQuantity = () => {
    if ((cartItem.item.numOfTokens - cartItem.item.purchasedTokens) === cartItem.amount) return

    const newItem = {
      ...cartItem,
      amount: cartItem.amount + 1
    }
    setUserCart(newItem)
  }

  const decreaseQuantity = () => {
    if (cartItem.amount > 1) {
      const newItem = {
        ...cartItem,
        amount: cartItem.amount - 1
      }
      setUserCart(newItem)
    } else {
      removeCartItem(cartItem)
    }
  }



  return (
    <div
      key={cartItem._id}
      className="mb-4 flex justify-between items-center"
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="w-5 h-5 accent-black flex-shrink-0 rounded-full"
        />
        <img
          src={cartItem.photo}
          alt={cartItem.name}
          className="w-12 h-12 md:w-[70px] md:h-[70px] flex-shrink-0 shadow-md rounded-lg"
        />
        <div>
          <h3 className="text-[#3F2D6D] font-Avenir tracking-wide text-1xl md:text-2xl">
            {cartItem.name}
          </h3>
        </div>
      </div>
      <div>
        <div className="flex justify-between gap-2 md:gap-2 md:w-32 w-20 p-1 items-center bg-[#EBEBEB] rounded-lg h-10">
          <button
            className="w-8 h-8 md:ml-2"
            onClick={decreaseQuantity}
          >
            <FaMinus />
          </button>
          <div className="w-8 h-8 border md:mr-2 justify-center flex items-center rounded-md bg-[#3F2D6D] text-white">
            {cartItem.amount}
          </div>
          <button className="w-8 h-8" onClick={increaseQuantity}>
            <FaPlus />
          </button>
        </div>
        <div className="md:mr-10 ml-10 md:ml-20 mt-2">
          $ {cartItem.amount * cartItem.item.price}
        </div>
      </div>
    </div>
  )
}

const CheckOut = () => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { userCart } = useUserCartStore()
  const address = useAddress()
  const { user } = useUserStore()
  const [username, setUsername] = useState('Login to buy')
  const { isBuying, buyBatchNFT, } = useBuyVoucher()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    if (user) {
      setUsername(user.username)
    }
  }
    , [user])

  const handleBackButtonClick = () => {
    router.back();
  };

  let totalItems = 0
  let pricesTotal = 0
  let totalPrice = 0
  userCart?.forEach((item) => {
    totalItems += item.amount;
    pricesTotal += item.item.price
    totalPrice += item.amount * item.item.price
  })

  const batchBuyArray: BatchBuyType = userCart?.map((item) => {
    return {
      itemId: item.item._id,
      amount: item.amount,
      voucher: item.item.vouchers[0],
      item: item.item
    }
  }) || []


  return (
    <div>
      <Nav />
      <div className="bg-gradient-to-r mt-[100px] from-blue-200 via-purple-200 to-pink-200 h-[250px]">
        <div className="ml-10">
          <button
            className="w-10 h-10 flex-shrink-0 text-[#3F2D6D] cursor-pointer rounded-md bg-grey-4"
            onClick={handleBackButtonClick}
          >
            <AiOutlineArrowLeft className="mt-10 text-xl" />
          </button>
        </div>
        <div className="p-8">
          <div className="flex items-center gap-6">
            <div className="h-[40px] w-[40px] rounded-full bg-gray-200"></div>
            <div className="text-[#3F2D6D] font-Avenir tracking-wide text-2xl">
              Checkout
            </div>
          </div>
        </div>

        <div className="mx-auto">
          <div className="ml-2 mr-2 md:ml-8 md:w-[95%] border rounded-xl bg-white box-shadow p-2 md:p-10">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/3 md:mx-0 md:mr-4">
                <div className="tracking-wide font-Avenir text-2xl mb-5">
                  Cart
                </div>
                {userCart?.map((item) => (
                  <CheckOutItem cartItem={item} />
                ))}
                {
                  (userCart?.length || 0) < 1 && <div className="flex flex-col items-center justify-center mt-10">No Items in Cart</div>
                }

                {/* <div className="mt-20">
                  {cartSections.map((section, sectionIndex) => (
                    <div key={section.id} className="flex items-center mt-4">
                      <div className="w-14 md:w-20 h-12 flex items-center justify-center font-Avenir tracking-wide flex-shrink-0 border rounded-md border-dashed border-[#3E3E3E] bg-[#FBE9FF]">
                        {section.discount}
                      </div>
                      <div className="w-48 md:w-[500px] h-12 flex items-center font-Avenir tracking-wide flex-shrink-0 border rounded-md border-dashed border-[#3E3E3E] bg-[#FBE9FF]">
                        <p className="ml-4">{section.text}</p>
                      </div>
                      <button
                        className={`border-[#3F2D6D] border font-Avenir tracking-wide rounded-lg py-2 px-4 ml-2 md:ml-6 h-12 ${discountApplied[sectionIndex]
                          ? "bg-[#3F2D6D] text-white"
                          : ""
                          }`}
                        onClick={() => handleApplyDiscount(sectionIndex)}
                        disabled={discountApplied[sectionIndex]}
                      >
                        {discountApplied[sectionIndex] ? "Applied" : "Apply"}
                      </button>
                    </div>
                  ))}
                </div> */}
                <div className="mt-10 border-[#9A9A9A]">
                  <div className="w-full flex items-center justify-between mr-10">
                    <div className=" text-[#9A9A9A] font-Avenir tracking-wide text-lg">
                      Unit Prices
                    </div>
                    <div className="flex-shrink-0 font-Avenir tracking-wide font-semibold text-lg">
                      $ {pricesTotal}
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between mt-2 mr-10">
                    <div className=" text-[#9A9A9A] font-Avenir text-lg">
                      Total Items
                    </div>
                    <div className="flex-shrink-0 font-Avenir tracking-wide font-semibold text-lg">
                      {totalItems}
                    </div>
                  </div>
                  <hr className="w-full my-2 border-[#9A9A9A] mr-10" />
                  <div className="w-full flex items-center justify-between mr-10">
                    <div className=" text-[#9A9A9A] font-Avenir tracking-wide text-lg">
                      Total Price
                    </div>
                    <div className="flex-shrink-0 font-Avenir tracking-wide font-semibold text-lg">
                      $ {totalPrice}
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3 mt-4 md:mt-0 md:ml-4">
                <div className="w-full border rounded-xl bg-[#F6F6F6] p-8">
                  <h2 className="text-[#3F2D6D] font-Avenir tracking-wide text-2xl font-semibold mb-10">
                    Payment Details
                  </h2>
                  <div className="mb-4">
                    <label
                      htmlFor="userName"
                      className="block text-black font-Avenir font-semibold text-base mb-1"
                    >
                      User Name
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      id="userName"
                      className="w-full border rounded-md py-2 px-3 bg-white focus:outline-none focus:border-[#3E3E3E]"
                    // Add other attributes and handlers as needed
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="walletAddress"
                      className="block text-black font-Avenir font-semibold text-base mb-1"
                    >
                      Wallet Address
                    </label>
                    <input
                      type="text"
                      id="walletAddress"
                      readOnly
                      value={address || 'Connect Wallet'}
                      className="w-full border rounded-md py-2 px-3 bg-white focus:outline-none focus:border-[#3E3E3E]"
                    // Add other attributes and handlers as needed
                    />
                  </div>

                  <div className="flex flex-col w-full gap-2 mt-8">
                    <button onClick={() => {
                      if (!user?._id) {
                        toast.error('Please login to buy')
                        return
                      }

                      if (!address) {
                        toast.error('Please connect wallet')
                        return
                      }

                      onOpen()
                    }} className="w-full h-10 bg-[#E377FF] text-white font-semibold rounded-md">
                      Pay Now
                    </button>
                    <button onClick={async () => {
                      if (!user?._id) {
                        toast.error('Please login to buy')
                        return
                      }

                      if (!address) {
                        toast.error('Please connect wallet')
                        return
                      }

                      if (user) {
                        try {
                          await buyBatchNFT(batchBuyArray)
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
                    }} disabled={isBuying} className="w-full h-10 bg-[#3E3E3E] text-white font-semibold rounded-md">
                      {
                        isBuying ? 'Buying...' : 'Pay by Wallet (Metamask..etc.)'
                      }
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <Footer />
        </div>
      </div>
      <CardModal isOpen={isOpen} onOpenChange={onOpenChange} isBatch={true} />
    </div>
  );
}

export default CheckOut;
