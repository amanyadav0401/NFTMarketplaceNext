import { useAddress, useContract, useContractWrite, useSDK } from '@thirdweb-dev/react'
import React, { useState } from 'react'
import ABI from './ABI.json'
import NFTABI from './NFTABI.json'
import { ethers } from 'ethers'
import { APIClient } from '../APIClient'
import { useUserCartStore, useUserStore } from '../Zustand'
import { toast } from 'react-hot-toast'
import { useStripe } from '@stripe/react-stripe-js'

type Props = {}



const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

const useBuyVoucher = () => {
  const { contract, error } = useContract(contractAddress, ABI);
  const sdk = useSDK()
  const address = useAddress()
  const [isBuying, setIsBuying] = useState(false)
  const { user } = useUserStore()
  const { mutateAsync, isLoading: buyLoading, error: buyError } = useContractWrite(contract, 'buyPlatformNFT')
  const { emptyCart } = useUserCartStore()
  const stripe = useStripe();

  const buyNFT = async (voucher: any, howMany: number, itemId: string) => {
    if (!user?._id) {
      return
    }

    try {
      setIsBuying(true)
      const provider = await sdk?.getProvider()
      const contractEthers = new ethers.Contract(contractAddress!, ABI, provider)

      const signer = await sdk?.getSigner()

      const contractWithSigner = contractEthers.connect(signer!)

      let totalAmountCallTrans = await contractWithSigner.calculateAmount(voucher, howMany);

      const amountToSend = totalAmountCallTrans.toNumber()

      const tx = await contractWithSigner.buyPlatformNFT(voucher, howMany, true, {
        value: amountToSend,
        gasLimit: 3000000,
      })

      const txReceipt = await tx.wait()

      const data = await APIClient.put('items/buy', {
        json: {
          itemId: itemId,
          txHash: txReceipt.transactionHash,
          userId: user._id,
          amount: ethers.utils.formatEther(amountToSend.toString()),
          voucher: voucher,
          quantity: howMany,
          buyerAddress: address,
          type: 'web3',
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      const dataJson: any = await data.json()

      const newItem = dataJson.item

      setIsBuying(false)

      toast.success('NFT Bought Successfully')

      return newItem

    } catch (e) {
      throw e
    }
    finally {
      setIsBuying(false)
    }
  }

  const buyBatchNFT = async (data: BatchBuyType) => {
    if (!user?._id) {
      return
    }

    try {
      setIsBuying(true)
      const provider = await sdk?.getProvider()
      const contractEthers = new ethers.Contract(contractAddress!, ABI, provider)

      const signer = await sdk?.getSigner()

      const contractWithSigner = contractEthers.connect(signer!)

      // let totalAmountCallTrans = await contractWithSigner.calculateBatchAmount(data);
      let totalAmountCallTrans = 0

      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        const amount = item.amount
        const voucher = item.voucher
        const amountCallTrans = await contractWithSigner.calculateAmount(voucher, amount);
        totalAmountCallTrans += amountCallTrans.toNumber()
      }

      const amountToSend = totalAmountCallTrans

      const vouchersArray = data.map((item) => {
        return item.voucher
      })

      const howManyArray = data.map((item) => {
        return item.amount
      })

      const trueArray = data.map((item) => {
        return true
      }
      )

      const tx = await contractWithSigner.batchBuyNFT(vouchersArray, howManyArray, trueArray, {
        value: amountToSend,
        gasLimit: 3000000,
      })

      const txReceipt = await tx.wait()

      const jsonArray = data.map((item) => {
        return {
          itemId: item.itemId,
          txHash: txReceipt.transactionHash,
          userId: user._id,
          amount: ethers.utils.formatEther(item.amount.toString()),
          voucher: item.voucher,
          quantity: item.amount,
          buyerAddress: address,
          type: 'web3',
        }
      }
      )

      const dataJson: any = await APIClient.put('items/batch-buy', {
        json: jsonArray,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      const success = dataJson.success

      setIsBuying(false)
      emptyCart()
      toast.success('NFTs Bought Successfully')

      return success

    } catch (e) {
      throw e
    }
    finally {
      setIsBuying(false)
    }
  }

  const issueDiscountedNFT = async (itemId: string, coupanCode: string) => {
    if (!user?._id) {
      return
    }

    if (!address) {
      return
    }

    try {
      setIsBuying(true)
      const data = await APIClient.post('web3/issue', {
        json: {
          itemId: itemId,
          coupanCode: coupanCode,
          address: address,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      const dataJson: any = await data.json()

      const newItem = dataJson.item

      setIsBuying(false)
      toast.success('NFT Bought Successfully')

      return newItem
    }
    catch (e: any) {
      throw e
    }
    finally {
      setIsBuying(false)
    }

  }

  const buyNFTWithStripe = async (paymentMethod: any, itemId: string, quantity: number) => {
    if (!user?._id) {
      return
    }

    if (!address) {
      return
    }

    try {
      setIsBuying(true)
      const createIntentData = await APIClient.put('items/buy/create', {
        json: {
          paymentMethod: paymentMethod,
          itemId: itemId,
          quantity: quantity,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      const createIntentDataJson: any = await createIntentData.json()

      const { customerId, paymentIntentId, success, paymentIntentStatus, id } = createIntentDataJson

      if (!success) {
        throw new Error('Payment Intent Failed')
      }

      const confirmIntent = await stripe?.confirmCardPayment(paymentIntentId)

      if (confirmIntent?.error) {
        throw new Error(confirmIntent.error.message || 'Payment Failed')
      }

      const buyData = await APIClient.post('web3/issue/fiat', {
        json: {
          buyerAddress: address,
          itemId: itemId,
          paymentIntentId: confirmIntent?.paymentIntent?.id,
          numOfTokens: quantity,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      const buyDataJson: any = await buyData.json()

      const newItem = buyDataJson.item

      setIsBuying(false)
      toast.success('NFT Bought Successfully')

      return newItem

    }
    catch (e: any) {
      throw e
    }
    finally {
      setIsBuying(false)
    }
  }

  const batchBuyNFTWithStripe = async (paymentMethod: any, data: BatchBuyType) => {
    if (!user?._id) {
      return
    }

    if (!address) {
      return
    }

    try {
      setIsBuying(true)
      let totalAmount = 0
      data.forEach((item) => {
        totalAmount += (item.amount * item.item.price)
      })

      const itemsData = data.map((item) => {
        return {
          itemId: item.itemId,
          numOfTokens: item.amount,
        }
      })

      const createIntentData = await APIClient.put('items/buy/batch/create', {
        json: {
          amount: totalAmount,
          itemsData: itemsData,
          paymentMethod: paymentMethod,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      const createIntentDataJson: any = await createIntentData.json()

      const { customerId, paymentIntentId, success, paymentIntentStatus, id } = createIntentDataJson

      if (!success) {
        throw new Error('Payment Intent Failed')
      }

      const confirmIntent = await stripe?.confirmCardPayment(paymentIntentId)

      if (confirmIntent?.error) {
        throw new Error(confirmIntent.error.message || 'Payment Failed')
      }

      const buyData = await APIClient.post('web3/issue/batch', {
        json: {
          buyerAddress: address,
          paymentIntentId: confirmIntent?.paymentIntent?.id,
          itemsData: itemsData,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      const buyDataJson: any = await buyData.json()

      const successData = buyDataJson.success

      setIsBuying(false)

      if (successData) {
        emptyCart()
      }

      toast.success('NFTs Bought Successfully')

      return successData


    }
    catch (e: any) {
      throw e
    }
    finally {
      setIsBuying(false)
    }
  }

  return {
    buyNFT,
    isBuying,
    buyLoading,
    buyError,
    buyBatchNFT,
    issueDiscountedNFT,
    buyNFTWithStripe,
    batchBuyNFTWithStripe
  }
}

export default useBuyVoucher
