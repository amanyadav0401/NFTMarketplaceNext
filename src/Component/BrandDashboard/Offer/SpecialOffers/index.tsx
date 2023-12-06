"use client";
import React, { useState } from "react";
import ReusableInput from "@/Component/Model/InputField";

function SpecialOffers() {
  const [offerText, setOfferText] = useState<string>("");
  const [checkboxOptions, setCheckboxOptions] = useState([
    { label: "On Marketplace", value: false },
    { label: "On Storefront", value: false },
    { label: "On External Marketplace", value: false },
  ]);
  const [couponCode, setCouponCode] = useState<string>("");

  const handleOfferTextChange = (value: string) => {
    setOfferText(value);
  };

  const handleCheckboxChange = (index: number) => {
    const updatedOptions = [...checkboxOptions];
    updatedOptions[index].value = !updatedOptions[index].value;
    setCheckboxOptions(updatedOptions);
  };

  const generateCouponCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let code = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    setCouponCode(code);
  };

  const copyToClipboard = () => {
    const el = document.createElement("textarea");
    el.value = couponCode;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row p-6 md:space-x-4">
        <div className="w-full md:w-1/2">
          <ReusableInput
            label={"Offer Text"}
            type={"text"}
            value={offerText}
            placeholder={""}
            onChange={handleOfferTextChange}
            labelColor="text-black"
            textColor="text-black"
          />

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
        </div>
        <div className="w-full md:w-1/2 md:mt-3">
          <button
            className="w-full bg-purple-900 mt-4 text-white font-Avenir tracking-wide px-4 py-2 rounded"
            onClick={generateCouponCode}
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
        </div>
      </div>
      <div className="w-full">
        <h5 className="font-Avenir tracking-wide text-lg">
          Live Preview
        </h5>
        <div className="w-full h-[100px] mt-4 flex-shrink-0 rounded-lg bg-fuchsia-100 relative">
          <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center p-4">
            <p className="text-black font-Avenir tracking-wide text-lg">
              {offerText}
            </p>
            <div className="flex justify-end">
              <button className="w-[300px] h-10 bg-purple-950 text-white font-Avenir tracking-wide font-semibold rounded-lg">
                Special Offers
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpecialOffers;
