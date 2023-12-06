import Footer from '@/Component/Footer'
import BackButton from '@/Component/Micro/BackButton';
import Nav from '@/Component/Navbar/Nav'
import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";

type Props = {}

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  return (
    <div className='mb-[1rem] w-full'>
      <p className='font-bold text-[18px]'>
        {question}
      </p>
      <p className=' text-[18px]'>
        {answer}
      </p>
    </div>
  )
}

const FAQ = (props: Props) => {
  return (
    <>
      <Nav />
      <div className='md:h-[20vh] relative h-[10vh] mt-[100px] w-full bg-[#E377FF] flex items-center justify-center'>
        <h1 className='text-white text-center text-2xl md:text-5xl'>FAQs</h1>
        <BackButton />
      </div>
      <div className='px-[2rem] flex w-full md:flex-row flex-col  gap-5 py-[2rem] md:py-[5rem]'>
        <div className='md:w-[50%] w-full p-[3%] h-auto bg-[#fbf1fc]'>
          <FaqItem question='What is an NFT?' answer='An NFT (non-fungible token) is a unique digital item stored on a blockchain, representing ownership of a specific asset.' />

          <FaqItem question={`What does 'non-fungible' mean in NFTs?`} answer={`Non-fungible means that the item is one-of-a-kind and cannot be replaced with something else. It has unique attributes that set it apart from other items.`} />

          <FaqItem question={`How do NFTs work?`} answer={`NFTs work on blockchain technology, where each token is recorded on a digital ledger, providing a transparent history of ownership and transactions.`} />


          <FaqItem question={`Why are NFTs considered secure?`} answer={`The blockchain's immutability ensures that once an NFT is created, its history cannot be altered, making it secure and tamper-proof.`} />

          <FaqItem question={`What makes NFTs different from cryptocurrency?`} answer={`NFTs represent ownership of unique items, while cryptocurrencies like Bitcoin are fungible and can be exchanged like-for-like.`} />


          <FaqItem question={`Can anyone create an NFT?`} answer={`Yes, with the appropriate tools and access to a blockchain platform, anyone can mint or create an NFT.`} />


          <FaqItem question={`What can be sold as an NFT?`} answer={`Almost any digital asset can be sold as an NFT, including art, music, videos, in-game items, and more.`} />


          <FaqItem question={`How do I buy an NFT?`} answer={`You can buy NFTs through various marketplaces that support blockchain technology, using cryptocurrency. NFT-World is one of leading NFT marketplaces in the world.`} />


          <FaqItem question={`What do I need to start collecting NFTs?`} answer={`You'll need a digital wallet that supports NFTs and cryptocurrency to purchase and store your NFTs.`} />


          <FaqItem question={`Are NFTs environmentally friendly?`} answer={`The environmental impact of NFTs depends on the blockchain they are minted on. Some blockchains are more energy-efficient than others.`} />


          <FaqItem question={`How can I sell an NFT?`} answer={`You can list your NFT on a marketplace for sale, and upon a successful transaction, transfer the NFT to the buyer's wallet.`} />
        </div>
        <div className='md:w-[50%] w-full p-[3%] h-auto bg-[#fbf1fc]'>
          <FaqItem question={`Can I earn royalties on my NFT?`} answer={`Yes, many NFT platforms allow creators to earn royalties on secondary sales.`} />

          <FaqItem question={`What is a blockchain?`} answer={`A blockchain is a distributed digital ledger that records transactions across many computers securely and transparently.`} />

          <FaqItem question={`What is gas fee in the context of NFTs?`} answer={`A gas fee is a payment made to compensate for the computing energy required to process and validate transactions on the blockchain.`} />

          <FaqItem question={`Can NFTs be exchanged or returned?`} answer={`The policies on exchanging or returning NFTs vary by marketplace and are generally determined by the seller.`} />

          <FaqItem question={`What is 'minting' an NFT?`} answer={`Minting an NFT is the process of creating a new token on the blockchain representing ownership of a digital asset.`} />


          <FaqItem question={`How do I prove ownership of an NFT?`} answer={`Ownership of an NFT is proven through the blockchain ledger, where each token's history and current owner are transparently recorded.`} />

          <FaqItem question={`Are NFTs legal?`} answer={`The legality of buying and selling NFTs depends on the jurisdiction, but in most places, they are legal.`} />

          <FaqItem question={`How do I display my NFTs?`} answer={`You can display NFTs through various digital platforms, including virtual galleries or social media.`} />

          <FaqItem question={`What is a wallet, and why do I need one for NFTs?`} answer={`A digital wallet is a secure place to store your cryptocurrency and NFTs, necessary for buying, selling, and transferring tokens.`} />

          <FaqItem question={`How is the value of an NFT determined?`} answer={`The value of an NFT is determined by market demand, rarity, the creator's reputation, and other unique traits of the digital asset.`} />

          <FaqItem question={`What should I consider before buying an NFT?`} answer={`Before buying an NFT, consider the asset's uniqueness, the creator's authenticity, the marketplace's reliability, and the NFT's potential for appreciation.`} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default FAQ