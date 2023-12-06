import Footer from '@/Component/Footer'
import BackButton from '@/Component/Micro/BackButton'
import Nav from '@/Component/Navbar/Nav'
import React from 'react'

type Props = {}

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='md:w-[50%] w-full h-auto bg-[#fbf1fc] p-[1rem]'>
      {children}
    </div>
  )
}

const HowToMint = (props: Props) => {
  return (
    <>
      <Nav />
      <div className='h-[20vh] relative mt-[100px] w-full bg-[#E377FF] flex items-center justify-center'>
        <h1 className='text-white md:w-full w-[60%] text-center text-2xl md:text-5xl'>How to Create a NFT on NFT WORLD</h1>
        <BackButton />
      </div>
      <div className='px-[2rem] flex flex-col gap-5 py-[5rem]'>
        <div className='w-full md:flex-row flex-col flex gap-5'>
          <Container>
            <p className='text-[32px] font-medium'>
              Step 1: Sign In
            </p>
            <br /> <br />
            1. Access the Sign In Page: Visit NFT World's homepage. <br />
            2. Enter Your Credentials: Type in your username and password. <br />
            3. Select Account Type: Choose your account type (User, Agency, or Brand). <br />
            4. Click Sign In: Proceed to sign in and access your dashboard. <br />
          </Container>
          <Container>
            <p className='text-[32px] font-medium'>
              Step 2: Navigate to the Dashboard
            </p>
            <br /> <br />
            1. Confirm Successful Login: Ensure that you are logged in and can view the dashboard.<br />
            2. Get Acquainted with the Dashboard: Take a moment to explore various sections and
            functionalities. <br />
          </Container>
        </div>
        <div className='w-full md:flex-row flex-col flex gap-5'>
          <Container>
            <p className='text-[32px] font-medium'>
              Step 3: Connecting Your Wallet
            </p>
            <br /> <br />
            To mint an NFT, you can start by using a temporary wallet: <br />
            1. Navigate to the "Connect Wallet" option on the NFT-World platform's header. <br />
            2. You have two choices for signing in: <br />
            Sign in with your Google account. <br />
            Alternatively, enter your email address and proceed to verify it. Upon verification, your temporary wallet will be created and ready to use.  <br />
            If you prefer to create a new permanent wallet with MetaMask: <br />
            1. Visit the official MetaMask website at www.metamask.io using Google Chrome.  <br />
            2. Download the MetaMask wallet and add it as a Chrome extension. <br />
            3. Click on the MetaMask wallet icon in your browser and select the "Polygon Mainnet" blockchain from the wallet's network dropdown menu. <br />
            To fund your wallet, use the "Buy Matic" feature, which allows you to add MATIC tokens to your account. <br />
          </Container>
          <Container>
            <p className='text-[32px] font-medium'>
              Step 4: Start the NFT Creation Process
            </p>
            <br /> <br />

            1. Navigate to NFT Creation: Click on the 'Create New NFT' button within the dashboard. <br />
            2. Open Collection Dropdown: Locate and click on the 'Collection' dropdown menu.  <br />
          </Container>
        </div>
        <div className='w-full md:flex-row flex-col flex gap-5'>
          <Container>
            <p className='text-[32px] font-medium'>
              Step 5: Create a New Collection (If Necessary)
            </p>
            <br /> <br />
            1. Check for Existing Collections: Look through the list of deployed collections in the dropdown. <br />
            2. Create a New Collection: If your desired collection is not listed, click on the 'Create New’
            Collection' button. <br />
            Name Your Collection: Provide a unique and meaningful name. <br />
            Add a Description: Detail what your collection represents. <br />
            Set Short Collection Name: Choose a short, symbolic name (up to 5 characters). <br />
            Determine Royalties: Establish the royalty percentage for sales. <br />
            Choose a Category: Select the category that best fits your collection. <br />
            Upload a Blockchain Logo: Add a logo associated with your collection's blockchain. <br />
            Save and Continue: Proceed to publish and save your new collection. <br />
          </Container>
          <Container>
            <p className='text-[32px] font-medium'>
              Step 6: Deploy the Collection
            </p>
            <br /> <br />
            1. Return to the Dashboard: Navigate back to the main dashboard area. <br />
            2. Go to 'My Collections': Find and select the 'My Collections' tab. <br />
            3. Locate Your Collection: Identify the collection you've just created. <br />
            4. Deploy: Click the 'Deploy' button adjacent to your collection. <br />
            Connect Your Wallet: Ensure your MetaMask or other wallet is connected. <br />
            Pay Deployment Fees: Approve the transaction and cover any associated fees. <br />
            5. Activate the Collection: Upon successful deployment, choose to 'Activate' your collection. By default it is active after deploying you have an option to hide. <br />
          </Container>
        </div>
        <div className='w-full md:flex-row flex-col flex gap-5'>
          <Container>
            <p className='text-[32px] font-medium'>
              Step 7: Complete NFT Details
            </p>
            <br /> <br />
            1. Return to NFT Creation: Go back to the 'Create New NFT' section. <br />
            2. Select Your Deployed Collection: From the 'Collection' dropdown, pick the collection you’ve just deployed and activated. <br />
            3. Fill in NFT Information:  <br />
            Upload Image: Add the imagefile for your NFT. <br />
            Name: Provide a unique and descriptive title. <br />
            Add a Description: Elaborate on what your NFT represents. <br />
            Set a Price: Determine and input the price. <br />
            Define Stock: Specify the stock quantity (if applicable). <br />
            Establish Royalty: Set the royalty rate for sales. <br />
            Select a Category: Choose the appropriate category for your NFT. <br />
            4. Proceed: Move forward in the creation process. <br />
          </Container>
          <Container>
            <p className='text-[32px] font-medium'>
              Step 8: Minting and Publishing the NFT
            </p>
            <br /> <br />

            1. Go to 'My NFTs': Navigate back to your NFT listings, found under 'My NFTs' or 'Recently
            Added NFTs'. <br />
            2. Select Your NFT: Identify and choose the NFT you wish to mint. <br />
            3. Mint: <br />
            Opt for the 'Mint' action. <br />
            Note: Minting is free, but a voucher signature via MetaMask is required. <br />
            Sign the Voucher: Complete the signature process to continue. <br />
            4. Publish: After signing, select 'Publish' to make your NFT publicly available. <br />

          </Container>
        </div>
        <div className='w-full md:flex-row flex-col flex gap-5'>
          <Container>
            <p className='text-[32px] font-medium'>
              Step 9: Decide NFT Visibility
            </p>
            <br /> <br />

            1. Set Display Options: Click on the 'NFT Live On' button. <br />
            2. Choose Viewing Platforms: A dropdown will appear with options for 'On Marketplace' and 'On
            Your Storefront'. <br />
            Select as Desired: Check both for maximum exposure or select according to your
            preference. <br />
          </Container>

        </div>
      </div>
      <Footer />
    </>
  )
}

export default HowToMint