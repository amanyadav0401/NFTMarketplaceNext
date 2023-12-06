type AgencyUser = {
  userId: string;
  associatedBrands: Array<string>;
  subdomain?:string;
}

type BrandUser = {
  userId: string;
  associatedAgency: string;
}

type PersonalUser = {
  userId: string;
}

type User = {
  _id: string;
  username: string;
  name: string;
  email: string;
  role: 'agency' | 'buisness' | 'personal' | 'admin';
  roleId: string;
  avatar: string;
  account?:string;
  userInformation: AgencyUser | BrandUser | PersonalUser;
  buybacks: BuyBack[];
  createdAt: Date;
  postedItems: Array<any>;
  address: string;
  country: string;
  desc: string;
  boughtItems: Array<BoughtItem>;
  socials: {
    facebook: string,
    twitter: string,
    instagram: string,
    linkedin: string,
    youtube: string,
    tiktok: string,
    snapchat: string,
    website: string,
    discord: string,
},
  
}

type Voucher = {
  nftAddress: string;
  seller: string;
  tokenId: number;
  amount: number;
  floorPrice: number;
  royalty: number;
  currency: string;
  tokenURI: string;
  signature: string;
};

type BoughtItem = {
  itemId: string;
  item: NFTItem;
  txHash: string;
  userId: string;
  amount: string;
  voucher: VoucherType;
  quantity: number;
  buyerAddress: string;
  type: string;
  createdAt: string;
};

type NFTItem = {
  /**
   * The ID of the NFT item.
   */
  _id: string;

  /**
   * The name of the NFT item.
   */
  name: string;

  /**
   * A description for the NFT item.
   */
  description: string;

  /**
   * The price of the NFT item.
   */
  price: number;

  /**
   * The Royalty percentage for the NFT item.
   */
  royality: number;

  /**
   * URLs of images associated with the NFT item.
   */
  images: string[];

  /**
   * The category the NFT item belongs to.
   */
  category: string;

  /**
   * Tags associated with the NFT item.
   */
  tags?: string[];

  /**
   * The creator of the NFT item.
   */
  creator: User;

  /**
   * Total number of tokens for this NFT item.
   */
  numOfTokens: number;

  /**
   * Number of tokens purchased.
   */
  purchasedTokens: number;

  /**
   * Vouchers associated with the NFT item.
   */
  vouchers: any[];

  /**
   * Status of the NFT item (active, sold, pending, inactive).
   */
  status: 'active' | 'sold' | 'pending' | 'inactive';

  /**
   * The date and time when the NFT item was created.
   */
  createdAt: Date;

  /**
   * Discount percentage for the NFT item.
   */
  discountPercentage: number;

  /**
   * Likes for the NFT item, typically user IDs or usernames.
   */
  likes: string[];

  /**
   * Available promo codes for the NFT item.
   */
  availablePromoCodes: CoupanType[];

  /**
   * Number of views for the NFT item.
   */
  views: number;

  /**
   * The blockchain address where the Collection is deployed.
   */
  collectionAddress: string;

  /**
   * Whether bidding is allowed for the NFT item.
   */
  isBiddingAllowed: boolean;

  /**
   * Bidding details for the NFT item.
   */
  biddings?: any[];

  /**
   * Payment type for the NFT item (web3, fiat, both).
   */
  paymentType: 'web3' | 'fiat' | 'both';

  /**
   * Platforms where the NFT is live (marketplace, storefront, external-marketplace).
   */
  liveOn: ('marketplace' | 'storefront' | 'external-marketplace')[];
};

type CartItem = {
  _id:string;
  name:string;
  photo:string;
  amount:number;
  item:NFTItem
}

type MyItemAnalytics = {
  data: {
    totalItems: NFTItem[];
    totalItemsLength: number;
    activeItems: NFTItem[];
    activeItemsLength: number;
    soldItems: NFTItem[];
    soldItemsLength: number;
    pendingOrInactiveItems: NFTItem[];
    pendingOrInactiveItemsLength: number;
    totalNFTValue: number;
    totalSales: number;
    totalRoyality: number;
    totalSalesAfterRoyality: number;
    unsoldItemsValue:number;
  },
  success: boolean;
};

type BatchBuyType = {
  voucher: any,
  amount: number,
  itemId: string
  item: NFTItem,
}[]

type CoupanType = {
  _id:string;
  coupanCode: string;
  coupanText: string;
  discount: number;
  itemsAvailable: string[]; // You might want to replace this with your actual Item type if available
  expiryDate?: Date | null;
  isActive?: boolean;
  usageCount?: number;
  maxUsageCount?: number;
  createdAt?: Date;
  availableForUsers: string[]; // Replace with User type if available
  liveOn?: ('marketplace' | 'storefront' | 'external-marketplace')[];
}

type BuyBack = {
  _id:string;
  item: NFTItem;
  createdBy:string;
  price: number;
  numofTokens: number;
  applicants: Array<{
    user: User;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
  }>;
  createdAt: Date;
}

type Collection =  {
  /** ID of the collection */
  _id: string;
  /** URL or path of the collection logo */
  logo: string;
  /** Name of the collection */
  name: string;
  /** Description of the collection */
  desc: string;
  /** URL or path of the collection banner */
  banner: string;
  /** Symbol representing the collection */
  symbol: string;
  /** Royalty percentage or amount for the collection */
  royalty: number;
  /** Blockchain address of the collection creator */
  creatorAddress: string;
  /** User ID of the creator, referring to User model */
  creator: User;
  /** Current status of the collection */
  status: 'active' | 'inactive' | 'pending';
  /** Blockchain address where the collection is deployed */
  deployedAddress: string;
  /** Category to which the collection belongs */
  category: string;
};
