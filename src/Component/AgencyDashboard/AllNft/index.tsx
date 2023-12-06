"use client";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { MdOutlineEdit } from "react-icons/md";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";

interface Product {
  imageSrc: string;
  nftName: string;
  brandName: string;
  date: string;
  sales: string;
  subscription: string;
  stock: string;
  status: string;
}

function AllNft() {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [publishedIndexes, setPublishedIndexes] = useState<number[]>([]);

  const handleUnpublishClick = (index: number) => {
    setOpenDropdownIndex(index === openDropdownIndex ? null : index);
  };

  const handleCheckboxChange = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleDoneClick = (index: number) => {
    if (selectedOptions.length > 0) {
      setPublishedIndexes((prevIndexes) => [...prevIndexes, index]);
    } else {
      setPublishedIndexes((prevIndexes) =>
        prevIndexes.filter((item) => item !== index)
      );
    }
    setOpenDropdownIndex(null);
  };

  const options: string[] = [
    "On Marketplace",
    "On Storefront",
    "On External Marketplace",
  ];

  const productContent: Product[] = [
    {
      imageSrc: "/Images/cardimg.svg",
      nftName: "Green Hoodie",
      brandName: "T Shirt",
      date: "24 Apr 2023",
      sales: "3000 USD",
      subscription: "Subscribed",
      status: "LiveOn  Marketplace  Storefront",
      stock: "120/150",
    },
    {
      imageSrc: "/Images/cardimg.svg",
      nftName: "Green Hoodie",
      brandName: "T Shirt",
      date: "24 Apr 2023",
      sales: "3000 USD",
      subscription: "Subscribed",
      status: "LiveOn  Marketplace  Storefront",
      stock: "120/150",
    },
    {
      imageSrc: "/Images/cardimg.svg",
      nftName: "Green Hoodie",
      brandName: "T Shirt",
      date: "24 Apr 2023",
      sales: "3000 USD",
      subscription: "Subscribed",
      status: "LiveOn  Marketplace  Storefront",
      stock: "120/150",
    },
    {
      imageSrc: "/Images/cardimg.svg",
      nftName: "Green Hoodie",
      brandName: "T Shirt",
      date: "24 Apr 2023",
      sales: "3000 USD",
      subscription: "Subscribed",
      status: "LiveOn  Marketplace  Storefront",
      stock: "120/150",
    },
    {
      imageSrc: "/Images/cardimg.svg",
      nftName: "Green Hoodie",
      brandName: "T Shirt",
      date: "24 Apr 2023",
      sales: "3000 USD",
      subscription: "Subscribed",
      status: "LiveOn  Marketplace  Storefront",
      stock: "120/150",
    },
    {
      imageSrc: "/Images/cardimg.svg",
      nftName: "Green Hoodie",
      brandName: "T Shirt",
      date: "24 Apr 2023",
      sales: "3000 USD",
      subscription: "Subscribed",
      status: "LiveOn  Marketplace  Storefront",
      stock: "120/150",
    },
    {
      imageSrc: "/Images/cardimg.svg",
      nftName: "Green Hoodie",
      brandName: "T Shirt",
      date: "24 Apr 2023",
      sales: "3000 USD",
      subscription: "Subscribed",
      status: "LiveOn  Marketplace  Storefront",
      stock: "120/150",
    },
    {
      imageSrc: "/Images/cardimg.svg",
      nftName: "Green Hoodie",
      brandName: "T Shirt",
      date: "24 Apr 2023",
      sales: "3000 USD",
      subscription: "Subscribed",
      status: "LiveOn  Marketplace  Storefront",
      stock: "120/150",
    },
    {
      imageSrc: "/Images/cardimg.svg",
      nftName: "Green Hoodie",
      brandName: "T Shirt",
      date: "24 Apr 2023",
      sales: "3000 USD",
      subscription: "Subscribed",
      status: "LiveOn  Marketplace  Storefront",
      stock: "120/150",
    },
    // ... Add more product items as needed
  ];

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(productContent.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleUserdashboardData = productContent.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div>
      <div className="mt-5 p-6">
        {/* <div className="w-full flex-shrink-0 rounded-lg bg-gray-100 shadow-xl shadow-gray-500/40 p-5"> */}
        <div className="flex space-x-20 font-semibold font-Avenir">
          <div className="w-[10%]"></div>
          <div className="w-[10%]">NFT Name</div>
          <div className="w-[10%]">Brand Name</div>
          <div className="w-[10%]">Date</div>
          <div className="w-[11%]">Sales</div>
          <div className="w-[11%]">Subscription</div>
          <div className="w-[11%]">Status</div>
          <div className="w-[11%]">Stock</div>
          <div className=""></div>
          <div className=""></div>
        </div>
        <div className="border-b mt-4"></div>

        {visibleUserdashboardData.map((item, index) => (
          <div key={index} className="mt-5 cursor-pointer">
            <div className="flex space-x-20 items-center">
              <div className="w-[10%]">
                <img
                  src={item.imageSrc}
                  alt="Product"
                  className="w-20 h-20 rounded-md"
                  style={{
                    boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.10)",
                  }}
                />
              </div>
              {/* Data for each item */}
              <div className="w-[10%]">{item.nftName}</div>
              <div className="w-[10%]">{item.brandName}</div>
              <div className="w-[10%]">{item.date}</div>
              <div className="w-[11%] text-[#E377FF]">{item.sales}</div>
              <div className="w-[11%]">{item.subscription}</div>
              <div className="w-[11%]">
                {item.status.split(" ").map((statusPart, partIndex) => (
                  <div key={partIndex} className="flex items-center space-x-2">
                    <span className="text-sm font-Avenir tracking-wide">
                      {statusPart}
                    </span>
                  </div>
                ))}
              </div>
              <div className="w-[7%]">{item.stock}</div>
              <div>
                <MdOutlineEdit className="w-5 h-5" />
              </div>
              <div className="space-x-5">
                <div className="relative">
                  <button
                    className="flex text-purple-900 space-y-2"
                    onClick={() => handleUnpublishClick(index)}
                  >
                    <PiDotsThreeOutlineVerticalLight />
                  </button>
                  {openDropdownIndex === index && (
                    <div
                      className="absolute w-[250px] right-0  mt-2 bg-white border rounded-md border-gray-200 shadow-md p-4"
                      style={{
                        borderRadius: "12px",
                        boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.10)",
                      }}
                    >
                      <div className="font-Avenir tracking-wide mb-3">
                        {publishedIndexes.includes(index)
                          ? "Publish"
                          : "Unpublish"}
                      </div>
                      {options.map((option, index) => (
                        <label
                          key={index}
                          className="flex items-center p-1 space-x-2"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox cursor-pointer w-4 h-4"
                            value={option}
                            checked={selectedOptions.includes(option)}
                            onChange={() => handleCheckboxChange(option)}
                          />
                          <span className="text-sm font-Avenir tracking-wide">
                            {option}
                          </span>
                        </label>
                      ))}
                      <button
                        className="mt-3 bg-[#E377FF] hover:bg-[#E377FF] text-white px-3 py-1 rounded"
                        onClick={() => handleDoneClick(index)}
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="border-b mt-4"></div>
          </div>
        ))}
        {/* </div> */}
        <div className="mt-10 flex font-Avenir justify-between items-center">
          <div>
            <p>{`${startIndex + 1} to ${Math.min(
              endIndex,
              productContent.length
            )} of ${productContent.length}`}</p>
          </div>
          <div className="flex items-center">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"pagination flex space-x-2"}
              activeClassName={"active"}
              pageClassName={"page-item"}
              pageLinkClassName={
                "page-link border border-2 text-gray-800 rounded-md p-2"
              }
              previousClassName={"page-item"}
              previousLinkClassName={"page-link p-2"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link p-2"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllNft;
MdOutlineEdit;
