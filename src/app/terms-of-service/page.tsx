import Footer from '@/Component/Footer'
import Nav from '@/Component/Navbar/Nav'
import React from 'react'

type Props = {}

const Terms = (props: Props) => {
  return (
    <div>
      <Nav />
      <div className='h-[20vh] mt-[100px] w-full bg-[#e377ff] flex items-center justify-center'>
        <h1 className='text-[2vw] font-medium font-Avenir text-white'>Terms of Service - NFT World One</h1>
      </div>
      <div className='w-full px-[10%] my-[5rem]'>
        <ol className='list-decimal'>
          <li className='mb-[2rem] pl-[10px]'>
            Welcome to NFT-WORLD.ONE, operated by Blockchain Labs LLC.
            Before you begin using our platform, please carefully read and
            understand the following terms and conditions that govern your
            use of the platform and the NFT minting process. By using our
            platform, you agree to comply with these terms and conditions.
          </li>
          <li className='mb-[2rem] pl-[10px]'>
            Ownership and Declaration: By minting images on nft-world.one,
            you declare and confirm that you are the legal owner of the
            artwork being minted as NFT. You possess the necessary rights
            to mint the artwork as NFT. You also declare that the artwork
            does not infringe on the intellectual property rights of any
            third party.
          </li>
          <li className='mb-[2rem] pl-[10px]'>
            Third Party Claims: In the event of any claim made by a third
            party asserting ownership or rights over the minted artwork,
            nft- world.one reserves the right to temporarily disable the
            artwork until a resolution is established between the
            contesting parties. nft-world.one shall not be held liable for
            any loss or inconvenience caused due to such actions.
          </li>
          <li className='mb-[2rem] pl-[10px]'>
            Platform Social Policies: All minted artworks must adhere to
            nft-world.one’s social policies. If an artwork violates these
            policies, the administrators hold the right to disable the
            artwork without prior notice. This includes but is not limited
            to content that promotes hate speech, discrimination,
            violence, explicit adult content, or any other form of
            offensive material.
          </li>
          <li className='mb-[2rem] pl-[10px]'>
            Non-Discrimination: By minting an artwork on nft-world.one,
            you declare that the artwork is not intended to target or
            promote discrimination against any gender, caste, creed,
            religion, or race. Any artwork found to be in violation of
            this principle may be subject to removal at the discretion of
            the administrators.
          </li>
          <li className='mb-[2rem] pl-[10px]'>
            User Responsibilities: You are solely responsible for the
            accuracy of the information provided during the NFT minting
            process. It is your responsibility to ensure that all
            information, including metadata and descriptions, is truthful
            and does not infringe upon the rights of others.
          </li>
          <li className='mb-[2rem] pl-[10px]'>
            Intellectual Property: Any intellectual property rights
            associated with the minted artworks shall remain with the
            respective owners. nft-world.one does not claim ownership over
            the intellectual property rights of the minted content.
          </li>
          <li className='mb-[2rem] pl-[10px]'>
            Legal Compliance: You agree to comply with all applicable
            laws, regulations, and guidelines when using nft-world.one.
            This includes intellectual property laws, tax regulations, and
            any other legal obligations relevant to your use of the
            platform.
          </li>
          <li className='mb-[2rem] pl-[10px]'>
            Indemnification: You agree to indemnify and hold
            nft-world.one, Blockchain Labs LLC, and its affiliates
            harmless from any claims, damages, liabilities, or expenses
            arising out of your use of the platform or any violation of
            these terms and conditions.
          </li>
          <li className='mb-[2rem] pl-[10px]'>
            Modification of Terms: nft-world.one reserves the right to
            modify or update these terms and conditions at any time
            without prior notice. It is your responsibility to review the
            terms periodically for any changes.
          </li>
          <li className='mb-[2rem] pl-[10px]'>
            Termination of Access: nft-world.one reserves the right to
            terminate or suspend your access to the platform, in whole or
            in part, at its sole discretion and without prior notice, if
            you violate any of these terms and conditions.
          </li>
          <li className='mb-[2rem] pl-[10px]'>
            Governing Law: These terms and conditions shall be governed by
            and construed in accordance with the laws of Wyoming United
            States. Any disputes arising from these terms shall be subject
            to the exclusive jurisdiction of the courts in Wyoming United
            States.
          </li>
          <li className='mb-[2rem] pl-[10px]'>
            Age Requirement: By using this platform, you affirm that you are at least 18 years of age. nft-world.one does not permit individuals under the age of 18 to use its platform or engage in the NFT minting process.
          </li>
        </ol>
      </div>
      <Footer />
    </div>
  )
}

export default Terms