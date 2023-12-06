import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiHeart } from "react-icons/bi";
import useWindowWidth from "@/Component/Model/useWindowWidth";
import BuyBackCard from "../BuyBackCard";

interface CardData {
  id: number;
  image: string;
  title: string;
  price: string;
  stock: string;
}

const BuyBackStoreFrontList: React.FC<
  {
    buybacks: BuyBack[];
  }
> = ({
  buybacks
}) => {
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

        {
          buybacks.map((buyback) => {
            return (
              <BuyBackCard key={buyback._id} buyback={buyback} />
            )
          })
        }

      </div>
    );
  };

export default BuyBackStoreFrontList;
