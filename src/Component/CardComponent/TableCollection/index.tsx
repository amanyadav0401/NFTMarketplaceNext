import useWindowWidth from "@/Component/Model/useWindowWidth";
import Image from "next/image";
import React from "react";

interface TableRow {
  image: string;
  rank: string;
  floorPrice: string;
  stock: string;
}



function TableCollection({ nfts }: { nfts: NFTItem[] }) {
  const { isPhoneScreen } = useWindowWidth();

  const tableHeadings: string[] = ["Collection", "Floor Price", "Stock"];

  //split nfts into two arrays
  const leftTableData = nfts.slice(0, Math.ceil(nfts.length / 2));

  const rightTableData = nfts.slice(Math.ceil(nfts.length / 2), nfts.length);

  // Combine data from both tables for phone screens
  const combinedTableData = isPhoneScreen
    ? [...leftTableData, ...rightTableData]
    : [];

  return (
    <>
      <div className="flex md:hidden ml-2 mr-2">
        <div className="w-full">

          <div className="bg-white flex justify-between h-10 p-2 items-center rounded-md">
            {tableHeadings.map((heading, index) => (
              <p
                key={index}

              >
                {heading}
              </p>
            ))}
          </div>

          <div
            className="flex flex-1 overflow-x-auto relative mt-2"
            style={{
              maxHeight: "500px",
              overflowY: "auto",
            }}
          >
            <div className="w-full">

              {leftTableData.map((row, index) => (

                <div
                  key={index}
                  className="m-1 h-[70px] px-2 flex justify-between items-center flex-shrink-0 rounded-lg"
                  style={{
                    background: "rgba(255, 255, 255, 0.33)",
                  }}
                >
                  <div className="py-4 pr-2 w-[30%]">
                    <div className="flex gap-2  items-center">
                      <Image
                        height={40}
                        width={40}
                        src={row.images[0]}
                        alt={`Image for ${row.name}`}
                        className="w-10 h-10 rounded-md"
                      />
                      <p className="truncate w-full">
                        {row.name}
                      </p>
                    </div>
                  </div>
                  <div className="py-4 w-[20%] truncate flex justify-center">
                    <div className="flex justify-center text-center items-center">{row.price}</div>
                  </div>
                  <div className="py-4 w-[20%] truncate fex justify-end">
                    <div className="flex flex-row justify-end text-end items-center">{
                      `${row.numOfTokens - row.purchasedTokens} / ${row.numOfTokens}`
                    }</div>
                  </div>
                </div>

              ))}
              {
                leftTableData.length === 0 && <tr>
                  <td className="text-center py-[2rem]">
                    No NFTs found
                  </td>
                </tr>
              }

            </div>
          </div>
        </div>
      </div>



      <div className="md:flex hidden ml-5 mr-5 gap-5">
        {/* Left Table */}
        <div className="flex flex-1">
          <table className="w-full">
            <thead>
              <tr className="bg-white flex justify-between h-10 py-5 items-center rounded-md">
                {tableHeadings.map((heading, index) => (
                  <th className="w-[25%]" key={index}>{heading}</th>
                ))}
              </tr>
            </thead>
          </table>
        </div>
        {/* Right Table */}
        <div className="flex flex-1">
          <table className="w-full">
            <thead>
              <tr className="bg-white flex justify-between h-10 p-5 items-center rounded-md">
                {tableHeadings.map((heading, index) => (
                  <th className="w-[25%]" key={index}>{heading}</th>
                ))}
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div className="md:flex hidden w-full gap-5 px-5">
        {/* Scrollable Left Table */}
        <div
          className="flex w-[50%] overflow-x-auto relative mt-2"
          style={{
            maxHeight: "500px",
            overflowY: "auto",
          }}
        >
          <div className="w-full">

            {leftTableData.map((row, index) => (

              <div
                key={index}
                className="m-1 h-[70px] px-5 flex justify-between items-center flex-shrink-0 rounded-lg"
                style={{
                  background: "rgba(255, 255, 255, 0.33)",
                }}
              >
                <div className="py-4 pr-5 w-[25%]">
                  <div className="flex gap-5  items-center">
                    <Image
                      height={100}
                      width={100}
                      src={row.images[0]}
                      alt={`Image for ${row.name}`}
                      className="w-14 h-14 rounded-md"
                    />
                    <p className="truncate w-full">
                      {row.name}
                    </p>
                  </div>
                </div>
                <div className="py-4 w-[20%] truncate flex justify-center">
                  <div className="flex justify-center text-center items-center">{row.price}</div>
                </div>
                <div className="py-4 w-[20%] truncate fex justify-end">
                  <div className="flex flex-row justify-end text-end items-center">{
                    `${row.numOfTokens - row.purchasedTokens} / ${row.numOfTokens}`
                  }</div>
                </div>
              </div>

            ))}
            {
              leftTableData.length === 0 && <tr>
                <td className="text-center py-[2rem]">
                  No NFTs found
                </td>
              </tr>
            }

          </div>
        </div>
        {/* Scrollable Right Table */}
        <div
          className="flex w-[50%] overflow-x-auto relative mt-2"
          style={{
            maxHeight: "500px",
            overflowY: "auto",
          }}
        >
          <div className="w-full">

            {rightTableData.map((row, index) => (

              <div
                key={index}
                className="m-1 h-[70px] flex px-5 justify-between items-center flex-shrink-0 rounded-lg"
                style={{
                  background: "rgba(255, 255, 255, 0.33)",
                }}
              >
                <div className="py-4 pr-5 w-[25%]">
                  <div className="flex gap-5  items-center">
                    <Image
                      height={100}
                      width={100}
                      src={row.images[0]}
                      alt={`Image for ${row.name}`}
                      className="w-14 h-14 rounded-md"
                    />
                    <p className="truncate w-full">
                      {row.name}
                    </p>
                  </div>
                </div>
                <div className="py-4 w-[20%] truncate flex justify-center">
                  <div className="flex justify-center text-center items-center">{row.price}</div>
                </div>
                <div className="py-4 w-[20%] truncate fex justify-end">
                  <div className="flex flex-row justify-end text-end items-center">{
                    `${row.numOfTokens - row.purchasedTokens} / ${row.numOfTokens}`
                  }</div>
                </div>
              </div>

            ))}
            {
              leftTableData.length === 0 && <tr>
                <td className="text-center py-[2rem]">
                  No NFTs found
                </td>
              </tr>
            }

          </div>
        </div>
      </div>
    </>


  );
}

export default TableCollection;
