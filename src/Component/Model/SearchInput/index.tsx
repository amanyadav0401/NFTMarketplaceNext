"use client"
import { AiOutlineSearch } from "react-icons/ai";
import useWindowWidth from "../useWindowWidth";
import { useState } from "react";
import { useRouter } from "next/navigation";

function SearchInput() {
  const { isPhoneScreen } = useWindowWidth();
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  return (
    <div>
      <div className="flex items-center space-x-2">
        <div className="relative">
          {isPhoneScreen ? (
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyUp={(e) => {
                const searchKey = search.trim().replace(/\s+/g, '+').toLowerCase();
                if (!searchKey) return;
                if (e.key === 'Enter') {
                  router.push(`/search/${searchKey}`);
                }
              }}
              className="w-80 h-10 flex-shrink-0 border-black border-2 rounded-full bg-[#FCEFFF] p-2 pl-10"
              placeholder="Search..."
            />
          ) : (
            <input
              type="text"
              value={search}
              onKeyUp={(e) => {
                const searchKey = search.trim().replace(/\s+/g, '+').toLowerCase();
                if (!searchKey) return;
                if (e.key === 'Enter') {
                  router.push(`/search/${searchKey}`);
                }
              }
              }
              onChange={(e) => setSearch(e.target.value)}
              className="w-[400px] h-10 flex-shrink-0 border-black border-2 rounded-full bg-[#FCEFFF] p-2 pl-10"
              placeholder="Search..."
            />
          )}

          <div className="absolute left-3 top-3">
            <AiOutlineSearch onClick={() => {
              const searchKey = search.trim().replace(/\s+/g, '+').toLowerCase();
              if (!searchKey) return;
              router.push(`/search/${searchKey}`);
            }} className="text-gray-400 cursor-pointer text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchInput;
