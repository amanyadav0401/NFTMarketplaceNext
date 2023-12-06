import ReactPaginate from "react-paginate";
import { useState } from "react";

const formatDate = (date: (string | Date)) => {
  const d = new Date(date);
  const month = d.toLocaleString("default", { month: "short" });
  const day = d.getDate();
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};

const MISList = ({ nftData }: { nftData: NFTItem[] }) => {

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(nftData.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleNftData = nftData.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div>
      <div className="divide-y divide-gray-300">
        <div className="flex items-center space-x-4 py-4 border-b border-gray-300 font-Avenir text-lg">
          <div className="w-10"></div>
          <div className="flex-grow w-1/4 md:text-base text-sm">NFT Name</div>
          <div className="w-1/5 md:text-base text-sm">Count</div>
          <div className="w-1/5 md:text-base text-sm">Unit Value</div>
          <div className="w-1/5 first-letter:md:text-base text-sm">Total Value</div>
        </div>
        {visibleNftData.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 py-4 border-b border-gray-300"
          >
            <img
              src={item.images[0]}
              alt={item.name}
              className="w-[50px] h-[50px] md:ml-5 rounded-lg"
              style={{
                boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.10)",
              }}
            />
            <div className="flex-grow w-1/4">
              <h4 className="font-Avenir md:text-md text-sm">
                {item.name}
              </h4>
              <p className="font-Avenir text-md text-gray-500">{formatDate(item.createdAt)}</p>
            </div>
            <div className="w-1/5 font-Avenir md:text-md text-sm">
              {item.numOfTokens}
            </div>
            <div className="w-1/5 font-Avenir text-blue-400 md:text-md text-sm ">
              {item.price}
            </div>
            <div className="w-1/5 font-Avenir md:text-md text-sm">
              {item.numOfTokens * item.price}
            </div>
          </div>
        ))}
      </div>

      {nftData.length > 0 && <div className="mt-2 flex font-Avenir justify-between items-center">
        <div>
          <p>{`${startIndex + 1} to ${Math.min(endIndex, nftData.length)} of ${nftData.length
            }`}</p>
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
            pageLinkClassName={"page-link border border-2 text-gray-800 rounded-md p-2"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link p-2"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link p-2"}
          />
        </div>
      </div>}
    </div>
  );
}

export default MISList;
