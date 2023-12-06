import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link } from "@nextui-org/react";
import toast from "react-hot-toast";
import { APIClient } from "@/utils/APIClient";
import { useMyItemsStore } from "@/utils/Zustand";

type Props = {
  isOpen: boolean,
  onOpenChange: () => void,
  itemName: string,
  tokensSold: number,
  itemId: string
}


const BuyBackModal = ({ isOpen, onOpenChange, itemName, tokensSold, itemId }: Props) => {
  const [tokens, setTokens] = React.useState(0)
  const [price, setPrice] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const { setMyItems } = useMyItemsStore()

  const handleCreate = async () => {
    try {
      setLoading(true)
      const data = await APIClient.post('buybacks', {
        json: {
          item: itemId,
          price,
          numofTokens: tokens
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      const dataJson: any = await data.json()
      if (dataJson.success) {
        toast.success("Buyback created successfully")
        onOpenChange()
        setMyItems()
      }
    }
    catch (e: any) {
      const error = await e?.response?.json()
      toast.error(error?.message || "Something went wrong")
    }
    finally {
      setLoading(false)
    }

  }

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
                Create Buy Back for {itemName}
              </ModalHeader>
              <ModalBody>
                <Input
                  value={tokens + ""}
                  onChange={(e) => setTokens(parseInt(e.target.value))}
                  type="number"
                  label="Number of tokens to buy back"
                  max={tokensSold}
                  min={0}
                  placeholder="0"
                  labelPlacement="outside"
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small"></span>
                    </div>
                  }
                />
                <Input
                  type="number"
                  value={price + ""}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                  label="Price per token"
                  min={0}
                  placeholder="0"
                  labelPlacement="outside"
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" disabled={loading} onPress={handleCreate}>
                  {
                    loading ? "Creating..." : "Create"
                  }
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default BuyBackModal;