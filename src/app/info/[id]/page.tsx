import BrandStoreFrontDetail from '@/Component/StoreFrontDetail/BrandStoreFront'

import React from 'react'

const BrandStoreFrontDetailPage = async ({ params }: any) => {
  const { id } = params
  if (!id) {
    return <div>404</div>
  }

  let items: NFTItem[] = []
  let coupans: CoupanType[] = []
  let buybacks: any = []
  let user: any = {}

  try {
    const data = await fetch(`https://prod-api.nft-world.one/auth/user/${id}`, {
      next: {
        revalidate: 300
      }
    })
    const res = await data.json()

    const { user: dataUser, buybacks: dataBuybacks, items: dataItems, coupans: dataCoupans } = res
    items = dataItems
    coupans = dataCoupans
    buybacks = dataBuybacks
    user = dataUser
  }
  catch (e) {
    console.log(e)
  }


  return (
    <div>
      <BrandStoreFrontDetail coupans={coupans} items={items} buybacks={buybacks} user={user} />
    </div>
  )
}

export default BrandStoreFrontDetailPage