import { useAddress, useContract, useContractWrite, useSDK } from '@thirdweb-dev/react'
import React, { useState } from 'react'
import ABI from './ABI.json'
import NFTABI from './NFTABI.json'
import { ethers } from 'ethers'
import { APIClient } from '../APIClient'
import { useMyCollectionsStore, useUserCartStore, useUserStore } from '../Zustand'
import { toast } from 'react-hot-toast'
import { useStripe } from '@stripe/react-stripe-js'
import toastError from '@/Component/Model/Toast'

export const useCollection = () => {
  const sdk = useSDK()
  const address = useAddress()
  const [loading, setIsLoading] = useState(false)
  const { user } = useUserStore()
  const stripe = useStripe();
  const { myCollections } = useMyCollectionsStore()

  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_COLLECTION_FACTORY!
  const ABI_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_COLLECTION_ABI_ADDRESS

  const createCollection = async (id: string, name: string, symbol: string, royality: number) => {
    if (!address) {
      toastError('Please connect your wallet')
      return
    }

    if (!user?._id) {
      toastError('Please login')
      return
    }

    try {
      setIsLoading(true)
      const provider = await sdk?.getProvider()
      const signer = await sdk?.getSigner()
      const abiData: any = await APIClient.get(`web3?address=${ABI_CONTRACT_ADDRESS}`).json()
      const abi = abiData.abi
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider)
      const contractWithSigner = contract.connect(signer!)
      const tx = await contractWithSigner.deploy1155(name, address, true, {
        gasLimit: 10000000,
      })
      const txReceipt = await tx.wait()
      const contractAddress = txReceipt?.logs[0].address
      const collection = await APIClient.put(`collection/${id}`, {
        json: {
          status: 'active',
          deployedAddress: contractAddress
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      const collectionJson: any = await collection.json()
      const { data } = collectionJson
      return data
    }
    catch (err: any) {
      let error = ''
      if (typeof err === 'string') {
        error = err
      }
      else {
        error = err?.message || 'Something went wrong'
      }
      console.log(error)
      toastError(error)
    }
    finally {
      setIsLoading(false)
    }
  }

  return { createCollection, loading }
}