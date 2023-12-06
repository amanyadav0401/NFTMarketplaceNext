import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiHeart } from "react-icons/bi";
import useWindowWidth from "../useWindowWidth";

interface CardData {
  id: number;
  image: string;
  title: string;
  price: string;
  stock: string;
}

const CardComponent: React.FC = () => {
  const cardData: CardData[] = [
    {
      id: 1,
      image: "/Images/cardimg.svg",
      title: "Minnesota Vikings - Griddy 1",
      price: "$ 10",
      stock: "130/120",
    },
    {
      id: 2,
      image: "/Images/cardimg.svg",
      title: "Minnesota Vikings - Griddy 2",
      price: "$ 10",
      stock: "130/120",
    },
    {
      id: 3,
      image: "/Images/cardimg.svg",
      title: "Minnesota Vikings - Griddy 3",
      price: "$ 10",
      stock: "130/120",
    },
    {
      id: 4,
      image: "/Images/cardimg.svg",
      title: "Minnesota Vikings - Griddy 4",
      price: "$ 10",
      stock: "130/120",
    },
    {
      id: 5,
      image: "/Images/cardimg.svg",
      title: "Minnesota Vikings - Griddy 5",
      price: "$ 10",
      stock: "130/120",
    },
    {
      id: 6,
      image: "/Images/cardimg.svg",
      title: "Minnesota Vikings - Griddy 6",
      price: "$ 10",
      stock: "130/120",
    },
    {
      id: 7,
      image: "/Images/cardimg.svg",
      title: "Minnesota Vikings - Griddy 7",
      price: "$ 10",
      stock: "130/120",
    },
    {
      id: 8,
      image: "/Images/cardimg.svg",
      title: "Minnesota Vikings - Griddy 8",
      price: "$ 10",
      stock: "130/120",
    },
    {
      id: 9,
      image: "/Images/cardimg.svg",
      title: "Minnesota Vikings - Griddy 9",
      price: "$ 10",
      stock: "130/120",
    },
    {
      id: 10,
      image: "/Images/cardimg.svg",
      title: "Minnesota Vikings - Griddy 10",
      price: "$ 10",
      stock: "130/120",
    },
    {
      id: 11,
      image: "/Images/cardimg.svg",
      title: "Minnesota Vikings - Griddy 11",
      price: "$ 10",
      stock: "130/120",
    },
    {
      id: 12,
      image: "/Images/cardimg.svg",
      title: "Minnesota Vikings - Griddy 12",
      price: "$ 10",
      stock: "130/120",
    },
    {
      id: 13,
      image: "/Images/cardimg.svg",
      title: "Minnesota Vikings - Griddy 13",
      price: "$ 10",
      stock: "130/120",
    },
    {
      id: 14,
      image: "/Images/cardimg.svg",
      title: "Minnesota Vikings - Griddy14",
      price: "$ 10",
      stock: "130/120",
    },
    {
      id: 15,
      image: "/Images/cardimg.svg",
      title: "Minnesota Vikings - Griddy14",
      price: "$ 10",
      stock: "130/120",
    },
    // Add more card data here...
  ];

  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  const router = useRouter();
  const { isPhoneScreen } = useWindowWidth();

  return (
    <div>
      {isPhoneScreen ? (
        <div className="overflow-x-auto">
          <div className="flex ">
            {cardData.slice(0, 5).map((card, index) => (
              <div
                key={card.id}
                className="relative px-2 mb-4  cursor-pointer"
                onMouseEnter={() => setHoveredCardId(card.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => router.push(`/card/${card.id}`)}
                style={{
                  minWidth: "250px",
                  maxWidth: "300px",
                }}
              >
                <div
                  className={`bg-white h-full rounded-lg shadow-md p-4 ${
                    hoveredCardId === card.id ? "shadow-lg" : "shadow-md"
                  }`}
                  style={{
                    borderRadius: "12px",
                    boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.10)",
                  }}
                >
                  <div
                    className={`border rounded-lg border-gray-300 bg-white ${
                      hoveredCardId === card.id ? "sm:h-[150px] h-[100px]" : "sm:h-[200px] h-[130px]"
                    } transition-all duration-300`}
                  >
                    <img
                      src={card.image}
                      alt="Card"
                      className="w-full h-full rounded-lg"
                    />
                  </div>
                  <div className="mt-4 text-black font-semibold text-base">
                    {card.title}
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <div className="text-orange text-center font-semibold text-xs">
                        {card.price}
                      </div>
                      <div className="text-orange w-20 pl-2 flex items-center justify-center h-5 rounded-md font-semibold bg-orange-200 text-orange-500 text-xs">
                        {card.stock}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${
                      hoveredCardId === card.id ? "opacity-1" : "opacity-0"
                    } transition-opacity duration-300 space-x-1 absolute bottom-0 flex  right-2 left-2`}
                  >
                    <div className="flex-grow h-10 rounded-bl-lg bg-[#E377FF] inset-shadow-md flex items-center  justify-center">
                      <button className="font-Avenir tracking-wide text-white font-semibold text-xs px-5 ">
                        Add to Cart
                      </button>
                    </div>
                    <div className="flex-grow h-10 rounded-br-lg bg-[#E377FF] inset-shadow-md flex items-center  justify-center">
                      <button className="font-Avenir tracking-wide text-white font-semibold text-xs px-5">
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {cardData.slice(0, 5).map((card, index) => (
            <div
              key={card.id}
              className="relative px-2 mb-4 cursor-pointer"
              onMouseEnter={() => setHoveredCardId(card.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              onClick={() => router.push(`/card/${card.id}`)}
            >
              <div
                className={`bg-white h-full rounded-lg shadow-md p-4 ${
                  hoveredCardId === card.id ? "shadow-lg" : "shadow-md"
                }`}
                style={{
                  borderRadius: "12px",
                  boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.10)",
                }}
              >
                <div
                  className={`border rounded-lg border-gray-300 bg-white ${
                    hoveredCardId === card.id ? "h-[150px]" : "h-[200px]"
                  } transition-all duration-300`}
                >
                  <img
                    src={card.image}
                    alt="Card"
                    className="w-full h-full rounded-lg"
                  />
                </div>
                <div className="mt-4 text-black font-semibold text-base">
                  {card.title}
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-orange text-center font-semibold text-xs">
                      {card.price}
                    </div>
                    <div className="text-orange w-20 pl-2 flex items-center justify-center h-5 rounded-md font-semibold bg-orange-200 text-orange-500 text-xs">
                      {card.stock}
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    hoveredCardId === card.id ? "opacity-1" : "opacity-0"
                  } transition-opacity duration-300 space-x-1 absolute bottom-0 flex  right-2 left-2`}
                >
                  <div className="flex-grow h-10 rounded-bl-lg bg-[#E377FF] inset-shadow-md flex items-center  justify-center">
                    <button className="font-Avenir tracking-wide text-white font-semibold text-xs px-5 ">
                      Add to Cart
                    </button>
                  </div>
                  <div className="flex-grow h-10 rounded-br-lg bg-[#E377FF] inset-shadow-md flex items-center  justify-center">
                    <button className="font-Avenir tracking-wide text-white font-semibold text-xs px-5">
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 mb-5 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 p-2 sm:p-4 cursor-pointer">
        <div className="bg-orange-100 flex flex-col sm:flex-row justify-between items-center rounded-lg shadow-md p-4">
          <div className="text-purple-950 font-Avenir text-base">
            Happy Independence Day to you all!
          </div>
          <button className="w-full sm:w-[300px] h-10 bg-purple-950 text-white font-semibold rounded-lg mt-2 sm:mt-0">
            Special Offers
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {cardData.slice(5).map((card, index) => (
          <div
            key={card.id}
            className="relative px-2 mb-10 cursor-pointer"
            onMouseEnter={() => setHoveredCardId(card.id)}
            onMouseLeave={() => setHoveredCardId(null)}
            onClick={() => router.push(`/card/${card.id}`)}
          >
            <div
              className={`bg-white h-full rounded-lg shadow-md p-4 ${
                hoveredCardId === card.id ? "shadow-lg" : "shadow-md"
              }`}
              style={{
                borderRadius: "12px",
                boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.10)",
              }}
            >
              <div
                className={`border rounded-lg border-gray-300 bg-white ${
                  hoveredCardId === card.id ? "sm:h-[150px] h-[100px]" : "sm:h-[200px] h-[130px]"
                } transition-all duration-300`}
              >
                <img
                  src={card.image}
                  alt="Card"
                  className="w-full h-full rounded-lg"
                />
              </div>
              <div className="mt-4 text-black font-semibold text-base">
                {card.title}
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <div className="text-orange text-center font-semibold text-xs">
                    {card.price}
                  </div>
                  <div className="text-orange w-20 pl-2 flex items-center justify-center h-5 rounded-md font-semibold bg-orange-200 text-orange-500 text-xs">
                    {card.stock}
                  </div>
                </div>
              </div>
              <div
                className={`${
                  hoveredCardId === card.id ? "opacity-1" : "opacity-0"
                } transition-opacity duration-300 space-x-1 absolute bottom-0 flex  right-2 left-2`}
              >
                <div className="flex-grow h-10 rounded-bl-lg bg-[#E377FF] inset-shadow-md flex items-center  justify-center">
                  <button className="font-Avenir tracking-wide text-white font-semibold text-xs px-5 ">
                    Add to Cart
                  </button>
                </div>
                <div className="flex-grow h-10 rounded-br-lg bg-[#E377FF] inset-shadow-md flex items-center  justify-center">
                  <button className="font-Avenir tracking-wide text-white font-semibold text-xs px-5">
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardComponent;
