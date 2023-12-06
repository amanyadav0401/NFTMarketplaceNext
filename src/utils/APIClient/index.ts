import ky from 'ky'

export const APIClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_PROD_API_URL,
})

export const getEthPrice = async () => {
  const data:any = await ky.get('https://api.coinbase.com/v2/prices/ETH-USD/spot')
  const returnData = await data.json()
  return returnData.data.amount
}