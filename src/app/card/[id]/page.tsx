import CardDetails from '@/Component/CardComponent/CardDetail'
import React from 'react'

async function CardDetailsPage({ params }: any) {
  const { id } = params
  if (!id) {
    return <div>404</div>
  }
  let item: NFTItem = {
    _id: "1234567890abcdef",
    name: "Mystical Landscape",
    description: "A beautiful digital painting of a mystical landscape, full of vibrant colors and intricate details.",
    price: 1.5,
    royality: 5,
    images: [
      "https://via.placeholder.com/150",
      "https://placekitten.com/200/300",
    ],
    category: "Digital Art",
    tags: ["landscape", "mystical", "vibrant"],
    creator: {
      _id: "0987654321fedcba",
      username: "artist123",
      name: "Alex Art",
      email: "alex@example.com",
      role: "personal",
      roleId: "artistRoleId",
      avatar: "https://placekitten.com/g/200/300",
      userInformation: {
        userId: "0987654321fedcba",
      },
      buybacks: [],
      createdAt: new Date(),
      postedItems: [],
      address: "123 Art Street",
      country: "Artland",
      desc: "An artist passionate about digital art and landscapes.",
      boughtItems: [],
      socials: {
        facebook: "https://facebook.com/artist123",
        twitter: "https://twitter.com/artist123",
        instagram: "https://instagram.com/artist123",
        linkedin: "https://linkedin.com/in/artist123",
        youtube: "https://youtube.com/artist123",
        tiktok: "https://tiktok.com/@artist123",
        snapchat: "https://snapchat.com/add/artist123",
        website: "https://artist123.com",
        discord: "https://discord.gg/artist123",
      },
    },
    numOfTokens: 100,
    purchasedTokens: 10,
    vouchers: [],
    status: "active",
    createdAt: new Date(),
    discountPercentage: 10,
    likes: ["user123", "user456"],
    availablePromoCodes: [],
    views: 200,
    collectionAddress: "0x1234567890abcdef1234567890abcdef12345678",
    isBiddingAllowed: false,
    paymentType: "web3",
    liveOn: ["marketplace", "storefront"],
  };

  try {
    const res = await fetch(`https://prod-api.nft-world.one/items/single/${id}`, {
      next: {
        revalidate: 300
      }
    })
    const data: {
      item: NFTItem,
      success: boolean
    } = await res.json()
    item = data.item
  } catch (e) {
    console.log(e)
  }
  return (
    <div>
      <CardDetails id='' item={item} />
    </div>
  )
}

export default CardDetailsPage