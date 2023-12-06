import useWindowWidth from "@/Component/Model/useWindowWidth";
import React, { useEffect, useState } from "react";
import Card from "@/Component/Model/CardModel";
import { MdFilterAlt } from "react-icons/md";
import { AiOutlineDown } from "react-icons/ai";
import TableCollection from "./TableCollection";
import { categories } from "@/utils/Constants";
import Slider from "react-slick";
import { APIClient } from "@/utils/APIClient";

function CardComponent({ nfts: nftsServer }: { nfts: NFTItem[] }) {
  const { isPhoneScreen } = useWindowWidth();

  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [nfts, setNfts] = useState<NFTItem[]>(nftsServer);
  const [selectedCategory, setSelectedCategory] = useState<string>('');


  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToScroll: 1,
    arrows: false,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {

          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {

          slidesToScroll: 1,
          initialSlide: 2,
        },
      },

    ],
  };

  const handleCategoryClick = async (category: string) => {
    if (category === selectedCategory) {
      setSelectedCategory('')
      return
    }
    setSelectedCategory(category);
  }

  useEffect(() => {
    const getItems = async () => {
      if (selectedCategory === '') {
        setNfts(nftsServer)
        return;
      }
      const data = await APIClient.get(`items/category/${selectedCategory}`)
      const dataJson: any = await data.json()
      setNfts(dataJson.items)
    }
    getItems()
  }, [selectedCategory])

  return (
    <div className="w-full">
      <div className="mt-5 w-full relative h-full">
        <div
          className="absolute inset-0"
          style={{
            zIndex: -1,
            opacity: 0.2,
            background:
              "linear-gradient(91deg, #13AAFF 0%, #E377FF 34.19%, #E06C6E 72.04%, #0A93FA 102.2%)",
          }}
        ></div>
        <div className="w-full flex-shrink-0 relative">
          <div className="w-full py-[2rem]">
            <Slider {...settings}>
              {categories.map((category) => {
                return (
                  <button
                    key={category.value}
                    className={`!w-fit transition-all duration-300 mx-[0.5rem] ${selectedCategory === category.value
                      ? "border-[#3F2D6D] border-[3px]"
                      : ""
                      } px-[2rem] h-10 p-2 border rounded-full bg-white`}
                    onClick={() => handleCategoryClick(category.value)}
                  >
                    <div className="text-[#3F2D6D] font-Avenir tracking-wide text-center text-sm">
                      {category.label}
                    </div>
                  </button>
                )
              })}
            </Slider>
          </div>
          <TableCollection nfts={nfts} />
        </div>
      </div>
    </div>
  );
}

export default CardComponent;
