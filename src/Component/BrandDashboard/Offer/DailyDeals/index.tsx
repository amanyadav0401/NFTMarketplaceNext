'use client'
import React, { useState } from "react";
import ReusableInput from "@/Component/Model/InputField";
import SelectUsers from "@/Component/Micro/SelectUsers";
import SelectItems from "@/Component/Micro/SelectItems";
import { toast } from "react-hot-toast";
import { APIClient } from "@/utils/APIClient";

function DailyDeals() {
  const [offerText, setOfferText] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [checkboxOptions, setCheckboxOptions] = useState([
    { label: "On Marketplace", value: false, key: 'marketplace' },
    { label: "On Storefront", value: false, key: 'storefront' },
  ]);
  const [couponCode, setCouponCode] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<any>(new Set([]))
  const [selectedUsers, setSelectedUsers] = useState<any>(new Set([]))
  const [createingOffer, setCreateingOffer] = useState<boolean>(false)

  const handleOfferTextChange = (value: string) => {
    setOfferText(value);
  };

  const handleDiscountChange = (value: string) => {
    setDiscount(value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file || null);
  };

  const handleCheckboxChange = (index: number) => {
    const updatedOptions = [...checkboxOptions];
    updatedOptions[index].value = !updatedOptions[index].value;
    setCheckboxOptions(updatedOptions);
  };

  function generateCouponCode(offerName: string, numberOfUses: number) {
    if (!offerName || typeof numberOfUses !== 'number' || !Number.isInteger(numberOfUses)) {
      throw new Error('Invalid input: Offer name must be a non-empty string and number of uses must be an integer.');
    }

    const words = offerName.split(' ');

    let firstWord = words[0].substr(0, 4).toUpperCase();
    let lastWord = words[words.length - 1].substr(0, 4).toUpperCase();

    let middleInitials = '';
    if (words.length > 2) {
      middleInitials = words.slice(1, -1).map(word => word[0].toUpperCase()).join('');
    } else if (words.length === 2) {
      // If there are only two words, adjust to take only the first character of the last word
      lastWord = lastWord[0];
    }

    let couponCode = firstWord + middleInitials + lastWord + numberOfUses;

    // Ensure the generated coupon code is not longer than 20 characters
    if (couponCode.length > 20) {
      couponCode = couponCode.substr(0, 20);
    }

    setCouponCode(couponCode);
  }



  const copyToClipboard = () => {
    const el = document.createElement("textarea");
    el.value = couponCode;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const handleGenerateCoupan = async () => {
    //checkbox keys of items that are true
    if (!offerText || !discount || !selectedItems || !selectedUsers || !couponCode) {
      toast.error('Please fill all the fields')
      return
    }

    if (!selectedItems.size || !selectedUsers.size) {
      toast.error('Please select atleast one item and one user')
      return
    }

    const selectedItemsKeys = checkboxOptions.filter((item) => item.value).map((item) => item.key)

    if (!selectedItemsKeys.length) {
      toast.error('Please select where you want to publish the offer')
      return
    }

    const data = {
      coupanText: offerText,
      coupanCode: couponCode,
      discount: 100,
      itemsAvailable: [...selectedItems],
      maxUsageCount: discount,
      availableForUsers: [...selectedUsers].includes('all') ? [] : [...selectedUsers],
      liveOn: selectedItemsKeys
    }

    try {
      setCreateingOffer(true)
      const res = await APIClient.post('coupans', {
        json: data,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      toast.success('Coupan generated successfully')

      setOfferText('')
      setDiscount('')
      setCouponCode('')
      setSelectedItems(new Set([]))
      setSelectedUsers(new Set([]))


    }
    catch (err: any) {
      const error = await err.response.json()
      toast.error(error.message)
    }
    finally {
      setCreateingOffer(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 p-6">
      <div className="w-full">
        <ReusableInput
          label={"Offer Text"}
          type={"text"}
          value={offerText}
          placeholder={""}
          onChange={handleOfferTextChange}
          labelColor="text-black"
          textColor="text-black"
        />
        <ReusableInput
          label={"Total Coupon Count"}
          type={"text"}
          value={discount}
          placeholder={""}
          onChange={handleDiscountChange}
          textColor="text-black"
          labelColor="text-black"
        />
        <SelectUsers selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
        <SelectItems selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
        {/* <div className="w-full h-[150px] relative border-dashed border-2 border-gray-300 rounded-md p-4 mt-2">
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
          {selectedFile ? (
            <p className="text-gray-800 mb-1">{selectedFile.name}</p>
          ) : (
            <p className="text-gray-500 text-center font-Avenir tracking-wide mt-10">
              Drag & Drop or Browse
            </p>
          )}
        </div> */}
        <div className="mt-4">
          <div className="space-y-2">
            {checkboxOptions.map((option, index) => (
              <label
                key={index}
                className="flex items-center font-Avenir tracking-wide"
              >
                <input
                  type="checkbox"
                  checked={option.value}
                  onChange={() => handleCheckboxChange(index)}
                  className="mr-2 w-4 h-4"
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
        <button
          className="w-full bg-purple-900 mt-4 text-white font-Avenir tracking-wide px-4 py-2 rounded"
          onClick={() => generateCouponCode(offerText, Number(discount))}
        >
          Generate Coupon Code
        </button>
        <div className="bg-gray-200 w-full h-[100px] text-center mt-5 cursor-pointer px-2 py-1 rounded">
          {couponCode && (
            <button onClick={copyToClipboard}>
              <p className="text-3xl mt-6">{couponCode}</p>
            </button>
          )}
        </div>
        <button
          disabled={!couponCode}
          className="w-full disabled:opacity-50 bg-purple-900 mt-4 text-white font-Avenir tracking-wide px-4 py-2 rounded"
          onClick={() => handleGenerateCoupan()}
        >
          {
            createingOffer ? 'Creating Offer...' : 'Create Offer'
          }
        </button>
      </div>

    </div>
  );
}

export default DailyDeals;
