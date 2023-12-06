import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { FiX } from "react-icons/fi";
import Image from "next/image";

interface TermsAndConditionsProps {
  isOpen: boolean;
  onClose: () => void;
  size:
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "full";
}

const HowToModal: React.FC<TermsAndConditionsProps> = ({
  isOpen,
  onClose: closeFun,
  size,
}) => {
  const numOfSteps = 8;
  const [currentStep, setCurrentStep] = useState(1);

  const onClose = () => {
    setCurrentStep(1)
    closeFun()
  }

  const handleNext = () => {
    if (currentStep < numOfSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  return (
    <Modal classNames={{
      closeButton: "text-[1.5rem] text-black",
    }} backdrop="blur" isOpen={isOpen} scrollBehavior="inside" onClose={onClose} size="5xl" >
      <ModalContent className="p-[2rem]" >

        <ModalBody className=" ml-2 list-decimal leading-loose font-Avenir tracking-wide">
          {currentStep == 1 && <Step1 />}
          {currentStep == 2 && <Step2 />}
          {currentStep == 3 && <Step3 />}
          {currentStep == 4 && <Step4 />}
          {currentStep == 5 && <Step6 />}
          {currentStep == 6 && <Step7 />}
          {currentStep == 7 && <Step8 />}
          {currentStep == 8 && <Step9 />}
        </ModalBody>

        <div className="flex w-full mt-[1rem] justify-center gap-[1rem]">
          <Button
            disabled={currentStep === 1}
            onClick={handleBack}
            className="text-center bg-[#3f2d6d] disabled:text-black disabled:bg-[#d0d0d0] hover:bg-[#E377FF] text-white font-medium text-sm uppercase px-3 py-2 rounded"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            className="text-center bg-[#3f2d6d] disabled:text-black disabled:bg-[#d0d0d0] hover:bg-[#E377FF] text-white font-medium text-sm uppercase px-3 py-2 rounded"
          >
            {
              currentStep === numOfSteps ? "Close" : "Next"
            }
          </Button>

        </div>

        <div className="flex w-full mt-[1rem] justify-center gap-[5px]">
          {
            Array(numOfSteps).fill(0).map((_, index) => (
              <div onClick={() => {
                if (currentStep !== index + 1) {
                  setCurrentStep(index + 1)
                }
              }} key={index} className={`w-[10px] h-[10px] cursor-pointer rounded-full ${currentStep === index + 1 ? "bg-[#3f2d6d]" : "bg-[#d0d0d0]"}`} />
            ))
          }
        </div>


      </ModalContent>
    </Modal>
  );
};

const Step1 = () => {
  return (
    <>
      <div className="w-full justify-center flex gap-[1rem]">
        <Image src="/Images/Modal/Step1/1.png" alt="step1" className="w-[40%]" width={1000} height={1000} />
        <Image src="/Images/Modal/Step1/2.png" alt="step1" className="w-[40%]" width={1000} height={1000} />
      </div>
      <div className="w-full mt-[1rem] bg-[#fbf1fc] p-[1.5rem]">
        <p className=" font-medium text-[28px]">Step 1: Sign In</p>
        <div className="mt-[1rem] w-full">
          <ol type="1">
            <li className=" text-[18px]">1. Access the Sign In Page: Visit NFT World's homepage.</li>
            <li className=" text-[18px]">2. Enter Your Credentials: Type in your username and password.</li>
            <li className=" text-[18px]">3.  Select Account Type: Choose your account type (User, Partner, or Brand).</li>
            <li className=" text-[18px]">4.  Click Sign In: Proceed to sign in and access your dashboard.</li>
          </ol>
        </div>
      </div>
    </>
  )
}
const Step2 = () => {
  return (
    <>
      <div className="w-full justify-center flex gap-[1rem]">
        <Image src="/Images/Modal/Step2/1.png" alt="step2" className="w-[40%]" width={1000} height={1000} />
        <Image src="/Images/Modal/Step2/2.png" alt="step2" className="w-[40%]" width={1000} height={1000} />
      </div>
      <div className="w-full mt-[1rem] bg-[#fbf1fc] p-[1.5rem]">
        <p className=" font-medium text-[28px]">Step 2: Navigate To The Dashboard</p>
        <div className="mt-[1rem] w-full">
          <ol type="1">
            <li className=" text-[18px]">1. Confirm Successful Login: Ensure that you are logged in and can view the dashboard.</li>
            <li className=" text-[18px]">2. Get Acquainted with the Dashboard: Take a moment to explore various sections and functionalities.</li>
          </ol>
        </div>
      </div>
    </>
  )
}

const Step3 = () => {
  return (
    <>
      <div className="w-full justify-center flex gap-[1rem]">
        <Image src="/Images/Modal/Step9/1.png" alt="step1" className="w-[40%]" width={1000} height={1000} />
      </div>
      <div className="w-full mt-[1rem] bg-[#fbf1fc] p-[1.5rem]">
        <p className=" font-medium text-[28px]">Step 3: Connecting Your Wallet</p>
        <div className="mt-[1rem] w-full">
          <p className=" text-[18px] font-medium">To mint an NFT, you can start by using a temporary wallet:</p>
          <ol type="1">
            <li className=" text-[18px]">1.	Navigate to the "Connect Wallet" option on the NFT-World platform's header.</li>
            <li className=" text-[18px]">2.	You have two choices for signing in: Sign in with your Google account. Alternatively, enter your email address and proceed to verify it. Upon verification, your temporary wallet will be created and ready to use.</li>
          </ol>
        </div>
        <div className="mt-[1rem] w-full">
          <p className=" text-[18px] font-medium">If you prefer to create a new permanent wallet with MetaMask:</p>
          <ol type="1">
            <li className=" text-[18px]">1.	Visit the official MetaMask website at www.metamask.io using Google Chrome.</li>
            <li className=" text-[18px]">2.	Download the MetaMask wallet and add it as a Chrome extension.</li>
            <li className=" text-[18px]">3.	Click on the MetaMask wallet icon in your browser and select the "Polygon Mainnet" blockchain from the wallet's network dropdown menu.</li>
            <li className=" text-[18px]">4.	To fund your wallet, use the "Buy Matic" feature, which allows you to add MATIC tokens to your account.</li>
          </ol>
        </div>
      </div>
    </>
  )
}
const Step4 = () => {
  return (
    <>
      <div className="w-full justify-center flex gap-[1rem]">
        <Image src="/Images/Modal/Step3/1.png" alt="step1" className="w-[40%]" width={1000} height={1000} />
      </div>
      <div className="w-full mt-[1rem] bg-[#fbf1fc] p-[1.5rem]">
        <p className=" font-medium text-[28px]">Step 4: Start The NFT Creation Process</p>
        <div className="mt-[1rem] w-full">
          <ol type="1">
            <li className=" text-[18px]">1. Navigate to NFT Creation: Click on the 'Create New NFT' button within the dashboard.</li>
            <li className=" text-[18px]">2. Open Collection Dropdown: Locate and click on the 'Collection' dropdown menu.</li>
          </ol>
        </div>
      </div>
    </>
  )
}
const Step6 = () => {
  return (
    <>
      <div className="w-full justify-center flex gap-[1rem]">
        <Image src="/Images/Modal/Step45/1.png" alt="step1" className="w-[40%]" width={1000} height={1000} />
      </div>
      <div className="w-full flex md:flex-row flex-col gap-[1rem] justify-center">
        <div className="md:w-[50%] w-full mt-[1rem] bg-[#fbf1fc] p-[1.5rem]">
          <p className=" font-medium text-[28px]">Step 5: Start The NFT Creation Process</p>
          <div className="mt-[1rem] w-full">
            <ol type="1">
              <li className=" text-[18px]">1. Check for Existing Collections: Look through the list of deployed collections in the dropdown.</li>
              <li className=" text-[18px]">2. Create a New Collection: If your desired collection is not listed, click on the 'Create New’
                Collection' button.
                <br />Name Your Collection: Provide a unique and meaningful name.
                <br />Add a Description: Detail what your collection represents.
                <br />Set Short Collection Name: Choose a short, symbolic name (up to 5 characters).
                <br />Determine Royalties: Establish the royalty percentage for sales.
                <br />Choose a Category: Select the category that best fits your collection.
                <br />Upload a Blockchain Logo: Add a logo associated with your collection's blockchain.
                <br />Save and Continue: Proceed to publish and save your new collection.</li>
            </ol>
          </div>
        </div>
        <div className="md:w-[50%] w-full mt-[1rem] bg-[#fbf1fc] p-[1.5rem]">
          <p className=" font-medium text-[28px]">Step 6: Deploy The Collection</p>
          <div className="mt-[1rem] w-full">
            <ol type="1">
              <li className=" text-[18px]">1. Return to the Dashboard: Navigate back to the main dashboard area.</li>
              <li className=" text-[18px]">2. Go to 'My Collections': Find and select the 'My Collections' tab.</li>
              <li className=" text-[18px]">3. Locate Your Collection: Identify the collection you've just created.</li>
              <li className=" text-[18px]">4. Deploy: Click the 'Deploy' button adjacent to your collection.
                <br />Connect Your Wallet: Ensure your MetaMask or other wallet is connected.
                <br />Pay Deployment Fees: Approve the transaction and cover any associated fees.
              </li>
              <li className=" text-[18px]">5. Activate the Collection: Upon successful deployment, choose to 'Activate' your collection. By default it is active after deploying you have an option to hide.</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  )
}

const Step7 = () => {
  return (
    <>
      <div className="w-full justify-center flex gap-[1rem]">
        <Image src="/Images/Modal/Step6/1.png" alt="step1" className="w-[40%]" width={1000} height={1000} />
      </div>
      <div className="w-full mt-[1rem] bg-[#fbf1fc] p-[1.5rem]">
        <p className=" font-medium text-[28px]">Step 7: Complete NFT Details</p>
        <div className="mt-[1rem] w-full">
          <ol type="1">
            <li className=" text-[18px]">1. Return to NFT Creation: Go back to the 'Create New NFT' section.</li>
            <li className=" text-[18px]">2. Select Your Deployed Collection: From the 'Collection' dropdown, pick the collection you’ve just deployed and activated.</li>
            <li className=" text-[18px]">3. Fill in NFT Information:
              <br />Upload Image: Add the image file for your NFT.
              <br />Name: Provide a unique and descriptive title.
              <br />Add a Description: Elaborate on what your NFT represents.
              <br />Set a Price: Determine and input the price.
              <br />Define Stock: Specify the stock quantity (if applicable).
              <br />Establish Royalty: Set the royalty rate for sales.
              <br />Select a Category: Choose the appropriate category for your NFT.</li>
            <li className=" text-[18px]">4. Proceed: Move forward in the creation process.</li>
          </ol>
        </div>
      </div>
    </>
  )
}
const Step8 = () => {
  return (
    <>
      <div className="w-full justify-center flex gap-[1rem]">
        <Image src="/Images/Modal/Step7/1.png" alt="step1" className="w-[40%]" width={1000} height={1000} />
      </div>
      <div className="w-full mt-[1rem] bg-[#fbf1fc] p-[1.5rem]">
        <p className=" font-medium text-[28px]">Step 8: Minting and Publishing The NFT</p>
        <div className="mt-[1rem] w-full">
          <ol type="1">
            <li className=" text-[18px]">1. Go to 'My NFTs': Navigate back to your NFT listings, found under 'My NFTs' or 'Recently Added NFTs'.</li>
            <li className=" text-[18px]">2. Select Your NFT: Identify and choose the NFT you wish to mint.</li>
            <li className=" text-[18px]">3. Mint: Opt for the 'Mint' action.
              <br />Note: Minting is free, but a voucher signature via MetaMask is required.
              <br />Sign the Voucher: Complete the signature process to continue.</li>
            <li className=" text-[18px]">4.  Publish: After signing, select 'Publish' to make your NFT publicly available.</li>
          </ol>
        </div>
      </div>
    </>
  )
}
const Step9 = () => {
  return (
    <>
      <div className="w-full justify-center flex gap-[1rem]">
        <Image src="/Images/Modal/Step8/1.png" alt="step1" className="w-[40%]" width={1000} height={1000} />
        <Image src="/Images/Modal/Step8/2.png" alt="step1" className="w-[40%]" width={1000} height={1000} />
      </div>
      <div className="w-full mt-[1rem] bg-[#fbf1fc] p-[1.5rem]">
        <p className=" font-medium text-[28px]">Step 9: Decide NFT Visibility</p>
        <div className="mt-[1rem] w-full">
          <ol type="1">
            <li className=" text-[18px]">1.  Set Display Options: Click on the 'NFT Live On' button.</li>
            <li className=" text-[18px]">2.  Choose Viewing Platforms: A dropdown will appear with options for 'On Marketplace' and 'On Your Storefront'.
              <br />Select as Desired: Check both for maximum exposure or select according to your preference.</li>

          </ol>
        </div>
      </div>
    </>
  )
}

export default HowToModal;
