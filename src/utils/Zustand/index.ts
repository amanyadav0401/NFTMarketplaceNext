import {create} from 'zustand'
import { APIClient, APIClient as ky } from '../APIClient';
import {toast} from 'react-hot-toast'

export const useUserStore = create<
{
  user: User | null;
  setUser:(to?:string)=>Promise<void>;
  userLoading: boolean;
}
>((set)=>({
  user: null,
  userLoading: true,

  setUser: async (to) => {
   try{
    let token;
    if(to){
      token = to
    }
    else{
      token = localStorage.getItem('token')

    }
    if(token){
      set({userLoading: true})
      const data:{
        user:User,
        success:boolean,
        roleInfo:AgencyUser | BrandUser | PersonalUser,
        buybacks:BuyBack[],
      } = await ky.get(`auth/me`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }).json()

      const boughtItemsId = data.user.boughtItems.map((item)=>item.itemId)

      const boughtItems:any = await ky.post('items/get-items', {
        json:{
          ids: boughtItemsId
        }
      }).json()

      const {items} = boughtItems

      const boughtItemsWithItem = data.user.boughtItems.map((item)=>{
        const foundItem = items.find((i:any)=>i._id === item.itemId)
        return {
          ...item,
          item: foundItem
        }
      })
      
      data.user.boughtItems = boughtItemsWithItem

      set({
        user:{
          ...data.user,
          userInformation: data.roleInfo,
          buybacks: data.buybacks
        }
      })
    }else{
      console.log('no token')
    }
   }
   catch(err){
      console.log(err)
   }
    finally{
      set({userLoading: false})
    }
  }
}))

export const useMyItemsStore = create<
{
  myItems: NFTItem[] | null;
  setMyItems:(to?:string)=>Promise<void>;
  myItemsLoading: boolean;
  myItemsAnalytics:MyItemAnalytics | null,
  myBuyBacks:BuyBack[],
}
>((set)=>({
  myItems: null,
  myItemsLoading: true,
  myItemsAnalytics:null,
  myBuyBacks: [],
  setMyItems: async (to) => {
   try{
    let token;
    if(to){
      token = to
    }
    else{
      token = localStorage.getItem('token')

    }
    if(token){
      set({myItemsLoading: true})
      const data:{
        items:NFTItem[],
        success:boolean,
      } = await ky.get(`items/me`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }).json()

      const myItemsAn:MyItemAnalytics = await ky.get('items/analytics/me', {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }).json()

      const buybacksData:any = await ky.get('buybacks/me', {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }).json()

      const buybacks:BuyBack[] = buybacksData.buyBacks

      set({
        myItems:data.items,
        myItemsAnalytics:myItemsAn,
        myBuyBacks: buybacks
      })
    }else{
      console.log('no token')
    }
   }
   catch(err){
      console.log(err)
   }
    finally{
      set({myItemsLoading: false})
    }
  }
}))

export const useAdminItemsStore = create<
{
  adminItems: NFTItem[] | null;
  setAdminItems:()=>Promise<void>;
  adminItemsLoading: boolean;
}
>((set)=>({
  adminItems: null,
  adminItemsLoading: true,
  setAdminItems: async () => {
   try{
      set({adminItemsLoading: true})
      const data:{
        items:NFTItem[],
        success:boolean,
      } = await ky.get(`items/admin`, {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).json()

      set({
        adminItems:data.items,
      })
   }
   catch(err){
      console.log(err)
   }
    finally{
      set({adminItemsLoading: false})
    }
  }
}))




export const useUserCartStore = create<
{
  userCart: CartItem[] | null;
  setUserCart:(cartItem: CartItem)=>void;
  removeCartItem:(cartItem: CartItem)=>void;
  emptyCart:()=>void
}>((set, get)=>({
  userCart: [],
  setUserCart: (cartItem) => {
   const isItemThere = get().userCart?.find((item)=>item._id === cartItem._id)
    if(isItemThere){
      set((state)=>({
        userCart: state.userCart?.map((item)=>{
          if(item._id === cartItem._id){
            return {
              ...item,
              amount: cartItem.amount
            }
          }
          return item
        })
      }))
    }
    else{
      set((state)=>({
        userCart: [...state.userCart!, cartItem]
      }))
    }
  },
  removeCartItem: (cartItem) => {
    set((state)=>({
      userCart: state.userCart?.filter((item)=>item._id !== cartItem._id)
    }))
  },
  emptyCart: () => {
    set({userCart: []})
  }
}))


export const useAgencyBrandWithItemsStore = create<
{
  brandsWithItems: {
    brand:User,
    items:NFTItem[]
  }[],
  setAgencyBrandWithItems:(to?:string)=>Promise<void>;
  agencyBrandWithItemsLoading: boolean;
}
>((set)=>({
  brandsWithItems: [],
  agencyBrandWithItemsLoading: true,
  setAgencyBrandWithItems: async (to) => {
   try{
    let token;
    if(to){
      token = to
    }
    else{
      token = localStorage.getItem('token')

    }
    if(token){
      set({agencyBrandWithItemsLoading: true})
      const data:{
        brandsWithItems:any[]
        success:boolean,
      } = await ky.get(`items/agency-brand`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }).json()

      set({
        brandsWithItems:data.brandsWithItems,
      })
    }else{
      console.log('no token')
    }
   }
   catch(err){
      console.log(err)
   }
    finally{
      set({agencyBrandWithItemsLoading: false})
    }
  }
}))

type AdminAnalytics = {
  success:boolean,
  users:User[],
  personalUsers:{_id:string, userId:User|null}[],
  agencyUsers:{_id:string, userId:User|null, associatedBrands: string[]}[],
  brandUsers:{_id:string, userId:User|null, associatedAgency:string|null}[],
  personalNFTs:NFTItem[],
  agencyNFTs:NFTItem[],
  brandNFTs:NFTItem[],
  adminNFTs:NFTItem[],
  buybacks:BuyBack[],
  personalRevenue:number,
  agencyRevenue:number,
  brandRevenue:number,
}

export const useAdminAnalyticsStore = create<
{
  adminAnalytics: AdminAnalytics
  setAdminAnalytics:()=>Promise<void>;
  adminAnalyticsLoading: boolean;
}
>((set)=>({
  adminAnalytics: {
    success:false,
    users:[],
    personalUsers:[],
    agencyUsers:[],
    brandUsers:[],
    personalNFTs:[],
    agencyNFTs:[],
    brandNFTs:[],
    adminNFTs:[],
    buybacks:[],
    personalRevenue:0,
    agencyRevenue:0,
    brandRevenue:0,
  },
  adminAnalyticsLoading: true,
  setAdminAnalytics: async () => {
   try{
      set({adminAnalyticsLoading: true})
      const data:AdminAnalytics = await APIClient.get('auth/admin-analytics', {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).json()

      set({
        adminAnalytics:data,
      })
   }
   catch(err){
      console.log(err)
   }
    finally{
      set({adminAnalyticsLoading: false})
    }
  }
}))

export const useMyCollectionsStore = create<
{
  myCollections: Collection[] | null;
  setMyCollections:(to?:string)=>Promise<void>;
  myCollectionsLoading: boolean;
}
>((set)=>({
  myCollections: null,
  myCollectionsLoading: true,
  setMyCollections: async (token) => {
    let to;
    if(token){
      to = token
    }
    else{
      to = localStorage.getItem('token')
    }
   try{
      set({myCollectionsLoading: true})
      const data:{
        data:Collection[],
        success:boolean,
      } = await ky.get(`collection/me`, {
        headers:{
          Authorization: `Bearer ${to}`
        }
      }).json()

      set({
        myCollections:data.data,
      })
   }
   catch(err){
      console.log(err)
   }
    finally{
      set({myCollectionsLoading: false})
    }
  }
}))


export const usehowtoStore = create<
{
  isHowToOpen: boolean;
  setHowto:(to:boolean)=>void;
}
>((set)=>({
  isHowToOpen: false,
  setHowto: (to) => {
    set({isHowToOpen: to})
  }
}))


