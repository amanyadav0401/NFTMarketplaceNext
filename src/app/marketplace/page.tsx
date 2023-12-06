import MarketPlace from '@/Component/MarketPlace'
import React from 'react'

async function MarketPlacePage() {
  let items: NFTItem[] = []
  let coupans: CoupanType[] = []
  let carouselItems: NFTItem[] = []
  let brands: any = []
  try {
    const data = await fetch(`https://prod-api.nft-world.one/items/live/marketplace`, {
      next: {
        revalidate: 300
      }
    })
    const brandData = await fetch(`https://prod-api.nft-world.one/auth/brands`, {
      next: {
        revalidate: 300
      }
    })
    const dataJson = await data.json()
    const brandDataJson = await brandData.json()
    brands = brandDataJson.brands
    items = dataJson.items
    coupans = dataJson.coupans
    carouselItems = dataJson.carouselItems
  } catch (e) {
    console.log(e)
  }



  return (
    <div>
      <MarketPlace brands={brands} carouselItems={carouselItems} nfts={items} coupans={coupans} />
    </div>
  )
}

export default MarketPlacePage