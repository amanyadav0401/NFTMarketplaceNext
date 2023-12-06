export const categories = [
  { label: 'Abstract art', value: 'abstract_art' },
  { label: 'Avatars and wearables', value: 'avatars_and_wearables' },
  { label: 'Certificates', value: 'certificates' },
  { label: 'Climate-related art', value: 'climate_related_art' },
  { label: 'Coins', value: 'coins' },
  { label: 'Community engagement NFTs', value: 'community_engagement_nfts' },
  { label: 'Concert footage', value: 'concert_footage' },
  { label: 'Digital art', value: 'digital_art' },
  { label: 'Exclusive music releases', value: 'exclusive_music_releases' },
  { label: 'Exclusive NFT', value: 'exclusive_nft' },
  { label: 'Exclusive Sports moments', value: 'exclusive_sports_moments' },
  { label: 'Exclusive virtual event tickets', value: 'exclusive_virtual_event_tickets' },
  { label: 'Fashion', value: 'fashion' },
  { label: 'Film and Entertainment', value: 'film_and_entertainment' },
  { label: 'First editions', value: 'first_editions' },
  { label: 'Gaming', value: 'gaming' },
  { label: 'Garments', value: 'garments' },
  { label: 'Health and Wellness', value: 'health_and_wellness' },
  { label: 'In-game items', value: 'in_game_items' },
  { label: 'Limited edition designer items', value: 'limited_edition_designer_items' },
  { label: 'Memorabilia', value: 'memorabilia' },
  { label: 'Nature photography', value: 'nature_photography' },
  { label: 'Pets', value: 'pets' },
  { label: 'Pet Parenting', value: 'pet_parenting' },
  { label: 'Skins and cosmetics', value: 'skins_and_cosmetics' },
  { label: 'Sports', value: 'sports' },
  { label: 'Sports memorabilia', value: 'sports_memorabilia' },
  { label: 'Street art', value: 'street_art' },
  { label: 'Sustainability Initiatives', value: 'sustainability_initiatives' },
  { label: 'Traditional art', value: 'traditional_art' },
  { label: 'Virtual fashion items', value: 'virtual_fashion_items' },
  { label: 'Virtual real estate', value: 'virtual_real_estate' },
  { label: 'Wearable NFTs', value: 'wearable_nfts' },
  { label: 'Others', value: 'others' }
];

export const goToDashboard = (user:any, router:any) => {
  if (user?.role === 'personal') {
    router.push('/dashboard/personal')
  }
  if (user?.role === 'buisness') {
    router.push('/dashboard/brand')
  }
  if (user?.role === 'agency') {
    router.push('/dashboard/agency')
  }
  if (user?.role === 'admin') {
    router.push('/admin/dashboard')
  }
}