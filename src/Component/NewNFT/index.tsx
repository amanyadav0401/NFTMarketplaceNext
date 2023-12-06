'use client'

import React, { useEffect, useRef, useState } from 'react'
import Nav from '../Navbar/Nav'
import Footer from '../Footer'
import { FaFileUpload, FaTimes } from 'react-icons/fa'
import ReInput from '../Micro/ReInput'
import { BiChevronDown } from 'react-icons/bi'
import { categories, goToDashboard } from '@/utils/Constants'
import ReDropDown from '../Micro/ReDropDown'
import { useRouter } from 'next/navigation'
import { useMyCollectionsStore, useMyItemsStore, useUserStore, usehowtoStore } from '@/utils/Zustand'
import toastError from '../Model/Toast'
import { APIClient } from '@/utils/APIClient'
import toast from 'react-hot-toast'
import Slider from 'react-slick'

type Props = {}

const NewNFTComponent = (props: Props) => {
  const fileRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [formData, setFormData] = useState<any>({
    name: '',
    desc: '',
    stoc: 0,
    price: 0,
    selectedCategory: '',
    collection: '',
    royality: 0
  })
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const { myCollections, setMyCollections } = useMyCollectionsStore()
  const { setMyItems } = useMyItemsStore()
  const { user } = useUserStore()
  const [loading, setLoading] = useState(false)
  const { setHowto } = usehowtoStore()

  useEffect(() => {
    setMyCollections()
  }
    , [])

  let collectionsOptions = (myCollections || []).filter(item => item.status === 'active').map(item => {
    return {
      label: item.name,
      value: item.deployedAddress
    }
  })

  collectionsOptions = [
    {
      label: 'NFT World',
      value: '0xe2B1aE151978aD24c93e99bE563f35E249B703bc'
    },
    ...collectionsOptions
  ]

  const onSubmit = async () => {
    try {

      if (!user) {
        toastError('Please Login to continue')
        return
      }

      if (loading) return

      if (selectedImage === null) {
        toastError('Please upload atleast one image')
        return
      }

      if (formData.name.length < 1) {
        toast.error('Enter a valid name')
        return
      }

      if (formData.desc.length < 1) {
        toast.error('Enter a valid description')
        return
      }

      if (formData.price < 0) {
        toast.error('Enter a valid price')
        return
      }

      if (formData.stoc < 0) {
        toast.error('Enter a valid stock')
        return
      }

      if (formData.royality < 0 || formData.royality > 100) {
        toast.error('Enter a valid royality')
        return
      }

      if (!formData.collection) {
        toast.error('Please select a collection')
        return
      }

      if (!formData.selectedCategory) {
        toast.error('Please select a category')
        return
      }



      setLoading(true)
      const imageFormData = new FormData()
      const images = Array.from(selectedImage)
      images.forEach((item: any) => {
        imageFormData.append('images', item)
      })
      const res: any = await APIClient.post('upload/images', {
        body: imageFormData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).json()

      if (!res.files) {
        toastError('Please upload atleast one image')
        return
      }

      const body = {
        name: formData.name,
        description: formData.desc,
        price: formData.price,
        numOfTokens: formData.stoc,
        category: formData.selectedCategory,
        images: res.files.map((item: any) => item.location),
        royality: formData.royality,
        collectionAddress: formData.collection
      }


      const response: any = await APIClient.post('items', {
        json: {
          ...body
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).json()
      console.log(response)
      if (response.success) {
        toast.success('Added Successfully!')
        await setMyItems()
        goToDashboard(user, router)
      }

    }
    catch (err: any) {
      const error = await err.response.json();
      toast.error(error.message);
    }
    finally {
      setLoading(false)
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div>
      <Nav />
      <div className='w-full flex px-[2rem] mt-[100px] items-center justify-end bg-[#fcefff] py-[1rem]'>
        <button onClick={() => { }} className="bg-[#3F2D6D] disabled:opacity-50 hover:bg-[#3F2D6D] px-[2rem] font-Avenir tracking-wide flex justify-between items-center text-white  py-[0.5rem] rounded-md">
          MarketPlace
        </button>
      </div>
      <div className='w-full px-[4rem] mb-[1rem] pt-[1rem]'>
        <p className='w-full text-[24px] font-medium text-[#464646] pb-[1rem] border-b border-black/10 font-Avenir'>
          Upload New NFT
        </p>
      </div>
      <div className='flex md:flex-row flex-col w-full mb-[4rem] px-[4rem] gap-[3rem]'>
        <div className='md:w-[30%] w-full flex flex-col items-center gap-[1rem]'>
          <div onClick={() => {
            if (fileRef.current) {
              fileRef.current.click()
            }
          }} className={`h-[40vh] relative w-full cursor-pointer flex items-center justify-center flex-col ${!selectedImage && 'border-dotted border-black border-[3px]'} rounded-md`}>
            {!selectedImage && <>
              <FaFileUpload size={40} />
              <p className='text-[#E377FF] text-center font-Avenir text-[18px] font-medium pt-[1rem]'>
                Upload Image or Multiple Images
              </p>
              <p className='text-[#464646] text-center font-Avenir text-[18px] font-medium pt-[1rem]'>
                File type supported: JPG, PNG, GIF, WEBP, SVG
              </p>
              <input onChange={(e) => {
                if (e.target.files) {
                  setSelectedImage(e.target.files)
                }
              }} multiple={true} ref={fileRef} type='file' className='hidden' />
            </>}
            {
              selectedImage && (
                <div className='w-full h-full'>
                  <Slider {...settings}>
                    {
                      Array.from(selectedImage).map((item: any, index) => {
                        return <div className='h-[40vh] focus:outline-none px-[1rem] relative w-full'>
                          <img src={URL.createObjectURL(item)} alt='preview' className='h-full w-full object-contain rounded-md' />
                          <div className='absolute top-[5px] right-[10px] flex justify-center items-center bg-black/50 w-[2rem] h-[2rem] rounded-full cursor-pointer'>
                            <FaTimes size={20} color='#fff' onClick={() => {
                              const images = Array.from(selectedImage)
                              images.splice(index, 1)
                              setSelectedImage(images)
                              if (images.length === 0) {
                                setSelectedImage(null)
                              }

                            }} />
                          </div>
                          <div className='absolute top-[5px] left-[10px] flex justify-center items-center bg-black/50  h-[2rem] px-[0.5rem] rounded-md cursor-pointer'>
                            <p className='text-white text-[18px] font-Avenir font-medium'>
                              {index + 1} / {selectedImage.length}
                            </p>
                          </div>
                        </div>
                      })
                    }
                  </Slider>
                </div>
              )
            }
          </div>
          <button onClick={() => setHowto(true)} className="bg-[#3F2D6D] mt-[2rem] disabled:opacity-50 hover:bg-[#3F2D6D] px-[2rem] w-fit font-Avenir tracking-wide flex justify-between items-center text-white  py-[0.5rem] rounded-md">
            How to Mint?
          </button>
        </div>
        <div className='md:w-[60%] w-full flex flex-col gap-[1rem]'>
          <ReDropDown onEndButtonClick={() => router.push('/new-collection')} endButtonTitle='Create New Collection' name='Select Collection' options={collectionsOptions} placeholder='Select a collection' onSelect={(value: string) => setFormData({ ...formData, collection: value })} selectedValue={formData.collection} />
          <ReInput placeholder='Name your NFT' label='Name' value={formData.name} onChange={(value: string) => setFormData({ ...formData, name: value })} />
          <ReInput placeholder='Describe your NFT' label='Description' isArea value={formData.desc} onChange={(value: string) => setFormData({ ...formData, desc: value })} />
          <ReInput placeholder='Set the price' label='Price (in $)' value={formData.price} onChange={(value: string) => {
            const regex = /^\d*\.?\d*$/; // matches numbers and decimals with at least one number after the point
            if (value.startsWith('.')) value = '0' + value
            if (regex.test(value) || value === '') {
              setFormData({ ...formData, price: value })
            }
          }} />
          <ReInput placeholder='Set the stock' label={`Stock (Number of NFT's you want to mint)`} value={formData.stoc} onChange={(value: string) => {
            //regex to take only integers no decimals
            const regex = /^\d*$/;
            if (value.startsWith('.')) value = '0' + value
            if (regex.test(value) || value === '') {
              setFormData({ ...formData, stoc: value })
            }

          }} />
          <ReInput placeholder='Enter Royality' label='Royality (in % between 1 to 100)' value={formData.royality} onChange={(value: string) => {
            //regex to take only integers no decimals
            //no decimals number between 1 to 100
            const regex = /^([1-9][0-9]?|100)$/;
            if (value.startsWith('.')) value = '0' + value
            if (regex.test(value) || value === '') {
              setFormData({ ...formData, royality: value })
            }
          }} />
          <ReDropDown name='Category' options={categories} placeholder='Select a category' onSelect={(value: string) => setFormData({ ...formData, selectedCategory: value })} selectedValue={formData.selectedCategory} />

          <button onClick={onSubmit} className="bg-[#3F2D6D] mt-[2rem] disabled:opacity-50 hover:bg-[#3F2D6D] px-[2rem] w-fit font-Avenir tracking-wide flex justify-between items-center text-white  py-[0.5rem] rounded-md">
            {
              loading ? 'Uploading...' : 'Upload'
            }
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default NewNFTComponent