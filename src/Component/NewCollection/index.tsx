'use client'

import React, { useEffect, useRef, useState } from 'react'
import Nav from '../Navbar/Nav'
import Footer from '../Footer'
import { FaRegImage, FaTimes } from 'react-icons/fa'
import ReInput from '../Micro/ReInput'
import { BiChevronDown } from 'react-icons/bi'
import { categories, goToDashboard } from '@/utils/Constants'
import ReDropDown from '../Micro/ReDropDown'
import ky from 'ky'
import toast from 'react-hot-toast'
import toastError from '../Model/Toast'
import { APIClient } from '@/utils/APIClient'
import { useAddress } from '@thirdweb-dev/react'
import { useRouter } from 'next/navigation'
import { useMyCollectionsStore, useUserStore } from '@/utils/Zustand'

type Props = {}

const NewCollectionComponent = (props: Props) => {
  const fileRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState<any>({
    name: '',
    desc: '',
    selectedCategory: '',
    symbol: '',
    royality: 0,
    selectedNetwork: ''
  })
  const [networkData, setNetworkData] = useState<any>([])
  const networks = ['matic-network']
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [publishing, setPublishing] = useState(false)
  const address = useAddress()
  const router = useRouter()
  const { user } = useUserStore()
  const { setMyCollections } = useMyCollectionsStore()

  useEffect(() => {
    const fetchData = async () => {
      const data = await Promise.all(networks.map(async (network) => {
        const res = await ky.get(`https://api.coingecko.com/api/v3/coins/${network}`)
        const json = await res.json()
        return json
      }))
      setNetworkData(data)
    }

    fetchData()
  }, [])

  const handleSubmit = async () => {
    if (publishing) return

    if (!address) {
      toastError('Please connect your wallet')
      return
    }

    if (!selectedImage) {
      toastError('Please select an image')
      return
    }
    if (!formData.name) {
      toastError('Please enter a name')
      return
    }

    if (!formData.desc) {
      toastError('Please enter a description')
      return
    }

    if (!formData.symbol) {
      toastError('Please enter a symbol')
      return
    }

    //royality allow 0 to 100
    if (formData.royality < 0 || formData.royality > 100) {
      toastError('Please enter a valid royality')
      return
    }

    if (!formData.selectedNetwork) {
      toastError('Please select a blockchain')
      return
    }

    if (!formData.selectedCategory) {
      toastError('Please select a category')
      return
    }

    try {
      setPublishing(true)
      const imgFormData = new FormData()
      imgFormData.append('image', selectedImage)

      const res: any = await APIClient.post('upload/image', {
        body: imgFormData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).json()

      const { file } = res
      const location = file.location

      const body = {
        logo: location,
        name: formData.name,
        desc: formData.desc,
        symbol: formData.symbol,
        royality: formData.royality,
        creatorAddress: address,
        category: formData.selectedCategory
      }

      const collectionRes: any = await APIClient.post('collection', {
        json: body,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).json()

      if (collectionRes.success) {
        setMyCollections()
        toast.success('Collection created successfully! Please Deploy to blockchain.')
        goToDashboard(user, router)
      }
    }
    catch (err: any) {
      const error = await err?.response?.json()
      toastError(error?.message || 'Something went wrong')
    }
    finally {
      setPublishing(false)
    }
  }
  return (
    <div className='min-h-[100vh] w-[100vw] flex flex-col justify-between'>
      <div>
        <Nav />
        <div className='w-full flex px-[2rem] mt-[100px] items-center justify-end bg-[#fcefff] py-[1rem]'>
          <button onClick={() => { }} className="bg-[#3F2D6D] disabled:opacity-50 hover:bg-[#3F2D6D] px-[2rem] font-Avenir tracking-wide flex justify-between items-center text-white  py-[0.5rem] rounded-md">
            MarketPlace
          </button>
        </div>
        <div className='w-full px-[4rem] mb-[1rem] pt-[1rem]'>
          <p className='w-full text-[24px] font-medium text-[#464646] pb-[1rem] border-b border-black/10 font-Avenir'>
            Create New Collection
          </p>
        </div>
        <div className='flex md:flex-row flex-col w-full mb-[4rem] px-[4rem] gap-[3rem]'>
          <div onClick={() => {
            if (fileRef.current) {
              fileRef.current.click()
            }
          }} className={`h-[40vh] relative w-full md:w-[30%] cursor-pointer flex items-center justify-center flex-col ${!selectedImage && 'border-dotted border-black border-[3px]'} rounded-md`}>
            {!selectedImage && <>
              <FaRegImage size={40} />
              <p className='text-[#E377FF] font-Avenir text-center text-[18px] font-medium pt-[1rem]'>
                Upload Logo for Collection
              </p>
              <p className='text-[#464646] font-Avenir text-center text-[18px] font-medium pt-[1rem]'>
                File type supported: JPG, PNG, GIF, WEBP, SVG
              </p>
              <input onChange={(e) => {
                if (e.target.files) {
                  setSelectedImage(e.target.files[0])
                }
              }} ref={fileRef} type='file' className='hidden' />
            </>}
            {
              selectedImage && (
                <>
                  <img src={URL.createObjectURL(selectedImage)} alt='preview' className='h-full w-full object-contain rounded-md' />
                  <div className='absolute top-[5px] right-[0px] flex justify-center items-center bg-black/50 w-[2rem] h-[2rem] rounded-full cursor-pointer'>
                    <FaTimes size={20} color='#fff' onClick={() => setSelectedImage(null)} />
                  </div>
                </>
              )
            }
          </div>
          <div className='md:w-[60%] w-full flex flex-col gap-[1rem]'>
            <ReInput placeholder='Name your Collection' label='Name' value={formData.name} onChange={(value: string) => setFormData({ ...formData, name: value })} />
            <ReInput placeholder='Describe your Collection' label='Description' isArea value={formData.desc} onChange={(value: string) => setFormData({ ...formData, desc: value })} />
            <ReInput placeholder='Max 5 characters' label='Short Collection Name' value={formData.symbol} onChange={(value: string) => setFormData({
              ...formData, symbol: value.toUpperCase().slice(0, 5)
            })} />
            <ReInput placeholder='Enter Royality' label='Royality' value={formData.royality} onChange={(value: string) => {
              const regex = /^\d*\.?\d*$/; // matches numbers and decimals with at least one number after the point
              if (value.startsWith('.')) value = '0' + value
              if (regex.test(value) || value === '') {
                setFormData({ ...formData, royality: value })
              }
            }} />
            <ReDropDown name='Category' options={categories} placeholder='Select a category' onSelect={(value: string) => setFormData({ ...formData, selectedCategory: value })} selectedValue={formData.selectedCategory} />

            <div>
              <p className='text-[#464646] mb-[0.5rem] font-Avenir text-[14px] font-medium'>
                BlockChain
                <sup className=''>*</sup>
              </p>
              <div className='w-full flex gap-[1rem]'>

                {
                  networkData.map((network: any) => {
                    return <div onClick={() => {
                      setFormData({ ...formData, selectedNetwork: network.name })
                    }} className={`h-[13rem] w-[13rem] cursor-pointer p-[1rem] transition-all duration-200 rounded-3xl ${formData.selectedNetwork === network.name ? 'border-[5px]' : 'border'} shadow-lg border-black/20`} key={network.id}>
                      <div className='w-full flex gap-[1rem] items-center'>
                        <img src={network.image.large} alt="" className='h-[3rem] rounded-full bg-black/20 w-[3rem]' />
                        <p className='text-[#464646] font-Avenir text-[18px] font-bold'>
                          {network.name}
                        </p>

                      </div>
                      <div className='mt-[2rem] w-fit bg-[#EBFFE2] px-[1rem] py-[0.5rem] rounded-[2rem]'>
                        <p className='text-[#3AC977] font-Avenir text-[14px] font-medium'>
                          Popular
                        </p>
                      </div>
                      <div className='mt-[1rem]'>
                        <p className='text-[#464646] font-Avenir text-[16px]'>
                          Current price is {network.market_data.current_price.usd} USD
                        </p>
                      </div>
                    </div>
                  })
                }
              </div>
            </div>
            <button onClick={handleSubmit} className="bg-[#3F2D6D] transition-all duration-300 mt-[2rem] disabled:opacity-50 hover:bg-[#3F2D6D] px-[2rem] w-fit font-Avenir tracking-wide flex justify-between items-center text-white  py-[0.5rem] rounded-md">
              {
                publishing ? 'Publishing...' : 'Publish Collection'
              }
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default NewCollectionComponent