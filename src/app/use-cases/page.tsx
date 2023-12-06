import Footer from '@/Component/Footer'
import BackButton from '@/Component/Micro/BackButton'
import Nav from '@/Component/Navbar/Nav'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const LI = ({ text, nogap = false }: { text: string, nogap?: boolean }) => {
  return (
    <li className={`text-[18px] {
      ${nogap ? '' : 'my-[1rem]'}
    }`}>
      <span className="font-bold">
        {text.split(':')[0]}:
      </span>
      <span className="">
        {text.split(':')[1]}
      </span>
    </li>
  )
}


const UseCase = (props: Props) => {
  return (
    <>
      <Nav />
      <div className='h-[20vh] relative mt-[100px] w-full bg-[#E377FF] flex items-center justify-center'>
        <h1 className='text-white md:w-full w-[60%] text-center text-2xl md:text-5xl'>NFT Use Cases For The Brands</h1>
        <BackButton />
        <Link href={'/NFTUseCases.pdf'} target='__blank' style={{
          boxShadow: "0px 3px 1px -2px rgba(0, 0, 0, 0.20), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)"
        }} className='absolute right-0 bg-[#3F2D6D] px-[1rem] py-[0.5rem] text-white rounded-[5px] top-[40%] md:top-[45%] md:mr-[5%] mr-[2%]'>
          Download
        </Link>

      </div>
      <Image alt='hero image' src='/Images/usecase/1.png' className='w-[100%] h-auto' width={1920} height={1080} />
      <div className='w-full h-auto p-[3%]'>
        <div className='w-full h-auto p-[3%] bg-[#fbf1fc]'>
          <ol className='list-decimal md:ml-0 ml-[2rem]'>
            <LI text='NFT Buy-Back Programs: Brands can offer to buy back NFTs from customers at a fixed rate or at market value, effectively providing customers with a cash-back reward. This can serve as a powerful incentive for customers to engage with the brand and its products.' />
            <LI text='Wellness Challenge NFTs: Launch a wellness challenge where customers can mint NFTs by completing exercise or yoga sessions. Each NFT could represent a completed session and accumulate points that can be redeemed for merchandise or gift coupons at the end of the year.' />
            <LI text='NFTs as Warranty or Guarantee Certificates: Use NFTs to represent warranties or guarantees for products, with the option to transfer or redeem for discounts on future purchases.' />
            <LI text='Tiered Buy-Back Offers: Implement a tiered system where the buy-back value of an NFT increases based on the level of customer engagement or the length of time they have held the NFT, rewarding long-term loyalty with greater cash-back offers.' />
            <LI text='NFT Auctions: Host brand auctions where customers can submit their NFTs for sale, with the brand guaranteeing a minimum buy-back price. This could create an exciting event that encourages community participation and engagement.' />
            <LI text='Interactive Storytelling NFTs: Create narrative-driven challenges where users follow a storyline that requires completing real-world wellness activities to progress, minting NFTs as they complete each chapter.' />
            <LI text='Carbon Offset Rewards: Issue NFTs to individuals who commute by cycling or public transport, redeemable for carbon credits or donations to environmental initiatives.' />
            <LI text='Learning for Points NFTs: Create an educational content on Brand store front where users can earn NFTs for completing quizzes. Accumulated points from these NFTs could unlock exclusive content or discounts brand merchandise.' />
            <LI text='Environmental Challenge Tokens: Create challenges to promote sustainable living, rewarding participants with NFTs for completing activities like zero-waste living or participating in community clean-ups.' />
            <LI text='Dynamic Pricing NFTs: Introduce NFTs with dynamic pricing for buy-backs that fluctuate based on market trends, customer loyalty metrics, or product demand, giving customers the chance to capitalize on the right moment to sell back their NFTs.' />
            <LI text='Safe Driver NFTs: Implement a program where safe driving habits are tracked through a connected app. When drivers reach certain safety milestones, they mint NFTs, which can later be exchanged for premium discounts or car-related merchandise.' />
            <LI text={`Profit-Sharing NFTs: Create NFTs that act as a profit-sharing mechanism where the brand pledges to buy back the NFT based on the customer’s loyalty or the brand' s performance, thus providing a direct financial benefit to the customer.`} />
            <LI text='Augmented Reality NFTs: Create augmented reality experiences that can only be accessed by NFT holders, offering discounts or promotional content within the experience.' />
            <LI text='Exclusive Access NFTs: Offer NFTs that provide exclusive access or benefits, and which the brand can later offer to buy back, giving customers the choice between exclusive experiences or a cash reward.' />
            <LI text='Peer-to-Peer Challenge NFTs: Facilitate peer-to-peer challenges where users can invite friends to compete in wellness or safety challenges. Completing these challenges could mint NFTs that hold points or social kudos within the community.' />
          </ol>
        </div>
      </div>
      <Image alt='hero image' src='/Images/usecase/2.png' className='w-[100%] h-auto' width={1920} height={1080} />
      <div className='w-full h-auto p-[3%]'>
        <div className='md:w-full h-auto p-[3%] bg-[#fbf1fc]'>
          <ol
            className='list-decimal md:ml-0 ml-[2rem]'>
            <LI text='Renewable Energy Incentives: Offer NFTs as incentives for installing green energy solutions, possibly leading to rebates or discounts on related products or services.' />
            <LI text='Green Travel NFTs: Reward customers who choose environmentally friendly travel options with NFTs, which can be collected for benefits such as travel discounts or access to exclusive merchandise.' />
            <LI text='Digital Transition Tokens: Incentivize the shift to digital services by offering NFTs for going paperless, which could help fund reforestation projects or provide discounts on digital products.' />
            <LI text='Community Aid NFTs: Encourage community service by issuing NFTs to users who participate in community aid programs or charity events. These NFTs could hold value in redeeming services or could be auctioned to raise funds for charity.' />
            <LI text='NFTs for Pre-Order Benefits: Give customers who pre-order products an NFT that provides a discount on their next purchase or exclusive access to future releases.' />
            <LI text='Health Milestone NFTs: For health insurance, issue NFTs to customers who reach health milestones, like achieving a step goal or quitting smoking. These NFTs can then be traded in for health-related rewards or insurance premium credits.' />
            <LI text='NFTs for Sustainable Practices: Encourage sustainable customer behaviour by offering NFTs that can be redeemed for discounts to those who participate in recycling programs or sustainable initiatives.' />
            <LI text='Smart Living NFTs: Recognize customers who integrate smart technology to reduce their home’s energy consumption with NFTs, leading to exclusive offers or discounts on future smart home products.' />
            <LI text='Seasonal Campaign Tokens: Create NFTs that correspond with seasonal marketing campaigns, allowing customers to redeem them for seasonal items or discounts.' />
            <LI text='Referral Program NFTs: Offer NFTs as rewards for successful referrals, which can be traded in for discounts on products or services.' />
            <LI text='NFT Scavenger Hunts: Organize virtual scavenger hunts through gamification where customers can find NFTs that can be redeemed for discounts or exclusive access to products or events.' />
            <LI text='Social Media Engagement Tokens: Brands can give NFTs to customers who engage with them on social media platforms, which can be redeemed for discounts or special offers.' />
            <LI text='NFTs for Feedback and Surveys: Offer NFTs as incentives for customers to provide feedback or participate in surveys, with the tokens redeemable for discounts or exclusive content.' />
            <LI text='Collaborative NFT Collections: Partner with artists or other brands to create exclusive NFT collections that can be redeemed for discounts on collaborative products.' />
            <LI text='Loyalty Milestone NFTs: Reward customers with NFTs that increase in buy-back value as customers reach new loyalty milestones, offering a tangible cash incentive for continued engagement with the brand.' />
          </ol>
        </div>
      </div>
      <Image alt='hero image' src='/Images/usecase/3.png' className='w-[100%] h-auto' width={1920} height={1080} />
      <div className='w-full h-auto p-[3%]'>
        <div className='w-full h-auto p-[3%] bg-[#fbf1fc]'>
          <div className='w-full flex items-center justify-center'>
            <div className='md:w-[50%] w-full flex items-center mb-[2rem] justify-center py-[1rem] bg-white'>
              <h1 className='text-[24px] md:text-[32px] text-center font-medium'>
                Industry Specific Use Cases
              </h1>

            </div>
          </div>
          <div className='w-full md:flex-row flex-col flex gap-[1rem]'>
            <ul className='w-[100%] md:w-[50%]'>
              <LI nogap={true} text='Fashion Industry' />
              <LI nogap={true} text='Virtual Runways: Exclusive digital access to fashion shows.' />
              <LI nogap={true} text='Heritage Collection Tokens: NFTs representing iconic designs for modern engagement.' />
              <div className='mb-[2rem]'></div>
              <LI nogap={true} text='Retail' />
              <LI nogap={true} text='Rewards Program: NFTs as redeemable tokens for special editions or experiences.' />
              <LI nogap={true} text='Brand Storefronts: Digital showcases for product launches.' />
              <LI nogap={true} text='NFT Rewards: Unique collectibles for brand events and experiences.' />
              <div className='mb-[2rem]'></div>
              <LI nogap={true} text='Entertainment' />
              <LI nogap={true} text='Exclusive Digital Memorabilia: NFTs capturing significant brand moments.' />
              <LI nogap={true} text='NFT Ticketing & VIP Access: Enhanced fan experiences through NFT-based ticketing.' />
              <LI nogap={true} text='Interactive Storytelling: NFTs telling the story behind music and artists.' />
              <div className='mb-[2rem]'></div>
              <LI nogap={true} text='Hospitality' />
              <LI nogap={true} text='NFT-Driven Guest Experiences: NFTs as digital keys and souvenirs for hotel stays.' />
              <LI nogap={true} text='Interactive Resort Narratives: Storytelling through NFTs to enhance the guest experience.' />
              <div className='mb-[2rem]'></div>
              <LI nogap={true} text='Travel and Leisure' />
              <LI nogap={true} text='Exclusive Digital Assets: NFTs commemorating brand milestones or partnerships.' />
              <LI nogap={true} text='Rewards & Loyalty Programs: NFTs enhancing customer loyalty with unique benefits.' />
              <div className='mb-[2rem]'></div>
              <LI nogap={true} text='Textile and Manufacturing' />
              <LI nogap={true} text='Digital Fabric Collections: NFTs representing signature fabric collections.' />
              <LI nogap={true} text='NFT-Enhanced Product Launches: Exclusive previews and stories for product launches.' />
              <div className='mb-[2rem]'></div>
              <LI nogap={true} text='Personal Care and Grooming' />
              <LI nogap={true} text='Digital Grooming Kits: NFTs representing iconic grooming products.' />
              <LI nogap={true} text='Rewards & Loyalty Integration: NFTs for customer loyalty and support.' />
              <div className='mb-[2rem]'></div>
              <LI nogap={true} text='Fitness and Wellness' />
              <LI nogap={true} text='Digital Activewear Collections: NFTs for signature designs and releases.' />
              <LI nogap={true} text='NFT-Exclusive Fitness Challenges: Rewards for fitness challenges and milestones.' />
              <div className='mb-[2rem]'></div>
              <LI nogap={true} text='Food and Beverage' />
              <LI nogap={true} text='Iconic Meals Collection: NFTs representing signature meals.' />
              <LI nogap={true} text='Interactive Culinary Challenges: Engaging customers in brand-related challenges.' />
              <div className='mb-[2rem]'></div>
              <LI nogap={true} text='Outdoor and Adventure' />
              <LI nogap={true} text='Digital Trails Collection: NFTs as digital souvenirs for outdoor experiences.' />
              <LI nogap={true} text='Eco-Trail Series: NFTs celebrating natural locations and conservation efforts.' />
            </ul>
            <ul
              className='md:w-[50%] w-full'>
              <LI nogap={true} text='Music And Fashion Fusion' />
              <LI nogap={true} text='Music & Fashion Fusion: NFTs combining concert tickets with fashion experiences.' />
              <div className='mb-[2rem]'></div>
              <LI nogap={true} text='Wine And Culinary Arts' />
              <LI nogap={true} text='Sommelier Stories: NFT series celebrating the art of winemaking.' />
              <LI nogap={true} text='Wine & Dine Digital Events: NFTs for virtual wine pairing sessions.' />
              <div className='mb-[2rem]'></div>
              <LI nogap={true} text='Literature And Publishing' />
              <LI nogap={true} text='Digital Book Tokens: NFTs representing special book releases.' />
              <LI nogap={true} text='Interactive Story Worlds: Augmented reality story explorations via NFTs.' />
              <div className='mb-[2rem]'></div>
              <LI nogap={true} text='Sports And Recreation' />
              <LI nogap={true} text='Limited Edition Gear Tokens: NFTs for exclusive sporting gear.' />
              <LI nogap={true} text='Virtual Training Modules: Augmented reality training sessions.' />
              <div className='mb-[2rem]'></div>
              <LI nogap={true} text='Cultural And Historical Narratives' />
              <LI nogap={true} text='Heritage Chronicles: NFT series capturing cultural histories and stories.' />
              <LI nogap={true} text='Eternal Bouquets: NFTs of iconic floral arrangements.' />
              <LI nogap={true} text='Garden Chronicles: Virtual tours of gardens through NFTs.' />
              <div className='mb-[2rem]'></div>
              <LI nogap={true} text='Quick Service Restaurants' />
              <LI nogap={true} text='Taco Tales: NFTs telling the story behind iconic dishes.' />
              <LI nogap={true} text='NFT Discount Coupons: Discounts and special offers through NFTs.' />
              <div className='mb-[2rem]'></div>
              <LI nogap={true} text='Fashion And Style Services' />
              <LI nogap={true} text='Fabric Fables: NFTs representing iconic ensembles.' />
              <LI nogap={true} text='Virtual Fitting Rooms: Immersive fashion experiences via NFTs.' />
              <div className='mb-[2rem]'></div>
              <LI nogap={true} text='Travel And Lifestyle' />
              <LI nogap={true} text='Travel Tokens: NFTs representing travel stories or destinations.' />
              <LI nogap={true} text='Virtual Voyage: Immersive virtual reality travel experiences.' />
              <div className='mb-[2rem]'></div>
              <LI nogap={true} text='Content Creation And Publishing' />
              <LI nogap={true} text='Storyline Tokens: NFTs representing standout publications.' />
              <LI nogap={true} text='NFT Discount Badges: Discounts on services for dedicated users.' />
              <div className='mb-[2rem]'></div>
              <LI nogap={true} text='Inventory And Supply Chain' />
              <LI nogap={true} text='Inventory Milestones: NFTs for significant inventory collections.' />
              <LI nogap={true} text='NFT-Enhanced Data Insights: Workshops and insights for inventory predictions.' />
              <div className='mb-[2rem]'></div>
              <LI nogap={true} text='Beauty And Cosmetics' />
              <LI nogap={true} text='Limited-Edition Beauty NFTs: Digital collectibles of iconic beauty products.' />
              <LI nogap={true} text='NFT-Driven Beauty Tutorials: Virtual tutorials for NFT holders.' />
              <div className='mb-[2rem]'></div>
              <LI nogap={true} text='Hardware And DIY' />
              <LI nogap={true} text='Exclusive Tool NFTs: NFTs representing best-selling tools.' />
              <LI nogap={true} text='DIY Workshop NFTs: Virtual workshops for home projects.' />

            </ul>
          </div>

        </div>
      </div >
      <Footer />
    </>
  )
}

export default UseCase