'use client'

import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link } from "@nextui-org/react";
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { toast } from "react-hot-toast";
import { useUserCartStore, useUserStore } from "@/utils/Zustand";
import { useAddress } from "@thirdweb-dev/react";
import useBuyVoucher from "@/utils/web3/buyVoucher";
import { useRouter } from "next/navigation";
import { goToDashboard } from "@/utils/Constants";

type Props = {
  isOpen: boolean,
  onOpenChange: () => void,
  item?: NFTItem,
  quantity?: number,
  setItem?: (item: NFTItem) => void,
  isBatch?: boolean
}




const CardModal = ({ isOpen, onOpenChange, quantity, item, setItem, isBatch }: Props) => {
  const [response, setResponse] = useState(null);
  const { user } = useUserStore()
  const address = useAddress()
  const { buyNFTWithStripe, batchBuyNFTWithStripe } = useBuyVoucher()
  const [loading, setLoading] = useState(false)
  const { userCart } = useUserCartStore()
  const router = useRouter()

  const stripe = useStripe();
  const elements = useElements();

  const handleBuy = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    if (!user?._id) {
      toast.error('Sign in to buy')
      setLoading(false)
      return
    }

    if (!address) {
      toast.error('Connect your wallet to buy')
      setLoading(false)
      return
    }

    if (!stripe || !elements) {
      toast.error('Stripe not loaded');
      setLoading(false);
      return;
    }

    const cardElement = elements!.getElement(CardNumberElement);

    if (!cardElement) {
      toast.error('Card Element not loaded');
      setLoading(false);
      return;
    }

    const paymentMethodRes = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: user?.name,
        email: user.email,
      },
    });

    if (paymentMethodRes.error) {
      toast.error(paymentMethodRes?.error?.message || 'Error Creating Payment Method');
      setLoading(false);
      return;
    }

    if (!isBatch) {
      try {
        const newItem = await buyNFTWithStripe(paymentMethodRes?.paymentMethod?.id, item!._id, quantity!)
        setItem!(newItem)
        goToDashboard(user, router)
        onOpenChange()
      }
      catch (err: any) {
        const error = await err?.response?.json()
        toast.error(error?.message || 'Something went wrong')
      }
      finally {
        setLoading(false)
      }
    }
    else {
      const batchBuyArray: BatchBuyType = userCart?.map((item) => {
        return {
          itemId: item.item._id,
          amount: item.amount,
          voucher: item.item.vouchers[0],
          item: item.item
        }
      }) || []

      try {
        const newItem = await batchBuyNFTWithStripe(paymentMethodRes?.paymentMethod?.id, batchBuyArray)
        goToDashboard(user, router)
        onOpenChange()
      }
      catch (err: any) {
        const error = await err?.response?.json()
        toast.error(error?.message || 'Something went wrong')
      }
      finally {
        setLoading(false)
      }
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}

        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Buy for {item?.name || 'User Cart'}
              </ModalHeader>
              <div>
                <form onSubmit={(e: any) => {
                  handleBuy(e)
                }} className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-md space-y-4">
                  <h2 className="text-2xl font-semibold text-center">Complete Your Purchase</h2>

                  {/* <div className="mt-4 p-4 border-2 border-gray-300 rounded-md">
                        <CardElement />
                      </div> */}
                  <div className="mt-4 p-4 border-2 border-gray-300 rounded-md">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
                        Card Number
                      </label>
                      <div className="relative border rounded-md">
                        <CardNumberElement className="block w-full p-3 border border-gray-300 rounded-md" id="cardNumber" />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
                        Expiry Date
                      </label>
                      <div className="relative border rounded-md">
                        <CardExpiryElement className="block w-full p-3 border border-gray-300 rounded-md" id="expiryDate" />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvc">
                        CVC
                      </label>
                      <div className="relative border rounded-md">
                        <CardCvcElement options={{
                          style: {
                            base: {
                              fontSize: '16px',
                              color: '#424770',
                              '::placeholder': {
                                color: '#aab7c4',
                              },
                            },
                            invalid: {
                              color: '#9e2146',
                            },
                          },
                        }}
                          className="block w-full blur-[3px] p-3 border border-gray-300 rounded-md" id="cvc" />
                      </div>
                    </div>
                  </div>
                  <button disabled={loading} className={`w-full py-3 px-4
                        disabled:opacity-50 disabled:cursor-not-allowed disbaled:bg-indigo-600 disabled:hover:bg-indigo-600 disabled:focus:outline-none disabled:focus:ring-2 disabled:focus:ring-indigo-500 disabled:focus:ring-offset-2 disabled:rounded-md
                      bg-indigo-600  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md text-white font-semibold uppercase tracking-wider`} type="submit">
                    {
                      loading ? `
                          Initiating Payment...
                          ` : 'Confirm Payment'
                    }
                  </button>
                </form>

                {response && (
                  <div>
                    <h2>Response:</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                  </div>
                )}
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CardModal;