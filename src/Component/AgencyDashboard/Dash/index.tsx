import React from 'react'
import Brands from '../Brands';
import MyItemsComponent from '@/Component/Micro/MyItems';
import PurchasedItemComponent from '@/Component/Micro/PurchasedItems';
import MyCollectionsComponent from '@/Component/Micro/MyCollections';
import AgencyInviteModal from '@/Component/Model/AgencyInvitePopup';

type Props = {}

interface Tab {
  label: string;
}



function TabComponentAgency({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`cursor-pointer md:text-base text-[12px] p-3 text-center md:w-64 md:h-12 ${active ? "text-purple-900" : "text-gray-500 hover:text-gray-500"
        }`}
      onClick={onClick}
    >
      {label}
      {active && (
        <div className="ml-auto md:flex mr-auto h-0.5 bg-purple-900 mt-2"></div>
      )}
    </div>
  );
}

const AgencyMain = ({
  tabs,
  activeTabIndex,
  setActiveTabIndex,
}: {
  tabs: Tab[];
  activeTabIndex: number;
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <>
      <div className="p-6">
        <div
          className="w-full flex justify-between items-center flex-shrink-0 rounded-lg bg-gray-100 box-shadow shadow-xl shadow-gray-500/40"
          style={{
            borderRadius: "12px",
            boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.10)",
          }}
        >
          <div className="flex items-center md:items-start md:mt-2">
            {tabs.map((tab, index) => (
              <TabComponentAgency
                key={index}
                label={tab.label}
                active={index === activeTabIndex}
                onClick={() => setActiveTabIndex(index)}
              />
            ))}
          </div>
          {/* <div className="flex items-center justify-between w-32 h-10 p-2 mr-5 border rounded-md bg-gray-200 cursor-pointer shadow-md">
            <MdFilterAlt className="text-gray-400 text-xl" />
            <div className="text-gray-600 font-semibold text-base">Filter</div>
            <AiOutlineDown className="text-gray-400 text-xl" />
          </div> */}
        </div>
        <div className="mt-6">
          {activeTabIndex === 0 && (
            <div>
              {/* Content for Published Tab */}
              <Brands />
            </div>
          )}
          {activeTabIndex === 1 && (
            <div>
              {/* Content for Unpublished Tab */}
              <MyItemsComponent />
            </div>
          )}
          {activeTabIndex === 2 && (
            <div>
              {/* Content for Unpublished Tab */}
              <PurchasedItemComponent />
            </div>
          )}
          {activeTabIndex === 3 && (
            <div>
              {/* Content for Unpublished Tab */}
              <MyCollectionsComponent />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default AgencyMain