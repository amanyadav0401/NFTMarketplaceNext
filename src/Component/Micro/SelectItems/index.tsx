'use client'

import React, { useEffect, useState } from "react";
import { Select, SelectItem, Avatar, Chip } from "@nextui-org/react";
import { APIClient } from "@/utils/APIClient";
import { useMyItemsStore } from "@/utils/Zustand";


export default function SelectItems({selectedItems, setSelectedItems}:any) {
  const { myItems } = useMyItemsStore()

  

  return (
    <Select
      items={myItems || []}
      label="Assigned to"
      variant="bordered"
      isMultiline={true}
      selectedKeys={selectedItems}
      onSelectionChange={setSelectedItems}
      selectionMode="multiple"
      placeholder="Select a NFT"
      labelPlacement="outside"
      renderValue={(items) => {
        return (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Chip key={item.key}>{item.data?.name}</Chip>
            ))}
          </div>
        );
      }}
    >
      {(user) => (
        <SelectItem key={user._id} value={user._id} textValue={user.name}>
          <div className="flex gap-2 items-center">
            <Avatar alt={user.name} className="flex-shrink-0" size="sm" src={user.images[0]} />
            <div className="flex flex-col">
              <span className="text-small">{user.name}</span>
              {/* <span className="text-tiny text-default-400">{user.email}</span> */}
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
