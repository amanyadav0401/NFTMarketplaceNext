
import BuyCardComponent from '@/Component/CardComponent/BuyCard'
import Footer from '@/Component/Footer'
import Nav from '@/Component/Navbar/Nav'
import React from 'react'

type Props = {}

const FreshPage = async () => {
  let items: NFTItem[] = []
  try {
    const data = await fetch(`https://prod-api.nft-world.one/items/latest`, {
      next: {
        revalidate: 300
      }
    })
    const dataJson = await data.json()
    items = dataJson.items
  } catch (e) {
    console.log(e)
  }

  return (
    <div>
      <Nav />
      <p className='text-black mt-[100px] text-[20px] w-full px-[2rem] mb-[1rem] font-medium'>
        Latest NFts
      </p>
      <div className="grid min-h-[80vh] px-[2rem] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {
          items.map((nft) => {
            return <BuyCardComponent nft={nft} />
          })
        }
      </div>
      <Footer />
    </div>
  )
}

export default FreshPage