import Footer from '@/Component/Footer'
import Nav from '@/Component/Navbar/Nav'
import React from 'react'

type Props = {}

const AboutItems = ({ children, end = false }: {
  children?: React.ReactNode
  end?: boolean
}) => {
  return (
    <div className={`w-full flex ${end ? 'justify-end' : 'justify-start'
      } py-[2rem]`}>
      <div className={`md:w-[90%] w-[100%] bg-[#FBF1FC] ${end ? 'md:pr-[10vw]' : 'md:pl-[10vw]'
        } p-[2rem]`}>
        {children}
      </div>
    </div>
  )
}

const AboutUS = (props: Props) => {
  return (
    <>
      <Nav />
      <div style={{
        backgroundImage: 'url(/Images/about-us.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // backgroundAttachment: 'fixed',
      }} className='h-[100vh] flex items-center mt-[100px] justify-center w-[100%]'>
        <p className='text-[42px] md:w-[30vw] text-center leading-[60px] text-[#3F2D6D] font-bold'>
          NFT-World.one:<br /> Elevate Customer Engagement with the NFT Edge
        </p>
      </div>
      <div className='w-[100%] overflow-x-hidden'>
        <AboutItems>
          Powered by Blockchain Labs LLC, NFT-world.one is not just another marketplace; it's the next frontier in brand-to-customer interactions. In a digital landscape inundated with fleeting engagements, our platform offers a lasting impression. At the heart of this innovation is our use of NFTs, turning every interaction into a unique, personalized experience.
        </AboutItems>
        <div className="scrolling-container">
          <img src='/Images/lines.png' className='scrolling-image' />
          <img src='/Images/lines.png' className='scrolling-image' />
          <img src='/Images/lines.png' className='scrolling-image' />
          <img src='/Images/lines.png' className='scrolling-image' />
        </div>
        <AboutItems end={true}>
          Within each brand storefront on NFT-world.one, products and launches come alive, but the game-changer is the NFT-centric reward mechanisms. Imagine granting your loyal customers exclusive digital collectibles or tokens that open doors to special brand events. It's more than a purchase; it's an engagement, an experience, a bond.
        </AboutItems>
        <div className="scrolling-container-reverse">
          <img src='/Images/lines.png' className='scrolling-image' />
          <img src='/Images/lines.png' className='scrolling-image' />
          <img src='/Images/lines.png' className='scrolling-image' />
          <img src='/Images/lines.png' className='scrolling-image' />
        </div>

        <AboutItems>
          Our platform redefines customer engagement, capitalizing on the exclusivity and allure of NFTs. Brands can now craft rewarding, memorable touchpoints, driving loyalty like never before. With NFT-world.one, every digital interaction counts, ensuring customers not only see your brand but connect with it.
        </AboutItems>
        <div className="scrolling-container">
          <img src='/Images/lines.png' className='scrolling-image' />
          <img src='/Images/lines.png' className='scrolling-image' />
          <img src='/Images/lines.png' className='scrolling-image' />
          <img src='/Images/lines.png' className='scrolling-image' />
        </div>
        <AboutItems end={true}>
          Dive into the future of enriched brand engagement with NFT-world.one. Here, every NFT isn't just a token; it's an invitation to engage deeper. Your brand deserves the spotlight; illuminate it with the unmatched power of NFTs.
        </AboutItems>
      </div>
      <Footer />
    </>
  )
}

export default AboutUS