const SIGNING_DOMAIN_NAME = "BlockchainLabs";
const SIGNING_DOMAIN_VERSION = "1";


/**
 *
 * LazyMinting is a helper class that creates NFTVoucher objects and signs them, to be redeemed later by the LazyNFT contract.
 */

class Voucher {
   public contract : any;
   public signer : any;
   public _domain : any;
   public voucherCount : any;
   public signer2 : any;

   constructor(data:any){
    const {_contract, _signer} = data;
    this.contract = _contract;
    this.signer = _signer;
   }

   async _signingDomain() {
    if(this._domain != null){
        return this._domain;
    }
    const chainId = 137;
    this._domain = {
        name : SIGNING_DOMAIN_NAME,
        version : SIGNING_DOMAIN_VERSION,
        verifyingContract : this.contract.address,
        chainId,
    };
    return this._domain;
   }

   async createVoucher(
    nftAddress : any,
    seller : any,
    tokenId : any,
    amount : any,
    floorPrice : any,
    royalty : any,
    currency : any,
    tokenURI : any,
   ) {
    const voucher = {
       nftAddress,
       seller,
       tokenId,
       amount,
       floorPrice,
       royalty,
       currency,
       tokenURI
    };
    const domain = await this._signingDomain();
    const types = {
        Voucher: [
            {name: "nftAddress", type: "address"},
            {name: "seller", type: "address"},
            {name: "tokenId", type: "uint256"},
            {name: "amount", type: "uint256"},
            {name: "floorPrice", type: "uint256"},
            {name: "royalty", type:"uint96"},
            {name: "currency", type: "address"},
            {name: "tokenURI", type: "string"},
        ],
    };
    const signature = await this.signer._signTypedData(domain, types, voucher);
    return{
        ...voucher,
        signature,
    };
   }

}

export default Voucher;