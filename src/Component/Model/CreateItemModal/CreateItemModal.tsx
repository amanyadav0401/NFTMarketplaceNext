import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload, AiOutlineClose } from 'react-icons/ai'
import { Modal, ModalContent, Select, SelectSection, SelectItem, ModalHeader, Textarea, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { APIClient } from "@/utils/APIClient";
import { toast } from "react-hot-toast";
import { useMyItemsStore, useUserStore } from "@/utils/Zustand";
import { useRouter } from "next/navigation";
import { categories as options } from "@/utils/Constants";

type Props = {
  isOpen: boolean
  onOpenChange: () => void
  onModalClose: () => void
  nft: NFTItem
}

const CreateItemModal = ({
  isOpen, onOpenChange, onModalClose, nft
}: Props) => {
  const imageRef = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false)
  const { setMyItems } = useMyItemsStore()
  const { user } = useUserStore()
  const router = useRouter()
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    availableTokens: 0,
    floorPrice: 0,
    category: new Set<string>([]),
    royality: 0,
  })


  const closeModal = () => {
    if (loading) return
    onModalClose()
  }

  useEffect(() => {
    if (!user?._id) {
      closeModal()
    }
  }, [isOpen])


  const onSubmit = async () => {
    try {

      if (formState.name.length < 1) {
        toast.error('Enter a valid name')
        return
      }

      if (formState.description.length < 1) {
        toast.error('Enter a valid description')
        return
      }

      if (Number(formState.availableTokens) < 1) {
        toast.error('Enter a valid number of tokens')
        return
      }

      if (!formState.floorPrice) {
        toast.error('Enter a valid floor price')
        return
      }

      if (formState.category.size < 1) {
        toast.error('Select a category')
        return
      }

      if (Number(formState.royality) < 0 || Number(formState.royality) > 100) {
        toast.error('Enter a valid Royality')
        return
      }


      setLoading(true)

      const body = {
        name: formState.name,
        description: formState.description,
        price: formState.floorPrice,
        numOfTokens: formState.availableTokens,
        category: Array.from(formState.category)[0],
        royality: formState.royality || 0
      }

      const response: any = await APIClient.put(`items/${nft._id}`, {
        json: {
          ...body
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).json()
      console.log(response)
      if (response.success) {
        toast.success('Updated Successfully!')
        await setMyItems()
        closeModal()
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

  useEffect(() => {
    if (nft._id) {
      setFormState({
        name: nft.name,
        description: nft.description,
        availableTokens: nft.numOfTokens,
        floorPrice: nft.price,
        category: new Set<string>([nft.category]),
        royality: nft.royality,
      })
    }
  }, [nft])


  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Update NFT Details</ModalHeader>
              <ModalBody>
                <Input
                  value={formState.name}
                  onValueChange={(e) => setFormState({ ...formState, name: e })}
                  autoFocus
                  size="lg"
                  label="Name"
                  placeholder="Enter Image Title"
                  variant="bordered"
                  className="outline-none !focus:outline-none !bg-white"
                  autoComplete="new-password"
                  type="email"
                />
                <Textarea
                  autoComplete="new-password"
                  value={formState.description}
                  onValueChange={(e) => setFormState({ ...formState, description: e })}
                  label="Description"
                  labelPlacement="inside"
                  variant="bordered"
                  size="lg"
                  type="text"
                  placeholder="Enter your description"
                  className={
                    'bg-white'
                  }
                />
                <Input
                  value={formState.availableTokens as any}
                  onValueChange={(e) => setFormState({ ...formState, availableTokens: e as any })}
                  autoComplete="new-password"
                  label="Total NFT Stock"
                  size="lg"
                  placeholder="Enter Number of NFT's"
                  type="number"
                  className="outline-none !focus:outline-none !bg-white"
                  variant="bordered"
                />
                <Input
                  value={formState.floorPrice as any}
                  onValueChange={(e) => setFormState({ ...formState, floorPrice: e as any })}
                  type="number"
                  autoComplete="new-password"
                  variant="bordered"
                  className="outline-none !focus:outline-none !bg-white"
                  label="Floor Price"
                  size='lg'
                  placeholder="0.00"
                  labelPlacement="inside"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                />
                <Input
                  value={formState.royality as any}
                  onValueChange={(e) => setFormState({ ...formState, royality: e as any })}
                  type="number"
                  autoComplete="new-password"
                  variant="bordered"
                  className="outline-none !focus:outline-none !bg-white"
                  label="Royality"
                  size='lg'
                  placeholder="0.00"
                  labelPlacement="inside"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">%</span>
                    </div>
                  }
                />
                <Select
                  selectedKeys={formState.category}
                  onSelectionChange={(e) => setFormState({ ...formState, category: e as any })}
                  label="Select Category"
                  variant="bordered"
                  className="outline-none !focus:outline-none !bg-white"
                >
                  {options.map((animal) => (
                    <SelectItem key={animal.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
                <div onClick={() => images.length === 0 && imageRef.current?.click()} className="mt-[1rem] relative cursor-pointer w-full h-[10rem] flex items-center justify-center border-[#eaeaed] hover:border-black focus:border-[2px] transition-all duration-150 rounded-lg border">

                  {
                    nft.images.length > 0 && <div className="flex items-center gap-[5px] h-[10rem] justify-center">
                      {
                        nft.images.map((image, index) => {
                          return <img src={image} className="h-[4rem] w-[4rem] object-cover" />

                        })
                      }
                    </div>
                  }

                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={closeModal}>
                  Close
                </Button>
                <Button color="primary" onPress={onSubmit}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateItemModal;
