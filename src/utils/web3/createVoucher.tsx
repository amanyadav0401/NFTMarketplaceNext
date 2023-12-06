import CarbonCreditParcel from "./Voucher";
import { useSigner, useAddress } from "@thirdweb-dev/react";
import { useState } from "react";
import { utils } from 'ethers'
import { toast } from "react-hot-toast";
import { APIClient } from "../APIClient";

//contract instance

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const useCreateParcel = () => {
  // const { contract, isLoading, error } = useContract(contractAddress, Web3Exchange);
  const address = useAddress();
  const signer = useSigner();
  const [isCreatingVoucher, setLoading] = useState(false);

  const createParcel = async (
    tokenID: number, amount: number, price: number, royality: number, tokenURI: string, nftAddress: string
  ) => {
    if (!address) {
      toast.error('Please connect your wallet')
      return
    }
    setLoading(true);
    const carbonCreditParcel = new CarbonCreditParcel({
      _contract: { address: contractAddress },
      _signer: signer,
    });
    const amountInWei = utils.parseEther(price.toFixed(6).toString())

    const countData = await APIClient.get('count?key=tokenId')
    const countDataJson = await countData.json()
    const { data: count }: any = countDataJson

    const newParcel = await carbonCreditParcel.createVoucher(
      nftAddress, address, count, amount, amountInWei, royality, '0x0000000000000000000000000000000000000001', tokenURI
    )
    console.log(newParcel)
    setLoading(false);
    return {
      newParcel,
    };
  }

  return { createParcel, isCreatingVoucher }

}

export default useCreateParcel;